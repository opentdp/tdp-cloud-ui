<script lang="ts" setup>
import { ref } from "vue"

import { Api } from "@/api"

const nodeList = ref<{ Ip: string }[]>([])
const agentKey = ref("")

const agentUrl = location.origin.replace(/^http/, "ws") + "/wsi/agent/"

async function getNodes() {
    const res = await Api.agent.getNodes()
    nodeList.value = res
}

async function getAgentKey() {
    const res = await Api.config.detail("AgentKey")
    agentKey.value = res.Value
}

async function runCommand(addr: string) {
    await Api.agent.runCommand({
        Addr: addr,
        Payload: {
            Content: `
cd /d d:\\
dir
            `,
            Username: "root",
            CommandType: "CMD",
            WorkingDirectory: "/root",
            Timeout: 30,
        }
    })
}

getNodes()
getAgentKey()
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                子节点
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>子节点列表</b>
                </div>
            </template>
            <el-table :data="nodeList" style="width: 100%">
                <el-table-column prop="Addr" label="地址" />
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View" @click="runCommand(scope.row.Addr)">
                            测试
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-alert title="子节点接入命令" type="success" :description="'tdpc -agent ' + agentUrl + agentKey" show-icon />
    </div>
</template>
