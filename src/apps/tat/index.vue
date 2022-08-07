<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                自动化助手
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>命令列表</b> &nbsp; &nbsp;
                    <small>命令总数: {{ tatList.length }}</small>
                    <div class="flex-auto" />
                    <el-button type="primary" plain size="small" icon="Plus" @click="onNew">
                        添加
                    </el-button>
                </div>
            </template>
            <el-table v-loading="loading" :data="tatList" row-key="Id">
                <el-table-column fixed prop="Name" label="名称" />
                <el-table-column prop="Description" label="描述" />
                <el-table-column prop="Content" label="命令" min-width="250" show-overflow-tooltip />
                <el-table-column fixed="right" label="操作" align="center" width="250">
                    <template #default="scope">
                        <el-button link type="primary" icon="View" @click="onRun(scope.row)">
                            运行
                        </el-button>
                        <el-button link type="primary" icon="Edit" @click="onEdit(scope.row)">
                            修改
                        </el-button>
                        <el-popconfirm title="确定删除?" @confirm="onDelete(scope.row.Id)">
                            <template #reference>
                                <el-button link type="primary" icon="Delete">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

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
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View" @click="onShowHistory(scope.row)">
                            详情
                        </el-button>
                        <el-popconfirm title="确定删除?" @confirm="onDeleteHistory(scope.row.Id)">
                            <template #reference>
                                <el-button link type="primary" icon="Delete">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="newDialogVisible" title="添加命令">
            <el-form :model="newForm" label-width="100px" label-suffix=":">
                <el-form-item label="名称">
                    <el-input v-model="newForm.Name" :maxlength="60" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="newForm.Description" :maxlength="120" />
                </el-form-item>
                <el-form-item label="命令类型">
                    <el-radio-group v-model="newForm.CommandType">
                        <el-radio label="SHELL" />
                        <el-radio label="POWERSHELL" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="执行路径">
                    <el-input v-model="newForm.WorkingDirectory" :placeholder="newForm.CommandType == 'SHELL' ? '非必填，默认为 /root' : '非必填，默认为 C:\\Program Files\\qcloud\\tat_agent\\workdir'" />
                </el-form-item>
                <el-form-item label="执行用户">
                    <el-input v-model="newForm.Username" :placeholder="newForm.CommandType == 'SHELL' ? '非必填，默认为 root' : '非必填，默认为 System'" />
                </el-form-item>
                <el-form-item label="命令">
                    <el-input v-model="newForm.Content" type="textarea" rows="5" />
                </el-form-item>
                <el-form-item label="超时时间">
                    <el-input-number v-model="newForm.Timeout" placeholder="非必填，默认为 60s" :min="1" :max="86400" :value-on-clear="60" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="newDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onNewSave">保存</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="editDialogVisible" title="修改命令">
            <el-form v-if="editForm" :model="editForm" label-width="100px" label-suffix=":">
                <el-form-item label="名称">
                    <el-input v-model="editForm.Name" :maxlength="60" />
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input v-model="editForm.Description" :maxlength="120" />
                </el-form-item>
                <el-form-item label="命令类型">
                    <el-radio-group v-model="editForm.CommandType">
                        <el-radio label="SHELL" />
                        <el-radio label="POWERSHELL" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="执行路径">
                    <el-input v-model="editForm.WorkingDirectory" :placeholder="editForm.CommandType == 'SHELL' ? '非必填，默认为 /root' : '非必填，默认为 C:\\Program Files\\qcloud\\tat_agent\\workdir'" />
                </el-form-item>
                <el-form-item label="执行用户">
                    <el-input v-model="editForm.Username" :placeholder="editForm.CommandType == 'SHELL' ? '非必填，默认为 root' : '非必填，默认为 System'" />
                </el-form-item>
                <el-form-item label="命令">
                    <el-input v-model="editForm.Content" type="textarea" rows="5" />
                </el-form-item>
                <el-form-item label="超时时间">
                    <el-input-number v-model="editForm.Timeout" placeholder="非必填，默认为 60s" :min="1" :max="86400" :value-on-clear="60" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onEditSave">保存</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="runDialogVisible" title="运行命令">
            <el-form :model="runForm" label-width="120px">
                <el-form-item label="命令">
                    <el-input v-model="runForm.Content" type="textarea" rows="5" />
                </el-form-item>
                <el-form-item label="执行用户">
                    <el-input v-model="runForm.Username" />
                </el-form-item>
                <el-form-item label="执行路径">
                    <el-input v-model="runForm.WorkingDirectory" />
                </el-form-item>
                <el-form-item label="选择执行实例">
                    <el-checkbox-group v-model="runForm.InstanceIds">
                        <el-checkbox v-for="item in LHInstances" :key="item.InstanceId" :label="item.InstanceId">
                            {{ item.InstanceName }} - {{ item.InstanceId }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="runDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onDoRun">运行</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="historyDetailVisiable" title="历史详情">
            <div v-if="historyDetail && TaskDetail" class="history-detail">
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
                    结果{{ TaskDetail.length == 0 ? "(正在查询。。。)" : "" }}：
                </div>
                <div v-for="task_item in TaskDetail" :key="task_item.InvocationTaskId">
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

<script lang="ts" setup>
import { Api, Lighthouse, QApi } from "@/api"
import { TATHistoryItem, TATItem } from '@/api/local/tat'
import { ElMessage, ElTable } from "element-plus"
import { Base64 } from 'js-base64'
import { DescribeInvocationsResponse, DescribeInvocationTasksResponse } from "tencentcloud-sdk-nodejs/tencentcloud/services/tat/v20201028/tat_models.js"
import { onMounted, onUnmounted, ref } from 'vue'

const tatList = ref<TATItem[]>([])
const loading = ref(false)
const regionList = ref<{ value: string, label: string }[]>([])
const currentRegion = ref("")
const LHInstances = ref<(Lighthouse.Instance & { region: string })[]>([])
const instanceRegionMap = new Map<string, string>()

async function fetchTATList() {
    loading.value = true
    try {
        const res = await Api.tat.fetchTATList()
        tatList.value = res
    } catch (error) {
        ElMessage.error(error as string)
    }
    loading.value = false
}

async function fetchLH() {
    const data = await QApi.lighthouse.describeRegions()
    await Promise.all(data.RegionSet.map(async item => {
        const data = await QApi.lighthouse.describeInstances(item.Region)
        if (data.TotalCount > 0) {
            regionList.value.push({ value: item.Region, label: item.RegionName })
            if (currentRegion.value === '') {
                currentRegion.value = item.Region
            }
            data.InstanceSet.forEach(instance => {
                LHInstances.value.push({ ...instance, region: item.Region })
                instanceRegionMap.set(instance.InstanceId, item.Region)
            })
        }
    }))
}

onMounted(async () => {
    try {
        fetchTATList()
        fetchHistory()
        fetchLH()
    } catch (error) {
        ElMessage.error(error as string)
    }
})


//New
const newDialogVisible = ref<boolean>(false)
const newForm = ref<Omit<TATItem, "Id">>({ Name: "", Description: "", Content: "", CommandType: "SHELL", WorkingDirectory: "", Timeout: 60, Username: "", UserId: 0 })

function onNew() {
    newForm.value = { Name: "", Description: "", Content: "", CommandType: "SHELL", WorkingDirectory: "", Timeout: 60, Username: "", UserId: 0 }
    newDialogVisible.value = true
}

async function onNewSave() {
    newDialogVisible.value = false
    loading.value = true
    try {
        if (newForm.value.Username == "") {
            newForm.value.Username = newForm.value.CommandType == "SHELL" ? "root" : "System"
        }
        if (newForm.value.WorkingDirectory == "") {
            newForm.value.WorkingDirectory = newForm.value.CommandType == "SHELL" ? "/root" : "C:\\Program Files\\qcloud\\tat_agent\\workdir"
        }
        await Api.tat.newTAT(newForm.value)
        await fetchTATList()
    }
    catch (error) {
        ElMessage.error(error + "")
    }
    loading.value = false
}

//Edit
const editDialogVisible = ref<boolean>(false)
const editForm = ref<TATItem>()

function onEdit(row: TATItem) {
    editForm.value = { ...row }
    editDialogVisible.value = true
}

async function onEditSave() {
    if (editForm.value) {
        editDialogVisible.value = false
        loading.value = true
        try {
            if (editForm.value.Username == "") {
                editForm.value.Username = editForm.value.CommandType == "SHELL" ? "root" : "System"
            }
            if (editForm.value.WorkingDirectory == "") {
                editForm.value.WorkingDirectory = editForm.value.CommandType == "SHELL" ? "/root" : "C:\\Program Files\\qcloud\\tat_agent\\workdir"
            }
            await Api.tat.updateTAT(editForm.value)
            await fetchTATList()
        }
        catch (error) {
            ElMessage.error(error as string)
        }
    }
    loading.value = false
}

//Delete

async function onDelete(id: string) {
    loading.value = true
    try {
        await Api.tat.deleteTAT(id)
        await fetchTATList()
    }
    catch (error) {
        ElMessage.error(error + "")
    }
    loading.value = false
}

// Run
interface TATRunIitem {
    CommandType: string
    Username: string
    Content: string
    WorkingDirectory: string
    Timeout: number
    InstanceIds: string[]
    Description: string
    Name: string
}
const runDialogVisible = ref(false)
const runForm = ref<TATRunIitem>({ CommandType: "", Username: "", Content: "", WorkingDirectory: "", Timeout: 0, InstanceIds: [], Description: "", Name: "" })

function onRun(tatItem: TATItem) {
    runForm.value.Username = tatItem.Username
    runForm.value.CommandType = tatItem.CommandType
    runForm.value.Content = tatItem.Content
    runForm.value.WorkingDirectory = tatItem.WorkingDirectory
    runForm.value.Timeout = tatItem.Timeout
    runForm.value.Description = tatItem.Description
    runForm.value.Name = tatItem.Name
    runDialogVisible.value = true
}

async function onDoRun() {
    try {
        if (runForm.value.InstanceIds.length > 0) {
            const regions = new Set<string>()
            runForm.value.InstanceIds.forEach(id => {
                regions.add(instanceRegionMap.get(id) as string)
            })
            await Promise.all(Array.from(regions).map(async region => {
                const instanceIds = runForm.value.InstanceIds.filter(id => instanceRegionMap.get(id) == region)
                const run_res = await QApi.tat.runCommand(region, {
                    Content: Base64.encode(runForm.value.Content),
                    Description: runForm.value.Description,
                    CommandName: runForm.value.Name,
                    Username: runForm.value.Username,
                    WorkingDirectory: runForm.value.WorkingDirectory,
                    Timeout: runForm.value.Timeout,
                    InstanceIds: instanceIds,
                })
                await Api.tat.newTATHistory({ Name: runForm.value.Name, Region: region, InvocationId: run_res.InvocationId })
            }))
            fetchHistory()
        }
    } catch (error) {
        ElMessage.error(error as string)
    }
    runDialogVisible.value = false
}

// History

const historyList = ref<TATHistoryItem[]>([])
const loadingHistory = ref(false)
const historyDetailVisiable = ref(false)

let need_update_history_list = true
onMounted(() => {
    const do_update_history_list = async () => {
        if (historyList.value.length == 0) {
            if (need_update_history_list) {
                setTimeout(do_update_history_list, 1000)
            }
        }

        const history_task_list = historyList.value.filter(item => item.InvocationStatus == "" || item.InvocationStatus.endsWith("ING"))
        if (history_task_list.length == 0) {
            if (need_update_history_list) {
                setTimeout(do_update_history_list, 1000)
            }
        }

        await Promise.all(historyList.value.map(async item => {
            if (item.InvocationStatus == "" || item.InvocationStatus.endsWith("ING")) {
                const his_res = await QApi.tat.describeInvocations(item.Region, { InvocationIds: [item.InvocationId] })
                await Api.tat.updateTATHistory(item.Id, {
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
    setTimeout(do_update_history_list, 1000)
})

onUnmounted(() => {
    need_update_history_list = false
})

async function fetchHistory() {
    loadingHistory.value = true
    try {
        historyList.value = await Api.tat.fetchTATHistoryList()
    } catch (error) {
        ElMessage.error(error as string)
    }
    loadingHistory.value = false
}

async function onDeleteHistory(history_id: number) {
    try {
        await Api.tat.deleteTATHistory(history_id)
        historyList.value = historyList.value.filter(item => item.Id != history_id)
    } catch (error) {
        ElMessage.error(error as string)
    }
}

const historyDetail = ref<DescribeInvocationsResponse["InvocationSet"][number]>()
const TaskDetail = ref<DescribeInvocationTasksResponse["InvocationTaskSet"]>()
async function onShowHistory(row: TATHistoryItem) {
    historyDetail.value = undefined
    TaskDetail.value = []
    historyDetailVisiable.value = true
    if (row.InvocationResultJson != "") {
        historyDetail.value = JSON.parse(row.InvocationResultJson)
        const task_res = await QApi.tat.describeInvocationTasks(row.Region, {
            InvocationTaskIds: historyDetail.value?.InvocationTaskBasicInfoSet.map(item => item.InvocationTaskId),
            HideOutput: false
        })
        TaskDetail.value = task_res.InvocationTaskSet
    }
}

</script>


<style lang="scss" scoped>
.region-select {
    margin-right: 10px;
}

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
