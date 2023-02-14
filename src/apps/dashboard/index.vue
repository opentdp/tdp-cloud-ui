<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { UserSummary } from "@/api/native/passport"
import { HostDetail } from "@/api/native/workhub"

import { bytesToSize } from "@/helper/format"

@Component
export default class DashboardIndex extends Vue {
    public bytesToSize = bytesToSize

    public timer = 0

    // 初始化

    public created() {
        this.getHostDetail()
        this.getUserSummary()
        this.timer = setInterval(() => {
            this.getHostDetail()
        }, 5000)
    }

    public unmounted() {
        clearInterval(this.timer)
    }

    // 系统信息

    public server!: HostDetail

    async getHostDetail() {
        const res = await NaApi.workhub.host()
        this.server = res
        if (res.HostInfo.CpuPercent) {
            this.setCpuUsedChartConfig(res.HostInfo.CpuPercent)
        }
        if (res.HostInfo.MemoryTotal > 0) {
            this.setMemUsedChartConfig(res.HostInfo.MemoryUsed, res.HostInfo.MemoryTotal)
        }
        if (res.HostInfo.SwapTotal > 0) {
            this.setSwapUsedChartConfig(res.HostInfo.SwapUsed, res.HostInfo.SwapTotal)
        }
        if (res.HostInfo.DiskTotal > 0) {
            this.setDiskUsedChartConfig(res.HostInfo.DiskUsed, res.HostInfo.DiskTotal)
        }
    }

    // 资源统计

    public summary!: UserSummary

    async getUserSummary() {
        const res = await NaApi.passport.summary()
        this.summary = res
    }

    // CPU 实时负载

    public cpuUsedChart!: typeof GaugeOption

    public setCpuUsedChartConfig(cpus: number[]) {
        if (this.cpuUsedChart == null) {
            this.cpuUsedChart = JSON.parse(JSON.stringify(GaugeOption))
        }
        let value = 0
        cpus.map(v => value += v)
        value = Math.round(value)
        this.cpuUsedChart.series.data[0].name = "CPU"
        this.cpuUsedChart.series.data[0].value = value
        this.cpuUsedChart.series.progress.itemStyle.color = this.barColor(value)
    }

    // 内存实时用量

    public memUsedChart!: typeof GaugeOption

    public setMemUsedChartConfig(used: number, total: number) {
        if (this.memUsedChart == null) {
            this.memUsedChart = JSON.parse(JSON.stringify(GaugeOption))
        }
        const value = Math.round(used / total * 100)
        this.memUsedChart.series.data[0].name = "内存"
        this.memUsedChart.series.data[0].value = value
        this.memUsedChart.series.progress.itemStyle.color = this.barColor(value)
    }

    // Swap实时用量

    public swapUsedChart!: typeof GaugeOption

    public setSwapUsedChartConfig(used: number, total: number) {
        if (this.swapUsedChart == null) {
            this.swapUsedChart = JSON.parse(JSON.stringify(GaugeOption))
        }
        const value = Math.round(used / total * 100)
        this.swapUsedChart.series.data[0].name = "Swap"
        this.swapUsedChart.series.data[0].value = value
        this.swapUsedChart.series.progress.itemStyle.color = this.barColor(value)
    }

    // 硬盘实时用量

    public diskUsedChart!: typeof GaugeOption

    public setDiskUsedChartConfig(used: number, total: number) {
        if (this.diskUsedChart == null) {
            this.diskUsedChart = JSON.parse(JSON.stringify(GaugeOption))
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

const GaugeOption = {
    series: {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        axisLabel: {
            show: false
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: false
        },
        pointer: {
            show: false
        },
        progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
                color: "#529b2e"
            }
        },
        detail: {
            fontSize: 14,
            color: 'inherit',
            formatter: '{value}%'
        },
        data: [
            {
                name: '内存',
                value: 20,
                title: {
                    offsetCenter: ['0%', '15%']
                },
                detail: {
                    valueAnimation: true,
                    offsetCenter: ['0%', '-10%']
                }
            }
        ]
    }
}
</script>

<template>
    <div :loading="!server && !summary">
        <el-card v-if="server">
            <div class="chart-list">
                <v-chart class="chart" :option="cpuUsedChart" />
                <v-chart class="chart" :option="memUsedChart" />
                <v-chart class="chart" :option="swapUsedChart" />
                <v-chart class="chart" :option="diskUsedChart" />
            </div>
        </el-card>
        <div class="space-10" />
        <el-card v-if="summary" class="box-card">
            <template #header>
                <div>资源统计</div>
            </template>
            <el-space wrap>
                <el-card shadow="hover" class="info-card">
                    <div>厂商</div>
                    <b>{{ summary.Vendor }}</b>
                </el-card>
                <el-card shadow="hover" class="info-card">
                    <div>主机</div>
                    <b>{{ summary.Machine }}</b>
                </el-card>
                <el-card shadow="hover" class="info-card">
                    <div>域名</div>
                    <b>{{ summary.Domain }}</b>
                </el-card>
                <el-card shadow="hover" class="info-card">
                    <div>密钥</div>
                    <b>{{ summary.Keypair }}</b>
                </el-card>
                <el-card shadow="hover" class="info-card">
                    <div>脚本</div>
                    <b>{{ summary.Script }}</b>
                </el-card>
            </el-space>
        </el-card>
        <div class="space-10" />
        <el-card v-if="server" class="box-card">
            <template #header>
                <div>系统信息</div>
            </template>
            <el-descriptions :column="1" border>
                <el-descriptions-item label="主机名">
                    {{ server.HostInfo.HostName }}
                </el-descriptions-item>
                <el-descriptions-item label="处理器">
                    {{ server.HostInfo.CpuCore }} 核，{{ server.HostInfo.CpuModel[0] }}
                </el-descriptions-item>
                <el-descriptions-item label="内存">
                    {{ bytesToSize(server.HostInfo.MemoryTotal) }}
                </el-descriptions-item>
                <el-descriptions-item label="虚拟内存">
                    {{ bytesToSize(server.HostInfo.SwapTotal) }}
                </el-descriptions-item>
                <el-descriptions-item label="硬盘容量">
                    {{ bytesToSize(server.HostInfo.DiskTotal) }}
                </el-descriptions-item>
                <el-descriptions-item label="操作系统">
                    {{ server.HostInfo.Platform }}（{{ server.HostInfo.KernelArch }}）
                </el-descriptions-item>
                <el-descriptions-item label="运行时长">
                    {{ (server.HostInfo.Uptime / 86400).toFixed(1) }} 天
                </el-descriptions-item>
                <el-descriptions-item label="公网 IP">
                    {{ server.HostInfo.IpAddress }}
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.info-card {
    min-width: 150px;
    text-align: center;
    background-color: var(--el-color-info-light-9);
    color: var(--el-color-info-light-3);

    div {
        margin-bottom: 10px;
    }

    b {
        color: var(--el-color-primary-dark-2);
        font-size: 2em;
    }
}

.chart-list {
    display: flex;
    flex-wrap: wrap;

    .chart {
        width: 200px;
        height: 200px;
    }
}
</style>
