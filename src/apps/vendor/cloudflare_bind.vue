<script lang="ts">
import { Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { DomainItem } from '@/api/native/domain';
import { VendorItem } from '@/api/native/vendor';

import CloudflareBind from '@/cloud/cloudflare/bind.vue';

@Component({
    components: { CloudflareBind }
})
export default class VendorCloudflareBind extends Vue {
    // 初始化

    public created() {
        this.vendorId = +this.$route.params.id;
        this.getVendor(this.vendorId);
        this.getDomainList();
    }

    // 厂商信息

    public vendorId = 0;
    public vendor?: VendorItem;

    async getVendor(id: number) {
        const res = await NaApi.vendor.detail(id);
        this.vendor = res.Item;
    }

    // 已绑定域名

    public domainList: Record<string, DomainItem> = {};

    async getDomainList() {
        const res = await NaApi.domain.list();
        res.Items.forEach(item => {
            this.domainList[item.CloudId] = item;
        });
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item to="/vendor/cloudflare">
                Cloudflare
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="vendor">
                {{ vendor.Description || vendorId }}
            </t-breadcrumb-item>
        </t-breadcrumb>

        <CloudflareBind v-bind="{ vendorId, boundList: domainList }" @change="getDomainList" />
    </t-space>
</template>
