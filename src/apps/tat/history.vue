
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue"
import { ElMessage, ElTable } from "element-plus"
import { Base64 } from 'js-base64'

import { Api, QApi } from "@/api"
import { TATHistoryItem } from '@/api/local/tat'
import { TAT } from "@/api/qcloud/typings"

const historyList = ref<TATHistoryItem[]>([])
const loadingHistory = ref(false)

let need_update_history_list = true

async function do_update_history_list() {
    if (historyList.value.length == 0) {
        if (need_update_history_list) {
            setTimeout(do_update_history_list, 1000)
            return
        }
    }

    const history_task_list = historyList.value.filter(item => item.InvocationStatus == "" || item.InvocationStatus.endsWith("ING"))
    if (history_task_list.length == 0) {
        if (need_update_history_list) {
            setTimeout(do_update_history_list, 1000)
            return
        }
    }

    await Promise.all(historyList.value.map(async item => {
        if (item.InvocationStatus == "" || item.InvocationStatus.endsWith("ING")) {
            const his_res = await QApi.tat.describeInvocations(item.Region, { InvocationIds: [item.InvocationId] })
            await Api.tat.updateHistory(item.Id, {
                InvocationStatus: his_res.InvocationSet[0].InvocationStatus,
                InvocationResultJson: JSON.stringify(his_res.InvocationSet[0])
            })
            item.InvocationStatus = his_res.InvocationSet[0].InvocationStatus
            item.InvocationResultJson = JSON.stringify(his_res.InvocationSet[0])
        }
    })
    )
    if (need_update_history_list) {
        setTimeout(do_update_history_list, 1000)
    }
}

async function getHistory() {
    loadingHistory.value = true
    try {
        historyList.value = await Api.tat.listHistory()
    } catch (error) {
        ElMessage.error(error as string)
    }
    loadingHistory.value = false
}

async function onDeleteHistory(history_id: number) {
    try {
        await Api.tat.deleteHistory(history_id)
        historyList.value = historyList.value.filter(item => item.Id != history_id)
    } catch (error) {
        ElMessage.error(error as string)
    }
}

const historyDetail = ref<TAT.DescribeInvocationsResponse["InvocationSet"][number]>()
const historyDetailVisiable = ref(false)
const taskDetail = ref<TAT.DescribeInvocationTasksResponse["InvocationTaskSet"]>()

async function onShowHistory(row: TATHistoryItem) {
    historyDetail.value = undefined
    historyDetailVisiable.value = true
    taskDetail.value = []
    if (row.InvocationResultJson != "") {
        historyDetail.value = JSON.parse(row.InvocationResultJson)
        const task_res = await QApi.tat.describeInvocationTasks(row.Region, {
            InvocationTaskIds: historyDetail.value?.InvocationTaskBasicInfoSet.map(item => item.InvocationTaskId),
            HideOutput: false
        })
        taskDetail.value = task_res.InvocationTaskSet
    }
}

onMounted(async () => {
    getHistory()
    setTimeout(do_update_history_list, 1000)
})

onUnmounted(() => {
    need_update_history_list = false
})
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                自动化助手
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                历史记录
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>历史记录</b> &nbsp; &nbsp;
                    <small>记录总数: {{ historyList.length }}</small>
                </div>
            </template>
            <el-table v-loading="loadingHistory" :data="historyList">
                <el-table-column prop="InvocationId" label="执行ID" />
                <el-table-column prop="Name" label="命令名" min-width="150" />Í
                <el-table-column prop="InvocationStatus" label="执行状态" />
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View" @click="onShowHistory(scope.row)">
                            详情
                        </el-button>
                        <el-popconfirm title="确定删除?" @confirm="onDeleteHistory(scope.row.Id)">
                            <template #reference>
                                <el-button link type="danger" icon="Delete">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="historyDetailVisiable" title="历史详情">
            <div v-if="historyDetail && taskDetail" class="history-detail">
                <div class="title">
                    类型：{{ historyDetail.CommandType }}
                </div>
                <div class="title">
                    执行用户：{{ historyDetail.Username }}
                </div>
                <div class="title">
                    执行路径：{{ historyDetail.WorkingDirectory }}
                </div>
                <div class="title">
                    命令：
                </div>
                <pre class="cmd">{{ Base64.fromBase64(historyDetail.CommandContent) }}</pre>
                <div class="title">
                    结果{{ taskDetail.length == 0 ? "(正在查询。。。)" : "" }}：
                </div>
                <div v-for="task_item in taskDetail" :key="task_item.InvocationTaskId">
                    <span>{{ task_item.InstanceId }}:</span>
                    <pre class="result">{{ Base64.fromBase64(task_item.TaskResult.Output) }}</pre>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="historyDetailVisiable = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.history-detail {
    .title {
        padding-top: 10px;
    }

    .title:first {
        padding-top: 0px;
    }

    .cmd,
    .result {
        background-color: black;
        color: white;
        padding: 10px;
        overflow: auto;
    }
}
</style>
