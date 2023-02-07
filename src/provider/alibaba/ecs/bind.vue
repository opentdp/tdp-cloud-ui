<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"

import { dateFormat } from "@/helper/format"

@Component({
    emits: ["change"]
})
export default class EcsBind extends Vue {
    public dateFormat = dateFormat

    public loading = 1

    @Prop
    public meta!: {
        vendorId: number
        boundList: Record<string, MachineItem>
    }

    // 初始化

    public created() {
    //     TcApi.vendor(this.meta.vendorId)
        this.getRegionInstanceList()
    }

    // 获取列表

    public regionList = {}

    public instanceList = []
    public instanceCount = 0

    async getRegionInstanceList() {
        //
    }

    // 执行脚本

    async runCommand(instance: any, code: string) {
        //
    }

    // 绑定主机

    async bindMachine(item: any) {
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

    public syncMachine(item: any) {
        const bd = this.meta.boundList[item.InstanceId]
        NaApi.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: item.InstanceName,
            IpAddress: item.PublicIpAddresses[0],
            OSType: this.parseOSType(item.OsName),
            Region: item.Placement.Zone,
            CloudId: item.InstanceId,
            CloudMeta: item,
        })
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
        尚未实现
    </el-card>
</template>
