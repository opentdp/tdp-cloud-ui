<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

import layoutStore from "@/store/layout"

const route = useRoute()
const layout = layoutStore()

const onRoutes = computed(() => route.path)

interface MenuItem {
    icon: string
    index: string
    title: string
    subs?: MenuItem[]
}

const items: MenuItem[] = [
    {
        icon: "HomeFilled",
        index: "/dashboard",
        title: "系统首页",
    },
    {
        icon: "Lightning",
        index: "/dnspod/index",
        title: "域名解析",
    },
    {
        icon: "Monitor",
        index: "/lighthouse/index",
        title: "轻量服务器",
    },
    {
        icon: "Connection",
        index: "/terminal/ssh",
        title: "SSH 终端",
    },
    {
        icon: "Dish",
        index: "/tat",
        title: "自动化助手",
        subs: [
            {
                icon: "Dish",
                index: "/tat/script",
                title: "命令管理",
            },
            {
                icon: "Dish",
                index: "/tat/history",
                title: "历史记录",
            },
        ]
    },
    {
        icon: "Wallet",
        index: "/keypod/secret",
        title: "密钥管理",
    },
    // {
    //     icon: 'Warning',
    //     index: '7',
    //     title: '错误处理',
    //     subs: [
    //         {
    //             index: '/error/403',
    //             title: '403页面',
    //         },
    //         {
    //             index: '/error/404',
    //             title: '404页面',
    //         },
    //     ],
    // },
]
</script>

<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="layout.collapse"
            background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="(item, index) in items">
                <template v-if="item.subs">
                    <el-sub-menu :key="index" :index="item.index">
                        <template #title>
                            <component :is="item.icon" class="el-icon" />
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="(subItem, idx) in item.subs">
                            <template v-if="subItem.subs">
                                <el-sub-menu :key="idx" :index="subItem.index">
                                    <template #title>
                                        {{ subItem.title }}
                                    </template>
                                    <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i"
                                        :index="threeItem.index">
                                        {{ threeItem.title }}
                                    </el-menu-item>
                                </el-sub-menu>
                            </template>
                            <template v-else>
                                <el-menu-item :key="idx" :index="subItem.index">
                                    {{ subItem.title }}
                                </el-menu-item>
                            </template>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :key="index" :index="item.index">
                        <component :is="item.icon" class="el-icon" />
                        <template #title>
                            {{ item.title }}
                        </template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
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

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
</style>
