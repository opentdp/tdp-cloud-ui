<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { DomainItem } from "@/api/native/domain"

@Component({
    emits: ["change"]
})
export default class DnsBind extends Vue {

    public loading = true

    @Prop
    public vendorId = 0

    @Prop
    public boundList: Record<string, DomainItem> = {}

    // 初始化

    public created() {
        // AlApi.vendor(this.vendorId)
        this.getDomainList()
    }

    // 获取列表

    public domainList = []
    public domainCount = 0

    async getDomainList() {
        //
    }

    // 绑定域名

    async bindDomian(item: any) {
        await NaApi.domain.create({
            VendorId: this.vendorId,
            Name: item.Name,
            NSList: item.EffectiveDNS.join(","),
            Model: "tencent/dnspod",
            CloudId: item.DomainId + '',
            CloudMeta: item,
            Description: "",
            Status: 1,
        })
        this.$emit("change")
    }

    // 同步域名

    public syncDomian(item: any) {
        const bd = this.boundList[item.DomainId]
        NaApi.domain.update({
            Id: bd ? bd.Id : 0,
            NSList: item.EffectiveDNS.join(","),
            CloudId: item.DomainId + '',
            CloudMeta: item,
        })
    }
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>域名列表</b>
                <small>域名总数: {{ domainCount }}</small>
            </div>
        </template>
        尚未实现
    </el-card>
</template>
