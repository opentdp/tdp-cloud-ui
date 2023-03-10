<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { MachineItem } from "@/api/native/machine"

import { bytesToSize, dateFormat } from "@/helper/format"

import StatChart from "./stat_chart.vue"

@Component({
    components: { StatChart }
})
export default class WorkerInstance extends Vue {
    public bytesToSize = bytesToSize
    public dateFormat = dateFormat

    @Prop
    public machine!: MachineItem
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-card>
            <StatChart :id="machine.WorkerId" />
        </t-card>

        <t-card title="实例信息" hover-shadow header-bordered>
            <el-descriptions v-if="machine.WorkerMeta" :column="1" border>
                <el-descriptions-item label="实例ID" :span="2">
                    {{ machine.WorkerMeta.HostId }}
                </el-descriptions-item>
                <el-descriptions-item label="主机名">
                    {{ machine.WorkerMeta.HostName }}
                </el-descriptions-item>
                <el-descriptions-item label="CPU 核心">
                    内核：{{ machine.WorkerMeta.CpuCore }}，逻辑处理器：{{ machine.WorkerMeta.CpuCoreLogic }}
                </el-descriptions-item>
                <el-descriptions-item label="内存">
                    {{ bytesToSize(machine.WorkerMeta.MemoryTotal) }}
                </el-descriptions-item>
                <el-descriptions-item label="操作系统">
                    {{ machine.WorkerMeta.Platform }}（{{ machine.WorkerMeta.KernelArch }}）
                </el-descriptions-item>
                <el-descriptions-item label="公网 IP">
                    {{ machine.WorkerMeta.IpAddress }}
                </el-descriptions-item>
                <el-descriptions-item label="上次同步">
                    {{ dateFormat(machine.WorkerMeta.CreateAt * 1000, "yyyy-MM-dd hh:mm:ss") }}
                </el-descriptions-item>
            </el-descriptions>
        </t-card>
    </t-space>
</template>