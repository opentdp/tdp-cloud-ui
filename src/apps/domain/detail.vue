<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { Api } from "@/api"
import { DomainItem } from "@/api/local/domain"

import DnspodDomain from '@/provider/qcloud/dnspod/domain.vue'

@Component({
    components: { DnspodDomain }
})
export default class DomainDetail extends Vue {
    public loading = true

    public created() {
        const domainId = +this.$route.params.id
        this.getDomain(domainId)
    }

    // 域名信息

    public domain = {} as DomainItem

    async getDomain(id: number) {
        const res = await Api.domain.detail(id)
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
            <el-breadcrumb-item>
                解析管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="loading" class="loading" />
        <div v-if="domain.Model == 'qcloud/dnspod'">
            <DnspodDomain :meta="domain" />
        </div>
    </div>
</template>
