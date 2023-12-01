<script lang="ts">
import { Component, Vue } from "@/apps/basic"

import layoutStore from "@/store/layout"

@Component
export default class AppRoot extends Vue {
    public layout = layoutStore()

    public created() {
        this.layout.fetchConfig()
    }
}
</script>

<template>
    <router-view />
</template>
