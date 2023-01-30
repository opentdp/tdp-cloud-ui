<script lang="ts">
import { Ref,Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { TaskScriptItem } from "@/api/local/task_script"

import ScriptCreate from "./script_create.vue"
import ScriptUpdate from "./script_update.vue"

@Component({
    components: { ScriptCreate, ScriptUpdate }
})
export default class TaskScript extends Vue {
    public loading = true

    @Ref
    public createModal!: typeof ScriptCreate

    @Ref
    public updateModal!: typeof ScriptUpdate

    public created() {
        this.getScriptList()
    }

    // 获取脚本列表

    public scriptList: TaskScriptItem[] = []

    async getScriptList() {
        const res = await LoApi.taskScript.list()
        this.scriptList = res
        this.loading = false
    }

    // 删除脚本

    async removeScript(id: number) {
        this.loading = true
        await LoApi.taskScript.remove(id)
        await this.getScriptList()
    }
}
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
        <el-card shadow="hover">
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
                <el-table-column prop="CommandType" label="类型" />
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

        <ScriptCreate ref="createModal" @close="getScriptList" />
        <ScriptUpdate ref="updateModal" @close="getScriptList" />
    </div>
</template>
