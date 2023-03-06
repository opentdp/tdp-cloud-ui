<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { DomainItem } from "@/api/native/domain"
import { MachineItem } from "@/api/native/machine"
import { VendorItem } from "@/api/native/vendor"

import CvmBind from "@/provider/tencent/cvm/bind.vue"
import LighthouseBind from "@/provider/tencent/lighthouse/bind.vue"
import DnspodBind from "@/provider/tencent/dnspod/bind.vue"

@Component({
    components: { CvmBind, LighthouseBind, DnspodBind }
})
export default class VendorTencentBind extends Vue {
    public curTab = {
        id: "cvm", label: ""
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
        this.vendor = res.Item || {}
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
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item to="/vendor/tencent">
                腾讯云
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="vendor">
                {{ vendor.Description || vendorId }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="curTab.id" type="border-card">
            <el-tab-pane label="CVM服务器" name="cvm">
                <CvmBind v-bind="{ vendorId, boundList: machineList }" @change="getMachineList" />
            </el-tab-pane>
            <el-tab-pane label="轻量服务器" name="lighthouse">
                <LighthouseBind v-bind="{ vendorId, boundList: machineList }" @change="getMachineList" />
            </el-tab-pane>
            <el-tab-pane label="域名解析" name="dnspod">
                <DnspodBind v-bind="{ vendorId, boundList: domainList }" @change="getDomainList" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
