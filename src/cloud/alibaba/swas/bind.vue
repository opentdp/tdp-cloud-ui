<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi, AcApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import * as AC from "@/api/alibaba/typings"

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

    public regionList: Record<string, AC.Swas.ListRegionsResponseBodyRegions> = {}

    public instanceList: AC.SwasInstance[] = []
    public instanceCount = 0

    async getRegionInstanceList() {
        const res = await AcApi.swas.listRegions().finally(() => this.loading--)
        this.loading = res.Regions.length
        res.Regions.forEach(async region => {
            this.regionList[region.RegionId] = region
            // 获取当前大区实例
            AcApi.swas.listInstances(region.RegionId).then(async rs2 => {
                if (rs2.TotalCount && rs2.Instances) {
                    const plan = await AcApi.swas.listPlans(region.RegionId)
                    const instances = rs2.Instances.map(item => {
                        const instancePlan = plan.Plans.find(x => x.PlanId === item.PlanId)
                        return { ...item, ...instancePlan } as AC.SwasInstance
                    })
                    this.instanceList.push(...instances)
                    this.instanceCount += rs2.TotalCount
                }
            }).finally(() => this.loading--)
        })
    }

    // 执行脚本

    async runCommand(item: AC.Swas.ListInstancesResponseBodyInstances, code: string) {
        const region = item.RegionId
        const res = await AcApi.tat.runCommand(region, {
            InstanceId: item.InstanceId,
            Content: code,
        })
        const rs2 = AcApi.tat.describeInvocations(region, {
            InvocationId: res.InvocationId,
        })
        console.log(rs2)
    }

    // 绑定主机

    async bindMachine(item: AC.Swas.ListInstancesResponseBodyInstances) {
        await NaApi.machine.create({
            VendorId: this.vendorId,
            HostName: item.InstanceName || "",
            IpAddress: item.PublicIpAddress,
            OSType: "linux", //this.parseOSType(item.OSType),
            Region: this.regionList[item.RegionId].LocalName,
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

    public syncMachine(item: AC.Swas.ListInstancesResponseBodyInstances) {
        const bd = this.boundList[item.InstanceId]
        NaApi.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: item.InstanceName,
            IpAddress: item.PublicIpAddress,
            OSType: "linux", //this.parseOSType(item.OSType),
            Region: this.regionList[item.RegionId].LocalName,
            Model: "alibaba/ecs",
            CloudId: item.InstanceId,
            CloudMeta: item,
        })
    }

    // 系统类型

    public parseOSType(s: string) {
        return /windows/i.test(s) ? "windows" : "linux"
    }

    // 转换为GB显示

    public parseToGB(s: number) {
        return s ? (s / 1024).toFixed(1) + " GB" : "--"
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'InstanceName', title: '名称', ellipsis: true },
        { colKey: 'RegionId', title: '地域', ellipsis: true },
        { colKey: 'Core', title: 'CPU', ellipsis: true },
        { colKey: 'Memory', title: '内存', ellipsis: true },
        { colKey: 'PublicIpAddress', title: '外网 IP', ellipsis: true },
        { colKey: 'ExpiredTime', title: '到期时间', ellipsis: true },
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
            <template #RegionId="{ row }">
                {{ regionList[row.RegionId].LocalName }}
            </template>
            <template #Memory="{ row }">
                {{ parseToGB(row.Memory) }}
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
