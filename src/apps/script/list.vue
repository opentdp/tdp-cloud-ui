<script lang="ts">
import { Ref,Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { ScriptItem } from "@/api/native/script"

import ScriptCreate from "./script_create.vue"
import ScriptUpdate from "./script_update.vue"

@Component({
    components: { ScriptCreate, ScriptUpdate }
})
export default class ScriptList extends Vue {
    public loading = true

    @Ref
    public createModal!: ScriptCreate

    @Ref
    public updateModal!: ScriptUpdate

    // 初始化

    public created() {
        this.getScriptList()
    }

    // 获取脚本列表

    public scriptList: ScriptItem[] = []

    async getScriptList() {
        const res = await NaApi.script.list()
        this.scriptList = res.Datasets
        this.loading = false
    }

    // 删除脚本

    async removeScript(id: number) {
        this.loading = true
        await NaApi.script.remove(id)
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
                    <small>记录总数: {{ scriptList.length }}</small>
                    <div class="flex-auto" />
                    <el-button plain type="primary" size="small" icon="Plus" @click="createModal.open()">
                        添加
                    </el-button>
                </div>
            </template>
            <el-table v-loading="loading" :data="scriptList">
                <el-table-column prop="Name" label="名称" fixed sortable show-overflow-tooltip />
                <el-table-column prop="CommandType" label="类型" sortable show-overflow-tooltip />
                <el-table-column prop="Content" label="脚本" sortable show-overflow-tooltip />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="Edit" @click="updateModal.open(scope.row)">
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
