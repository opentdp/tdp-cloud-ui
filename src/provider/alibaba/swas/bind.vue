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
    public meta!: {
        vendorId: number;
        boundList: Record<string, MachineItem>;
    }

    // 初始化

    public created() {
        AcApi.vendor(this.meta.vendorId)
        this.getRegionInstanceList()
    }

    // 获取列表

    public regionList = {}

    public instanceList = []
    public instanceCount = 0

    async getRegionInstanceList() {
        const res = await AcApi.swas.describeRegions()
        console.log("res", res)
        this.loading = res.TotalCount
        // res.Regions.Region.forEach(async (item: any) => {
        // const regionId = item?.RegionId || "";
        // const { LocalName } = item;
        const regionId = "cn-beijing"
        const LocalName = "华北2（北京）"

        this.regionList = {
            ...this.regionList,
            [regionId]: regionId,
        }
        // 获取当前大区实例
        const rs2 = await AcApi.swas.describeInstances(regionId)
        const {
            TotalCount,
            Instances: { Instance },
        } = rs2
        if (TotalCount && Instance) {
            const temp = Instance.map((i: any) => ({
                ...i,
                RegionName: LocalName,
            }))
            this.instanceList = this.instanceList.concat(temp)
            this.instanceCount += rs2.TotalCount
            console.log("this.instanceList", temp, this.instanceList)
        }
        this.loading--
        // });
    }

    // 执行脚本

    async runCommand(instance: any, code: string) {
        //
    }

    // 绑定主机

    async bindMachine(item: any) {
        const rand = Date.now() + "-" + Math.round(Math.random() * 1000 + 1000)
        // await NaApi.machine.create({
        //     VendorId: this.meta.vendorId,
        //     HostName: item.InstanceName || "",
        //     IpAddress: item.PublicIpAddresses[0],
        //     OSType: this.parseOSType(item.OsName),
        //     Region: this.parseRegion(item.Placement.Zone),
        //     Model: "tencent/cvm",
        //     CloudId: item.InstanceId,
        //     CloudMeta: item,
        //     WorkerId: "rand-" + rand,
        //     WorkerMeta: {},
        //     Description: "",
        //     Status: 1,
        // });
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
        尚未实现111
    </el-card>
</template>
