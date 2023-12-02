<script lang="ts">
import { Ref, Component, Vue } from "@/apps/basic"

import { NaApi } from "@/api"
import { MachineModels, MachineItem } from "@/api/native/machine"
import { WorkerItem } from "@/api/native/workhub"

import ScriptQuick from "@/apps/script/quick.vue"
import WorkhubWorkerInstall from "@/apps/workhub/worker_install.vue"

import MachineUpdate from "./update.vue"

@Component({
    components: { ScriptQuick, MachineUpdate, WorkhubWorkerInstall }
})
export default class MachineList extends Vue {
    public MachineModels = MachineModels

    public loading = true

    @Ref
    public quickModal!: ScriptQuick

    @Ref
    public updateModal!: MachineUpdate

    @Ref
    public installModal!: WorkhubWorkerInstall

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

    async deleteMachine() {
        for (let item of this.selectedRow) {
            const idx = this.machineList.findIndex(m => m.Id === item.Id)
            idx >= 0 && this.machineList.splice(idx, 1)
            await NaApi.machine.remove(item.Id)
        }
    }

    // 节点列表

    public workerList: Record<string, WorkerItem> = {}

    async getWorkerList() {
        const res = await NaApi.workhub.list()
        res.Items.forEach(item => {
            this.workerList[item.WorkerId] = item
        })
    }

    // 选择主机

    public selectedRow: MachineItem[] = []

    public tableRowChange(ids: (string | number)[]) {
        this.selectedRow = []
        for (let id of ids) {
            const m = this.machineList.find(v => v.Id === id)
            m && this.selectedRow.push(m)
        }
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'row-select', type: 'multiple', width: "30px" },
        { colKey: 'HostName', title: '主机名', ellipsis: true },
        { colKey: 'IpAddress', title: '公网 IP', ellipsis: true },
        { colKey: 'Region', title: '地域', ellipsis: true },
        { colKey: 'Model', title: '云账号', ellipsis: true },
        { colKey: 'WorkerId', title: '土豆片', ellipsis: true },
        { colKey: 'Description', title: '备注', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "160px" }
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
            <template #actions>
                <t-space>
                    <t-button theme="warning" :disabled="selectedRow.length == 0" @click="quickModal.open(selectedRow)">
                        <template #icon>
                            <t-icon name="caret-right-small" />
                        </template>
                        运行
                    </t-button>
                    <t-popconfirm content="确定删除?" @confirm="deleteMachine()">
                        <t-button theme="danger" :disabled="selectedRow.length == 0">
                            <template #icon>
                                <t-icon name="delete" />
                            </template>
                            删除
                        </t-button>
                    </t-popconfirm>
                </t-space>
            </template>
            <t-table :data="machineList" :columns="tableColumns" row-key="Id" hover @select-change="tableRowChange">
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
                    <t-link v-else theme="warning" hover="color" @click="installModal.open(row)">
                        未注册
                    </t-link>
                </template>
                <template #Operation="{ row }">
                    <t-link v-route="'/machine/detail/' + row.Id" theme="primary" hover="color">
                        管理
                    </t-link>
                    <t-link theme="danger" hover="color" @click="updateModal.open(row)">
                        编辑
                    </t-link>
                    <t-link v-if="!workerList[row.WorkerId]" theme="success" hover="color" disabled>
                        文件
                    </t-link>
                    <t-link v-else v-route="'/machine/fileman/' + row.Id" theme="success" hover="color">
                        文件
                    </t-link>
                </template>
            </t-table>
        </t-card>

        <ScriptQuick ref="quickModal" />
        <WorkhubWorkerInstall ref="installModal" />
        <MachineUpdate ref="updateModal" @submit="getMachineList" />
    </t-space>
</template>
