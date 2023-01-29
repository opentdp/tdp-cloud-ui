<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { Api, QApi } from "@/api"
import * as Qcloud from "@/api/qcloud/typings"
import { DomainStatusMap } from "@/api/qcloud/dnspod"
import { DomainItem } from "@/api/local/domain"

@Component
export default class DnspodBind extends Vue {
    public DomainStatusMap = DomainStatusMap

    public loading = true

    @Prop
    public vendorId = 0

    public created() {
        QApi.vendor(this.vendorId)
        this.getDomainList()
        this.getBoundDomainList()
    }

    // 获取列表

    public domainList: Qcloud.Dnspod.DomainListItem[] = []
    public domainCount = 0

    async getDomainList() {
        const res = await QApi.dnspod.describeDomainList()
        if (res.DomainCountInfo) {
            this.domainList = res.DomainList || []
            this.domainCount = res.DomainCountInfo.AllTotal
        }
        this.loading = false
    }

    // 已绑定域名

    public boundDomainList: Record<string, DomainItem> = {}

    async getBoundDomainList() {
        const res = await Api.domain.list()
        res.forEach((item) => {
            this.boundDomainList[item.CloudId] = item
        })
    }

    // 绑定域名

    public bindDomian(item: Qcloud.Dnspod.DomainListItem) {
        Api.domain.create({
            VendorId: this.vendorId,
            Name: item.Name,
            NSList: item.EffectiveDNS.join(","),
            Model: "qcloud/dnspod",
            CloudId: item.DomainId + '',
            CloudMeta: item,
            Description: "",
            Status: 1,
        })
    }

    // 同步域名

    public syncDomian(item: Qcloud.Dnspod.DomainListItem) {
        const bd = this.boundDomainList[item.DomainId]
        Api.domain.update({
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
        <el-table v-loading="loading" :data="domainList" table-layout="fixed">
            <el-table-column fixed prop="Name" label="域名" min-width="150" />
            <el-table-column label="状态" min-width="80">
                <template #default="scope">
                    {{ DomainStatusMap[scope.row.Status] }}
                </template>
            </el-table-column>
            <el-table-column prop="RecordCount" label="记录数" min-width="80" />
            <el-table-column prop="EffectiveDNS" label="NS 服务器" min-width="250" />
            <el-table-column label="NS 记录" min-width="80">
                <template #default="scope">
                    {{ scope.row.DNSStatus ? "错误" : "正常" }}
                </template>
            </el-table-column>
            <el-table-column prop="GradeTitle" label="套餐" min-width="80" />
            <el-table-column prop="VipEndAt" label="套餐有效期" min-width="180" />
            <el-table-column fixed="right" label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="boundDomainList[scope.row.DomainId]" link icon="View"
                        @click="syncDomian(scope.row)"
                    >
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
