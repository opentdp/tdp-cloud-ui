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

    public certbot!: CertbotItem & { Cert: Certificate }

    async getCertbot(id: number) {
        const res = await NaApi.certbot.detail(id)
        this.certbot = res || {}
        if (res.Cert) {
            this.crtText = this.crtFormat(res.Cert.Certificate)
            this.pubText = atob(res.Cert.PrivateKey)
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
        <el-card>
            <h3>Certificate</h3>
            <el-input v-model="crtText" type="textarea" rows="10" />
            <h3>PrivateKey</h3>
            <el-input v-model="pubText" type="textarea" rows="10" />
        </el-card>
    </div>
</template>
