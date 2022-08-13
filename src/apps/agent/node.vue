<script lang="ts" setup>
import { ref, onUnmounted } from "vue"

import { bytesToSize } from "@/helper/utils"

import { Api } from "@/api"
import { AgentNode } from "@/api/local/agent"

const nodeList = ref<AgentNode[]>([])
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

const timer = setInterval(getNodes, 5000)
onUnmounted(() => {
    clearInterval(timer)
})
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
                <el-table-column label="主机名">
                    <template #default="scope">
                        {{ scope.row.Stat.Hostname }}
                    </template>
                </el-table-column>
                <el-table-column label="CPU">
                    <template #default="scope">
                        <el-progress :text-inside="true" :stroke-width="26"
                            :percentage="scope.row.Stat.CpuPercent.toFixed(2)" status="success" />
                    </template>
                </el-table-column>
                <el-table-column label="内存">
                    <template #default="scope">
                        <el-progress :text-inside="true" :stroke-width="26"
                            :percentage="scope.row.Stat.MemoryPercent.toFixed(2)" status="success" />
                    </template>
                </el-table-column>
                <el-table-column label="主分区">
                    <template #default="scope">
                        <el-progress :text-inside="true" :stroke-width="26"
                            :percentage="scope.row.Stat.DiskUsedPercent.toFixed(2)" status="success" />
                    </template>
                </el-table-column>
                <el-table-column label="网络">
                    <template #default="scope">
                        In: {{ bytesToSize(scope.row.Stat.NetBytesRecv) }} <br>
                        Out: {{ bytesToSize(scope.row.Stat.NetBytesSent) }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180">
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

<style lang="scss" scoped>
.el-progress {
    --el-border-color-lighter: #ccc
}
</style>
