<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi, TcApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import * as TC from "@/api/tencent/typings"

import { dateFormat } from "@/helper/format"
import { installWorker } from "@/helper/script/shell"

@Component({
    emits: ["change"]
})
export default class LighthouseBind extends Vue {
    public dateFormat = dateFormat

    public loading = 1

    @Prop
    public vendorId = 0

    @Prop
    public boundList: Record<string, MachineItem> = {}

    // 初始化

    public created() {
        TcApi.vendor(this.vendorId)
        this.getRegionInstanceList()
    }

    // 获取列表

    public regionList: Record<string, TC.Lighthouse.RegionInfo> = {}

    public instanceList: TC.Lighthouse.Instance[] = []
    public instanceCount = 0

    async getRegionInstanceList() {
        const res = await TcApi.lighthouse.describeRegions()
        this.loading = res.TotalCount
        res.RegionSet.forEach(async item => {
            this.regionList[item.Region] = item
            // 获取当前大区实例
            const rs2 = await TcApi.lighthouse.describeInstances(item.Region)
            if (rs2.TotalCount && rs2.InstanceSet) {
                this.instanceList.push(...rs2.InstanceSet)
                this.instanceCount += rs2.TotalCount
            }
            this.loading--
        })
    }

    // 执行脚本

    async runCommand(instance: TC.Lighthouse.Instance, code: string) {
        const region = instance.Zone.replace(/-(\d+)$/, '')
        const res = await TcApi.tat.runCommand(region, {
            InstanceIds: [instance.InstanceId],
            Content: code,
        })
        return res.InvocationId
    }

    // PENDING 等待下发
    // RUNNING 命令运行中
    // SUCCESS 命令成功
    // FAILED 命令失败
    // TIMEOUT 命令超时
    // PARTIAL_FAILED 命令部分失败
    async getInvocationStatus(instance: TC.Lighthouse.Instance, id: string) {
        const region = instance.Zone.replace(/-(\d+)$/, '')
        const res = await TcApi.tat.describeInvocations(region, {
            InvocationIds: [id]
        })
        return res.InvocationSet[0].InvocationStatus
    }

    // 安装 Worker

    public workerStatus: Record<string, string> = {}

    async installWorker(item: TC.Lighthouse.Instance, id: number) {
        // 云助手状态
        const region = item.Zone.replace(/-(\d+)$/, '')
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

    async bindMachine(item: TC.Lighthouse.Instance) {
        const rand = Date.now() + "-" + Math.round(Math.random() * 1000 + 1000)
        const res = await NaApi.machine.create({
            VendorId: this.vendorId,
            HostName: item.InstanceName,
            IpAddress: item.PublicAddresses[0],
            OSType: this.parseOSType(item.OsName),
            Region: this.parseRegion(item.Zone),
            Model: "tencent/lighthouse",
            CloudId: item.InstanceId,
            CloudMeta: item,
            WorkerId: "rand-" + rand,
            Description: "",
            Status: 1,
        })
        if (res.Id > 0) {
            this.installWorker(item, 44)
        }
        this.$emit("change")
    }

    // 同步主机

    public syncMachine(item: TC.Lighthouse.Instance) {
        const bd = this.boundList[item.InstanceId]
        NaApi.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: item.InstanceName,
            IpAddress: item.PublicAddresses[0],
            OSType: this.parseOSType(item.OsName),
            Region: this.parseRegion(item.Zone),
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
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>实例列表</b>
                <div class="flex-auto" />
                <small>记录总数: {{ instanceCount }}</small>
            </div>
        </template>
        <el-table v-loading="loading && instanceList.length == 0" :data="instanceList" table-layout="fixed">
            <el-table-column prop="InstanceName" label="名称" show-overflow-tooltip fixed />
            <el-table-column label="地域" show-overflow-tooltip>
                <template #default="scope">
                    {{ parseRegion(scope.row.Zone) }}
                </template>
            </el-table-column>
            <el-table-column prop="CPU" label="CPU" show-overflow-tooltip />
            <el-table-column label="内存" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.Memory + " GB" }}
                </template>
            </el-table-column>
            <el-table-column label="系统盘" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.SystemDisk.DiskSize + " GB" }}
                </template>
            </el-table-column>
            <el-table-column prop="PublicAddresses" label="外网 IP" show-overflow-tooltip />
            <el-table-column label="到期时间" show-overflow-tooltip>
                <template #default="scope">
                    {{ dateFormat(scope.row.ExpiredTime, "yyyy-MM-dd") }}
                </template>
            </el-table-column>
            <el-table-column label="土豆片" show-overflow-tooltip>
                <template #default="scope">
                    {{ workerStatus[scope.row.InstanceId] || "Unkown" }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="boundList[scope.row.InstanceId]" link icon="View" @click="syncMachine(scope.row)">
                        同步
                    </el-button>
                    <el-button v-else link type="primary" icon="View" @click="bindMachine(scope.row)">
                        导入
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
