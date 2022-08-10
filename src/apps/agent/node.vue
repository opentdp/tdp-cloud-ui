<script lang="ts" setup>
import { ref } from "vue"

import { Api } from "@/api"

const nodeList = ref<{ Ip: string }[]>([])

// 密钥列表

async function fetchAgents() {
    const res = await Api.agent.fetch()
    nodeList.value = res
}

fetchAgents()
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                Agent
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>Agent 列表</b>
                </div>
            </template>
            <el-table :data="nodeList" style="width: 100%">
                <el-table-column prop="Ip" label="IP 地址" />
            </el-table>
        </el-card>
    </div>
</template>
