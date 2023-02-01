<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { CfApi } from "@/api"
import * as CF from "@/api/cloudflare/typings"
import { DomainItem } from "@/api/local/domain"

import RecordCreate from "./record_create.vue"
import RecordUpdate from "./record_update.vue"

@Component({
    components: { RecordCreate, RecordUpdate }
})
export default class CloudflareDomain extends Vue {
    @Ref
    public createModal!: typeof RecordCreate

    @Ref
    public updateModal!: typeof RecordUpdate

    @Prop
    public meta!: Omit<DomainItem, "CloudMeta"> & {
        CloudMeta: CF.ZoneItem
    }

    // 初始化

    public created() {
        CfApi.vendor(this.meta.VendorId)
        this.domainInfo = this.meta.CloudMeta
        this.getDomain()
        this.getRecordList()
    }

    // 域名概要

    public domainInfo!: CF.ZoneItem

    async getDomain() {
        const res = await CfApi.zones.detail(this.domainInfo.id)
        this.domainInfo = res.Datasets
    }

    // 域名记录

    public recordList!: CF.ZoneRecordItem[]

    async getRecordList() {
        const res = await CfApi.zones.dnsRecords(this.domainInfo.id)
        this.recordList = res.Datasets
    }

    // 删除记录

    async deleteRecord(id: string) {
        await CfApi.zones.dnsRecordDelete(this.domainInfo.id, id)
        this.getRecordList()
    }
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>解析列表</b> &nbsp; &nbsp;
                <small>记录总数: {{ recordList?.length || 0 }}</small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" @click="createModal?.open(domainInfo)">
                    添加记录
                </el-button>
            </div>
        </template>
        <el-table v-loading="!recordList" :data="recordList" table-layout="fixed">
            <el-table-column label="主机记录" show-overflow-tooltip fixed>
                <template #default="scope">
                    {{ scope.row.name.replace(scope.row.zone_name, "").replace(/\.$/, "") || "@" }}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="记录类型" show-overflow-tooltip />
            <el-table-column prop="content" label="记录值" show-overflow-tooltip min-width="120" />
            <el-table-column label="加速" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.proxied ? "已启用" : "已禁用" }}
                </template>
            </el-table-column>
            <el-table-column prop="ttl" label="TTL" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.ttl > 1 ? scope.row.ttl : "自动" }}
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="备注" show-overflow-tooltip />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit" @click="updateModal?.open(scope.row)">
                        编辑
                    </el-button>
                    <el-popconfirm title="确定删除?" @confirm="deleteRecord(scope.row.id)">
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
