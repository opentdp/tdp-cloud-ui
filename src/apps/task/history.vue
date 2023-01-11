
<script lang="ts" setup>
import { onUnmounted, ref } from "vue"

import VueJsonPretty from "vue-json-pretty"
import "vue-json-pretty/lib/styles.css"

import { Api } from "@/api"
import { TaskHistoryItem } from "@/api/local/task_history"
import { dateFormat } from "@/helper/utils"

// 获取列表

const taskList = ref<TaskHistoryItem[]>([])
const expanded = ref(false)

async function getHistory() {
    const res = await Api.taskHistory.list()
    taskList.value = res
}

async function onExpand(row: TaskHistoryItem[], rs: TaskHistoryItem[]) {
    expanded.value = rs.length > 0
}

// 加载数据

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
                    <b>任务记录</b> &nbsp; &nbsp;
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
                        <div class="detail">
                            <h3>请求信息</h3>
                            <vue-json-pretty :data="scope.row.Request" />
                            <h3>响应内容</h3>
                            <pre class="console">{{ scope.row.Response.Output || "无" }}</pre>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.detail {
    margin: -8px 0;
    padding: 0 8px;

    .console {
        padding: 8px;
        background: #000;
        color: #fff;
    }
}
</style>
