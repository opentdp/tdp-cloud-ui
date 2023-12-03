<script lang="ts">
import { Component, Vue } from '@/apps/basic';

@Component
export default class AppRoot extends Vue {
    public created() {
        this.layout.fetchConfig();
    }
}
</script>

<template>
    <router-view />
</template>
