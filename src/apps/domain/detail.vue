<script lang="ts">
import { Component, Vue } from "@/apps/basic"

import { NaApi } from "@/api"
import { DomainModels, DomainItem } from "@/api/native/domain"

import AlibabaDns from "@/cloud/alibaba/dns/domain.vue"
import CloudflareZone from "@/cloud/cloudflare/domain.vue"
import TencentDnspod from "@/cloud/tencent/dnspod/domain.vue"

@Component({
    components: { AlibabaDns, CloudflareZone, TencentDnspod }
})
export default class DomainDetail extends Vue {
    public DomainModels = DomainModels

    public loading = true

    // 初始化

    public created() {
        const domainId = +this.$route.params.id
        this.getDomain(domainId)
    }

    // 域名信息

    public domain!: DomainItem

    async getDomain(id: number) {
        const res = await NaApi.domain.detail(id)
        this.domain = res.Item
        this.loading = false
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item to="/domain/list">
                域名管理
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="domain">
                {{ domain.Name }} · {{ DomainModels[domain.Model] }}
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-space v-if="loading" fixed align="center">
            <t-loading />
        </t-space>

        <template v-if="domain?.Model == 'alibaba/alidns'">
            <AlibabaDns :domain="domain" />
        </template>

        <template v-if="domain?.Model == 'cloudflare/zone'">
            <CloudflareZone :domain="domain" />
        </template>

        <template v-if="domain?.Model == 'tencent/dnspod'">
            <TencentDnspod :domain="domain" />
        </template>
    </t-space>
</template>
