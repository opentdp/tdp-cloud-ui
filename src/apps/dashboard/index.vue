<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { UserSummary } from "@/api/native/passport"

import sessionStore from "@/store/session"

import SysLoad from "@/provider/worker/sys_load.vue"
import SysInfo from "@/provider/worker/sys_info.vue"

@Component({
    components: { SysLoad, SysInfo }
})
export default class DashboardIndex extends Vue {
    public session = sessionStore()

    // 初始化

    public created() {
        this.getUserSummary()
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
        <t-card :loading="!summary" title="资源统计" hover-shadow header-bordered>
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
                <t-card v-route="'/certbot/list'" class="summary" hover-shadow>
                    <div>证书</div>
                    <b>{{ summary.Certjob }}</b>
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

        <t-card v-if="session.UserLevel == 1" title="系统负载" hover-shadow header-bordered>
            <SysLoad id="host" />
        </t-card>

        <t-card v-if="session.UserLevel == 1" title="系统信息" hover-shadow header-bordered>
            <SysInfo id="host" />
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
