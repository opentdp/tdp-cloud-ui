<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi, TcApi } from "@/api"
import * as QC from "@/api/tencent/typings"
import { MachineItem } from "@/api/local/machine"

import { dateFormat } from "@/helper/format"

@Component({
    emits: ["change"]
})
export default class CvmBind extends Vue {
    public dateFormat = dateFormat

    public loading = 1

    @Prop
    public meta!: {
        vendorId: number
        boundList: Record<string, MachineItem>
    }

    // 初始化

    public created() {
        TcApi.vendor(this.meta.vendorId)
        this.getRegionInstanceList()
    }

    // 获取列表

    public regionList: Record<string, QC.Cvm.RegionInfo> = {}

    public instanceList: QC.Cvm.Instance[] = []
    public instanceCount = 0

    async getRegionInstanceList() {
        const res = await TcApi.cvm.describeRegions()
        this.loading = res.TotalCount
        res.RegionSet.forEach(async (item) => {
            this.regionList[item.Region] = item
            // 获取当前大区实例
            const rs2 = await TcApi.cvm.describeInstances(item.Region)
            if (rs2.TotalCount && rs2.InstanceSet) {
                this.instanceList.push(...rs2.InstanceSet)
                this.instanceCount += rs2.TotalCount
            }
            this.loading--
        })
    }

    // 执行脚本

    async runCommand(instance: Required<QC.Cvm.Instance>, code: string) {
        const region = instance.Placement.Zone.replace(/-(\d+)$/, '')
        const res = await TcApi.tat.runCommand(region, {
            InstanceIds: [instance.InstanceId],
            Content: code,
        })
        const rs2 = TcApi.tat.describeInvocations(region, {
            InvocationIds: [res.InvocationId]
        })
        console.log(rs2)
    }

    // 绑定主机

    async bindMachine(item: Required<QC.Cvm.Instance>) {
        const rand = Date.now() + "-" + Math.round(Math.random() * 1000 + 1000)
        await NaApi.machine.create({
            VendorId: this.meta.vendorId,
            HostName: item.InstanceName || "",
            IpAddress: item.PublicIpAddresses[0],
            OSType: this.parseOSType(item.OsName),
            Region: this.parseRegion(item.Placement.Zone),
            Model: "tencent/cvm",
            CloudId: item.InstanceId,
            CloudMeta: item,
            WorkerId: "rand-" + rand,
            WorkerMeta: {},
            Description: "",
            Status: 1,
        })
        this.$emit("change")
    }

    // 同步主机

    public syncMachine(item: Required<QC.Cvm.Instance>) {
        const bd = this.meta.boundList[item.InstanceId]
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
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>实例列表</b>
                <div class="flex-auto" />
                <small>实例总数: {{ instanceCount }}</small>
            </div>
        </template>
        <el-table v-loading="loading && instanceList.length == 0" :data="instanceList" table-layout="fixed">
            <el-table-column prop="InstanceName" label="名称" show-overflow-tooltip fixed />
            <el-table-column label="地域" show-overflow-tooltip>
                <template #default="scope">
                    {{ parseRegion(scope.row.Placement.Zone) }}
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
            <el-table-column prop="PublicIpAddresses" label="外网 IP" show-overflow-tooltip />
            <el-table-column label="到期时间" show-overflow-tooltip>
                <template #default="scope">
                    {{ dateFormat(scope.row.ExpiredTime, "yyyy-MM-dd") }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="meta.boundList[scope.row.InstanceId]" link icon="View"
                        @click="syncMachine(scope.row)"
                    >
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
