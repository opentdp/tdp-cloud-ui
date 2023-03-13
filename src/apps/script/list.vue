<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

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
        this.scriptList = res.Items
        this.loading = false
    }

    // 删除脚本

    async removeScript(id: number) {
        this.loading = true
        await NaApi.script.remove(id)
        await this.getScriptList()
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '名称', ellipsis: true },
        { colKey: 'CommandType', title: '类型', ellipsis: true },
        { colKey: 'Content', title: '脚本', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                脚本管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card title="脚本列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ scriptList.length }}
            </template>
            <template #actions>
                <t-button theme="primary" size="small" @click="createModal.open()">
                    <template #icon>
                        <t-icon name="add" />
                    </template>
                    新建脚本
                </t-button>
            </template>
            <t-table v-loading="loading" :data="scriptList" :columns="tableColumns" row-key="Id">
                <template #Operation="{ row }">
                    <t-link theme="primary" hover="color" @click="updateModal.open(row)">
                        修改
                    </t-link>
                    <t-popconfirm content="确定删除?" @confirm="removeScript(row.Id)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>

        <ScriptCreate ref="createModal" @submit="getScriptList" />
        <ScriptUpdate ref="updateModal" @submit="getScriptList" />
    </t-space>
</template>
