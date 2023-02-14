<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { DomainItem } from "@/api/native/domain"
import { VendorItem } from "@/api/native/vendor"

import CloudflareBind from "@/provider/cloudflare/bind.vue"

@Component({
    components: { CloudflareBind }
})
export default class VendorCloudflareBind extends Vue {

    // 初始化

    public created() {
        this.vendorId = +this.$route.params.id
        this.getVendor(this.vendorId)
        this.getDomainList()
    }

    // 厂商信息

    public vendorId = 0
    public vendor?: VendorItem

    async getVendor(id: number) {
        const res = await NaApi.vendor.detail(id)
        this.vendor = res
    }

    // 已绑定域名

    public domainList: Record<string, DomainItem> = {}

    async getDomainList() {
        const res = await NaApi.domain.list()
        res.Datasets.forEach(item => {
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
        <CloudflareBind v-bind="{ vendorId, boundList: domainList }" @change="getDomainList" />
    </div>
</template>
