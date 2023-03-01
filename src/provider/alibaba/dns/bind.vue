<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi, AcApi } from "@/api"
import { DomainItem } from "@/api/native/domain"
import { dateFormat } from "@/helper/format"

@Component({
    emits: ["change"],
})
export default class DnsBind extends Vue {
    public dateFormat = dateFormat
    public loading = true

    @Prop
    public vendorId = 0

    @Prop
    public boundList: Record<string, DomainItem> = {}

    // 初始化

    public created() {
        AcApi.vendor(this.vendorId)
        this.getDomainList()
    }

    // 获取列表

    public domainList = []
    public domainCount = 0

    async getDomainList() {
        const res = await AcApi.alidns.describeDomainList()
        if (res.TotalCount > 0) {
            this.domainList = res.Domains.Domain || []
            this.domainCount = res.TotalCount
        }
        this.loading = false
    }

    // 绑定域名

    async bindDomian(item: any) {
        await NaApi.domain.create({
            VendorId: this.vendorId,
            Name: item.DomainName,
            NSList: item.DnsServers.DnsServer.join(","),
            Model: "alibaba/alidns",
            CloudId: item.DomainId,
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
            NSList: item.DnsServers.DnsServer.join(","),
            CloudId: item.DomainId,
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
                <small>记录总数: {{ domainCount }}</small>
            </div>
        </template>
        <el-table v-loading="loading" :data="domainList" table-layout="fixed">
            <el-table-column prop="DomainName" label="域名" show-overflow-tooltip fixed />
            <el-table-column prop="RecordCount" label="记录数" />
            <el-table-column label="NS 服务器" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.DnsServers.DnsServer.join(",") }}
                </template>
            </el-table-column>
            <el-table-column prop="VersionCode" label="套餐" show-overflow-tooltip />
            <el-table-column label="接入时间" show-overflow-tooltip>
                <template #default="scope">
                    {{ dateFormat(scope.row.CreateTimestamp, "yyyy-MM-dd hh:mm:ss") }}
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
    </el-card>
</template>
