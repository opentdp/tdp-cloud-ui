<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import layoutStore from "@/store/layout"
import sessionStore from "@/store/session"

@Component
export default class LayoutHeader extends Vue {
    public layout = layoutStore()
    public session = sessionStore()

    // 初始化

    public created() {
        if (document.body.clientWidth < 1000) {
            this.layout.setCollapse(true)
        }
    }

    // 侧边栏折叠
    public collapseChange() {
        this.layout.setCollapse(!this.layout.Collapse)
    }

    // 用户名下拉菜单选择事件
    public get userDropdown() {
        return [
            {
                content: '个人资料',
                value: "profile",
                onClick: () => {
                    this.$router.push({ name: "passport-profile" })
                }
            },
            {
                content: '清理缓存',
                value: "delcache",
                onClick: () => {
                    NaApi.cache.clear()
                    location.reload()
                }
            },
            {
                content: '退出登录',
                value: "loginout",
                onClick: () => {
                    this.session.$reset()
                    this.$router.push({ name: "passport-login" })
                }
            },
        ]
    }
}
</script>

<template>
    <t-head-menu>
        <template #logo>
            <div class="collapse-btn" @click="collapseChange">
                <t-icon v-if="layout.Collapse" name="menu-fold" :size="30" />
                <t-icon v-else name="menu-unfold" :size="30" />
            </div>
        </template>
        <template #operations>
            <!-- 用户头像 -->
            <div class="user-avator">
                <img src="@/assets/img/avatar.jpg">
            </div>
            <!-- 用户名下拉菜单 -->
            <t-dropdown :options="userDropdown">
                <t-link theme="default">
                    {{ session.Username }}
                    <template #suffix-icon>
                        <t-icon name="chevron-down" size="16" />
                    </template>
                </t-link>
            </t-dropdown>
        </template>
    </t-head-menu>
</template>

<style lang="scss" scoped>
.collapse-btn {
    cursor: pointer;
}

.user-avator {
    margin-right: 16px;
}

.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>
