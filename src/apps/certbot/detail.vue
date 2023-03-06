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
            this.crtText = this.crtFormat(res.Cert.Certificate)
            this.pubText = atob(res.Cert.PrivateKey)
            this.dateLimit = [
                new Date(res.Cert.NotBefore * 1000),
                new Date(res.Cert.NotAfter * 1000),
            ]
        }
        this.loading = false
    }

    private crtFormat(certs: string[]) {
        const crtB = "-----BEGIN CERTIFICATE-----\n"
        const crtE = "\n-----END CERTIFICATE-----\n"
        certs = certs.map(c => this.split(c, 64).join("\n"))
        return crtB + certs.join(`${crtE}\n${crtB}`) + crtE
    }

    private split(str: string, n: number) {
        var arr = []
        for (var i = 0, l = str.length; i < l / n; i++) {
            arr.push(str.slice(n * i, n * (i + 1)))
        }
        return arr
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
        <el-card v-if="cert">
            <h3>颁发给</h3>
            {{ cert.Names.join(", ") }}
            <h3>颁发者</h3>
            <pre>CN = {{ cert.Issuer.CommonName }}</pre>
            <pre>O  = {{ cert.Issuer.Organization }}</pre>
            <pre>C  = {{ cert.Issuer.Country }}</pre>
            <h3>有效期</h3>
            <el-date-picker v-model="dateLimit" type="datetimerange" range-separator="至" readonly />
            <h3>证书 (<small>Certificate</small>)</h3>
            <el-input v-model="crtText" type="textarea" rows="10" readonly />
            <h3>私钥 (<small>PrivateKey</small>)</h3>
            <el-input v-model="pubText" type="textarea" rows="10" readonly />
        </el-card>
    </div>
</template>
