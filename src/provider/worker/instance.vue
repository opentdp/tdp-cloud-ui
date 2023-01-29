<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { MachineItem } from "@/api/local/machine"
import { WorkerMeta } from "@/api/local/workhub"

import { bytesToSize } from "@/helper/format"

@Component
export default class WorkerInstance extends Vue {
    public bytesToSize = bytesToSize

    @Prop
    public meta!: Omit<MachineItem, "WorkerMeta"> & {
        WorkerMeta: WorkerMeta
    }
}
</script>

<template>
    <el-card v-if="meta" shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>实例信息</b>
            </div>
        </template>
        <el-descriptions :column="2" border>
            <el-descriptions-item label="实例ID" :span="2">
                {{ meta.WorkerMeta.HostId }}
            </el-descriptions-item>
            <el-descriptions-item label="实例名">
                {{ meta.WorkerMeta.HostName }}
            </el-descriptions-item>
            <el-descriptions-item label="CPU">
                {{ meta.WorkerMeta.CpuCore }} 核
            </el-descriptions-item>
            <el-descriptions-item label="内存">
                {{ bytesToSize(meta.WorkerMeta.MemoryTotal) }} GB
            </el-descriptions-item>
            <el-descriptions-item label="系统盘">
                {{ bytesToSize(meta.WorkerMeta.DiskTotal) }} GB
            </el-descriptions-item>
            <el-descriptions-item label="IP 地址">
                {{ meta.WorkerMeta.IpAddress }}
            </el-descriptions-item>
            <el-descriptions-item label="操作系统">
                {{ meta.WorkerMeta.OS }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>