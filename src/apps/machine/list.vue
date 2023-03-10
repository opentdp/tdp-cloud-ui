<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineModels, MachineItem } from "@/api/native/machine"
import { WorkerItem } from "@/api/native/workhub"

import UseCache from '@/store/cache'
import QuickExec from "@/apps/script/quick.vue"

@Component({
    components: { QuickExec }
})
export default class MachineList extends Vue {
    public MachineModels = MachineModels
    public cache = UseCache()

    public loading = true

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

    // 选择主机

    public selectedRow!: MachineItem

    public tableRowChange(row: MachineItem) {
        this.selectedRow = row
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                主机管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card title="主机列表" hover-shadow header-bordered>
            <template #subtitle>
                <small>记录总数: {{ machineList.length }}</small>
            </template>
            <el-table v-loading="loading" :data="machineList" table-layout="fixed" highlight-current-row
                @current-change="tableRowChange">
                <el-table-column prop="HostName" label="名称" fixed sortable show-overflow-tooltip />
                <el-table-column prop="IpAddress" label="公网 IP" sortable show-overflow-tooltip />
                <el-table-column prop="Region" label="地域" sortable show-overflow-tooltip />
                <el-table-column prop="Model" label="云账号" sortable show-overflow-tooltip>
                    <template #default="scope">
                        <el-tooltip :content="MachineModels[scope.row.Model]">
                            {{ cache.vendorList[scope.row.VendorId]?.Description || "-" }}
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="WorkerId" label="土豆片" show-overflow-tooltip>
                    <template #default="scope">
                        <el-button v-if="scope.row.WorkerId.length == 32 && workerList[scope.row.WorkerId]" link
                            type="success">
                            已连接
                        </el-button>
                        <el-button v-else-if="scope.row.WorkerId.length == 32" link type="danger">
                            未连接
                        </el-button>
                        <el-button v-else link type="warning">
                            未注册
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button v-route="'/machine/detail/' + scope.row.Id" link type="primary" icon="View">
                            管理
                        </el-button>
                        <el-popconfirm title="确定删除?" @confirm="deleteMachine(scope.$index)">
                            <template #reference>
                                <el-button link type="danger" icon="Delete">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </t-card>

        <t-card v-if="selectedRow" title="快捷命令" hover-shadow header-bordered>
            <QuickExec :machine="selectedRow" />
        </t-card>
    </t-space>
</template>
