<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { QcApi } from "@/api"
import * as QC from "@/api/qcloud/typings"
import { DomainItem } from "@/api/local/domain"

import RecordCreate from "./record_create.vue"
import RecordUpdate from "./record_update.vue"

@Component({
    components: { RecordCreate, RecordUpdate }
})
export default class DnspodDomain extends Vue {
    @Ref
    public createModal!: typeof RecordCreate

    @Ref
    public updateModal!: typeof RecordUpdate

    @Prop
    public meta!: Omit<DomainItem, "CloudMeta"> & {
        CloudMeta: QC.Dnspod.DomainListItem
    }

    // 初始化

    public created() {
        QcApi.vendor(this.meta.VendorId)
        this.getDomain()
        this.getRecordList()
    }

    // 域名概要

    public domainInfo!: QC.Dnspod.DomainInfo

    async getDomain() {
        const res = await QcApi.dnspod.describeDomain({
            Domain: this.meta.Name
        })
        if (res.DomainInfo) {
            this.domainInfo = res.DomainInfo
        }
    }

    // 域名记录

    public recordList!: QC.Dnspod.RecordListItem[]
    public recordCountInfo!: QC.Dnspod.RecordCountInfo

    async getRecordList() {
        const res = await QcApi.dnspod.describeRecordList({
            Domain: this.meta.Name
        })
        if (res.RecordCountInfo) {
            this.recordList = res.RecordList || []
            this.recordCountInfo = res.RecordCountInfo
        }
    }

    // 删除记录

    async deleteRecord(recordId: number) {
        const query: QC.Dnspod.DeleteRecordRequest = {
            Domain: this.meta.Name,
            RecordId: recordId
        }
        await QcApi.dnspod.deleteRecord(query)
        this.getRecordList()
    }
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>解析列表</b> &nbsp; &nbsp;
                <small>记录总数: {{ recordCountInfo?.TotalCount || 0 }}</small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" @click="createModal?.open(domainInfo)">
                    添加记录
                </el-button>
            </div>
        </template>
        <el-table v-loading="!recordList" :data="recordList" table-layout="fixed">
            <el-table-column prop="Name" label="主机记录" show-overflow-tooltip fixed />
            <el-table-column prop="Type" label="记录类型" show-overflow-tooltip />
            <el-table-column prop="Line" label="线路类型" show-overflow-tooltip />
            <el-table-column prop="Value" label="记录值" show-overflow-tooltip />
            <el-table-column prop="TTL" label="TTL" show-overflow-tooltip />
            <el-table-column label="状态" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.Status == "ENABLE" ? "启用" : "禁用" }}
                </template>
            </el-table-column>
            <el-table-column prop="Remark" label="备注" show-overflow-tooltip />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit" @click="updateModal?.open(domainInfo, scope.row)">
                        编辑
                    </el-button>
                    <el-popconfirm title="确定删除?" @confirm="deleteRecord(scope.row.RecordId)">
                        <template #reference>
                            <el-button link type="danger" icon="Delete">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <RecordCreate ref="createModal" @close="getRecordList" />
    <RecordUpdate ref="updateModal" @close="getRecordList" />
</template>
