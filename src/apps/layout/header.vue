<script lang="ts">
import { Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';

@Component
export default class LayoutHeader extends Vue {
    // 侧边栏折叠
    public collapseChange() {
        this.layout.setCollapse(!this.layout.Collapse);
    }

    // 切换主题模式
    public themeModeChange() {
        const mode = this.layout.ThemeMode == 'dark' ? 'light' : 'dark';
        this.layout.setThemeMode(mode);
    }

    // 用户名下拉菜单
    public get userDropdown() {
        return [
            {
                content: '个人资料',
                value: 'profile',
                onClick: () => {
                    this.$router.push({ name: 'passport-profile' });
                }
            },
            {
                content: '清理缓存',
                value: 'delcache',
                onClick: () => {
                    this.cache.$reset();
                    this.layout.$reset();
                    NaApi.cache.clear();
                    location.reload();
                }
            },
            {
                content: '退出登录',
                value: 'loginout',
                onClick: () => {
                    this.session.$reset();
                    this.$router.push({ name: 'home-index' });
                }
            },
        ];
    }
}
</script>

<template>
    <t-head-menu>
        <template #logo>
            <div class="collapse-btn" @click="collapseChange">
                <t-icon v-if="layout.Collapse" name="menu-fold" size="30" />
                <t-icon v-else name="menu-unfold" size="30" />
            </div>
        </template>
        <template #operations>
            <t-button shape="circle" variant="text" @click="themeModeChange">
                <t-icon v-if="layout.ThemeMode == 'dark'" color="orange" name="sunny" size="20" />
                <t-icon v-else name="moon" size="20" />
            </t-button>
            <t-button shape="circle" variant="text" href="https://github.com/opentdp/tdp-aiart" target="_blank">
                <t-icon name="logo-github" size="20" />
            </t-button>
            <t-dropdown :options="userDropdown">
                <t-button theme="default" variant="text">
                    <t-avatar size="20px" :image="session.Avatar" />
                    &nbsp; {{ session.Username }}
                    <template #suffix>
                        <t-icon name="chevron-down" size="16" />
                    </template>
                </t-button>
            </t-dropdown>
        </template>
    </t-head-menu>
</template>

<style lang="scss" scoped>
.collapse-btn {
    cursor: pointer;
}
</style>
