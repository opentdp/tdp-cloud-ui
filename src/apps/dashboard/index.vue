<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { EChartsOption } from "echarts"

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
        if (res.HostInfo.MemoryUsed) {
            this.setMemUsedChartConfig(res.HostInfo.MemoryUsed, res.HostInfo.MemoryTotal)
        }
        if (res.HostInfo.DiskUsed) {
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

    public cpuUsedChart!: EChartsOption

    public setCpuUsedChartConfig(cpus: number[]) {
        let value = 0
        cpus.map(v => value += v)
        this.cpuUsedChart = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
                {
                    name: '处理器负载',
                    type: 'gauge',
                    axisLine: {
                        lineStyle: {
                            width: 10,
                            color: [
                                [0.3, '#67e0e3'],
                                [0.7, '#37a2da'],
                                [1, '#fd666d']
                            ]
                        }
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}',
                        fontSize: 20
                    },
                    data: [
                        {
                            name: 'CPU',
                            value: Math.round(value)
                        }
                    ]
                }
            ]
        }
    }

    // 内存实时用量

    public memUsedChart!: EChartsOption

    public setMemUsedChartConfig(used: number, total: number) {
        const value = used / total * 100
        this.memUsedChart = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
                {
                    name: '内存用量',
                    type: 'gauge',
                    axisLine: {
                        lineStyle: {
                            width: 10,
                            color: [
                                [0.3, '#67e0e3'],
                                [0.7, '#37a2da'],
                                [1, '#fd666d']
                            ]
                        }
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}',
                        fontSize: 20
                    },
                    data: [
                        {
                            name: 'Mem',
                            value: Math.round(value)
                        }
                    ]
                }
            ]
        }
    }

    // 硬盘实时用量

    public diskUsedChart!: EChartsOption

    public setDiskUsedChartConfig(used: number, total: number) {
        const value = used / total * 100
        this.diskUsedChart = {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
                {
                    name: '硬盘用量',
                    type: 'gauge',
                    axisLine: {
                        lineStyle: {
                            width: 10,
                            color: [
                                [0.3, '#67e0e3'],
                                [0.7, '#37a2da'],
                                [1, '#fd666d']
                            ]
                        }
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}',
                        fontSize: 20
                    },
                    data: [
                        {
                            name: 'Disk',
                            value: Math.round(value)
                        }
                    ]
                }
            ]
        }
    }

}
</script>

<template>
    <div :loading="!server && !summary">
        <el-card v-if="server">
            <div class="chart-list">
                <v-chart class="chart" :option="cpuUsedChart" />
                <v-chart class="chart" :option="memUsedChart" />
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
                <el-descriptions-item label="实例ID">
                    {{ server.HostInfo.HostId }}
                </el-descriptions-item>
                <el-descriptions-item label="实例名">
                    {{ server.HostInfo.HostName }}
                </el-descriptions-item>
                <el-descriptions-item label="CPU">
                    {{ server.HostInfo.CpuCore }} 核
                </el-descriptions-item>
                <el-descriptions-item label="内存">
                    {{ bytesToSize(server.HostInfo.MemoryTotal) }}
                </el-descriptions-item>
                <el-descriptions-item label="系统盘">
                    {{ bytesToSize(server.HostInfo.DiskTotal) }}
                </el-descriptions-item>
                <el-descriptions-item label="公网 IP">
                    {{ server.HostInfo.IpAddress }}
                </el-descriptions-item>
                <el-descriptions-item label="操作系统">
                    {{ server.HostInfo.Platform }}
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
        width: 300px;
        height: 300px;
    }
}
</style>
