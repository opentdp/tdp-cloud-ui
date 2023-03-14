<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi, AcApi } from "@/api"
import { MachineItem } from "@/api/native/machine"

import { dateFormat } from "@/helper/format"

@Component({
    emits: ["change"],
})
export default class SwasBind extends Vue {
    public dateFormat = dateFormat

    public loading = 1

    @Prop
    public vendorId = 0

    @Prop
    public boundList: Record<string, MachineItem> = {}

    // 初始化

    public created() {
        AcApi.vendor(this.vendorId)
        this.getRegionInstanceList()
    }

    // 获取列表

    public regionList = {}

    public instanceList = []
    public instanceCount = 0

    async getRegionInstanceList() {
        const res = await AcApi.swas.describeRegions().finally(() => this.loading--)
        this.loading = res.TotalCount
        res.Regions.forEach(async (item: any) => {
            const regionId = item?.RegionId || ""
            this.regionList = {
                ...this.regionList,
                [regionId]: regionId,
            }
            // 获取当前大区实例
            const rs2 = await AcApi.swas.describeInstances(regionId).finally(() => this.loading--)
            const rsPlan = await AcApi.swas.describeListPlans(regionId)
            if (rs2.TotalCount && rs2.Instances) {
                const temp = rs2.Instances.map((i: any) => {
                    const { PlanId } = i
                    const instancePlan = rsPlan.Plans.find((x: any) => x.PlanId === PlanId)
                    return ({
                        ...i,
                        ...instancePlan,
                        RegionName: item.LocalName,
                    })
                })
                this.instanceList = this.instanceList.concat(temp)
                this.instanceCount += rs2.TotalCount
            }
        })
    }

    // 执行脚本

    async runCommand(instance: any, code: string) {
        const region = instance.RegionId.replace(/-(\d+)$/, "")
        const res = await AcApi.tat.runCommand(region, {
            InstanceIds: [instance.InstanceId],
            Content: code,
        })
        const rs2 = AcApi.tat.describeInvocations(region, {
            InvocationIds: [res.InvocationId],
        })
        console.log(rs2)
    }

    // 绑定主机

    async bindMachine(item: any) {
        await NaApi.machine.create({
            VendorId: this.vendorId,
            HostName: item.InstanceName || "",
            IpAddress: item.PublicIpAddress,
            OSType: this.parseOSType(item.OsName),
            Region: item.RegionName,
            Model: "alibaba/swas",
            CloudId: item.InstanceId,
            CloudMeta: item,
            WorkerId: "",
            Status: "",
            Description: "",
        })
        this.$emit("change")
    }

    // 同步主机

    public syncMachine(item: any) {
        const bd = this.boundList[item.InstanceId]
        NaApi.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: item.InstanceName,
            IpAddress: item.PublicIpAddress,
            OSType: this.parseOSType(item.OsName),
            Region: item.RegionId,
            CloudId: item.InstanceId,
            CloudMeta: item,
        })
    }

    // 系统类型

    public parseOSType(s: string) {
        return /windows/i.test(s) ? "windows" : "linux"
    }

    // 转换为GB显示

    public parseToGB(s: string) {
        return s ? (parseInt(s) / 1024).toFixed(2) + " GB" : "--"
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'InstanceName', title: '名称', ellipsis: true },
        { colKey: 'RegionName', title: '地域', ellipsis: true },
        { colKey: 'Core', title: 'CPU', ellipsis: true },
        { colKey: 'Memory', title: '内存', ellipsis: true },
        { colKey: 'PublicIpAddress', title: '外网 IP', ellipsis: true },
        { colKey: 'ExpiredTime', title: '到期时间', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
}
</script>

<template>
    <t-card title="实例列表" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ instanceCount }}
        </template>
        <t-table :async-loading="loading ? 'loading' : ''" :data="instanceList" :columns="tableColumns"
            row-key="InstanceId">
            <template #RegionName="{ row }">
                {{ row.RegionName }}
            </template>
            <template #Memory="{ row }">
                {{ row.Memory }}
            </template>
            <template #PublicIpAddress="{ row }">
                {{ row?.PublicIpAddress || "--" }}
            </template>
            <template #ExpiredTime="{ row }">
                {{ dateFormat(row.ExpiredTime, "yyyy-MM-dd") }}
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
