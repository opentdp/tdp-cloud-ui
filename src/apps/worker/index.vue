<script lang="ts" setup>
import { ref, onUnmounted } from "vue"

import { ElTable } from "element-plus"

import { Api } from "@/api"
import { Worker } from "@/api/local/worker"
import { TATScriptItem } from '@/api/local/tat'

import { bytesToSize } from "@/helper/utils"

const agentUrl = Api.socket.getAgentURL()

// 节点列表

const workerList = ref<Worker[]>([])

async function getWorkerList() {
    const res = await Api.worker.list()
    workerList.value = res
}

// 选中节点

const selectedWorker = ref()

function setCurrentRow(n: Worker) {
    selectedWorker.value = n
}

// 执行快捷命令

const cmdlist = ref<TATScriptItem[]>([])

async function getTATScriptList() {
    const res = await Api.tat.listScript()
    cmdlist.value = res
}

async function nodeExec(script: TATScriptItem) {
    await Api.worker.exec({
        HostId: selectedWorker.value.HostId,
        Payload: script
    })
}

// 初始化

getWorkerList()
getTATScriptList()

const timer = setInterval(getWorkerList, 15000)
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
                节点管理
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-alert title="节点接入命令" type="success" :description="'tdpc --master ' + agentUrl" show-icon />
        <div class="mgb10" />

        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>节点列表</b>
                    <small>点击节点可执行快捷命令</small>
                </div>
            </template>
            <el-table ref="tableRef" :data="workerList" highlight-current-row @current-change="setCurrentRow">
                <el-table-column prop="RemoteAddr" label="地址" />
                <el-table-column label="主机名">
                    <template #default="scope">
                        {{ scope.row.SystemStat.HostName }}
                    </template>
                </el-table-column>
                <el-table-column label="CPU">
                    <template #default="scope">
                        <el-progress :text-inside="true" :stroke-width="26"
                            :percentage="+scope.row.SystemStat.CpuPercent.toFixed(2)" status="success">
                            {{ scope.row.SystemStat.CpuPercent.toFixed(2) }}%，
                            {{ scope.row.SystemStat.CpuCore }} Cores
                        </el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="内存">
                    <template #default="scope">
                        <el-progress :text-inside="true" :stroke-width="26"
                            :percentage="scope.row.SystemStat.MemoryUsed / scope.row.SystemStat.MemoryTotal * 100"
                            status="success">
                            {{ bytesToSize(scope.row.SystemStat.MemoryUsed) }} /
                            {{ bytesToSize(scope.row.SystemStat.MemoryTotal) }}
                        </el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="硬盘">
                    <template #default="scope">
                        <el-progress :text-inside="true" :stroke-width="26"
                            :percentage="scope.row.SystemStat.DiskUsed / scope.row.SystemStat.DiskTotal * 100"
                            status="success">
                            {{ bytesToSize(scope.row.SystemStat.DiskUsed) }} /
                            {{ bytesToSize(scope.row.SystemStat.DiskTotal) }}
                        </el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="网络 In/Out">
                    <template #default="scope">
                        {{ bytesToSize(scope.row.SystemStat.NetBytesRecv) }} /
                        {{ bytesToSize(scope.row.SystemStat.NetBytesSent) }}
                    </template>
                </el-table-column>
                <el-table-column label="运行时间">
                    <template #default="scope">
                        {{ (scope.row.SystemStat.Uptime / 86400).toFixed(1) }} 天
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card v-if="selectedWorker?.HostId" shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>快捷命令</b>
                </div>
            </template>
            <div class="button-list">
                <el-button v-for="item in cmdlist" :key="item.Id" @click="nodeExec(item)">
                    {{ item.Name }}
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.el-progress {
    --el-border-color-lighter: #ccc
}
</style>
