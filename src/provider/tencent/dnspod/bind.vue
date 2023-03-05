<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi, TcApi } from "@/api"
import { DomainItem } from "@/api/native/domain"
import { DomainStatusMap } from "@/api/tencent/dnspod"
import * as TC from "@/api/tencent/typings"

@Component({
    emits: ["change"]
})
export default class DnspodBind extends Vue {
    public DomainStatusMap = DomainStatusMap

    public loading = true

    @Prop
    public vendorId = 0

    @Prop
    public boundList: Record<string, DomainItem> = {}

    // 初始化

    public created() {
        TcApi.vendor(this.vendorId)
        this.getDomainList()
    }

    // 获取列表

    public domainList: TC.Dnspod.DomainListItem[] = []
    public domainCount = 0

    async getDomainList() {
        const res = await TcApi.dnspod.describeDomainList()
        if (res.DomainCountInfo) {
            this.domainList = res.DomainList || []
            this.domainCount = res.DomainCountInfo.AllTotal
        }
        this.loading = false
    }

    // 绑定域名

    async bindDomian(item: TC.Dnspod.DomainListItem) {
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

    public syncDomian(item: TC.Dnspod.DomainListItem) {
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
                <small>记录总数: {{ domainCount }}</small>
            </div>
        </template>
        <el-table v-loading="loading" :data="domainList" table-layout="fixed">
            <el-table-column prop="Name" label="域名" fixed sortable show-overflow-tooltip />
            <el-table-column prop="Status" label="状态" sortable show-overflow-tooltip>
                <template #default="scope">
                    {{ DomainStatusMap[scope.row.Status] }}
                </template>
            </el-table-column>
            <el-table-column prop="RecordCount" label="记录数" sortable show-overflow-tooltip />
            <el-table-column prop="EffectiveDNS" label="NS 服务器" show-overflow-tooltip />
            <el-table-column prop="DNSStatus" label="NS 记录" sortable show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.DNSStatus ? "错误" : "正常" }}
                </template>
            </el-table-column>
            <el-table-column prop="GradeTitle" label="套餐" sortable show-overflow-tooltip />
            <el-table-column prop="VipEndAt" label="有效期" sortable show-overflow-tooltip />
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="boundList[scope.row.DomainId]" link icon="View" @click="syncDomian(scope.row)">
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
