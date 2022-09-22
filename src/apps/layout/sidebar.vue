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
        icon: "Coin",
        index: "/tat",
        title: "自动化助手",
        subs: [
            {
                icon: "Crop",
                index: "/tat/script",
                title: "命令管理",
            },
            {
                icon: "Finished",
                index: "/tat/history",
                title: "历史记录",
            },
        ]
    },
    {
        icon: "Magnet",
        index: "/podhub",
        title: "边缘节点",
        subs: [
            {
                icon: "Cpu",
                index: "/podhub/index",
                title: "节点管理",
            },
            {
                icon: "Finished",
                index: "/podhub/task",
                title: "任务记录",
            },
        ]
    },
    {
        icon: "Switch",
        index: "/terminal",
        title: "SSH 终端",
        subs: [
            {
                icon: "Connection",
                index: "/terminal/ssh",
                title: "SSH 连接",
            },
            {
                icon: "Lock",
                index: "/terminal/sshkey",
                title: "SSH 密钥",
            },
        ]
    },
    {
        icon: "PartlyCloudy",
        index: "/keypod/secret",
        title: "腾讯云 CAM",
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
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-sub-menu :key="item.index" :index="item.index">
                        <template #title>
                            <component :is="item.icon" class="el-icon" />
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="item2 in item.subs">
                            <template v-if="item2.subs">
                                <el-sub-menu :key="item2.index" :index="item2.index">
                                    <template #title>
                                        <component :is="item2.icon" class="el-icon" />
                                        {{ item2.title }}
                                    </template>
                                    <el-menu-item v-for="item3 in item2.subs" :key="item3.index" :index="item3.index">
                                        {{ item3.title }}
                                    </el-menu-item>
                                </el-sub-menu>
                            </template>
                            <template v-else>
                                <el-menu-item :key="item2.index" :index="item2.index">
                                    <component :is="item2.icon" class="el-icon" />
                                    {{ item2.title }}
                                </el-menu-item>
                            </template>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :key="item.index" :index="item.index">
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
