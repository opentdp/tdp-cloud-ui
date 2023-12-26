<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { DetailStat } from '@/api/native/typings';

import { bytesToSize } from '@/helper/format';

@Component
export default class WorkerSysInfo extends Vue {
    public bytesToSize = bytesToSize;

    @Prop
    public id!: string;

    // 初始化

    public created() {
        this.getDetailStat();
    }

    // 获取系统信息

    public stat!: DetailStat;

    async getDetailStat() {
        this.loading = true;
        const res = await NaApi.workhub.detail(this.id);
        this.stat = res.Stat;
        this.loading = false;
    }
}
</script>

<template>
    <t-card title="系统信息" hover-shadow header-bordered>
        <template #actions>
            <t-loading v-if="loading" size="small" />
        </template>
        <t-list v-if="stat" :split="true">
            <t-list-item>
                <b>主机名</b>
                <span>{{ stat.HostName }}</span>
            </t-list-item>
            <t-list-item>
                <b>CPU 型号</b>
                <span>{{ stat.CpuModel[0] }}</span>
            </t-list-item>
            <t-list-item>
                <b>CPU 核心</b>
                <span>内核：{{ stat.CpuCore }}，逻辑处理器：{{ stat.CpuCoreLogic }}</span>
            </t-list-item>
            <t-list-item>
                <b>内存</b>
                <span>{{ bytesToSize(stat.MemoryTotal) }}</span>
            </t-list-item>
            <t-list-item>
                <b>虚拟内存</b>
                <span>{{ bytesToSize(stat.SwapTotal) }}</span>
            </t-list-item>
            <t-list-item>
                <b>硬盘容量</b>
                <span>{{ bytesToSize(stat.DiskTotal) }}</span>
            </t-list-item>
            <t-list-item>
                <b>操作系统</b>
                <span>{{ stat.Platform }}（{{ stat.KernelArch }}）</span>
            </t-list-item>
            <t-list-item>
                <b>运行时长</b>
                <span>{{ (stat.Uptime / 86400).toFixed(1) }} 天</span>
            </t-list-item>
            <t-list-item>
                <b>公网 IP</b>
                <span class="text-right">
                    <div v-if="stat.PublicIpv4">{{ stat.PublicIpv4 }}</div>
                    <div v-if="stat.PublicIpv6">{{ stat.PublicIpv6 }}</div>
                </span>
            </t-list-item>
        </t-list>
    </t-card>
</template>
