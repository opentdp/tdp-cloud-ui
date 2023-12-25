<script lang="ts">
import { Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { VersionInfo } from '@/api/native/upgrade';
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
        if (this.session.Level == 1) {
            this.checkUpgrade();
        }
    }

    // 资源统计

    public summary!: UserSummary;

    async getUserSummary() {
        const res = await NaApi.passport.summary();
        this.summary = res;
    }

    // 在线更新

    public upgrading = false;
    public versionInfo!: VersionInfo;

    async checkUpgrade() {
        const res = await NaApi.upgrade.check();
        if (res.Package.startsWith('https://')) {
            this.versionInfo = res;
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

        <SysLoad v-if="session.Level == 1" id="host" />
        <SysInfo v-if="session.Level == 1" id="host" />

        <t-card :loading="!summary" title="编译信息" hover-shadow header-bordered>
            <t-list :split="true">
                <t-list-item>
                    <b>后端版本</b>
                    <span>Version {{ layout.Version }}, Build {{ layout.BuildVersion }}</span>
                </t-list-item>
                <t-list-item>
                    <b>前端版本</b>
                    <span>Version {{ layout.UIVersion }}, Build {{ layout.UIBuildVersion }}</span>
                </t-list-item>
            </t-list>
            <t-collapse v-if="versionInfo" class="new-version">
                <t-collapse-panel value="0">
                    <template #header>
                        检测到新版本 Version {{ versionInfo.Version }}
                    </template>
                    <template #headerRightContent>
                        <t-button theme="primary" shape="round" variant="outline" :loading="upgrading" @click="applyUpgrade">
                            立即更新
                        </t-button>
                    </template>
                    <pre>{{ versionInfo.Release }}</pre>
                </t-collapse-panel>
            </t-collapse>
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

.new-version {
    margin-top: 10px;
}
</style>
