<template>
    <v-navbar />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
        <v-tabs />
        <div class="content">
            <router-view v-slot="{ Component }">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tabsList">
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import useStore from '@/store/main';

import vNavbar from './navbar.vue';
import vSidebar from './sidebar.vue';
import vTabs from './tabs.vue';

const store = useStore();
const tabsList = computed(() => store.tabsList.map(item => item.name));
const collapse = computed(() => store.collapse);
</script>

<style lang="scss" scoped>
.content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    transition: left 0.3s ease-in-out;
    background: #f0f0f0;

    .content {
        width: auto;
        height: 100%;
        padding: 10px;
        overflow-y: scroll;
    }
}

.content-collapse {
    left: 65px;
}

.move-enter-from,
.move-leave-to {
    opacity: 0;
}

.move-enter-active,
.move-leave-active {
    transition: opacity 0.1s ease;
}
</style>
