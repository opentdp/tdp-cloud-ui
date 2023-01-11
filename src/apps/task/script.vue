<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { ElMessage, ElTable } from "element-plus"

import { Api } from "@/api"
import { TaskScriptItem } from '@/api/local/task_script'

// 获取命令列表

const fetchWait = ref(false)
const scriptList = ref<TaskScriptItem[]>([])

async function getTaskScriptList() {
    fetchWait.value = true
    try {
        const res = await Api.taskScript.list()
        scriptList.value = res
    } catch (error) {
        ElMessage.error(error as string)
    }
    fetchWait.value = false
}

// 新建命令

const newDialogVisible = ref<boolean>(false)
const newForm = ref<Omit<TaskScriptItem, "Id">>({
    Name: "", Description: "", Content: "", CommandType: "SHELL", WorkDirectory: "", Timeout: 60, Username: "", UserId: 0
})

function onNew() {
    newForm.value = {
        Name: "", Description: "", Content: "", CommandType: "SHELL", WorkDirectory: "", Timeout: 60, Username: "", UserId: 0
    }
    newDialogVisible.value = true
}

async function onNewSave() {
    newDialogVisible.value = false
    fetchWait.value = true
    try {
        if (newForm.value.Username == "") {
            newForm.value.Username = newForm.value.CommandType == "SHELL" ? "root" : "System"
        }
        if (newForm.value.WorkDirectory == "") {
            newForm.value.WorkDirectory = newForm.value.CommandType == "SHELL" ? "/root" : "C:\\"
        }
        await Api.taskScript.createScript(newForm.value)
        await getTaskScriptList()
    }
    catch (error) {
        ElMessage.error(error + "")
    }
    fetchWait.value = false
}

// 编辑命令

const editDialogVisible = ref<boolean>(false)
const editForm = ref<TaskScriptItem>()

function onEdit(row: TaskScriptItem) {
    editForm.value = { ...row }
    editDialogVisible.value = true
}

async function onEditSave() {
    if (editForm.value) {
        editDialogVisible.value = false
        fetchWait.value = true
        try {
            if (editForm.value.Username == "") {
                editForm.value.Username = editForm.value.CommandType == "SHELL" ? "root" : "System"
            }
            if (editForm.value.WorkDirectory == "") {
                editForm.value.WorkDirectory = editForm.value.CommandType == "SHELL" ? "/root" : "C:\\"
            }
            await Api.taskScript.update(editForm.value)
            await getTaskScriptList()
        }
        catch (error) {
            ElMessage.error(error as string)
        }
    }
    fetchWait.value = false
}

// 删除命令

async function onDelete(id: number) {
    fetchWait.value = true
    try {
        await Api.taskScript.remove(id)
        await getTaskScriptList()
    }
    catch (error) {
        ElMessage.error(error + "")
    }
    fetchWait.value = false
}

// 加载数据

onMounted(async () => {
    try {
        getTaskScriptList()
    } catch (error) {
        ElMessage.error(error as string)
    }
})
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                命令管理
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>命令列表</b> &nbsp; &nbsp;
                    <small>命令总数: {{ scriptList.length }}</small>
                    <div class="flex-auto" />
                    <el-button type="primary" plain size="small" icon="Plus" @click="onNew">
                        添加
                    </el-button>
                </div>
            </template>
            <el-table v-fetchWait="fetchWait" :data="scriptList" row-key="Id">
                <el-table-column fixed prop="Name" label="名称" />
                <el-table-column prop="Description" label="描述" />
                <el-table-column prop="Content" label="命令" min-width="250" show-overflow-tooltip />
                <el-table-column fixed="right" label="操作" width="240" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="Edit" @click="onEdit(scope.row)">
                            修改
                        </el-button>
                        <el-popconfirm title="确定删除?" @confirm="onDelete(scope.row.Id)">
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
                    <el-input v-model="newForm.WorkDirectory"
                        :placeholder="newForm.CommandType == 'SHELL' ? '非必填，默认为 /root' : '非必填，默认为 C:\\'" />
                </el-form-item>
                <el-form-item label="执行用户">
                    <el-input v-model="newForm.Username"
                        :placeholder="newForm.CommandType == 'SHELL' ? '非必填，默认为 root' : '非必填，默认为 System'" />
                </el-form-item>
                <el-form-item label="命令">
                    <el-input v-model="newForm.Content" type="textarea" rows="5" />
                </el-form-item>
                <el-form-item label="超时时间">
                    <el-input-number v-model="newForm.Timeout" placeholder="非必填，默认为 60s" :min="1" :max="86400"
                        :value-on-clear="60" />
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
                    <el-input v-model="editForm.WorkDirectory"
                        :placeholder="editForm.CommandType == 'SHELL' ? '非必填，默认为 /root' : '非必填，默认为 C:\\'" />
                </el-form-item>
                <el-form-item label="执行用户">
                    <el-input v-model="editForm.Username"
                        :placeholder="editForm.CommandType == 'SHELL' ? '非必填，默认为 root' : '非必填，默认为 System'" />
                </el-form-item>
                <el-form-item label="命令">
                    <el-input v-model="editForm.Content" type="textarea" rows="5" />
                </el-form-item>
                <el-form-item label="超时时间">
                    <el-input-number v-model="editForm.Timeout" placeholder="非必填，默认为 60s" :min="1" :max="86400"
                        :value-on-clear="60" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="onEditSave">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
