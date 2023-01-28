<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { Api, QApi } from "@/api"
import * as Qcloud from "@/api/qcloud/typings"
import { MachineItem } from "@/api/local/machine"

import { dateFormat } from "@/helper/utils"

@Component
export default class LighthouseBind extends Vue {
    public dateFormat = dateFormat

    public loading = 0

    @Prop
    public vid = 0

    public created() {
        QApi.lighthouse.vendor(this.vid)
        this.getRegionInstanceList()
        this.getBoundMachineList()
    }

    // 获取列表

    public regionList: Record<string, Qcloud.Lighthouse.RegionInfo> = {}

    public instanceList: Qcloud.Lighthouse.Instance[] = []
    public instanceCount = 0

    async getRegionInstanceList() {
        const res = await QApi.lighthouse.describeRegions()
        this.loading = res.TotalCount
        res.RegionSet.forEach(async (item) => {
            this.regionList[item.Region] = item
            // 获取当前大区实例
            const rs2 = await QApi.lighthouse.describeInstances(item.Region)
            if (rs2.TotalCount && rs2.InstanceSet) {
                this.instanceList.push(...rs2.InstanceSet)
                this.instanceCount += rs2.TotalCount
            }
            this.loading--
        })
    }

    // 执行脚本

    async runCommand(instance: Qcloud.Lighthouse.Instance, code: string) {
        const region = instance.Zone.replace(/-(\d+)$/, '')
        const res = await QApi.tat.runCommand(region, {
            InstanceIds: [instance.InstanceId],
            Content: code,
        })
        const rs2 = QApi.tat.describeInvocations(region, {
            InvocationIds: [res.InvocationId]
        })
        console.log(rs2)
    }

    // 已绑定主机

    public boundMachineList: Record<string, MachineItem> = {}

    async getBoundMachineList() {
        const res = await Api.machine.list()
        res.forEach((item) => {
            this.boundMachineList[item.CloudId] = item
        })
    }

    // 绑定主机

    public bindMachine(item: Qcloud.Lighthouse.Instance) {
        Api.machine.create({
            VendorId: this.vid,
            HostName: item.InstanceName,
            IpAddress: item.PublicAddresses[0],
            OSType: item.PlatformType,
            Region: this.parseRegion(item.Zone),
            Model: "qcloud/lighthouse",
            CloudId: item.InstanceId,
            CloudMeta: item,
            Description: "",
            Status: 1,
        })
    }

    // 同步主机

    public syncMachine(item: Qcloud.Lighthouse.Instance) {
        const bd = this.boundMachineList[item.InstanceId]
        Api.machine.update({
            Id: bd ? bd.Id : 0,
            VendorId: this.vid,
            HostName: item.InstanceName,
            IpAddress: item.PublicAddresses[0],
            OSType: item.PlatformType,
            Region: this.parseRegion(item.Zone),
            Model: "qcloud/lighthouse",
            CloudId: item.InstanceId,
            CloudMeta: item,
            Description: "",
            Status: 1,
        })
    }

    // 解析地域

    public parseRegion(s: string) {
        const [r, z] = s.replace(/-(\d+)$/, ':$1').split(':')
        return this.regionList[r].RegionName + (r ? " " + z + "区" : "")
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
            <el-table-column fixed prop="InstanceName" label="名称" min-width="150" />
            <el-table-column label="地域" min-width="120">
                <template #default="scope">
                    {{ parseRegion(scope.row.Zone) }}
                </template>
            </el-table-column>
            <el-table-column prop="CPU" label="CPU" min-width="60" />
            <el-table-column label="内存" min-width="60">
                <template #default="scope">
                    {{ scope.row.Memory + " GB" }}
                </template>
            </el-table-column>
            <el-table-column label="系统盘" min-width="80">
                <template #default="scope">
                    {{ scope.row.SystemDisk.DiskSize + " GB" }}
                </template>
            </el-table-column>
            <el-table-column prop="PublicAddresses" label="外网 IP" min-width="120" />
            <el-table-column label="到期时间" min-width="100">
                <template #default="scope">
                    {{ dateFormat(scope.row.ExpiredTime, "yyyy-MM-dd") }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="boundMachineList[scope.row.InstanceId]" link icon="View"
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
