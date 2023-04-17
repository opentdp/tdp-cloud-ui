<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"
import { onBeforeRouteUpdate, RouteLocationNormalized } from "vue-router"

import layoutStore from "@/store/layout"
import sessionStore from "@/store/session"

@Component
export default class LayoutSidebar extends Vue {
    public layout = layoutStore()
    public session = sessionStore()

    // 菜单列表

    public items: MenuItem[] = []

    // 初始化

    public created() {
        this.items = this.itemFilter(menuItems)
    }

    public itemFilter(items: MenuItem[]) {
        const level = this.session.Level
        return items.filter(item => {
            if (item.level && item.level < level) {
                return false //用户组权限不足
            }
            if (item.subs) {
                item.subs = this.itemFilter(item.subs)
            }
            return true
        })
    }

    // 侧栏控制

    public expanded = [] as string[]

    public getExpanded(to: RouteLocationNormalized): string[] {
        if (this.items.findIndex(item => item.index === to.path) >= 0) {
            return []
        }
        const idx = this.items.findIndex(item => {
            return item.subs && item.subs.findIndex(sub => sub.index === to.path) >= 0
        })
        return idx == -1 ? [] : [this.items[idx].index]
    }

    public mounted() {
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
    level?: number
    subs?: MenuItem[]
}

const menuItems: MenuItem[] = [
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
        index: "/certbot",
        title: "SSL 证书",
        subs: [
            {
                icon: "relativity",
                index: "/certbot/list",
                title: "证书签发",
            },
            {
                icon: "cloud-upload",
                index: "/certbot/deploy",
                title: "云端部署",
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
    {
        icon: "usergroup",
        index: "/user/list",
        title: "用户管理",
        level: 1,
    },
    {
        icon: "setting",
        index: "/config/system",
        title: "系统参数",
        level: 1,
    },
]
</script>

<template>
    <t-menu v-model:expanded="expanded" :value="$route.path" :collapsed="layout.Collapse">
        <template #logo>
            <a v-if="layout.Collapse" class="logo" href="/">
                <img :src="layout.SiteIcon">
            </a>
            <a v-else class="logo" href="/">
                <img :src="layout.SiteLogo" :title="layout.SiteName">
            </a>
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
    display: flex;
    align-items: end;
    justify-content: center;
    width: 100%;

    img {
        height: 40px;
        padding-right: 5px;
    }

    b {
        font-size: 18px;
        padding-bottom: 3px;
    }
}
</style>