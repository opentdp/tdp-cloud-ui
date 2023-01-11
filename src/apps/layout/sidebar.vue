<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

import layoutStore from "@/store/layout"

// 初始化

const route = useRoute()
const layout = layoutStore()

const onRoutes = computed(() => route.path)

// 菜单数据

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
        title: "首页",
    },
    {
        icon: "Lightning",
        index: "/domain/list",
        title: "域名解析",
    },
    {
        icon: "Monitor",
        index: "/machine/list",
        title: "主机管理",
    },
    {
        icon: "Coin",
        index: "/task",
        title: "快捷命令",
        subs: [
            {
                icon: "Crop",
                index: "/task/script",
                title: "命令管理",
            },
            {
                icon: "Finished",
                index: "/task/history",
                title: "历史记录",
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
        icon: "Switch",
        index: "/vendor",
        title: "云上资源",
        subs: [
            {
                icon: "Cpu",
                index: "/vendor/worker",
                title: "子节点",
            },
            {
                icon: "PartlyCloudy",
                index: "/vendor/qcloud",
                title: "腾讯云",
            },
        ]
    }
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
