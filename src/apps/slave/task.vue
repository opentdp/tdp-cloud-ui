
<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'

import { Api } from "@/api"
import { dateFormat } from "@/helper/utils"

const taskList = ref([])

async function getHistory() {
    const data = await Api.slave.listTask()
    taskList.value = data
}

// 初始化

getHistory()

const timer = setInterval(getHistory, 5000)
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
                任务记录
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>历史记录</b> &nbsp; &nbsp;
                    <small>记录总数: {{ taskList.length }}</small>
                </div>
            </template>
            <el-table :data="taskList">
                <el-table-column prop="Id" label="任务ID" />
                <el-table-column prop="HostName" label="主机名" />
                <el-table-column prop="Subject" label="任务名称" />
                <el-table-column prop="Status" label="执行状态" />
                <el-table-column label="更新时间" min-width="80">
                    <template #default="scope">
                        {{ dateFormat(scope.row.UpdatedAt * 1000, "yyyy-MM-dd hh:mm:ss") }}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
