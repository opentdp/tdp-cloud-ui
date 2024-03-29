<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { MachineItem } from '@/api/native/machine';
import { WorkerItem } from '@/api/native/workhub';

import { bytesToSize } from '@/helper/format';

@Component({
    emits: ['change']
})
export default class WorkerBind extends Vue {
    public bytesToSize = bytesToSize;

    public timer = 0;

    @Prop
    public boundList: Record<string, MachineItem> = {};

    // 初始化

    public created() {
        this.getWorkerList();
        this.timer = setInterval(() => {
            this.getWorkerList();
        }, 15000);
    }

    public unmounted() {
        clearInterval(this.timer);
    }

    // 节点列表

    public workerList: WorkerItem[] = [];

    async getWorkerList() {
        this.loading = true;
        const res = await NaApi.workhub.list().finally(() => {
            this.loading = false;
        });
        this.workerList = res.Items;
    }

    // 绑定主机

    async bindMachine(item: WorkerItem) {
        const meta = item.WorkerMeta;
        await NaApi.machine.create({
            HostName: meta.HostName,
            IpAddress: meta.PublicIpv4 || meta.PublicIpv6,
            OSType: meta.OS,
            Region: '',
            Model: 'native/worker',
            CloudId: '',
            CloudMeta: null,
            WorkerId: item.WorkerId,
            WorkerMeta: item.WorkerMeta,
            Status: '',
            Description: '',
        });
        this.getWorkerList();
    }

    // 同步主机

    async syncMachine(item: WorkerItem) {
        const bd = this.boundList[item.WorkerId];
        const meta = item.WorkerMeta;
        await NaApi.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: meta.HostName,
            IpAddress: meta.PublicIpv4 || meta.PublicIpv6,
            OSType: meta.OS,
            WorkerId: item.WorkerId,
            WorkerMeta: item.WorkerMeta,
        });
        this.$emit('change');
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'WorkerMeta.HostName', title: '主机名', ellipsis: true },
        { colKey: 'WorkerMeta_IpAddress', title: '公网 IP', ellipsis: true },
        { colKey: 'WorkerMeta_CpuCore', title: 'CPU', ellipsis: true },
        { colKey: 'WorkerMeta_MemoryTotal', title: '内存', ellipsis: true },
        { colKey: 'WorkerMeta.OS', title: '系统', ellipsis: true },
        { colKey: 'WorkerMeta_Uptime', title: '运行时长', ellipsis: true },
        { colKey: 'WorkerVersion', title: '土豆片', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '70px' },
    ];
}
</script>
 
<template>
    <t-card title="在线节点" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ workerList.length }}
        </template>
        <template #actions>
            <t-button :loading="loading" theme="primary" @click="getWorkerList()">
                <template #icon>
                    <t-icon name="refresh" />
                </template>
                刷新
            </t-button>
        </template>
        <t-table :data="workerList" :columns="tableColumns" row-key="Id" hover>
            <template #WorkerMeta_IpAddress="{ row }">
                {{ row.WorkerMeta.PublicIpv4 || row.WorkerMeta.PublicIpv6 }}
            </template>
            <template #WorkerMeta_CpuCore="{ row }">
                {{ row.WorkerMeta.CpuPercent[0].toFixed(2) }}%，{{ row.WorkerMeta.CpuCore }} Cores
            </template>
            <template #WorkerMeta_MemoryTotal="{ row }">
                {{ bytesToSize(row.WorkerMeta.MemoryUsed) }} / {{ bytesToSize(row.WorkerMeta.MemoryTotal) }}
            </template>
            <template #WorkerMeta_Uptime="{ row }">
                {{ (row.WorkerMeta.Uptime / 86400).toFixed(1) }} 天
            </template>
            <template #Operation="{ row }">
                <t-link v-if="boundList[row.WorkerId]" theme="success" hover="color" @click="syncMachine(row)">
                    同步
                </t-link>
                <t-link v-else theme="primary" hover="color" @click="bindMachine(row)">
                    导入
                </t-link>
            </template>
        </t-table>
    </t-card>
</template>
