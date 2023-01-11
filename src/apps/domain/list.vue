<script lang="ts" setup>
import { ref, reactive } from "vue"

import { Api } from "@/api"
import { DomainItem } from "@/api/local/domain"

// 域名列表

const fetchWait = ref(1)

const domainList = reactive<DomainItem[]>([])

async function getDomainList() {
    const res = await Api.domain.list()
    domainList.push(...res)
    fetchWait.value = 0
}

// 删除域名

async function deleteDomain(idx: number) {
    const item = domainList[idx]
    await Api.domain.remove(item.Id)
    domainList.splice(idx, 1)
}

// 加载数据

getDomainList()
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
            <el-table v-loading="fetchWait > 0" :data="domainList" table-layout="fixed">
                <el-table-column fixed prop="Name" label="域名" min-width="120" />
                <el-table-column prop="Model" label="来源" />
                <el-table-column fixed="right" label="操作" width="180" align="center">
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
