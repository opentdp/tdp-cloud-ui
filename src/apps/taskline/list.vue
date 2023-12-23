<script lang="ts">
import { Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { TasklineItem } from '@/api/native/taskline';
import { dateFormat } from '@/helper/format';

@Component
export default class TasklineList extends Vue {
    public dateFormat = dateFormat;

    // 初始化

    public created() {
        this.getHistory();
    }

    // 历史记录

    public historyList: TasklineItem[] = [];

    async getHistory() {
        this.loading = true;
        const res = await NaApi.taskline.list();
        this.historyList = res.Items;
        this.loading = false;
    }

    // 删除记录

    async deleteHistory(idx: number) {
        const item = this.historyList[idx];
        await NaApi.taskline.remove(item.Id);
        this.historyList.splice(idx, 1);
    }

    // 展开详情

    public expanded = false;

    async expandChange(keys: (string | number)[]) {
        this.expanded = keys.length > 0;
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Id', title: '任务ID', ellipsis: true },
        { colKey: 'HostName', title: '主机名', ellipsis: true },
        { colKey: 'Subject', title: '任务名称', ellipsis: true },
        { colKey: 'Status', title: '执行状态', ellipsis: true },
        { colKey: 'UpdatedAt', title: '更新时间', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '70px' },
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
                任务记录
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card title="任务记录" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ historyList.length }}
            </template>
            <template #actions>
                <t-button :loading="loading" theme="primary" @click="getHistory()">
                    <template #icon>
                        <t-icon name="refresh" />
                    </template>
                    刷新
                </t-button>
            </template>
            <t-table :data="historyList" :columns="tableColumns" row-key="Id" hover expand-on-row-click @expand-change="expandChange">
                <template #UpdatedAt="{ row }">
                    {{ dateFormat(row.UpdatedAt * 1000, "yyyy-MM-dd hh:mm:ss") }}
                </template>
                <template #expandedRow="{ row }">
                    <pre v-if="row.Request" v-highlight>
                        <h3>请求信息</h3>
                        <code max-height="500" class="language-json">{{ JSON.stringify(row.Request, null, 4) }}</code>
                    </pre>
                    <pre v-if="row.Response.Error" v-highlight>
                        <h3>错误信息</h3>
                        <code max-height="500" class="language-json">{{ JSON.stringify(row.Response.Error, null, 4) }}</code>
                    </pre>
                    <pre v-if="row.Response.Output" v-highlight>
                        <h3>响应内容</h3>
                        <code max-height="500" class="language-text">{{ row.Response.Output }}</code>
                    </pre>
                </template>
                <template #Operation="{ rowIndex }">
                    <t-link v-event-stop theme="danger" hover="color">
                        <t-popconfirm content="确定删除?" @confirm="deleteHistory(rowIndex)">
                            删除
                        </t-popconfirm>
                    </t-link>
                </template>
            </t-table>
        </t-card>
    </t-space>
</template>
