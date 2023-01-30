<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { DomainItem } from "@/api/local/domain"
import { MachineItem } from "@/api/local/machine"

import DnspodBind from "@/provider/qcloud/dnspod/bind.vue"
import LighthouseBind from "@/provider/qcloud/lighthouse/bind.vue"

@Component({
    components: { DnspodBind, LighthouseBind }
})
export default class VendorQcloud extends Vue {
    public vendorId = 0

    public curTab = {
        id: "lighthouse", label: ""
    }

    public created() {
        this.getDomainList()
        this.getMachineList()
        this.vendorId = +this.$route.params.id
    }

    // 已绑定主机

    public machineList: Record<string, MachineItem> = {}

    async getMachineList() {
        const res = await LoApi.machine.list()
        res.forEach((item) => {
            this.machineList[item.CloudId] = item
        })
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
                腾讯云
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="curTab.id" type="border-card">
            <el-tab-pane label="轻量服务器" name="lighthouse">
                <LighthouseBind :meta="{ vendorId, boundList: machineList }" />
            </el-tab-pane>
            <el-tab-pane label="域名解析" name="dnspod">
                <DnspodBind :meta="{ vendorId, boundList: domainList }" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
