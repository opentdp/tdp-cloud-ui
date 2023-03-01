<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import layoutStore from "@/store/layout"

import Navbar from "./navbar.vue"
import Sidebar from "./sidebar.vue"

@Component({
    components: { Navbar, Sidebar }
})
export default class LayoutIndex extends Vue {
    public layout = layoutStore()
}
</script>

<template>
    <Navbar />
    <Sidebar />
    <div class="body" :class="{ collapse: layout.collapse }">
        <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
        <div class="flex-auto" />
        <div class="copyright">
            <small>Powered by TDP Cloud</small>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.body {
    position: absolute;
    top: 70px;
    right: 0;
    bottom: 0;
    left: 250px;
    padding: 10px;

    display: flex;
    flex-direction: column;

    overflow-y: scroll;
    background: #f0f0f0;
    transition: left 0.3s ease-in-out;

    &.collapse {
        left: 64px;
    }

    .copyright {
        user-select: none;
        padding: 20px 0 10px;
        color: var(--el-color-info);
        text-align: center;
        line-height: 1;
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
