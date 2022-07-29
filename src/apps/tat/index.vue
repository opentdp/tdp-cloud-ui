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
        <el-card shadow="hover">
            <template #header>
                <div class="card-header">
                    <div class="left">
                        <b>命令列表</b> &nbsp;
                        <small>域名总数: {{ tatList.length }}</small>
                    </div>
                    <div id="right">
                        <el-button type="primary" plain @click="onNew">
                            添加
                        </el-button>
                    </div>
                </div>
            </template>
            <el-table v-loading="loading" :data="tatList" table-layout="fixed">
                <el-table-column fixed prop="Name" label="名称" min-width="150" />
                <el-table-column prop="Description" label="描述" min-width="100" />
                <el-table-column prop="Content" label="命令" min-width="250" />
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View">
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
    </div>

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
        <el-form v-if="newForm" :model="newForm" label-width="120px">
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
</template>
<script lang="ts" setup>

import Api from "@/api"
import { TATItem } from '@/api/local/tat'
import { ElMessage } from "element-plus"
import { onMounted, ref } from 'vue'

const tatList = ref<TATItem[]>([])
const loading = ref<boolean>(false)
async function refreshList() {
    const res = await Api.tat.fetchTATList()
    tatList.value = res
}
onMounted(async () => {
    await refreshList()
})

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
            await refreshList()
        }
        catch (error) {
            ElMessage.error(error + "")
        }
    }
    loading.value = false
}

//New
const newDialogVisible = ref<boolean>(false)
const newForm = ref<{ name: string, description: string, content: string }>({ name: "", content: "", description: "" })

function onNew() {
    newForm.value = { name: "", content: "", description: "" }
    newDialogVisible.value = true
}

async function onNewSave() {
    newDialogVisible.value = false
    loading.value = true
    try {
        await Api.tat.newTAT(newForm.value)
        await refreshList()
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
        await refreshList()
    }
    catch (error) {
        ElMessage.error(error + "")
    }
    loading.value = false
}


</script>
<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>
