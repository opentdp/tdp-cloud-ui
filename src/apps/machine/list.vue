<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { Api } from "@/api"
import { MachineItem } from "@/api/local/machine"
import { WorkerItem } from "@/api/local/workhub"

@Component
export default class MachineList extends Vue {
    public loading = true

    public created() {
        this.getMachineList()
        this.getWorkerList()
    }

    // 主机列表

    public machineList: MachineItem[] = []

    async getMachineList() {
        const res = await Api.machine.list()
        this.machineList = res || []
        this.loading = false
    }

    // 删除主机

    async deleteMachine(idx: number) {
        const item = this.machineList[idx]
        await Api.machine.remove(item.Id)
        this.machineList.splice(idx, 1)
    }

    // 节点列表

    public workerList: Record<string, WorkerItem> = {}

    async getWorkerList() {
        const res = await Api.workhub.list()
        res.forEach(item => {
            this.workerList[item.HostId] = item
        })
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
            <el-table v-loading="loading" :data="machineList" table-layout="fixed">
                <el-table-column fixed prop="HostName" label="名称" min-width="120" />
                <el-table-column prop="IpAddress" label="IP 地址" />
                <el-table-column prop="Region" label="地域" />
                <el-table-column prop="Model" label="来源" />
                <el-table-column label="子节点">
                    <template #default="scope">
                        <el-button v-if="workerList[scope.row.CloudId]" link type="success">
                            运行中
                        </el-button>
                        <el-button v-else link type="info">
                            未安装
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
    </div>
</template>
