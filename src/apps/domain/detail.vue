<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { DomainModels, DomainItem } from "@/api/native/domain"

import CloudflareZone from "@/provider/cloudflare/domain.vue"
import DnspodDomain from "@/provider/tencent/dnspod/domain.vue"

@Component({
    components: { CloudflareZone, DnspodDomain }
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
        <div v-loading="loading" />
        <template v-if="domain?.Model == 'cloudflare/zone'">
            <CloudflareZone :domain="domain" />
        </template>
        <template v-if="domain?.Model == 'tencent/dnspod'">
            <DnspodDomain :domain="domain" />
        </template>
    </div>
</template>
