<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { ScriptItem } from '@/api/native/script';

import ScriptCreate from './create.vue';
import ScriptUpdate from './update.vue';

@Component({
    components: { ScriptCreate, ScriptUpdate }
})
export default class ScriptList extends Vue {
    @Ref
    public createModal!: ScriptCreate;

    @Ref
    public updateModal!: ScriptUpdate;

    // 初始化

    public created() {
        this.getScriptList();
    }

    // 获取列表

    public scriptList: ScriptItem[] = [];

    async getScriptList() {
        this.loading = true;
        const res = await NaApi.script.list();
        this.scriptList = res.Items;
        this.loading = false;
    }

    // 删除脚本

    async deleteScript(idx: number) {
        const item = this.scriptList[idx];
        await NaApi.script.remove(item.Id);
        this.scriptList.splice(idx, 1);
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '名称', ellipsis: true },
        { colKey: 'CommandType', title: '类型', ellipsis: true },
        { colKey: 'WorkDirectory', title: '执行路径', ellipsis: true },
        { colKey: 'Timeout', title: '超时', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '110px' },
    ];
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                脚本管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card :loading="loading" title="脚本列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ scriptList.length }}
            </template>
            <template #actions>
                <t-button theme="primary" @click="createModal.open()">
                    <template #icon>
                        <t-icon name="add" />
                    </template>
                    添加
                </t-button>
            </template>
            <t-table :data="scriptList" :columns="tableColumns" row-key="Id" hover expand-on-row-click>
                <template #expandedRow="{ row }">
                    <pre v-if="row.CommandType == 'SHELL'" v-highlight>
                        <code max-height="500" class="language-bash">{{ row.Content }}</code>
                    </pre>
                    <pre v-if="row.CommandType == 'POWERSHELL'" v-highlight>
                        <code max-height="500" class="language-powershell">{{ row.Content }}</code>
                    </pre>
                    <pre v-if="row.CommandType == 'BAT'" v-highlight>
                        <code max-height="500" class="language-bat">{{ row.Content }}</code>
                    </pre>
                </template>
                <template #Operation="{ row, rowIndex }">
                    <t-link v-click-stop theme="primary" hover="color" @click="updateModal.open(row)">
                        修改
                    </t-link>
                    <t-link v-click-stop theme="danger" hover="color">
                        <t-popconfirm content="确定删除?" @confirm="deleteScript(rowIndex)">
                            删除
                        </t-popconfirm>
                    </t-link>
                </template>
            </t-table>
        </t-card>

        <ScriptCreate ref="createModal" @submit="getScriptList" />
        <ScriptUpdate ref="updateModal" @submit="getScriptList" />
    </t-space>
</template>
