<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi, CfApi } from "@/api"
import * as CF from "@/api/cloudflare/typings"
import { DomainItem } from "@/api/local/domain"

@Component({
    emits: ["change"]
})
export default class CloudflareBind extends Vue {
    public loading = true

    @Prop
    public meta!: {
        vendorId: number
        boundList: Record<string, DomainItem>
    }

    // 初始化

    public created() {
        CfApi.vendor(this.meta.vendorId)
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
        const ns = item.name_servers ? item.name_servers.join(",") : "Unkown"
        await NaApi.domain.create({
            VendorId: this.meta.vendorId,
            Name: item.name,
            NSList: ns,
            Model: "cloudflare/zone",
            CloudId: item.id + '',
            CloudMeta: item,
            Description: "",
            Status: 1,
        })
        this.$emit("change")
    }

    // 同步域名

    public syncDomian(item: CF.ZoneItem) {
        const ns = item.name_servers ? item.name_servers.join(",") : "Unkown"
        const bd = this.meta.boundList[item.id]
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
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>域名列表</b>
            </div>
        </template>
        <el-table v-loading="loading" :data="domainList" table-layout="fixed">
            <el-table-column prop="name" label="域名" show-overflow-tooltip fixed />
            <el-table-column label="状态" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label="接入方式" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.type == "full" ? "NS" : scope.row.host?.name }}
                </template>
            </el-table-column>
            <el-table-column label="NS 服务器" show-overflow-tooltip>
                <template #default="scope">
                    <template v-if="scope.row.name_servers">
                        {{ scope.row.name_servers.join(",") }}
                    </template>
                    <template v-else>
                        Unknown
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="套餐" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.plan.name }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="meta.boundList[scope.row.id]" link icon="View" @click="syncDomian(scope.row)">
                        同步
                    </el-button>
                    <el-button v-else link type="primary" icon="View" @click="bindDomian(scope.row)">
                        导入
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
