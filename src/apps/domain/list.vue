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
            <el-table v-loading="loading" :data="domainList" table-layout="fixed">
                <el-table-column prop="Name" label="域名" fixed sortable show-overflow-tooltip />
                <el-table-column prop="NSList" label="NS 服务器" sortable show-overflow-tooltip />
                <el-table-column prop="Model" label="云账号" sortable show-overflow-tooltip>
                    <template #default="scope">
                        <t-tooltip :content="DomainModels[scope.row.Model]">
                            {{ cache.vendorList[scope.row.VendorId]?.Description || "-" }}
                        </t-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <t-link v-route="'/domain/detail/' + scope.row.Id" theme="primary" hover="color">
                            管理
                        </t-link>
                        <t-popconfirm content="确定删除?" @confirm="deleteDomain(scope.$index)">
                            <t-link theme="danger" hover="color">
                                删除
                            </t-link>
                        </t-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </t-card>
    </t-space>
</template>
