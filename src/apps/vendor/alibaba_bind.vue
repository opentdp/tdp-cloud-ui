<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { DomainItem } from "@/api/native/domain"
import { MachineItem } from "@/api/native/machine"
import { VendorItem } from "@/api/native/vendor"

import EcsBind from "@/cloud/alibaba/ecs/bind.vue"
import SwasBind from "@/cloud/alibaba/swas/bind.vue"
import DnsBind from "@/cloud/alibaba/dns/bind.vue"

@Component({
    components: { EcsBind, SwasBind, DnsBind }
})
export default class VendorAlibabaBind extends Vue {
    public curTab = {
        id: "dns", label: ""
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
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item to="/vendor/alibaba">
                阿里云
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="vendor">
                {{ vendor.Description || vendorId }}
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-tabs v-model="curTab.id" theme="card">
            <t-tab-panel value="dns" label="域名解析">
                <DnsBind v-bind="{ vendorId, boundList: domainList }" @change="getDomainList" />
            </t-tab-panel>
            <t-tab-panel value="swas" label="轻量服务器">
                <SwasBind v-bind="{ vendorId, boundList: machineList }" @change="getMachineList" />
            </t-tab-panel>
            <t-tab-panel value="ecs" label="ECS 服务器">
                <EcsBind v-bind="{ vendorId, boundList: machineList }" @change="getMachineList" />
            </t-tab-panel>
        </t-tabs>
    </t-space>
</template>
