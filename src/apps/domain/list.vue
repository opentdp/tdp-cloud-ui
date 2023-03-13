<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { DomainModels, DomainItem } from "@/api/native/domain"

import UseCache from '@/store/cache'

@Component
export default class DomainList extends Vue {
    public DomainModels = DomainModels
    public cache = UseCache()

    public loading = true

    // 初始化

    public created() {
        this.cache.initVendorList()
        this.getDomainList()
    }

    // 域名列表

    public domainList: DomainItem[] = []

    async getDomainList() {
        const res = await NaApi.domain.list()
        this.domainList = res.Items
        this.loading = false
    }

    // 删除域名

    async deleteDomain(idx: number) {
        const item = this.domainList[idx]
        await NaApi.domain.remove(item.Id)
        this.domainList.splice(idx, 1)
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '域名', ellipsis: true },
        { colKey: 'NSList', title: 'NS 服务器', ellipsis: true },
        { colKey: 'Model', title: '云账号', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                域名管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card title="域名列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ domainList.length }}
            </template>
            <t-table v-loading="loading" :data="domainList" :columns="tableColumns" row-key="Id">
                <template #Model="{ row }">
                    <t-tooltip :content="DomainModels[row.Model]">
                        {{ cache.vendorList[row.VendorId]?.Description || "-" }}
                    </t-tooltip>
                </template>
                <template #Operation="{ row, rowIndex }">
                    <t-link v-route="'/domain/detail/' + row.Id" theme="primary" hover="color">
                        管理
                    </t-link>
                    <t-popconfirm content="确定删除?" @confirm="deleteDomain(rowIndex)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>
    </t-space>
</template>
