<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { UserSummary } from "@/api/native/passport"
import { HostDetail } from "@/api/native/workhub"

import { bytesToSize } from "@/helper/format"

import StatChart from "@/provider/worker/stat_chart.vue"

@Component({
    components: { StatChart }
})
export default class DashboardIndex extends Vue {
    public bytesToSize = bytesToSize

    // 初始化

    public created() {
        this.getHostDetail()
        this.getUserSummary()
    }

    // 系统信息

    public server!: HostDetail

    async getHostDetail() {
        const res = await NaApi.workhub.host()
        this.server = res
    }

    // 资源统计

    public summary!: UserSummary

    async getUserSummary() {
        const res = await NaApi.passport.summary()
        this.summary = res
    }
}
</script>

<template>
    <div v-loading="!server && !summary">
        <StatChart id="host" />
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
                    {{ server.Stat.HostName }}
                </el-descriptions-item>
                <el-descriptions-item label="CPU 型号">
                    {{ server.Stat.CpuModel[0] }}
                </el-descriptions-item>
                <el-descriptions-item label="CPU 核心">
                    内核：{{ server.Stat.CpuCore }}，逻辑处理器：{{ server.Stat.CpuCoreLogic }}
                </el-descriptions-item>
                <el-descriptions-item label="内存">
                    {{ bytesToSize(server.Stat.MemoryTotal) }}
                </el-descriptions-item>
                <el-descriptions-item label="虚拟内存">
                    {{ bytesToSize(server.Stat.SwapTotal) }}
                </el-descriptions-item>
                <el-descriptions-item label="硬盘容量">
                    {{ bytesToSize(server.Stat.DiskTotal) }}
                </el-descriptions-item>
                <el-descriptions-item label="操作系统">
                    {{ server.Stat.Platform }}（{{ server.Stat.KernelArch }}）
                </el-descriptions-item>
                <el-descriptions-item label="运行时长">
                    {{ (server.Stat.Uptime / 86400).toFixed(1) }} 天
                </el-descriptions-item>
                <el-descriptions-item label="公网 IP">
                    {{ server.Stat.IpAddress }}
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
