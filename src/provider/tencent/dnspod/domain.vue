<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { TcApi } from "@/api"
import { DomainItem } from "@/api/native/domain"
import * as TC from "@/api/tencent/typings"

import RecordCreate from "./record_create.vue"
import RecordUpdate from "./record_update.vue"

@Component({
    components: { RecordCreate, RecordUpdate }
})
export default class DnspodDomain extends Vue {
    @Ref
    public createModal!: RecordCreate

    @Ref
    public updateModal!: RecordUpdate

    @Prop
    public domain!: Omit<DomainItem, "CloudMeta"> & {
        CloudMeta: TC.Dnspod.DomainListItem
    }

    // 初始化

    public created() {
        TcApi.vendor(this.domain.VendorId)
        this.getDomain()
        this.getRecordList()
    }

    // 域名概要

    public domainInfo!: TC.Dnspod.DomainInfo

    async getDomain() {
        const res = await TcApi.dnspod.describeDomain({
            Domain: this.domain.Name
        })
        if (res.DomainInfo) {
            this.domainInfo = res.DomainInfo
        }
    }

    // 解析记录

    public recordList!: TC.Dnspod.RecordListItem[]
    public recordCountInfo!: TC.Dnspod.RecordCountInfo

    async getRecordList() {
        const res = await TcApi.dnspod.describeRecordList({
            Domain: this.domain.Name
        })
        if (res.RecordCountInfo) {
            this.recordList = res.RecordList || []
            this.recordCountInfo = res.RecordCountInfo
        }
    }

    // 删除记录

    async deleteRecord(recordId: number) {
        const query: TC.Dnspod.DeleteRecordRequest = {
            Domain: this.domain.Name,
            RecordId: recordId
        }
        await TcApi.dnspod.deleteRecord(query)
        this.getRecordList()
    }
}
</script>

<template>
    <t-card title="解析列表" hover-shadow header-bordered>
        <template #subtitle>
            <small>记录总数: {{ recordCountInfo?.TotalCount || 0 }}</small>
        </template>
        <template #actions>
            <el-button type="primary" plain size="small" @click="createModal.open(domainInfo)">
                添加记录
            </el-button>
        </template>
        <el-table v-loading="!recordList" :data="recordList" table-layout="fixed">
            <el-table-column prop="Name" label="主机记录" fixed sortable show-overflow-tooltip />
            <el-table-column prop="Type" label="记录类型" sortable show-overflow-tooltip />
            <el-table-column prop="Line" label="线路类型" sortable show-overflow-tooltip />
            <el-table-column prop="Value" label="记录值" sortable show-overflow-tooltip />
            <el-table-column prop="TTL" label="TTL" sortable show-overflow-tooltip />
            <el-table-column prop="Status" label="状态" sortable show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.Status == "ENABLE" ? "启用" : "禁用" }}
                </template>
            </el-table-column>
            <el-table-column prop="Remark" label="备注" show-overflow-tooltip />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit" @click="updateModal.open(domainInfo, scope.row)">
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
    </t-card>

    <RecordCreate ref="createModal" @submit="getRecordList" />
    <RecordUpdate ref="updateModal" @submit="getRecordList" />
</template>
