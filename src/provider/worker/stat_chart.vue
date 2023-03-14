<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { DetailStat } from "@/api/native/typings"

@Component
export default class WorkerStatChart extends Vue {
    public loading = true
    public timer = 0

    @Prop
    public id!: string

    // 初始化

    public created() {
        this.getDetailStat()
        this.timer = setInterval(() => {
            this.getDetailStat()
        }, 5000)
    }

    public unmounted() {
        clearInterval(this.timer)
    }

    // 获取系统信息

    public statDetail!: DetailStat

    async getDetailStat() {
        if (this.id === "host") {
            const res = await NaApi.workhub.host()
            this.statDetail = res.Stat
        } else if (this.id) {
            const res = await NaApi.workhub.stat(this.id)
            this.statDetail = res
        }
        this.updateConfig()
        this.loading = false
    }

    // 计算统计信息

    public stat = {
        cpuPercent: 0,
        cpuColor: "#2ba471",
        memoryPercent: 0,
        memoryColor: "#2ba471",
        diskPercent: 0,
        diskColor: "#2ba471",
        swapPercent: 0,
        swapColor: "#2ba471",
    }

    public updateConfig() {
        const stat = this.statDetail
        if (stat.CpuPercent) {
            this.stat.cpuPercent = Math.round(
                stat.CpuPercent.reduce((a, b) => a + b, 0) / stat.CpuPercent.length
            )
            if (this.stat.cpuPercent > 80) {
                this.stat.memoryColor = "#d54941"
            } else if (this.stat.cpuPercent > 50) {
                this.stat.memoryColor = "#e37318"
            }
        }
        if (stat.MemoryTotal > 0) {
            this.stat.memoryPercent = Math.round(stat.MemoryUsed / stat.MemoryTotal * 100)
            if (this.stat.memoryPercent > 80) {
                this.stat.memoryColor = "#d54941"
            } else if (this.stat.memoryPercent > 50) {
                this.stat.memoryColor = "#e37318"
            }
        }
        if (stat.SwapTotal > 0) {
            this.stat.swapPercent = Math.round(stat.SwapUsed / stat.SwapTotal * 100)
            if (this.stat.swapPercent > 80) {
                this.stat.swapColor = "#d54941"
            } else if (this.stat.swapPercent > 50) {
                this.stat.swapColor = "#e37318"
            }
        }
        if (stat.DiskTotal > 0) {
            this.stat.diskPercent = Math.round(stat.DiskUsed / stat.DiskTotal * 100)
            if (this.stat.diskPercent > 80) {
                this.stat.diskColor = "#d54941"
            } else if (this.stat.diskPercent > 50) {
                this.stat.diskColor = "#e37318"
            }
        }
    }
}
</script>

<template>
    <t-space v-loading="loading" fixed break-line>
        <t-progress theme="circle" size="135" :percentage="stat.cpuPercent" :color="stat.cpuColor">
            <template #label>
                <small>{{ stat.cpuPercent }}%<br>CPU</small>
            </template>
        </t-progress>
        <t-progress theme="circle" size="135" :percentage="stat.memoryPercent" :color="stat.memoryColor">
            <template #label>
                <small>{{ stat.memoryPercent }}%<br>内存</small>
            </template>
        </t-progress>
        <t-progress theme="circle" size="135" :percentage="stat.swapPercent" :color="stat.swapColor">
            <template #label>
                <small>{{ stat.swapPercent }}%<br>Swap</small>
            </template>
        </t-progress>
        <t-progress theme="circle" size="135" :percentage="stat.diskPercent" :color="stat.diskColor">
            <template #label>
                <small>{{ stat.diskPercent }}%<br>硬盘</small>
            </template>
        </t-progress>
    </t-space>
</template>
