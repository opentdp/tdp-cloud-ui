<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineModels, MachineItem } from "@/api/native/machine"
import { WorkerItem } from "@/api/native/workhub"

import QuickExec from "@/apps/taskline/quick.vue"

@Component({
    components: { QuickExec }
})
export default class MachineList extends Vue {
    public MachineModels = MachineModels

    public loading = true

    // 初始化

    public created() {
        this.getMachineList()
        this.getWorkerList()
    }

    // 主机列表

    public machineList: MachineItem[] = []

    async getMachineList() {
        const res = await NaApi.machine.list()
        this.machineList = res.Datasets
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
        res.Datasets.forEach(item => {
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
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                主机管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>主机列表</b>
                    <div class="flex-auto" />
                    <small>主机总数: {{ machineList.length }}</small>
                </div>
            </template>
            <el-table v-loading="loading" :data="machineList" table-layout="fixed" highlight-current-row
                @current-change="tableRowChange">
                <el-table-column prop="HostName" label="名称" show-overflow-tooltip fixed />
                <el-table-column prop="IpAddress" label="公网 IP" show-overflow-tooltip />
                <el-table-column prop="Region" label="地域" show-overflow-tooltip />
                <el-table-column prop="Model" label="类型" show-overflow-tooltip>
                    <template #default="scope">
                        {{ MachineModels[scope.row.Model] }}
                    </template>
                </el-table-column>
                <el-table-column label="子节点" show-overflow-tooltip>
                    <template #default="scope">
                        <el-button v-if="scope.row.WorkerId.length == 32 && workerList[scope.row.WorkerId]" link type="success">
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
                        <router-link :to="'/machine/detail/' + scope.row.Id">
                            <el-button link type="primary" icon="View">
                                管理
                            </el-button>
                        </router-link>
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
        </el-card>
        <div class="space-10" />
        <el-card v-if="selectedRow" shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>快捷命令</b>
                </div>
            </template>
            <QuickExec :meta="selectedRow" />
        </el-card>
    </div>
</template>
