<template>
    <v-navbar />
    <v-sidebar />
    <div class="content-box" :class="{ collapse: layout.collapse }">
        <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import layoutStore from '@/store/layout';

import vNavbar from './navbar.vue';
import vSidebar from './sidebar.vue';

const layout = layoutStore();
</script>

<style lang="scss" scoped>
.content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding: 10px 10px 30px 10px;
    transition: left 0.3s ease-in-out;
    background: #f0f0f0;
    overflow-y: scroll;

    &.collapse {
        left: 65px;
    }
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
