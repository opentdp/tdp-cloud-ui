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
    <t-space fixed direction="vertical">
        <t-card>
            <StatChart id="host" />
        </t-card>

        <t-card v-loading="!summary" title="资源统计" hover-shadow header-bordered>
            <t-space v-if="summary" fixed break-line>
                <t-card v-route="'/vendor/tencent'" class="summary" hover-shadow>
                    <div>厂商</div>
                    <b>{{ summary.Vendor }}</b>
                </t-card>
                <t-card v-route="'/machine/list'" class="summary" hover-shadow>
                    <div>主机</div>
                    <b>{{ summary.Machine }}</b>
                </t-card>
                <t-card v-route="'/domain/list'" class="summary" hover-shadow>
                    <div>域名</div>
                    <b>{{ summary.Domain }}</b>
                </t-card>
                <t-card v-route="'/keypair/list'" class="summary" hover-shadow>
                    <div>密钥</div>
                    <b>{{ summary.Keypair }}</b>
                </t-card>
                <t-card v-route="'/script/list'" class="summary" hover-shadow>
                    <div>脚本</div>
                    <b>{{ summary.Script }}</b>
                </t-card>
            </t-space>
        </t-card>

        <t-card v-loading="!server" title="系统信息" hover-shadow header-bordered>
            <t-list v-if="server" :split="true">
                <t-list-item>
                    <b>主机名</b>
                    <span>{{ server.Stat.HostName }}</span>
                </t-list-item>
                <t-list-item>
                    <b>CPU 型号</b>
                    <span>{{ server.Stat.CpuModel[0] }}</span>
                </t-list-item>
                <t-list-item>
                    <b>CPU 核心</b>
                    <span>内核：{{ server.Stat.CpuCore }}，逻辑处理器：{{ server.Stat.CpuCoreLogic }}</span>
                </t-list-item>
                <t-list-item>
                    <b>内存</b>
                    <span>{{ bytesToSize(server.Stat.MemoryTotal) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>虚拟内存</b>
                    <span>{{ bytesToSize(server.Stat.SwapTotal) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>硬盘容量</b>
                    <span>{{ bytesToSize(server.Stat.DiskTotal) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>操作系统</b>
                    <span>{{ server.Stat.Platform }}（{{ server.Stat.KernelArch }}）</span>
                </t-list-item>
                <t-list-item>
                    <b>运行时长</b>
                    <span>{{ (server.Stat.Uptime / 86400).toFixed(1) }} 天</span>
                </t-list-item>
                <t-list-item>
                    <b>公网 IP</b>
                    <span>{{ server.Stat.IpAddress }}</span>
                </t-list-item>
            </t-list>
        </t-card>
    </t-space>
</template>

<style lang="scss" scoped>
.summary {
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
</style>
