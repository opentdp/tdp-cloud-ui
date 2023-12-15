<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { CrontabItem, CrontabEntry } from '@/api/native/crontab';
import { MachineItem } from '@/api/native/machine';
import { ScriptItem } from '@/api/native/script';
import { dateFormat } from '@/helper/format';

import CrontabCreate from './create.vue';
import CrontabUpdate from './update.vue';

@Component({
    components: { CrontabCreate, CrontabUpdate }
})
export default class CrontabList extends Vue {
    public dateFormat = dateFormat;

    @Ref
    public createModal!: CrontabCreate;

    @Ref
    public updateModal!: CrontabUpdate;

    // 初始化

    public created() {
        this.getCrontabList();
        this.getMachineList();
        this.getScriptList();
    }

    // 计划列表

    public crontabList: CrontabItem[] = [];
    public crontabEntries: Record<number, CrontabEntry> = {};

    async getCrontabList() {
        this.loading = true;
        const res = await NaApi.crontab.list().finally(() => {
            this.loading = false;
        });
        this.crontabList = res.Items;
        this.crontabEntries = res.Entries;
    }

    // 删除计划

    async deleteKey(idx: number) {
        const item = this.crontabList[idx];
        await NaApi.crontab.remove(item.Id);
        this.crontabList.splice(idx, 1);
    }

    // 主机列表

    public machineList: Record<string, MachineItem> = {};

    async getMachineList() {
        const res = await NaApi.machine.list();
        res.Items.forEach(item => {
            if (item.WorkerId) {
                this.machineList[item.Id + ''] = item;
            }
        });
    }

    // 脚本列表

    public scriptList: Record<string, ScriptItem> = {};

    async getScriptList() {
        const res = await NaApi.script.list();
        res.Items.forEach(item => {
            this.scriptList[item.Id + ''] = item;
        });
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '名称', ellipsis: true },
        { colKey: 'Type', title: '类型', ellipsis: true },
        { colKey: 'Second', title: '排程', ellipsis: true },
        { colKey: 'Target', title: '目标实例', ellipsis: true },
        { colKey: 'NextTime', title: '下次执行', ellipsis: true },
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
                计划管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card :loading="loading" title="计划列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ crontabList?.length || 0 }}
            </template>
            <template #actions>
                <t-button theme="primary" @click="createModal.open()">
                    <template #icon>
                        <t-icon name="add" />
                    </template>
                    添加
                </t-button>
            </template>
            <t-table :data="crontabList" :columns="tableColumns" row-key="Id" hover>
                <template #Second="{ row }">
                    {{ row.Second }} {{ row.Minute }} {{ row.Hour }} {{ row.DayofMonth }} {{ row.Month }} {{ row.DayofWeek }}
                </template>
                <template #Target="{ row }">
                    {{ machineList[row.Target]?.HostName || "-" }}
                </template>
                <template #NextTime="{ row }">
                    <template v-if="crontabEntries[row.Id]">
                        {{ dateFormat(crontabEntries[row.Id].NextTime * 1000, "yyyy-MM-dd hh:mm:ss") }}
                    </template>
                </template>
                <template #Operation="{ row, rowIndex }">
                    <t-link theme="primary" hover="color" @click="updateModal.open(row)">
                        修改
                    </t-link>
                    <t-popconfirm content="确定删除?" @confirm="deleteKey(rowIndex)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>

        <CrontabCreate ref="createModal" :script-list="scriptList" :machine-list="machineList" @submit="getCrontabList" />
        <CrontabUpdate ref="updateModal" :script-list="scriptList" :machine-list="machineList" @submit="getCrontabList" />
    </t-space>
</template>
