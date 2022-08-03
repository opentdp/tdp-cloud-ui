<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                TAT
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
                    <el-button type="primary" plain size="small" icon="Download" @click="onImport">
                        导入
                    </el-button>
                </div>
            </template>
            <el-table v-loading="loading" :data="tatList">
                <el-table-column fixed prop="Name" label="名称" min-width="150" />
                <el-table-column prop="Description" label="描述" min-width="100" />
                <el-table-column prop="Content" label="命令" min-width="250" show-overflow-tooltip />
                <el-table-column fixed="right" label="操作" align="center">
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
                    <small>记录总数: {{ HistoryList.length }}</small>
                    <div class="flex-auto" />
                    <el-select v-model="currentRegion" class="region-select" placeholder="选择区域" size="small"
                        @change="onRegionChange">
                        <el-option v-for="item in regionList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-button type="primary" plain size="small" icon="Refresh" @click="fetchHistory">
                        刷新
                    </el-button>
                </div>
            </template>
            <el-table v-loading="historyLoading" :data="HistoryList">
                <el-table-column prop="InvocationId" label="执行ID" />
                <el-table-column prop="InvocationStatus" label="执行状态" />
                <el-table-column prop="CommandContent" label="命令内容" min-width="150" show-overflow-tooltip />
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View" @click="onHistoryDetail(scope.row)">
                            历史详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="editDialogVisible" title="修改命令">
            <el-form v-if="editForm" :model="editForm" label-width="120px">
                <el-form-item label="名称">
                    <el-input v-model="editForm.Name" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="editForm.Description" />
                </el-form-item>
                <el-form-item label="命令">
                    <el-input v-model="editForm.Content" type="textarea" rows="5" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onEditSave">保存</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="newDialogVisible" title="添加命令">
            <el-form :model="newForm" label-width="120px">
                <el-form-item label="名称">
                    <el-input v-model="newForm.name" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="newForm.description" />
                </el-form-item>
                <el-form-item label="命令">
                    <el-input v-model="newForm.content" type="textarea" rows="5" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="newDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onNewSave">保存</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="runDialogVisible" title="运行命令">
            <el-form :model="runForm" label-width="120px">
                <el-form-item label="名称">
                    <el-input v-model="runForm.name" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="runForm.description" />
                </el-form-item>
                <el-form-item label="命令">
                    <el-input v-model="runForm.content" type="textarea" rows="5" />
                </el-form-item>
                <el-form-item label="执行用户">
                    <el-input v-model="runForm.user" />
                </el-form-item>
                <el-form-item label="执行路径">
                    <el-input v-model="runForm.path" />
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
            <div v-if="historyDetail" class="history-detail">
                <div class="title">
                    命令：
                </div>
                <pre class="cmd">{{ Base64.fromBase64(historyDetail.CommandDocument.Content) }}</pre>
                <div class="title">
                    结果：
                </div>
                <pre class="result">{{ Base64.fromBase64(historyDetail.TaskResult.Output) }}</pre>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="historyDetailVisiable = false">确定</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="importVisiable" title="导入命令">
            <el-table ref="importTable" v-loading="importLoading" :data="commandList">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="CommandId" label="命令ID" />
                <el-table-column prop="CommandName" label="命令名称" min-width="150" />
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="onDoImport">确定</el-button>
                    <el-button @click="importVisiable = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { Api, QApi, Lighthouse, TAT } from "@/api"
import { TATItem } from '@/api/local/tat'
import { ElMessage, ElTable } from "element-plus"
import { Base64 } from 'js-base64'
import { onMounted, ref } from 'vue'

const tatList = ref<TATItem[]>([])
const loading = ref(false)
const historyLoading = ref(false)
const regionList = ref<{ value: string, label: string }[]>([])
const currentRegion = ref("")
const LHInstances = ref<(Lighthouse.Instance & { region: string })[]>([])
const HistoryList = ref<TAT.Invocation[]>([])
const instanceRegionMap = new Map<string, string>()


async function fetchTATList() {
    const res = await Api.tat.fetchTATList()
    tatList.value = res
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

async function fetchHistory() {
    if (currentRegion.value === '') {
        return
    }
    historyLoading.value = true
    const data = await QApi.tat.describeInvocations(currentRegion.value, { Filters: [{ Name: "instance-kind", Values: ["LIGHTHOUSE"] }] })
    HistoryList.value = data.InvocationSet
    HistoryList.value.forEach(item => {
        item.CommandContent = Base64.fromBase64(item.CommandContent)
    })
    historyLoading.value = false
}

async function onRegionChange() {
    await fetchHistory()
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
            await Api.tat.updateTAT({
                id: editForm.value.Id,
                content: editForm.value.Content,
                description: editForm.value.Description,
                name: editForm.value.Name
            })
            await fetchTATList()
        }
        catch (error) {
            ElMessage.error(error as string)
        }
    }
    loading.value = false
}

//New
const newDialogVisible = ref<boolean>(false)
const newForm = ref({ name: "", content: "", description: "" })

function onNew() {
    newForm.value = { name: "", content: "", description: "" }
    newDialogVisible.value = true
}

async function onNewSave() {
    newDialogVisible.value = false
    loading.value = true
    try {
        await Api.tat.newTAT(newForm.value)
        await fetchTATList()
    }
    catch (error) {
        ElMessage.error(error + "")
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
const runDialogVisible = ref(false)
const runForm = ref({ name: "", content: "", description: "", user: "root", path: "/root/", InstanceIds: [] as string[] })

function onRun(tatItem: TATItem) {
    runForm.value.name = tatItem.Name
    runForm.value.description = tatItem.Description
    runForm.value.content = tatItem.Content
    runForm.value.path = "/root/"
    runForm.value.user = "root"
    runDialogVisible.value = true
}

async function onDoRun() {
    try {
        if (runForm.value.InstanceIds.length > 0) {
            const regions = new Set<string>()
            runForm.value.InstanceIds.forEach(id => {
                regions.add(instanceRegionMap.get(id) as string)
            })
            regions.forEach(async (region) => {
                const instanceIds = runForm.value.InstanceIds.filter(id => instanceRegionMap.get(id) == region)
                await QApi.tat.runCommand(region, {
                    Content: Base64.encode(runForm.value.content),
                    Description: runForm.value.description,
                    CommandName: runForm.value.name,
                    Username: runForm.value.user,
                    WorkingDirectory: runForm.value.path,
                    InstanceIds: instanceIds,
                })
            })
            setTimeout(() => fetchHistory(), 1000)
        }
    } catch (error) {
        ElMessage.error(error as string)
    }
    runDialogVisible.value = false
}

// History
const historyDetailVisiable = ref(false)
const historyDetail = ref<TAT.InvocationTask>()
async function onHistoryDetail(src: TAT.Invocation) {
    const data = await QApi.tat.describeInvocationTasks(currentRegion.value,
        {
            Filters: [{ Name: "invocation-id", Values: [src.InvocationId] }],
            HideOutput: false
        })
    if (data.TotalCount > 0) {
        historyDetail.value = data.InvocationTaskSet[0]
        historyDetailVisiable.value = true
    }
}

// Import
const importVisiable = ref(false)
const importLoading = ref(false)
const commandList = ref<TAT.Command[]>([])
const importTable = ref<InstanceType<typeof ElTable>>()
async function fetchCommandList() {
    importLoading.value = true
    commandList.value = []
    await Promise.all(regionList.value.map(async item => {
        const data = await QApi.tat.describeCommands(item.value, { Filters: [{ Name: "created-by", Values: ["USER"] }] })
        if (data.TotalCount > 0) {
            commandList.value.push(...data.CommandSet)
        }
    }))
    importLoading.value = false
}
async function onImport() {
    importVisiable.value = true
    try {
        await fetchCommandList()
    } catch (error) {
        ElMessage.error(error as string)
    }
}

async function onDoImport() {
    const rows: TAT.Command[] = importTable.value?.getSelectionRows()
    loading.value = true
    try {
        await Promise.all(rows.map(row => Api.tat.newTAT(
            {
                name: row.CommandName,
                description: row.Description,
                content: Base64.fromBase64(row.Content)
            })))
        await fetchTATList()
    }
    catch (error) {
        ElMessage.error(error + "")
    }
    loading.value = false
    importVisiable.value = false
}

onMounted(async () => {
    loading.value = true
    try {
        await fetchTATList()
        await fetchLH()
        await fetchHistory()
    } catch (error) {
        ElMessage.error(error as string)
    }
    loading.value = false
})
</script>

<style lang="scss" scoped>
.region-select {
    margin-right: 10px;
}

.history-detail {

    .cmd,
    .result {
        background-color: black;
        color: white;
        padding: 10px;
        overflow: auto;
    }
}
</style>
