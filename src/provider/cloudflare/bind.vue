<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi, CfApi } from "@/api"
import * as CF from "@/api/cloudflare/typings"
import { DomainItem } from "@/api/native/domain"

@Component({
    emits: ["change"]
})
export default class CloudflareBind extends Vue {
    public loading = true

    @Prop
    public vendorId = 0

    @Prop
    public boundList: Record<string, DomainItem> = {}

    // 初始化

    public created() {
        CfApi.vendor(this.vendorId)
        this.getDomainlist()
    }

    // 获取列表

    public domainList: CF.ZoneItem[] = []
    public domainCount = 0

    async getDomainlist() {
        const res = await CfApi.zones.list()
        this.domainList = res.Datasets
        this.loading = false
    }

    // 绑定域名

    async bindDomian(item: CF.ZoneItem) {
        const ns = item.name_servers ? item.name_servers.join(",") : "Custom NS"
        await NaApi.domain.create({
            VendorId: this.vendorId,
            Name: item.name,
            NSList: ns,
            Model: "cloudflare/zone",
            CloudId: item.id + '',
            CloudMeta: item,
            Status: "",
            Description: "",
        })
        this.$emit("change")
    }

    // 同步域名

    public syncDomian(item: CF.ZoneItem) {
        const ns = item.name_servers ? item.name_servers.join(",") : "Custom NS"
        const bd = this.boundList[item.id]
        NaApi.domain.update({
            Id: bd ? bd.Id : 0,
            NSList: ns,
            CloudId: item.id + '',
            CloudMeta: item,
        })
    }
}
</script>

<template>
    <t-card title="域名列表" hover-shadow header-bordered>
        <el-table v-loading="loading" :data="domainList" table-layout="fixed">
            <el-table-column prop="name" label="域名" fixed sortable show-overflow-tooltip />
            <el-table-column prop="status" label="状态" sortable show-overflow-tooltip />
            <el-table-column prop="type" label="接入方式" sortable show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.type == "full" ? "NS" : scope.row.host?.name }}
                </template>
            </el-table-column>
            <el-table-column prop="name_servers" label="NS 服务器" show-overflow-tooltip>
                <template #default="scope">
                    <template v-if="scope.row.name_servers">
                        {{ scope.row.name_servers.join(",") }}
                    </template>
                    <template v-else>
                        Unknown
                    </template>
                </template>
            </el-table-column>
            <el-table-column prop="plan" label="套餐" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.plan.name }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="boundList[scope.row.id]" link icon="View" @click="syncDomian(scope.row)">
                        同步
                    </el-button>
                    <el-button v-else link type="primary" icon="View" @click="bindDomian(scope.row)">
                        导入
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </t-card>
</template>
