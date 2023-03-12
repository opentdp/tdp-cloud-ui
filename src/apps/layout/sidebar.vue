<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import layoutStore from "@/store/layout"

@Component
export default class LayoutSidebar extends Vue {
    public layout = layoutStore()

    // 菜单列表

    public items: MenuItem[] = [
        {
            icon: "HomeFilled",
            index: "/dashboard",
            title: "首页",
        },
        {
            icon: "Monitor",
            index: "/machine/list",
            title: "主机管理",
        },
        {
            icon: "Lightning",
            index: "/domain/list",
            title: "域名解析",
        },
        {
            icon: "Crop",
            index: "/certbot/list",
            title: "SSL 证书",
        },
        {
            icon: "Coin",
            index: "/task",
            title: "快捷命令",
            subs: [
                {
                    icon: "Filter",
                    index: "/script/list",
                    title: "脚本管理",
                },
                {
                    icon: "Finished",
                    index: "/taskline/list",
                    title: "任务记录",
                },
            ]
        },
        {
            icon: "Connection",
            index: "/terminal",
            title: "SSH 终端",
            subs: [
                {
                    icon: "Link",
                    index: "/terminal/ssh",
                    title: "SSH 连接",
                },
                {
                    icon: "Lock",
                    index: "/keypair/list",
                    title: "密钥管理",
                },
            ]
        },
        {
            icon: "Switch",
            index: "/vendor",
            title: "厂商管理",
            subs: [
                {
                    icon: "PartlyCloudy",
                    index: "/vendor/tencent",
                    title: "腾讯云",
                },
                {
                    icon: "PartlyCloudy",
                    index: "/vendor/alibaba",
                    title: "阿里云",
                },
                {
                    icon: "PartlyCloudy",
                    index: "/vendor/cloudflare",
                    title: "Cloudflare",
                },
            ]
        },
        {
            icon: "Cpu",
            index: "/workhub/worker",
            title: "节点管理",
        },
    ]

    get defaultExpanded() {
        if (this.items.findIndex(item => item.index === this.$route.path) >= 0) {
            return []
        } else {
            const idx = this.items.findIndex(item => {
                return item.subs && item.subs.findIndex(sub_item => sub_item.index === this.$route.path) >= 0
            })
            if (idx == -1) {
                return []
            } else {
                return [this.items[idx].index]
            }
        }
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
    <div class="sidebar">
        <t-menu class="sidebar-t-menu" :value="$route.path" :collapsed="layout.Collapse" :default-expanded="defaultExpanded"
            expand-mutex>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <t-submenu :key="item.index" :value="item.index">
                        <template #title>
                            <span>{{ item.title }}</span>
                        </template>
                        <template #icon>
                            <component :is="item.icon" class="t-icon" />
                        </template>
                        <t-menu-item v-for="item2 in item.subs" :key="item2.index" :value="item2.index"
                            :to="{ path: item2.index }">
                            {{ item2.title }}
                            <template #icon>
                                <component :is="item2.icon" class="t-icon" />
                            </template>
                        </t-menu-item>
                    </t-submenu>
                </template>
                <template v-else>
                    <t-menu-item :key="item.index" :value="item.index" :to="{ path: item.index }">
                        <span>{{ item.title }}</span>
                        <template #icon>
                            <component :is="item.icon" class="t-icon" />
                        </template>
                    </t-menu-item>
                </template>
            </template>
        </t-menu>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;

    &>ul {
        height: 100%;
    }
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-t-menu:not(.t-menu--collapse) {
    width: 250px;
}
</style>
