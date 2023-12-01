<script lang="ts">
import { Prop, Component, Vue } from "@/apps/basic"

import { NaApi, TcApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import * as TC from "@/api/tencent/typings"

import { dateFormat } from "@/helper/format"
import { installWorker } from "@/helper/script/shell"

@Component({
    emits: ["change"]
})
export default class CvmBind extends Vue {
    public dateFormat = dateFormat

    public loading = 1

    @Prop
    public vendorId = 0

    @Prop
    public boundList: Record<string, MachineItem> = {}

    // 初始化

    public created() {
        TcApi.vendor(this.vendorId)
        this.getRegionList()
        this.getInstanceList()
    }

    // 区域列表

    public regionList: Record<string, TC.Cvm.RegionInfo> = {}

    async getRegionList() {
        const res = await TcApi.cvm.describeRegions().finally(() => this.loading--)
        res.RegionSet.forEach(async item => {
            this.regionList[item.Region] = item
        })
    }

    // 实例列表

    public instanceList: TC.Cvm.Instance[] = []
    public instanceCount = 0

    async getInstanceList() {
        const res = await TcApi.cvm.describeInstanceStatistics()
        res.InstanceStatisticsSet.forEach(async item => {
            if (item.TotalCount == 0) {
                return
            }
            this.loading++
            const rs2 = await TcApi.cvm.describeInstances(item.Region).finally(() => this.loading--)
            if (rs2.TotalCount && rs2.InstanceSet) {
                this.instanceList.push(...rs2.InstanceSet)
                this.instanceCount += rs2.TotalCount
            }
        })
    }

    // 执行脚本

    async runCommand(item: Required<TC.Cvm.Instance>, code: string) {
        const region = item.Placement.Zone.replace(/-(\d+)$/, '')
        const res = await TcApi.tat.runCommand(region, {
            InstanceIds: [item.InstanceId],
            Content: code,
        })
        return res.InvocationId
    }

    async getInvocationStatus(item: Required<TC.Cvm.Instance>, id: string) {
        const region = item.Placement.Zone.replace(/-(\d+)$/, '')
        const res = await TcApi.tat.describeInvocations(region, {
            InvocationIds: [id]
        })
        // PENDING 等待下发
        // RUNNING 命令运行中
        // SUCCESS 命令成功
        // FAILED 命令失败
        // TIMEOUT 命令超时
        // PARTIAL_FAILED 命令部分失败
        return res.InvocationSet[0].InvocationStatus
    }

    // 安装 Worker

    public workerStatus: Record<string, string> = {}

    async installWorker(item: Required<TC.Cvm.Instance>, id: number) {
        // 云助手状态
        const region = item.Placement.Zone.replace(/-(\d+)$/, '')
        const res = await TcApi.tat.describeAutomationAgentStatus(region, {
            InstanceIds: [item.InstanceId]
        })
        if (!res || !res.AutomationAgentSet[0] || res.AutomationAgentSet[0].AgentStatus != "Online") {
            this.workerStatus[item.InstanceId] = "UNINSTALL"
            return
        }
        // 下发安装命令
        const code = installWorker.Content.replace("/workhub", "/workhub/" + id)
        const rcid = await this.runCommand(item, btoa(code))
        // 检查执行状态
        const siid = setInterval(async () => {
            const rcst = await this.getInvocationStatus(item, rcid)
            if (rcst != "PENDING" && rcst != "RUNNING") {
                clearInterval(siid)
            }
            this.workerStatus[item.InstanceId] = rcst
        }, 3000)
    }

    // 绑定主机

    async bindMachine(item: Required<TC.Cvm.Instance>) {
        const res = await NaApi.machine.create({
            VendorId: this.vendorId,
            HostName: item.InstanceName || "",
            IpAddress: item.PublicIpAddresses[0],
            OSType: this.parseOSType(item.OsName),
            Region: this.parseRegion(item.Placement.Zone),
            Model: "tencent/cvm",
            CloudId: item.InstanceId,
            CloudMeta: item,
            WorkerId: "",
            Status: "",
            Description: "",
        })
        if (res.Id > 0) {
            this.installWorker(item, 44)
        }
        this.$emit("change")
    }

    // 同步主机

    public syncMachine(item: Required<TC.Cvm.Instance>) {
        const bd = this.boundList[item.InstanceId]
        NaApi.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: item.InstanceName,
            IpAddress: item.PublicIpAddresses[0],
            OSType: this.parseOSType(item.OsName),
            Region: this.parseRegion(item.Placement.Zone),
            CloudId: item.InstanceId,
            CloudMeta: item,
        })
    }

    // 地域信息

    public parseRegion(s: string) {
        const [r, z] = s.replace(/-(\d+)$/, ':$1').split(':')
        return this.regionList[r].RegionName + (r ? " " + z + "区" : "")
    }

    // 系统类型

    public parseOSType(s: string) {
        return /windows/i.test(s) ? "windows" : "linux"
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'InstanceName', title: '名称', ellipsis: true },
        { colKey: 'Placement', title: '地域', ellipsis: true },
        { colKey: 'CPU', title: 'CPU', ellipsis: true },
        { colKey: 'Memory', title: '内存', ellipsis: true },
        { colKey: 'SystemDisk', title: '系统盘', ellipsis: true },
        { colKey: 'PublicIpAddresses', title: '外网 IP', ellipsis: true },
        { colKey: 'ExpiredTime', title: '到期时间', ellipsis: true },
        { colKey: 'Worker', title: '土豆片', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
}
</script>

<template>
    <t-card :loading="loading > 0" title="实例列表" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ instanceCount }}
        </template>
        <t-table :data="instanceList" :columns="tableColumns" row-key="InstanceId" hover>
            <template #Placement="{ row }">
                {{ parseRegion(row.Placement.Zone) }}
            </template>
            <template #Memory="{ row }">
                {{ row.Memory + " GB" }}
            </template>
            <template #SystemDisk="{ row }">
                {{ row.SystemDisk.DiskSize + " GB" }}
            </template>
            <template #ExpiredTime="{ row }">
                {{ dateFormat(row.ExpiredTime, "yyyy-MM-dd") }}
            </template>
            <template #Worker="{ row }">
                {{ workerStatus[row.InstanceId] || "Unkown" }}
            </template>
            <template #Operation="{ row }">
                <t-link v-if="boundList[row.InstanceId]" theme="success" hover="color" @click="syncMachine(row)">
                    同步
                </t-link>
                <t-link v-else theme="primary" hover="color" @click="bindMachine(row)">
                    导入
                </t-link>
            </template>
        </t-table>
    </t-card>
</template>
