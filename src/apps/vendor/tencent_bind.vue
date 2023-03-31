<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { DomainItem } from "@/api/native/domain"
import { MachineItem } from "@/api/native/machine"
import { VendorItem } from "@/api/native/vendor"

import CvmBind from "@/cloud/tencent/cvm/bind.vue"
import DnspodBind from "@/cloud/tencent/dnspod/bind.vue"
import LighthouseBind from "@/cloud/tencent/lighthouse/bind.vue"

@Component({
    components: { CvmBind, DnspodBind, LighthouseBind }
})
export default class VendorTencentBind extends Vue {
    public curTab = {
        id: "dnspod", label: ""
    }

    // 初始化

    public created() {
        this.vendorId = +this.$route.params.id
        this.getVendor(this.vendorId)
        this.getDomainList()
        this.getMachineList()
    }

    // 厂商信息

    public vendorId = 0
    public vendor?: VendorItem

    async getVendor(id: number) {
        const res = await NaApi.vendor.detail(id)
        this.vendor = res.Item
    }

    // 已绑定主机

    public machineList: Record<string, MachineItem> = {}

    async getMachineList() {
        const res = await NaApi.machine.list()
        res.Items.forEach(item => {
            this.machineList[item.CloudId] = item
        })
    }

    // 已绑定域名

    public domainList: Record<string, DomainItem> = {}

    async getDomainList() {
        const res = await NaApi.domain.list()
        res.Items.forEach(item => {
            this.domainList[item.CloudId] = item
        })
    }

}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item to="/vendor/tencent">
                腾讯云
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="vendor">
                {{ vendor.Description || vendorId }}
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-tabs v-model="curTab.id" theme="card">
            <t-tab-panel value="dnspod" label="域名解析">
                <DnspodBind v-bind="{ vendorId, boundList: domainList }" @change="getDomainList" />
            </t-tab-panel>
            <t-tab-panel value="lighthouse" label="轻量服务器">
                <LighthouseBind v-bind="{ vendorId, boundList: machineList }" @change="getMachineList" />
            </t-tab-panel>
            <t-tab-panel value="cvm" label="CVM 服务器">
                <CvmBind v-bind="{ vendorId, boundList: machineList }" @change="getMachineList" />
            </t-tab-panel>
        </t-tabs>
    </t-space>
</template>
