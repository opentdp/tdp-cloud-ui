<script lang="ts">
import { Ref, Prop, Component, Vue } from "@/apps/basic"

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

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '主机记录', ellipsis: true },
        { colKey: 'Type', title: '记录类型', ellipsis: true },
        { colKey: 'Line', title: '线路类型', ellipsis: true },
        { colKey: 'Value', title: '记录值', ellipsis: true },
        { colKey: 'TTL', title: 'TTL', ellipsis: true },
        { colKey: 'Status', title: '状态', ellipsis: true },
        { colKey: 'Remark', title: '备注', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
}
</script>

<template>
    <t-card :loading="!recordList" title="解析列表" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ recordCountInfo?.TotalCount || 0 }}
        </template>
        <template #actions>
            <t-button theme="primary" @click="createModal.open(domainInfo)">
                <template #icon>
                    <t-icon name="add" />
                </template>
                添加记录
            </t-button>
        </template>
        <t-table :data="recordList" :columns="tableColumns" row-key="recordId" hover>
            <template #Status="{ row }">
                {{ row.Status == "ENABLE" ? "启用" : "禁用" }}
            </template>
            <template #Operation="{ row }">
                <t-link theme="primary" hover="color" @click="updateModal.open(domainInfo, row)">
                    编辑
                </t-link>
                <t-popconfirm content="确定删除?" @confirm="deleteRecord(row.RecordId)">
                    <t-link theme="danger" hover="color">
                        删除
                    </t-link>
                </t-popconfirm>
            </template>
        </t-table>
    </t-card>

    <RecordCreate ref="createModal" @submit="getRecordList" />
    <RecordUpdate ref="updateModal" @submit="getRecordList" />
</template>
