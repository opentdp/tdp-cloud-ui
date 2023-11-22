<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineModels, MachineItem } from "@/api/native/machine"
import { WorkerItem } from "@/api/native/workhub"

import UseCache from '@/store/cache'
import ScriptQuick from "@/apps/script/quick.vue"

import MachineUpdate from "./update.vue"

@Component({
    components: { ScriptQuick, MachineUpdate }
})
export default class MachineList extends Vue {
    public MachineModels = MachineModels
    public cache = UseCache()

    public loading = true

    @Ref
    public quickModal!: ScriptQuick

    @Ref
    public updateModal!: MachineUpdate

    // 初始化

    public created() {
        this.cache.initVendorList()
        this.getMachineList()
        this.getWorkerList()
    }

    // 主机列表

    public machineList: MachineItem[] = []

    async getMachineList() {
        const res = await NaApi.machine.list()
        this.machineList = res.Items
        this.loading = false
    }

    // 删除主机

    async deleteMachine(idx: number) {
        const item = this.machineList[idx]
        await NaApi.machine.remove(item.Id)
        this.machineList.splice(idx, 1)
    }

    // 节点列表

    public workerList: Record<string, WorkerItem> = {}

    async getWorkerList() {
        const res = await NaApi.workhub.list()
        res.Items.forEach(item => {
            this.workerList[item.WorkerId] = item
        })
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'HostName', title: '名称', ellipsis: true },
        { colKey: 'IpAddress', title: '公网 IP', ellipsis: true },
        { colKey: 'Region', title: '地域', ellipsis: true },
        { colKey: 'Model', title: '云账号', ellipsis: true },
        { colKey: 'WorkerId', title: '土豆片', ellipsis: true },
        { colKey: 'Description', title: '备注', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "180px" }
    ]

}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                主机管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card :loading="loading" title="主机列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ machineList.length }}
            </template>
            <t-table :data="machineList" :columns="tableColumns" row-key="Id" hover>
                <template #Model="{ row }">
                    <t-tooltip :content="MachineModels[row.Model]">
                        {{ cache.vendorList[row.VendorId]?.Description || "-" }}
                    </t-tooltip>
                </template>
                <template #WorkerId="{ row }">
                    <t-link v-if="workerList[row.WorkerId]" theme="success" hover="color">
                        已连接
                    </t-link>
                    <t-link v-else-if="row.WorkerMeta" theme="danger" hover="color">
                        未连接
                    </t-link>
                    <t-link v-else theme="warning" hover="color">
                        未注册
                    </t-link>
                </template>
                <template #Operation="{ row, rowIndex }">
                    <t-link v-route="'/machine/detail/' + row.Id" theme="primary" hover="color">
                        管理
                    </t-link>
                    <t-link theme="success" hover="color" @click="updateModal.open(row)">
                        编辑
                    </t-link>
                    <t-link theme="warning" hover="color" @click="quickModal.open(row)">
                        运行
                    </t-link>
                    <t-popconfirm content="确定删除?" @confirm="deleteMachine(rowIndex)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>

        <ScriptQuick ref="quickModal" />
        <MachineUpdate ref="updateModal" @submit="getMachineList" />
    </t-space>
</template>
