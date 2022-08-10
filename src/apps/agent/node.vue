<script lang="ts" setup>
import { ref } from "vue"

import { Api } from "@/api"

const nodeList = ref<{ Ip: string }[]>([])

async function fetchNodes() {
    const res = await Api.agent.fetch()
    nodeList.value = res
}

async function runShell(addr: string) {
    await Api.agent.shell({
        Addr: addr,
        Payload: {
            Content: "string",
            Username: "string",
            CommandType: "string",
            WorkingDirectory: "string",
            Timeout: 30,
        }
    })
}

fetchNodes()
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
                <el-table-column prop="Addr" label="地址" />
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View" @click="runShell(scope.row.Addr)">
                            测试
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
