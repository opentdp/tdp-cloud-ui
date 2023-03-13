<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { CfApi } from "@/api"
import * as CF from "@/api/cloudflare/typings"
import { DomainItem } from "@/api/native/domain"

import CustomHostnames from "./custom_hostnames.vue"

import RecordCreate from "./record_create.vue"
import RecordUpdate from "./record_update.vue"

@Component({
    components: { RecordCreate, RecordUpdate, CustomHostnames }
})
export default class CloudflareDomain extends Vue {
    @Ref
    public createModal!: RecordCreate

    @Ref
    public updateModal!: RecordUpdate

    @Prop
    public domain!: Omit<DomainItem, "CloudMeta"> & {
        CloudMeta: CF.ZoneItem
    }

    // 初始化

    public created() {
        CfApi.vendor(this.domain.VendorId)
        this.domainInfo = this.domain.CloudMeta
        this.getDomain()
        this.getRecordList()
    }

    // 域名概要

    public domainInfo!: CF.ZoneItem

    async getDomain() {
        const res = await CfApi.zones.detail(this.domainInfo.id)
        this.domainInfo = res.Datasets
    }

    // 解析记录

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

    // 表格定义

    public tableColumns = [
        { colKey: 'zone_name', title: '主机记录', ellipsis: true },
        { colKey: 'type', title: '记录类型', ellipsis: true },
        { colKey: 'content', title: '记录值', ellipsis: true },
        { colKey: 'proxied', title: '加速', ellipsis: true },
        { colKey: 'ttl', title: 'TTL', ellipsis: true },
        { colKey: 'comment', title: '备注', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-card title="解析列表" hover-shadow header-bordered>
            <template #subtitle>
                <small>记录总数: {{ recordList?.length || 0 }}</small>
            </template>
            <template #actions>
                <t-button theme="primary" size="small" @click="createModal.open(domainInfo)">
                    <template #icon>
                        <t-icon name="add" />
                    </template>
                    添加记录
                </t-button>
            </template>
            <t-table v-loading="!recordList" :data="recordList" :columns="tableColumns" row-key="id">
                <template #zone_name="{ row }">
                    {{ row.name.replace(row.zone_name, "").replace(/\.$/, "") || "@" }}
                </template>
                <template #proxied="{ row }">
                    {{ row.proxied ? "已启用" : "已禁用" }}
                </template>
                <template #ttl="{ row }">
                    {{ row.ttl > 1 ? row.ttl : "自动" }}
                </template>
                <template #Operation="{ row }">
                    <t-link theme="primary" hover="color" @click="updateModal.open(row)">
                        编辑
                    </t-link>
                    <t-popconfirm content="确定删除?" @confirm="deleteRecord(row.id)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>

        <template v-if="domainInfo?.type == 'full'">
            <CustomHostnames :domain-info="domainInfo" />
        </template>
    </t-space>

    <RecordCreate ref="createModal" @submit="getRecordList" />
    <RecordUpdate ref="updateModal" @submit="getRecordList" />
</template>
