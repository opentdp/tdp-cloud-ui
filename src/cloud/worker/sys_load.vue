<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { NodeDetail } from '@/api/native/workhub';

import { bytesToSize, dateFormat } from '@/helper/format';

@Component
export default class WorkerSysLoad extends Vue {
    public bytesToSize = bytesToSize;
    public dateFormat = dateFormat;

    public timer = 0;

    @Prop
    public id!: string;

    // 初始化

    public created() {
        this.getDetailStat();
        this.timer = setInterval(() => {
            this.getDetailStat();
        }, 5000);
    }

    public unmounted() {
        clearInterval(this.timer);
    }

    // 获取系统信息

    public data!: NodeDetail;

    async getDetailStat() {
        this.loading = true;
        const res = await NaApi.workhub.detail(this.id);
        this.data = res || {};
        this.updateConfig();
        this.loading = false;
    }

    // 计算统计信息

    public chart = {
        cpuPercent: 0,
        cpuColor: '#2ba471',
        memoryPercent: 0,
        memoryColor: '#2ba471',
        diskPercent: 0,
        diskColor: '#2ba471',
        swapPercent: 0,
        swapColor: '#2ba471',
    };

    public updateConfig() {
        const stat = this.data.Stat;
        if (stat.CpuPercent) {
            this.chart.cpuPercent = Math.round(
                stat.CpuPercent.reduce((a, b) => a + b, 0) / stat.CpuPercent.length
            );
            if (this.chart.cpuPercent > 80) {
                this.chart.memoryColor = '#d54941';
            } else if (this.chart.cpuPercent > 50) {
                this.chart.memoryColor = '#e37318';
            }
        }
        if (stat.MemoryTotal > 0) {
            this.chart.memoryPercent = Math.round(stat.MemoryUsed / stat.MemoryTotal * 100);
            if (this.chart.memoryPercent > 80) {
                this.chart.memoryColor = '#d54941';
            } else if (this.chart.memoryPercent > 50) {
                this.chart.memoryColor = '#e37318';
            }
        }
        if (stat.SwapTotal > 0) {
            this.chart.swapPercent = Math.round(stat.SwapUsed / stat.SwapTotal * 100);
            if (this.chart.swapPercent > 80) {
                this.chart.swapColor = '#d54941';
            } else if (this.chart.swapPercent > 50) {
                this.chart.swapColor = '#e37318';
            }
        }
        if (stat.DiskTotal > 0) {
            this.chart.diskPercent = Math.round(stat.DiskUsed / stat.DiskTotal * 100);
            if (this.chart.diskPercent > 80) {
                this.chart.diskColor = '#d54941';
            } else if (this.chart.diskPercent > 50) {
                this.chart.diskColor = '#e37318';
            }
        }
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-card title="系统负载" hover-shadow header-bordered>
            <template #actions>
                <t-loading v-if="loading" size="small" />
            </template>
            <t-space v-if="chart.memoryPercent" fixed break-line>
                <t-progress theme="circle" size="135" :percentage="chart.cpuPercent" :color="chart.cpuColor">
                    <template #label>
                        <small>{{ chart.cpuPercent }}%<br>CPU</small>
                    </template>
                </t-progress>
                <t-progress theme="circle" size="135" :percentage="chart.memoryPercent" :color="chart.memoryColor">
                    <template #label>
                        <small>{{ chart.memoryPercent }}%<br>内存</small>
                    </template>
                </t-progress>
                <t-progress theme="circle" size="135" :percentage="chart.swapPercent" :color="chart.swapColor">
                    <template #label>
                        <small>{{ chart.swapPercent }}%<br>Swap</small>
                    </template>
                </t-progress>
                <t-progress theme="circle" size="135" :percentage="chart.diskPercent" :color="chart.diskColor">
                    <template #label>
                        <small>{{ chart.diskPercent }}%<br>硬盘</small>
                    </template>
                </t-progress>
            </t-space>
        </t-card>
        <t-card title="Go 内存" hover-shadow header-bordered>
            <template #actions>
                <t-loading v-if="loading" size="small" />
            </template>
            <t-list v-if="data?.MemStat" :split="true">
                <t-list-item>
                    <b>累计分配</b>
                    <span>{{ bytesToSize(data.MemStat.TotalAlloc) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>申请总量</b>
                    <span>{{ bytesToSize(data.MemStat.Sys) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>堆已使用</b>
                    <span>{{ bytesToSize(data.MemStat.HeapInuse) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>堆已申请</b>
                    <span>{{ bytesToSize(data.MemStat.HeapSys) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>栈已使用</b>
                    <span>{{ bytesToSize(data.MemStat.StackInuse) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>栈已申请</b>
                    <span>{{ bytesToSize(data.MemStat.StackSys) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>GC 次数</b>
                    <span>{{ data.MemStat.NumGC }}</span>
                </t-list-item>
                <t-list-item>
                    <b>上次 GC 时间</b>
                    <span>{{ dateFormat(data.MemStat.LastGC * 1000, "yyyy-MM-dd hh:mm:ss") }}</span>
                </t-list-item>
                <t-list-item>
                    <b>Goroutine 数量</b>
                    <span>{{ data.NumGoroutine }}</span>
                </t-list-item>
            </t-list>
        </t-card>
    </t-space>
</template>
