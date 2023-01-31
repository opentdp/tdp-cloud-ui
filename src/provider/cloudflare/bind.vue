<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { LoApi, CfApi } from "@/api"
import { DomainItem } from "@/api/local/domain"

@Component
export default class CloudflareBind extends Vue {
    public loading = true

    @Prop
    public meta!: {
        vendorId: number
        boundList: Record<string, DomainItem>
    }

    public created() {
        CfApi.vendor(this.meta.vendorId)
        this.getDomainlist()
        CfApi.zones.dnsRecords("3bf29adb3736dda1506aca5084a71dfc")
    }

    // 获取列表

    public domainList: any[] = []
    public domainCount = 0

    async getDomainlist() {
        const res = await CfApi.zones.list()
        this.domainList = res.Datasets
        this.loading = false
    }

    // 绑定域名

    public bindDomian(item: any) {
        LoApi.domain.create({
            VendorId: this.meta.vendorId,
            Name: item.name,
            NSList: item.name_servers.join(","),
            Model: "cloudflare/zone",
            CloudId: item.id + '',
            CloudMeta: item,
            Description: "",
            Status: 1,
        })
    }

    // 同步域名

    public syncDomian(item: any) {
        const bd = this.meta.boundList[item.id]
        LoApi.domain.update({
            Id: bd ? bd.Id : 0,
            NSList: item.EffectiveDNS.join(","),
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
            <el-table-column fixed prop="name" label="域名" min-width="150" />
            <el-table-column label="状态">
                <template #default="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label="接入方式">
                <template #default="scope">
                    {{ scope.row.type == "full" ? "NS" : "CNAME" }}
                </template>
            </el-table-column>
            <el-table-column label="NS / CNAME后缀" min-width="180">
                <template #default="scope">
                    <template v-if="scope.row.name_servers">
                        <div>{{ scope.row.name_servers[0] }}</div>
                        <div>{{ scope.row.name_servers[1] }}</div>
                    </template>
                    <template v-if="scope.row.cname_suffix">
                        <div>{{ scope.row.cname_suffix }}</div>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="套餐" min-width="120">
                <template #default="scope">
                    {{ scope.row.plan.name }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="90" align="center">
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
