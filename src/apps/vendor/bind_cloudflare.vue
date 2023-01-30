<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { DomainItem } from "@/api/local/domain"

import CloudflareBind from "@/provider/cloudflare/bind.vue"

@Component({
    components: { CloudflareBind }
})
export default class VendorCloudflare extends Vue {
    public vendorId = 0

    public created() {
        this.getDomainList()
        this.vendorId = +this.$route.params.id
    }

    // 已绑定域名

    public domainList: Record<string, DomainItem> = {}

    async getDomainList() {
        const res = await LoApi.domain.list()
        res.forEach((item) => {
            this.domainList[item.CloudId] = item
        })
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
                Cloudflare
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="space-10" />
        <CloudflareBind :meta="{ boundList: domainList }" />
    </div>
</template>
