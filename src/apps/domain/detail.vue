<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { DomainModels, DomainItem } from "@/api/local/domain"

import CloudflareZone from "@/provider/cloudflare/domain.vue"
import DnspodDomain from "@/provider/qcloud/dnspod/domain.vue"

@Component({
    components: { CloudflareZone, DnspodDomain }
})
export default class DomainDetail extends Vue {
    public DomainModels = DomainModels
    public loading = true

    public created() {
        const domainId = +this.$route.params.id
        this.getDomain(domainId)
    }

    // 域名信息

    public domain!: DomainItem

    async getDomain(id: number) {
        const res = await LoApi.domain.detail(id)
        this.domain = res || {}
        this.loading = false
    }
}
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item to="/domain/list">
                域名管理
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="domain">
                {{ DomainModels[domain.Model] }} · {{ domain.Name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="loading" class="loading" />
        <template v-if="domain?.Model == 'cloudflare/zone'">
            <CloudflareZone :meta="domain" />
        </template>
        <template v-if="domain?.Model == 'qcloud/dnspod'">
            <DnspodDomain :meta="domain" />
        </template>
    </div>
</template>
