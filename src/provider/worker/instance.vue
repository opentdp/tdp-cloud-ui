<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { MachineItem } from "@/api/native/machine"
import { WorkerMeta } from "@/api/native/workhub"

import { bytesToSize } from "@/helper/format"

@Component
export default class WorkerInstance extends Vue {
    public bytesToSize = bytesToSize

    @Prop
    public machine!: Omit<MachineItem, "WorkerMeta"> & {
        WorkerMeta: WorkerMeta
    }
}
</script>

<template>
    <el-card v-if="machine" shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>实例信息</b>
            </div>
        </template>
        <el-descriptions :column="2" border>
            <el-descriptions-item label="实例ID" :span="2">
                {{ machine.WorkerMeta.HostId }}
            </el-descriptions-item>
            <el-descriptions-item label="实例名">
                {{ machine.WorkerMeta.HostName }}
            </el-descriptions-item>
            <el-descriptions-item label="CPU">
                {{ machine.WorkerMeta.CpuCore }} 核
            </el-descriptions-item>
            <el-descriptions-item label="内存">
                {{ bytesToSize(machine.WorkerMeta.MemoryTotal) }}
            </el-descriptions-item>
            <el-descriptions-item label="系统盘">
                {{ bytesToSize(machine.WorkerMeta.DiskTotal) }}
            </el-descriptions-item>
            <el-descriptions-item label="公网 IP">
                {{ machine.WorkerMeta.IpAddress }}
            </el-descriptions-item>
            <el-descriptions-item label="操作系统">
                {{ machine.WorkerMeta.OS }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>