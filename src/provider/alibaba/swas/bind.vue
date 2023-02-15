<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator";

import { NaApi, AcApi } from "@/api";
import { MachineItem } from "@/api/native/machine";

import { dateFormat } from "@/helper/format";

@Component({
    emits: ["change"],
})
export default class SwasBind extends Vue {
    public dateFormat = dateFormat;

    public loading = 1;

    @Prop
    public vendorId = 0;

    @Prop
    public boundList: Record<string, MachineItem> = {};

    // 初始化

    public created() {
        AcApi.vendor(this.vendorId);
        this.getRegionInstanceList();
    }

    // 获取列表

    public regionList = {};

    public instanceList = [];
    public instanceCount = 0;

    async getRegionInstanceList() {
        const res = await AcApi.swas.describeRegions();
        this.loading = res.TotalCount;
        res.Regions.forEach(async (item: any) => {
            const regionId = item?.RegionId || "";
            const { LocalName } = item;

            this.regionList = {
                ...this.regionList,
                [regionId]: regionId,
            };
            // 获取当前大区实例
            const rs2 = await AcApi.swas.describeInstances(regionId);
            const { TotalCount, Instances } = rs2;
            if (TotalCount && Instances) {
                const temp = Instances.map((i: any) => ({
                    ...i,
                    RegionName: LocalName,
                }));
                this.instanceList = this.instanceList.concat(temp);
                this.instanceCount += rs2.TotalCount;
                console.log("this.instanceList", temp, this.instanceList);
            }
            this.loading--;
        });
    }

    // 执行脚本

    async runCommand(instance: any, code: string) {
        const region = instance.RegionId.replace(/-(\d+)$/, "");
        const res = await AcApi.tat.runCommand(region, {
            InstanceIds: [instance.InstanceId],
            Content: code,
        });
        const rs2 = AcApi.tat.describeInvocations(region, {
            InvocationIds: [res.InvocationId],
        });
        console.log(rs2);
    }

    // 绑定主机

    async bindMachine(item: any) {
        const rand = Date.now() + "-" + Math.round(Math.random() * 1000 + 1000);
        await NaApi.machine.create({
            VendorId: this.vendorId,
            HostName: item.InstanceName || "",
            IpAddress: item.PublicIpAddress,
            OSType: this.parseOSType(item.OsName),
            Region: item.RegionName,
            Model: "alibaba/swas",
            CloudId: item.InstanceId,
            CloudMeta: item,
            WorkerId: "rand-" + rand,
            WorkerMeta: {},
            Description: "",
            Status: 1,
        });
        this.$emit("change");
    }

    // 同步主机

    public syncMachine(item: any) {
        const bd = this.boundList[item.InstanceId];
        NaApi.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: item.InstanceName,
            IpAddress: item.PublicIpAddress,
            OSType: this.parseOSType(item.OsName),
            Region: item.RegionId,
            CloudId: item.InstanceId,
            CloudMeta: item,
        });
    }

    // 系统类型

    public parseOSType(s: string) {
        return /windows/i.test(s) ? "windows" : "linux";
    }

    // 转换为GB显示

    public parseToGB(s: string) {
        return s ? (parseInt(s) / 1024).toFixed(2) + " GB" : "--";
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
        <el-table
            v-loading="loading && instanceList.length == 0"
            :data="instanceList"
            table-layout="fixed"
        >
            <el-table-column
                prop="InstanceName"
                label="名称"
                show-overflow-tooltip
                fixed
            />
            <el-table-column label="地域" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.RegionName }}
                </template>
            </el-table-column>
            <el-table-column label="CPU" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.CPU || "--" }}
                </template>
            </el-table-column>
            <el-table-column label="内存" show-overflow-tooltip>
                <template #default="scope">
                    {{ parseToGB(scope.row.Memory) }}
                </template>
            </el-table-column>
            <el-table-column label="系统盘" show-overflow-tooltip>
                <template #default="scope">
                    {{ parseToGB(scope.row?.SystemDisk?.DiskSize) }}
                </template>
            </el-table-column>
            <el-table-column label="到期时间" show-overflow-tooltip>
                <template #default="scope">
                    {{ dateFormat(scope.row.ExpiredTime, "yyyy-MM-dd") }}
                </template>
            </el-table-column>

            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button
                        v-if="boundList[scope.row.InstanceId]"
                        link
                        icon="View"
                        @click="syncMachine(scope.row)"
                    >
                        同步
                    </el-button>
                    <el-button
                        v-else
                        link
                        type="primary"
                        icon="View"
                        @click="bindMachine(scope.row)"
                    >
                        导入
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
