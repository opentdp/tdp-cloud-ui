<script lang="ts" setup>
import { ref, reactive } from "vue"

import { Api } from "@/api"
import { DomainItem } from "@/api/local/domain"

const fetchWait = ref(1)
const domainList = reactive<DomainItem[]>([])

async function getDomainList() {
    const res = await Api.machine.list()
    domainList.push(...res)
    fetchWait.value = 0
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
                <el-table-column fixed prop="Name" label="域名" min-width="150" />
                <el-table-column prop="RecordCount" label="记录数" min-width="80" />
                <el-table-column prop="EffectiveDNS" label="NS 服务器" min-width="250" />
                <el-table-column label="NS 记录" min-width="80">
                    <template #default="scope">
                        {{ scope.row.DNSStatus ? "错误" : "正常" }}
                    </template>
                </el-table-column>
                <el-table-column prop="GradeTitle" label="套餐" min-width="80" />
                <el-table-column prop="VipEndAt" label="套餐有效期" min-width="180" />
                <el-table-column fixed="right" label="操作" width="90" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View">
                            <router-link :to="'/dnspod/detail/' + scope.row.Name">
                                管理
                            </router-link>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
