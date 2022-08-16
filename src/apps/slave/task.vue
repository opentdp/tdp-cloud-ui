
<script lang="ts" setup>
import { onUnmounted, ref } from "vue"

import VueJsonPretty from "vue-json-pretty"
import "vue-json-pretty/lib/styles.css"

import { Api } from "@/api"
import { TaskItem } from "@/api/local/slave"
import { dateFormat } from "@/helper/utils"

const taskList = ref<TaskItem[]>([])
const expanded = ref(false)

async function getHistory() {
    const data = await Api.slave.listTask()
    taskList.value = data
}

async function onExpand(row: TaskItem[], rs: TaskItem[]) {
    expanded.value = rs.length > 0
}

// 初始化

getHistory()

const timer = setInterval(() => {
    expanded.value || getHistory()
}, 5000)

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
            <el-table :data="taskList" @expand-change="onExpand">
                <el-table-column prop="Id" label="任务ID" />
                <el-table-column prop="HostName" label="主机名" />
                <el-table-column prop="Subject" label="任务名称" />
                <el-table-column prop="Status" label="执行状态" />
                <el-table-column label="更新时间" min-width="80">
                    <template #default="scope">
                        {{ dateFormat(scope.row.UpdatedAt * 1000, "yyyy-MM-dd hh:mm:ss") }}
                    </template>
                </el-table-column>
                <el-table-column label="详情" width="60" type="expand">
                    <template #default="scope">
                        <vue-json-pretty :data="JSON.parse(scope.row.Content)" />
                        <pre class="console">{{ JSON.parse(scope.row.Result).Output || "无输出" }}</pre>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.console {
    padding: 8px;
    background: #000;
    color: #fff;
}

.vjs-tree {
    padding: 8px;
}
</style>
