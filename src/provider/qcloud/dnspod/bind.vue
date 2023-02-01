<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { LoApi, QcApi } from "@/api"
import * as QC from "@/api/qcloud/typings"
import { DomainStatusMap } from "@/api/qcloud/dnspod"
import { DomainItem } from "@/api/local/domain"

@Component
export default class DnspodBind extends Vue {
    public DomainStatusMap = DomainStatusMap

    public loading = true

    @Prop
    public meta!: {
        vendorId: number
        boundList: Record<string, DomainItem>
    }

    // 初始化

    public created() {
        QcApi.vendor(this.meta.vendorId)
        this.getDomainList()
    }

    // 获取列表

    public domainList: QC.Dnspod.DomainListItem[] = []
    public domainCount = 0

    async getDomainList() {
        const res = await QcApi.dnspod.describeDomainList()
        if (res.DomainCountInfo) {
            this.domainList = res.DomainList || []
            this.domainCount = res.DomainCountInfo.AllTotal
        }
        this.loading = false
    }

    // 绑定域名

    public bindDomian(item: QC.Dnspod.DomainListItem) {
        LoApi.domain.create({
            VendorId: this.meta.vendorId,
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

    public syncDomian(item: QC.Dnspod.DomainListItem) {
        const bd = this.meta.boundList[item.DomainId]
        LoApi.domain.update({
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
            <el-table-column prop="Name" label="域名" show-overflow-tooltip fixed />
            <el-table-column label="状态" show-overflow-tooltip>
                <template #default="scope">
                    {{ DomainStatusMap[scope.row.Status] }}
                </template>
            </el-table-column>
            <el-table-column prop="RecordCount" label="记录数" show-overflow-tooltip />
            <el-table-column prop="EffectiveDNS" label="NS 服务器" show-overflow-tooltip />
            <el-table-column label="NS 记录" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.DNSStatus ? "错误" : "正常" }}
                </template>
            </el-table-column>
            <el-table-column prop="GradeTitle" label="套餐" show-overflow-tooltip />
            <el-table-column prop="VipEndAt" label="套餐有效期" show-overflow-tooltip />
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="meta.boundList[scope.row.DomainId]" link icon="View"
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
