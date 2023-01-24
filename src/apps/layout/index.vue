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
    <div class="content-box" :class="{ collapse: layout.collapse }">
        <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

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
