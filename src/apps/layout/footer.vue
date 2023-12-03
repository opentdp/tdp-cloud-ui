<script lang="ts">
import { Component, Vue } from '@/apps/basic';

@Component
export default class LayoutFooter extends Vue { }
</script>

<template>
    <div class="copyright">
        <t-space :size="4" separator="•">
            <t-link :href="layout.Copylink" target="_blank">
                {{ layout.Copytext }}
            </t-link>
            <t-link v-if="layout.IcpCode" href="https://beian.miit.gov.cn/" target="_blank">
                {{ layout.IcpCode }}
            </t-link>
            <t-link href="https://cloud.opentdp.org/" target="_blank">
                Cloud {{ layout.Version ? "v" + layout.Version : "" }}
            </t-link>
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
