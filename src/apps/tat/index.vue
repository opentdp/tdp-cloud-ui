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
    </div>
</template>
<script lang="ts" setup>

import { default as api, default as Api, Lighthouse } from "@/api"
import { TATItem } from '@/api/local/tat'
import { ElMessage } from "element-plus"
import { Base64 } from 'js-base64'
import { onMounted, ref } from 'vue'

const tatList = ref<TATItem[]>([])
const loading = ref<boolean>(false)
const LHInstances = ref<(Lighthouse.DescribeInstancesResponse["InstanceSet"][number] & { region: string })[]>([])
const instanceRegionMap = new Map<string, string>()


async function fetchTATList() {
    const res = await Api.tat.fetchTATList()
    tatList.value = res
}
async function fetchLH() {
    const data = await Api.lighthouse.describeRegions()
    data.RegionSet.forEach(async (item) => {
        const data = await Api.lighthouse.describeInstances(item.Region)
        if (data.TotalCount > 0) {
            data.InstanceSet.forEach(instance => {
                LHInstances.value.push({ ...instance, region: item.Region })
                instanceRegionMap.set(instance.InstanceId, item.Region)
            })
        }
    })
}


onMounted(async () => {
    loading.value = true
    try {
        await fetchTATList()
        await fetchLH()
    } catch (error) {
        ElMessage.error(error as string)
    }
    loading.value = false
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
        if (runForm.value.InstanceIds.length == 0) {
            return
        }
        const regions = new Set<string>()
        runForm.value.InstanceIds.forEach(id => {
            regions.add(instanceRegionMap.get(id) as string)
        })
        regions.forEach(async (region) => {
            const instanceIds = runForm.value.InstanceIds.filter(id => instanceRegionMap.get(id) == region)
            await api.tatcclient.runCommand(region, {
                Content: Base64.encode(runForm.value.content),
                Description: runForm.value.description,
                CommandName: runForm.value.name,
                Username: runForm.value.user,
                WorkingDirectory: runForm.value.path,
                InstanceIds: instanceIds,
            })
        })

    } catch (error) {
        ElMessage.error(error as string)
    }
}

</script>
<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>
