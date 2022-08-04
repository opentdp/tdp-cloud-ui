<script lang="ts" setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

import { QApi, Dnspod } from "@/api"

const route = useRoute()

const domain = route.params.domain as string

const record = ref<Dnspod.DescribeRecordListResponse>()

async function getRecordList() {
    const data = await QApi.dnspod.describeRecordList({
        Domain: domain
    })
    record.value = data
}

getRecordList()
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item to="/dnspod/index">
                域名列表
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ domain || "详情" }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-if="record" shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>解析列表 - {{ domain }}</b>
                    <small>记录总数: {{ record.RecordCountInfo.TotalCount }}</small>
                </div>
            </template>
            <el-table :data="record.RecordList" table-layout="fixed">
                <el-table-column fixed prop="Name" label="主机记录" min-width="100" />
                <el-table-column prop="Type" label="记录类型" min-width="100" />
                <el-table-column prop="Line" label="线路类型" min-width="100" />
                <el-table-column prop="Value" label="记录值" min-width="200" />
                <el-table-column label="MX" min-width="80">
                    <template #default="scope">
                        {{ scope.row.MX > 0 ? scope.row.MX : "-" }}
                    </template>
                </el-table-column>
                <el-table-column prop="TTL" label="TTL" min-width="80" />
                <el-table-column label="状态" min-width="80">
                    <template #default="scope">
                        {{ scope.row.Status === "ENABLE" ? "启用" : "禁用" }}
                    </template>
                </el-table-column>
                <el-table-column prop="Remark" label="备注" min-width="150" />
            </el-table>
        </el-card>
    </div>
</template>
