<script lang="ts">
import { Component, Vue } from "@/apps/basic"

import sessionStore from "@/store/session"

@Component
export default class HomeIndex extends Vue {
    public session = sessionStore()

    public created() {
        if (this.session.Username) {
            this.$router.push("/dashboard")
        } else {
            this.$router.push("/login")
        }
    }
}
</script>

<template>
    <h3>Loading...</h3>
</template>
