<script lang="ts" setup>
import { ref, onUnmounted } from "vue"

import { Api } from "@/api"
import { AgentNode } from "@/api/local/agent"

import { bytesToSize } from "@/helper/utils"

const nodeList = ref<AgentNode[]>([])
const agentUrl = Api.socket.getAgentURL()

async function getNodeList() {
    const res = await Api.agent.listNode()
    nodeList.value = res
}

// async function runCommand(addr: string) {
//     await Api.agent.runCommand({
//         Addr: addr,
//         Payload: {
//             Content: `
// cd /d d:\\
// dir
//             `,
//             Username: "root",
//             CommandType: "CMD",
//             WorkingDirectory: "/root",
//             Timeout: 30,
//         }
//     })
// }

getNodeList()

const timer = setInterval(getNodeList, 15000)
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
                            :percentage="+scope.row.Stat.CpuPercent.toFixed(2)" status="success">
                            {{ scope.row.Stat.CpuPercent.toFixed(2) }}%，{{ scope.row.Stat.CpuCore }} Cores
                        </el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="内存">
                    <template #default="scope">
                        <el-progress :text-inside="true" :stroke-width="26"
                            :percentage="scope.row.Stat.MemoryUsed/scope.row.Stat.MemoryTotal*100" status="success">
                            {{ bytesToSize(scope.row.Stat.MemoryUsed) }} / {{ bytesToSize(scope.row.Stat.MemoryTotal) }}
                        </el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="硬盘">
                    <template #default="scope">
                        <el-progress :text-inside="true" :stroke-width="26"
                            :percentage="scope.row.Stat.DiskUsed/scope.row.Stat.DiskTotal*100" status="success">
                            {{ bytesToSize(scope.row.Stat.DiskUsed) }} / {{ bytesToSize(scope.row.Stat.DiskTotal) }}
                        </el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="网络 In/Out">
                    <template #default="scope">
                        {{ bytesToSize(scope.row.Stat.NetBytesRecv) }} / {{ bytesToSize(scope.row.Stat.NetBytesSent) }}
                    </template>
                </el-table-column>
                <el-table-column label="运行时间">
                    <template #default="scope">
                        {{ (scope.row.Stat.Uptime/86400).toFixed(1) }} 天
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-alert title="子节点接入命令" type="success" :description="'tdpc -agent ' + agentUrl" show-icon />
    </div>
</template>

<style lang="scss" scoped>
.el-progress {
    --el-border-color-lighter: #ccc
}
</style>
