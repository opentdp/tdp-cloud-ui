<script lang="ts" setup>
import { ref } from "vue"

import { Api } from "@/api"
import { TaskScriptItem } from "@/api/local/task_script"

import ScriptCreate from "./script_create.vue"
import ScriptUpdate from "./script_update.vue"

// 初始化

const createModal = ref<InstanceType<typeof ScriptCreate>>()
const updateModal = ref<InstanceType<typeof ScriptUpdate>>()

const loading = ref(true)

// 获取脚本列表

const scriptList = ref<TaskScriptItem[]>([])

async function getScriptList() {
    const res = await Api.taskScript.list()
    scriptList.value = res
    loading.value = false
}

// 删除脚本

async function removeScript(id: number) {
    loading.value = true
    await Api.taskScript.remove(id)
    await getScriptList()
}

// 加载数据

getScriptList()
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                脚本管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>脚本列表</b> &nbsp; &nbsp;
                    <small>脚本总数: {{ scriptList.length }}</small>
                    <div class="flex-auto" />
                    <el-button type="primary" plain size="small" icon="Plus" @click="createModal?.open()">
                        添加
                    </el-button>
                </div>
            </template>
            <el-table v-loading="loading" :data="scriptList">
                <el-table-column fixed prop="Name" label="名称" />
                <el-table-column prop="Description" label="描述" />
                <el-table-column prop="Content" label="脚本" min-width="250" show-overflow-tooltip />
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="Edit" @click="updateModal?.open(scope.row)">
                            修改
                        </el-button>
                        <el-popconfirm title="确定删除?" @confirm="removeScript(scope.row.Id)">
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

        <ScriptCreate ref="createModal" @submit="getScriptList" />
        <ScriptUpdate ref="updateModal" @submit="getScriptList" />
    </div>
</template>
