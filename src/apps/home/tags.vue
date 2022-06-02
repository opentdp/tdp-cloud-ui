<template>
    <div v-if="showTags" class="tags">
        <ul>
            <li v-for="(item, index) in tagsList" :key="index" class="tags-li" :class="{ active: isActive(item.path) }">
                <router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
                <span class="tags-li-icon" @click="closeTags(index)">
                    <el-icon>
                        <Close />
                    </el-icon>
                </span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
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

import useStore from '@/store/main';

const store = useStore();
const route = useRoute();
const router = useRouter();

const isActive = path => {
    return path === route.fullPath;
};

const tagsList = computed(() => store.tagsList);
const showTags = computed(() => tagsList.value.length > 0);

// 关闭单个标签
const closeTags = index => {
    const delItem = tagsList.value[index];
    store.delTagsItem({ index }); // 不能换位置
    const item = tagsList.value[index] ? tagsList.value[index] : tagsList.value[index - 1];
    if (item) {
        delItem.path === route.fullPath && router.push(item.path);
    } else {
        router.push('/');
    }
};

// 设置标签
const setTags = route => {
    const isExist = tagsList.value.some(item => {
        return item.path === route.fullPath;
    });
    if (!isExist) {
        if (tagsList.value.length >= 8) {
            store.delTagsItem({ index: 0 });
        }
        store.setTagsItem({
            name: route.name,
            title: route.meta.title,
            path: route.fullPath,
        });
    }
};

setTags(route);
onBeforeRouteUpdate(to => setTags(to));

// 关闭全部标签
const closeAll = () => {
    store.clearTags();
    router.push('/');
};

// 关闭其他标签
const closeOther = () => {
    const curItem = tagsList.value.filter(item => {
        return item.path === route.fullPath;
    });
    store.closeTagsOther(curItem);
};

const handleTags = command => {
    command === 'other' ? closeOther() : closeAll();
};

// 关闭当前页面的标签页
// store.commit("closeCurrentTag", {
//     $router: router,
//     $route: route
// });
</script>

<style lang="scss" scoped>
.tags {
    position: relative;
    height: 50px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
}

.tags ul {
    width: 100%;
    height: 100%;
    padding: 10px 5px;
}

.tags-li {
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

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    border: 1px solid #409eff;
    background-color: #409eff;
    color: #fff;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #fff;
}

.tags-close-box {
    position: absolute;
    right: 10px;
    top: 10px;
    background: #fff;
    z-index: 10;
}

.tags-close-box .el-button {
    height: 30px;
}
</style>
