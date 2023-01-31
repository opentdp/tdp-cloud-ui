<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { MachineItem } from "@/api/local/machine"
import { WorkerItem } from "@/api/local/workhub"
import { TaskScriptItem } from "@/api/local/task_script"

import shellList, { installTDPWorker } from "@/helper/script/shell"

@Component
export default class MachineList extends Vue {
    public installTDPWorker = installTDPWorker
    public loading = true

    public created() {
        this.getMachineList()
        this.getWorkerList()
        this.getScriptList()
    }

    // 主机列表

    public machineList: MachineItem[] = []

    async getMachineList() {
        const res = await LoApi.machine.list()
        this.machineList = res.Datasets
        this.loading = false
    }

    // 删除主机

    async deleteMachine(idx: number) {
        const item = this.machineList[idx]
        await LoApi.machine.remove(item.Id)
        this.machineList.splice(idx, 1)
    }

    // 节点列表

    public workerList: Record<string, WorkerItem> = {}

    async getWorkerList() {
        const res = await LoApi.workhub.list()
        res.Datasets.forEach(item => {
            this.workerList[item.WorkerId] = item
        })
    }

    // 获取快捷命令

    public scriptList: TaskScriptItem[] = []

    async getScriptList() {
        const res = await LoApi.taskScript.list()
        this.scriptList = [...shellList, ...res.Datasets]
    }

    // 执行快捷命令

    public workerExec(cmd: TaskScriptItem) {
        LoApi.workhub.exec({
            WorkerId: this.selectedRow.WorkerId,
            Payload: cmd
        })
    }

    // 选择主机

    public selectedRow!: MachineItem
    public rowScriptList: TaskScriptItem[] = []

    public tableRowChange(row: MachineItem) {
        this.rowScriptList = LoApi.taskScript.osFilter(this.scriptList, row.OSType)
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
                <el-table-column fixed prop="HostName" label="名称" min-width="120" />
                <el-table-column prop="IpAddress" label="公网 IP" />
                <el-table-column prop="Region" label="地域" />
                <el-table-column prop="Model" label="来源" />
                <el-table-column label="子节点">
                    <template #default="scope">
                        <el-button v-if="scope.row.WorkerId.length == 32" link type="success">
                            已注册
                        </el-button>
                        <el-button v-else link type="info">
                            未注册
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View">
                            <router-link :to="'/machine/detail/' + scope.row.Id">
                                管理
                            </router-link>
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
        </el-card>
        <div class="space-10" />
        <el-card v-if="selectedRow" shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>快捷命令</b>
                </div>
            </template>
            <div v-if="selectedRow.WorkerId.length == 32" class="button-list">
                <template v-for="item in rowScriptList" :key="item.Id">
                    <el-button @click="workerExec(item)">
                        {{ item.Name }}
                    </el-button>
                </template>
            </div>
            <div v-else>
                <p>主机未使用 <i>TDP Cloud Worker</i> 连接，请使用下述脚本完成注册。</p>
                <p>此脚本仅支持在 <b>{{ selectedRow.HostName }}</b> 上注册客户端，请勿在其它主机上运行！</p>
                <pre v-highlight>
                    <code>{{ installTDPWorker.Content.replace("/worker", "/worker/" + selectedRow.Id) }}</code>
                </pre>
            </div>
        </el-card>
    </div>
</template>
