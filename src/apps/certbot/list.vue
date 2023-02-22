<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { CertbotItem } from "@/api/native/certbot"

@Component
export default class DomainList extends Vue {
    public loading = true

    // 初始化

    public created() {
        this.getDomainList()
    }

    // 证书列表

    public certbotList: CertbotItem[] = []

    async getDomainList() {
        const res = await NaApi.certbot.list()
        this.certbotList = res.Datasets
        this.loading = false
    }

    // 删除证书

    async deleteDomain(idx: number) {
        const item = this.certbotList[idx]
        await NaApi.certbot.remove(item.Id)
        this.certbotList.splice(idx, 1)
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
                证书管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>证书列表</b>
                    <small>证书总数: {{ certbotList.length }}</small>
                </div>
            </template>
            <el-table v-loading="loading" :data="certbotList" table-layout="fixed">
                <el-table-column prop="Domain" label="证书" show-overflow-tooltip fixed />
                <el-table-column prop="Email" label="邮箱" show-overflow-tooltip fixed />
                <el-table-column prop="CaType" label="CA 类型" show-overflow-tooltip fixed />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <router-link :to="'/certbot/detail/' + scope.row.Id">
                            <el-button link type="primary" icon="View">
                                管理
                            </el-button>
                        </router-link>
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
