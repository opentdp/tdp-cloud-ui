<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import layoutStore from "@/store/layout"

@Component
export default class PassportLogin extends Vue {
    public created() {
        layoutStore().initUIConfig()
    }
}
</script>

<template>
    <router-view />
</template>
