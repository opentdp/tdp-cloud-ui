<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import layoutStore from "@/store/layout"

@Component
export default class LayoutFooter extends Vue {
    public layout = layoutStore()
}
</script>

<template>
    <div class="copyright">
        <t-space :size="4" separator="•">
            <a :href="layout.Copylink" target="_blank" hover="color">
                {{ layout.Copytext }}
            </a>
            <a v-if="layout.IcpCode" href="https://beian.miit.gov.cn/" target="_blank" hover="color">
                {{ layout.IcpCode }}
            </a>
            <a href="https://cloud.opentdp.org/" target="_blank" hover="color">
                Cloud {{ layout.Version ? "v" + layout.Version : "" }}
            </a>
        </t-space>
    </div>
</template>

<style lang="scss" scoped>
.copyright {
    user-select: none;
    text-align: center;
    font-size: 75%;
}
</style>
