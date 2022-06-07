<template>
    <div v-if="showTabs" class="tabs">
        <ul>
            <li v-for="(item, index) in tabsList" :key="index" class="tabs-li" :class="{ active: isActive(item.path) }">
                <router-link :to="item.path" class="tabs-li-title">{{ item.title }}</router-link>
                <span class="tabs-li-icon" @click="closeTabs(index)">
                    <el-icon>
                        <Close />
                    </el-icon>
                </span>
            </li>
        </ul>
        <div class="tabs-close-box">
            <el-dropdown @command="handleTabs">
                <el-button size="small" type="primary">
                    标签选项
                    <el-icon>
                        <Arrow-down />
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

import useStore from '@/store/layout';

const store = useStore();
const route = useRoute();
const router = useRouter();

const isActive = path => {
    return path === route.fullPath;
};

const tabsList = computed(() => store.tabsList);
const showTabs = computed(() => tabsList.value.length > 0);

// 设置标签
const setTabs = route => {
    const isExist = tabsList.value.some(item => {
        return item.path === route.fullPath;
    });
    if (!isExist) {
        if (tabsList.value.length >= 8) {
            store.delTabsItem({ index: 0 });
        }
        store.setTabsItem({
            name: route.name,
            title: route.meta.title,
            path: route.fullPath,
        });
    }
};

setTabs(route);
onBeforeRouteUpdate(to => setTabs(to));

// 关闭单个标签
const closeTabs = index => {
    const delItem = tabsList.value[index];
    store.delTabsItem({ index }); // 不能换位置
    const item = tabsList.value[index] ? tabsList.value[index] : tabsList.value[index - 1];
    if (item) {
        delItem.path === route.fullPath && router.push(item.path);
    } else {
        router.push('/');
    }
};

// 关闭全部标签
const closeAll = () => {
    store.clearTabs();
    router.push('/');
};

// 关闭其他标签
const closeOther = () => {
    const curItem = tabsList.value.filter(item => {
        return item.path === route.fullPath;
    });
    store.closeTabsOther(curItem);
};

// 处理下拉菜单事件
const handleTabs = command => {
    command === 'other' ? closeOther() : closeAll();
};

// 关闭当前页面的标签页
// store.closeCurrentTag({
//     $router: router,
//     $route: route
// });
</script>

<style lang="scss" scoped>
.tabs {
    position: relative;
    height: 50px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
}

.tabs ul {
    width: 100%;
    height: 100%;
    padding: 10px 5px;
}

.tabs-li {
    float: left;
    margin: 0 5px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    transition: all 0.3s ease-in;
}

.tabs-li:not(.active):hover {
    background: #f8f8f8;
}

.tabs-li.active {
    border: 1px solid #409eff;
    background-color: #409eff;
    color: #fff;
}

.tabs-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tabs-li.active .tabs-li-title {
    color: #fff;
}

.tabs-close-box {
    position: absolute;
    right: 10px;
    top: 10px;
    background: #fff;
    z-index: 10;
}

.tabs-close-box .el-button {
    height: 30px;
}
</style>
