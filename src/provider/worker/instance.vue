<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { MachineItem } from "@/api/local/machine"
import { WorkerItem } from "@/api/local/workhub"

import { bytesToSize } from "@/helper/format"

@Component
export default class WorkerInstance extends Vue {
    public bytesToSize = bytesToSize

    @Prop
    public meta!: Omit<MachineItem, "CloudMeta"> & {
        CloudMeta: WorkerItem
    }

    public instance!: WorkerItem

    public created() {
        this.instance = this.meta.CloudMeta
    }
}
</script>

<template>
    <el-card v-if="instance" shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>实例信息</b>
            </div>
        </template>
        <el-descriptions :column="2" border>
            <el-descriptions-item label="实例ID" :span="2">
                {{ instance.HostId }}
            </el-descriptions-item>
            <el-descriptions-item label="实例名">
                {{ instance.SystemStat.HostName }}
            </el-descriptions-item>
            <el-descriptions-item label="CPU">
                {{ instance.SystemStat.CpuCore }} 核
            </el-descriptions-item>
            <el-descriptions-item label="内存">
                {{ bytesToSize(instance.SystemStat.MemoryTotal) }} GB
            </el-descriptions-item>
            <el-descriptions-item label="系统盘">
                {{ bytesToSize(instance.SystemStat.DiskTotal) }} GB
            </el-descriptions-item>
            <el-descriptions-item label="IP 地址">
                {{ instance.RemoteAddr }}
            </el-descriptions-item>
            <el-descriptions-item label="操作系统">
                {{ instance.SystemStat.OS }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>