<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { Api } from "@/api"
import { MachineItem } from "@/api/local/machine"
import { WorkerItem } from "@/api/local/workhub"

import { bytesToSize } from "@/helper/format"

@Component
export default class WorkerBind extends Vue {
    public bytesToSize = bytesToSize

    public timer = 0

    public created() {
        this.getBoundMachineList()
        this.getWorkerList()
        this.timer = setInterval(() => {
            this.getWorkerList()
        }, 15000)
    }

    public unmounted() {
        clearInterval(this.timer)
    }

    // 节点列表

    public workerList: WorkerItem[] = []

    async getWorkerList() {
        const res = await Api.workhub.list()
        this.workerList = res
    }

    // 已绑定主机

    public boundMachineList: Record<string, MachineItem> = {}

    async getBoundMachineList() {
        const res = await Api.machine.list()
        res.forEach((item) => {
            this.boundMachineList[item.WorkerId] = item
        })
    }

    // 绑定主机

    public bindMachine(item: WorkerItem) {
        const rand = Date.now() + "-" + Math.round(Math.random() * 1000 + 1000)
        Api.machine.create({
            VendorId: 0,
            HostName: item.WorkerMeta.HostName,
            IpAddress: item.WorkerMeta.IpAddress,
            OSType: item.WorkerMeta.OS,
            Region: "",
            Model: "local/worker",
            CloudId: "rand-" + rand,
            CloudMeta: {},
            WorkerId: item.WorkerId,
            WorkerMeta: item.WorkerMeta,
            Description: "",
            Status: 1,
        })
    }

    // 同步主机

    public syncMachine(item: WorkerItem) {
        const bd = this.boundMachineList[item.WorkerId]
        Api.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: item.WorkerMeta.HostName,
            IpAddress: item.WorkerMeta.IpAddress,
            OSType: item.WorkerMeta.OS,
            WorkerId: item.WorkerId,
            WorkerMeta: item.WorkerMeta,
        })
    }
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>在线节点</b>
            </div>
        </template>
        <el-table ref="tableRef" :data="workerList" highlight-current-row>
            <el-table-column label="主机名">
                <template #default="scope">
                    {{ scope.row.WorkerMeta.HostName }}
                </template>
            </el-table-column>
            <el-table-column label="地址">
                <template #default="scope">
                    {{ scope.row.WorkerMeta.IpAddress }}
                </template>
            </el-table-column>
            <el-table-column label="CPU">
                <template #default="scope">
                    <el-progress :text-inside="true" :stroke-width="26"
                        :percentage="+scope.row.WorkerMeta.CpuPercent.toFixed(2)" status="success">
                        {{ scope.row.WorkerMeta.CpuPercent.toFixed(2) }}%，
                        {{ scope.row.WorkerMeta.CpuCore }} Cores
                    </el-progress>
                </template>
            </el-table-column>
            <el-table-column label="内存">
                <template #default="scope">
                    <el-progress :text-inside="true" :stroke-width="26"
                        :percentage="scope.row.WorkerMeta.MemoryUsed / scope.row.WorkerMeta.MemoryTotal * 100"
                        status="success">
                        {{ bytesToSize(scope.row.WorkerMeta.MemoryUsed) }} /
                        {{ bytesToSize(scope.row.WorkerMeta.MemoryTotal) }}
                    </el-progress>
                </template>
            </el-table-column>
            <el-table-column label="硬盘">
                <template #default="scope">
                    <el-progress :text-inside="true" :stroke-width="26"
                        :percentage="scope.row.WorkerMeta.DiskUsed / scope.row.WorkerMeta.DiskTotal * 100"
                        status="success">
                        {{ bytesToSize(scope.row.WorkerMeta.DiskUsed) }} /
                        {{ bytesToSize(scope.row.WorkerMeta.DiskTotal) }}
                    </el-progress>
                </template>
            </el-table-column>
            <el-table-column label="网络 In/Out">
                <template #default="scope">
                    {{ bytesToSize(scope.row.WorkerMeta.NetBytesRecv) }} /
                    {{ bytesToSize(scope.row.WorkerMeta.NetBytesSent) }}
                </template>
            </el-table-column>
            <el-table-column label="运行时间">
                <template #default="scope">
                    {{ (scope.row.WorkerMeta.Uptime / 86400).toFixed(1) }} 天
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="boundMachineList[scope.row.WorkerId]" link icon="View"
                        @click="syncMachine(scope.row)">
                        同步
                    </el-button>
                    <el-button v-else link type="primary" icon="View" @click="bindMachine(scope.row)">
                        导入
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<style lang="scss" scoped>
.el-progress {
    --el-border-color-lighter: #ccc
}
</style>
