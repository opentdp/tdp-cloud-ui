<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="(item, index) in items">
                <template v-if="item.subs">
                    <el-sub-menu :key="index" :index="item.index">
                        <template #title>
                            <component :is="item.icon" class="el-icon"></component>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="(subItem, idx) in item.subs">
                            <template v-if="subItem.subs">
                                <el-sub-menu :key="idx" :index="subItem.index">
                                    <template #title>{{ subItem.title }}</template>
                                    <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
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
                        <component :is="item.icon" class="el-icon"></component>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import useStore from '@/store/main';

const items = [
    {
        icon: 'HomeFilled',
        index: '/dashboard',
        title: '系统首页',
    },
    {
        icon: 'Key',
        index: '/user/secret',
        title: '密钥管理',
    },
    {
        icon: 'Warning',
        index: '7',
        title: '错误处理',
        subs: [
            {
                index: '/error/403',
                title: '403页面',
            },
            {
                index: '/error/404',
                title: '404页面',
            },
        ],
    },
];

const route = useRoute();

const onRoutes = computed(() => route.path);

const store = useStore();
const collapse = computed(() => store.collapse);
</script>

<style lang="scss" scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar > ul {
    height: 100%;
}
</style>
