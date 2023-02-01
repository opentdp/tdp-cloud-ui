<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { DomainModels, DomainItem } from "@/api/local/domain"

@Component
export default class DomainList extends Vue {
    public DomainModels = DomainModels
    public loading = true

    public created() {
        this.getDomainList()
    }

    // 域名列表

    public domainList: DomainItem[] = []

    async getDomainList() {
        const res = await LoApi.domain.list()
        this.domainList = res.Datasets
        this.loading = false
    }

    // 删除域名

    async deleteDomain(idx: number) {
        const item = this.domainList[idx]
        await LoApi.domain.remove(item.Id)
        this.domainList.splice(idx, 1)
    }
}
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                域名管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>域名列表</b>
                    <small>域名总数: {{ domainList.length }}</small>
                </div>
            </template>
            <el-table v-loading="loading" :data="domainList" table-layout="fixed">
                <el-table-column prop="Name" label="域名" show-overflow-tooltip fixed />
                <el-table-column prop="NSList" label="NS 服务器" show-overflow-tooltip />
                <el-table-column prop="Model" label="类型" show-overflow-tooltip>
                    <template #default="scope">
                        {{ DomainModels[scope.row.Model] }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View">
                            <router-link :to="'/domain/detail/' + scope.row.Id">
                                管理
                            </router-link>
                        </el-button>
                        <el-popconfirm title="确定删除?" @confirm="deleteDomain(scope.$index)">
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
    </div>
</template>
