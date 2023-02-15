<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { DetailStat } from "@/api/native/typings"

import { GaugeMonitor } from "@/helper/echarts/gauge"
import { bytesToSize } from "@/helper/format"

@Component
export default class WorkerStatChart extends Vue {
    public bytesToSize = bytesToSize

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

    // 系统信息

    async getDetailStat() {
        if (this.id === "host") {
            const res = await NaApi.workhub.host()
            this.updateConfig(res.Stat)
        } else if (this.id) {
            const res = await NaApi.workhub.stat(this.id)
            this.updateConfig(res)
        }
    }

    async updateConfig(stat: DetailStat) {
        if (stat.CpuPercent) {
            this.setCpuUsedChartConfig(stat.CpuPercent)
        }
        if (stat.MemoryTotal > 0) {
            this.setMemUsedChartConfig(stat.MemoryUsed, stat.MemoryTotal)
        }
        if (stat.SwapTotal > 0) {
            this.setSwapUsedChartConfig(stat.SwapUsed, stat.SwapTotal)
        }
        if (stat.DiskTotal > 0) {
            this.setDiskUsedChartConfig(stat.DiskUsed, stat.DiskTotal)
        }
    }

    // CPU 实时负载

    public cpuUsedChart!: typeof GaugeMonitor

    public setCpuUsedChartConfig(cpus: number[]) {
        if (this.cpuUsedChart == null) {
            this.cpuUsedChart = JSON.parse(JSON.stringify(GaugeMonitor))
        }
        let value = 0
        cpus.map(v => value += v)
        value = Math.round(value)
        this.cpuUsedChart.series.data[0].name = "CPU"
        this.cpuUsedChart.series.data[0].value = value
        this.cpuUsedChart.series.progress.itemStyle.color = this.barColor(value)
    }

    // 内存实时用量

    public memUsedChart!: typeof GaugeMonitor

    public setMemUsedChartConfig(used: number, total: number) {
        if (this.memUsedChart == null) {
            this.memUsedChart = JSON.parse(JSON.stringify(GaugeMonitor))
        }
        const value = Math.round(used / total * 100)
        this.memUsedChart.series.data[0].name = "内存"
        this.memUsedChart.series.data[0].value = value
        this.memUsedChart.series.progress.itemStyle.color = this.barColor(value)
    }

    // Swap实时用量

    public swapUsedChart!: typeof GaugeMonitor

    public setSwapUsedChartConfig(used: number, total: number) {
        if (this.swapUsedChart == null) {
            this.swapUsedChart = JSON.parse(JSON.stringify(GaugeMonitor))
        }
        const value = Math.round(used / total * 100)
        this.swapUsedChart.series.data[0].name = "Swap"
        this.swapUsedChart.series.data[0].value = value
        this.swapUsedChart.series.progress.itemStyle.color = this.barColor(value)
    }

    // 硬盘实时用量

    public diskUsedChart!: typeof GaugeMonitor

    public setDiskUsedChartConfig(used: number, total: number) {
        if (this.diskUsedChart == null) {
            this.diskUsedChart = JSON.parse(JSON.stringify(GaugeMonitor))
        }
        const value = Math.round(used / total * 100)
        this.diskUsedChart.series.data[0].name = "硬盘"
        this.diskUsedChart.series.data[0].value = value
        this.diskUsedChart.series.progress.itemStyle.color = this.barColor(value)
    }

    // 设置颜色

    private barColor(n: number) {
        if (n < 50) {
            return "#529b2e"
        }
        if (n < 75) {
            return "#b88230"
        }
        return "#c45656"
    }
}
</script>

<template>
    <div v-loading="!diskUsedChart" class="chart-list">
        <v-chart class="chart" :option="cpuUsedChart" />
        <v-chart class="chart" :option="memUsedChart" />
        <v-chart class="chart" :option="swapUsedChart" />
        <v-chart class="chart" :option="diskUsedChart" />
    </div>
</template>

<style lang="scss" scoped>
.chart-list {
    display: flex;
    flex-wrap: wrap;

    .chart {
        width: 200px;
        height: 200px;
    }
}
</style>
