<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import layoutStore from "@/store/layout"
import { onBeforeRouteUpdate, RouteLocationNormalized } from "vue-router"

@Component
export default class LayoutSidebar extends Vue {
    public layout = layoutStore()

    // 菜单列表

    public items: MenuItem[] = [
        {
            icon: "home",
            index: "/dashboard",
            title: "首页",
        },
        {
            icon: "laptop",
            index: "/machine/list",
            title: "主机管理",
        },
        {
            icon: "internet",
            index: "/domain/list",
            title: "域名解析",
        },
        {
            icon: "lock-off",
            index: "/certbot/list",
            title: "SSL 证书",
        },
        {
            icon: "control-platform",
            index: "/task",
            title: "快捷命令",
            subs: [
                {
                    icon: "code",
                    index: "/script/list",
                    title: "脚本管理",
                },
                {
                    icon: "folder-open",
                    index: "/taskline/list",
                    title: "任务记录",
                },
            ]
        },
        {
            icon: "fork",
            index: "/terminal",
            title: "SSH 终端",
            subs: [
                {
                    icon: "fullscreen-exit",
                    index: "/terminal/ssh",
                    title: "SSH 连接",
                },
                {
                    icon: "gift",
                    index: "/keypair/list",
                    title: "密钥管理",
                },
            ]
        },
        {
            icon: "wallet",
            index: "/vendor",
            title: "厂商管理",
            subs: [
                {
                    icon: "cloud",
                    index: "/vendor/tencent",
                    title: "腾讯云",
                },
                {
                    icon: "cloud",
                    index: "/vendor/alibaba",
                    title: "阿里云",
                },
                {
                    icon: "cloud",
                    index: "/vendor/cloudflare",
                    title: "Cloudflare",
                },
            ]
        },
        {
            icon: "share",
            index: "/workhub/worker",
            title: "节点管理",
        },
    ]

    expanded = [] as string[]

    getExpanded(to: RouteLocationNormalized): string[] {
        if (this.items.findIndex(item => item.index === to.path) >= 0) {
            return []
        } else {
            const idx = this.items.findIndex(item => {
                return item.subs && item.subs.findIndex(sub_item => sub_item.index === to.path) >= 0
            })
            if (idx == -1) {
                return []
            } else {
                return [this.items[idx].index]
            }
        }
    }

    mounted() {
        this.expanded = this.getExpanded(this.$route)
        onBeforeRouteUpdate((to) => {
            const exp = new Set<string>(this.expanded)
            this.getExpanded(to).forEach(item => exp.add(item))
            this.expanded = Array.from(exp)
        })

    }
}

interface MenuItem {
    icon: string
    index: string
    title: string
    subs?: MenuItem[]
}
</script>

<template>
    <t-menu :value="$route.path" :collapsed="layout.Collapse" :expanded="expanded" expand-mutex>
        <template #logo>
            <div v-if="layout.Collapse" class="logo">
                TDP
            </div>
            <div v-else class="logo">
                TDP Cloud
            </div>
        </template>
        <template v-for="item in items">
            <template v-if="item.subs">
                <t-submenu :key="item.index" :value="item.index">
                    <template #title>
                        <span>{{ item.title }}</span>
                    </template>
                    <template #icon>
                        <t-icon :name="item.icon" />
                    </template>
                    <t-menu-item v-for="item2 in item.subs" :key="item2.index" :value="item2.index"
                        :to="{ path: item2.index }">
                        {{ item2.title }}
                        <template #icon>
                            <t-icon :name="item2.icon" />
                        </template>
                    </t-menu-item>
                </t-submenu>
            </template>
            <template v-else>
                <t-menu-item :key="item.index" :value="item.index" :to="{ path: item.index }">
                    <span>{{ item.title }}</span>
                    <template #icon>
                        <t-icon :name="item.icon" />
                    </template>
                </t-menu-item>
            </template>
        </template>
    </t-menu>
</template>

<style lang="scss" scoped>
.logo {
    text-align: center;
    width: 100%;
}
</style>