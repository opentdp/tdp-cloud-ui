<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { CertbotItem, Certificate } from "@/api/native/certbot"

@Component
export default class CertbotDetail extends Vue {
    public loading = true

    // 初始化

    public created() {
        const certbotId = +this.$route.params.id
        this.getCertbot(certbotId)
    }

    // 域名信息

    public crtText = ""
    public pubText = ""
    public dateLimit!: [Date, Date]

    public cert!: Certificate
    public certbot!: CertbotItem

    async getCertbot(id: number) {
        const res = await NaApi.certbot.detail(id)
        this.certbot = res.Item
        this.cert = res.Cert
        if (res.Cert) {
            this.crtText = NaApi.certbot.certFormat(res.Cert.Certificate).trim()
            this.pubText = atob(res.Cert.PrivateKey).trim()
            this.dateLimit = [
                new Date(res.Cert.NotBefore * 1000),
                new Date(res.Cert.NotAfter * 1000),
            ]
        }
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
            <t-breadcrumb-item to="/certbot/list">
                域名证书
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="certbot">
                {{ certbot.Domain }}
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-space v-if="loading" fixed align="center">
            <t-loading />
        </t-space>

        <t-card v-if="cert" hover-shadow header-bordered>
            <h3>颁发给</h3>
            {{ cert.Names.join(", ") }}
            <h3>颁发者</h3>
            <pre>CN = {{ cert.Issuer.CommonName }}</pre>
            <pre>O  = {{ cert.Issuer.Organization }}</pre>
            <pre>C  = {{ cert.Issuer.Country }}</pre>
            <h3>有效期</h3>
            <t-date-range-picker v-model="dateLimit" format="YYYY-MM-DD hh:mm:ss" disabled />
            <h3>证书 (<small>Certificate</small>)</h3>
            <t-textarea v-model="crtText" :autosize="{ maxRows: 10 }" readonly />
            <h3>私钥 (<small>PrivateKey</small>)</h3>
            <t-textarea v-model="pubText" :autosize="{ maxRows: 10 }" readonly />
        </t-card>
    </t-space>
</template>
