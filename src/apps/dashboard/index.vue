<script lang="ts">
import { Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { UserSummary } from '@/api/native/passport';

import SysLoad from '@/cloud/worker/sys_load.vue';
import SysInfo from '@/cloud/worker/sys_info.vue';

@Component({
    components: { SysLoad, SysInfo }
})
export default class DashboardIndex extends Vue {
    // 初始化

    public created() {
        this.getUserSummary();
        this.checkUpgrade();
    }

    // 资源统计

    public summary!: UserSummary;

    async getUserSummary() {
        const res = await NaApi.passport.summary();
        this.summary = res;
    }

    // 在线更新

    public newVersion = '';
    public upgrading = false;

    async checkUpgrade() {
        const res = await NaApi.upgrade.check();
        if (res.Package.startsWith('https://')) {
            this.newVersion = res.Version;
        }
    }

    public applyUpgrade() {
        this.upgrading = true;
        NaApi.upgrade.apply().finally(() => {
            setTimeout(() => location.reload(), 3000);
            this.upgrading = false;
        });
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-alert v-if="newVersion" theme="info" close>
            <template #message>
                检测到新版本 v{{ newVersion }}，在线更新完成后将自动刷新页面。
            </template>
            <template #operation>
                <t-loading v-if="upgrading" size="12px" />
                <span v-else @click="applyUpgrade">立即更新</span>
            </template>
        </t-alert>

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

        <t-card v-if="session.Level == 1" title="系统负载" hover-shadow header-bordered>
            <SysLoad id="host" />
        </t-card>

        <t-card v-if="session.Level == 1" title="系统信息" hover-shadow header-bordered>
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
