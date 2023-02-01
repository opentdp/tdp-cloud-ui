<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { DomainItem } from "@/api/local/domain"
import { VendorItem } from "@/api/local/vendor"

import CloudflareBind from "@/provider/cloudflare/bind.vue"

@Component({
    components: { CloudflareBind }
})
export default class VendorBindCloudflare extends Vue {
    public created() {
        this.vendorId = +this.$route.params.id
        this.getVendor(this.vendorId)
        this.getDomainList()
    }

    // 厂商信息

    public vendorId = 0
    public vendor?: VendorItem

    async getVendor(id: number) {
        const res = await LoApi.vendor.detail(id)
        this.vendor = res
    }

    // 已绑定域名

    public domainList: Record<string, DomainItem> = {}

    async getDomainList() {
        const res = await LoApi.domain.list()
        res.Datasets.forEach((item) => {
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
            <el-breadcrumb-item to="/vendor/cloudflare">
                Cloudflare
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="vendor">
                {{ vendor.Description || vendorId }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="space-10" />
        <CloudflareBind :meta="{ vendorId, boundList: domainList }" />
    </div>
</template>
