<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { AcApi, NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import * as Ac from "@/api/alibaba/typings"

import { dateFormat } from "@/helper/format"

@Component({
    emits: ["change"],
})
export default class EcsBind extends Vue {
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

    public regionList: Record<string, Ac.Ecs.DescribeRegionsResponseBodyRegionsRegion> = {}

    public instanceList: Ac.Ecs.DescribeInstancesResponseBodyInstancesInstance[] = []
    public instanceCount = 0

    async getRegionInstanceList() {
        const res = await AcApi.ecs.describeRegions().finally(() => this.loading--)
        this.loading = res.Regions.Region.length
        res.Regions.Region.forEach(async item => {
            this.regionList[item.RegionId] = item
            // 获取当前大区实例
            const rs2 = await AcApi.ecs.describeInstances(item.RegionId).finally(() => this.loading--)
            if (rs2.TotalCount && rs2.Instances.Instance) {
                this.instanceList.push(...rs2.Instances.Instance)
                this.instanceCount += rs2.TotalCount
            }
        })
    }

    // 执行脚本

    async runCommand(item: Required<Ac.Ecs.DescribeInstancesResponseBodyInstancesInstance>, code: string) {
        const region = item.RegionId
        const res = await AcApi.tat.runCommand(region, {
            InstanceIds: [item.InstanceId],
            Content: code,
        })
        const rs2 = AcApi.tat.describeInvocations(region, {
            InvocationIds: [res.InvocationId],
        })
        console.log(rs2)
    }

    // 绑定主机

    async bindMachine(item: Required<Ac.Ecs.DescribeInstancesResponseBodyInstancesInstance>) {
        await NaApi.machine.create({
            VendorId: this.vendorId,
            HostName: item.InstanceName || "",
            IpAddress: item.PublicIpAddress.IpAddress[0],
            OSType: this.parseOSType(item.OSType),
            Region: this.regionList[item.RegionId].LocalName,
            Model: "alibaba/ecs",
            CloudId: item.InstanceId,
            CloudMeta: item,
            WorkerId: "",
            Status: "",
            Description: "",
        })
        this.$emit("change")
    }

    // 同步主机

    public syncMachine(item: Required<Ac.Ecs.DescribeInstancesResponseBodyInstancesInstance>) {
        const bd = this.boundList[item.InstanceId]
        NaApi.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: item.InstanceName,
            IpAddress: item.PublicIpAddress.IpAddress[0],
            OSType: this.parseOSType(item.OSType),
            Region: this.regionList[item.RegionId].LocalName,
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
        { colKey: 'Cpu', title: 'CPU', ellipsis: true },
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
        <t-table :data="instanceList" :columns="tableColumns" row-key="InstanceId">
            <template #RegionName="{ row }">
                {{ row.RegionName }}
            </template>
            <template #Memory="{ row }">
                {{ parseToGB(row.Memory) }}
            </template>
            <template #PublicIpAddress="{ row }">
                {{ row?.PublicIpAddress?.IpAddress[0] || "--" }}
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
