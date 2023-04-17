<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import Api, { NaApi } from "@/api"
import { VendorItem } from "@/api/native/vendor"

import SslBind from "@/cloud/tencent/ssl/bind.vue"

@Component({
    components: { SslBind }
})
export default class CertbotDeploy extends Vue {
    public loading = true

    // 初始化

    public created() {
        this.getVendorList()
    }

    // 厂商列表

    public vendorList: VendorItem[] = []

    async getVendorList() {
        const res = await NaApi.vendor.list({ Provider: "tencent" })
        if (res.Items.length == 0) {
            this.$router.push("/vendor/tencent")
            Api.msg.err("请先添加厂商")
            return
        }
        this.curTab.id = res.Items[0].Id
        this.vendorList = res.Items
        this.loading = false
    }

    // 管理标签页

    public curTab = {
        id: 0, label: ""
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
                证书部署
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-space v-if="loading" fixed align="center">
            <t-loading />
        </t-space>

        <t-tabs v-model="curTab.id" theme="card">
            <t-tab-panel v-for="v in vendorList" :key="v.Id" :value="v.Id" :label="v.Description">
                <SslBind v-bind="{ vendorId: v.Id }" />
            </t-tab-panel>
        </t-tabs>
    </t-space>
</template>
