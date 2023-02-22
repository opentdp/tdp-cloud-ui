<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { CertbotItem } from "@/api/native/certbot"

@Component
export default class DomainDetail extends Vue {
    public loading = true

    // 初始化

    public created() {
        const certbotId = +this.$route.params.id
        this.getDomain(certbotId)
    }

    // 域名信息

    public certbot!: CertbotItem

    async getDomain(id: number) {
        const res = await NaApi.certbot.detail(id)
        this.certbot = res || {}
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
            <el-breadcrumb-item to="/certbot/list">
                域名证书
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="certbot">
                {{ certbot.Domain }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="loading" />
        <el-empty description="尚未实现" />
    </div>
</template>
