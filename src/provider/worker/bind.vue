<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { Api } from "@/api"
import { WorkerItem } from "@/api/local/workhub"

import { bytesToSize } from "@/helper/utils"

@Component
export default class WorkerBind extends Vue {
    public bytesToSize = bytesToSize

    public timer = 0

    public created() {
        this.getWorkerList()
        this.timer = setInterval(() => {
            this.getWorkerList()
        }, 15000)
    }

    public unmounted() {
        clearInterval(this.timer)
    }

    // 节点列表

    public workerList = [] as WorkerItem[]

    async getWorkerList() {
        const res = await Api.workhub.list()
        this.workerList = res
    }

    // 绑定主机

    public addMachine(item: WorkerItem) {
        Api.machine.create({
            VendorId: 0,
            HostName: item.HostName || item.SystemStat.HostName,
            IpAddress: item.RemoteAddr.replace(/:\d+$/, ''),
            OSType: item.OSType || item.SystemStat.OS,
            Region: "",
            Model: "local/worker",
            CloudId: item.HostId,
            CloudMeta: JSON.stringify(item.SystemStat),
            Description: "",
            Status: "{}",
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
            <el-table-column prop="RemoteAddr" label="地址" />
            <el-table-column label="主机名">
                <template #default="scope">
                    {{ scope.row.SystemStat.HostName }}
                </template>
            </el-table-column>
            <el-table-column label="CPU">
                <template #default="scope">
                    <el-progress :text-inside="true" :stroke-width="26"
                        :percentage="+scope.row.SystemStat.CpuPercent.toFixed(2)" status="success">
                        {{ scope.row.SystemStat.CpuPercent.toFixed(2) }}%，
                        {{ scope.row.SystemStat.CpuCore }} Cores
                    </el-progress>
                </template>
            </el-table-column>
            <el-table-column label="内存">
                <template #default="scope">
                    <el-progress :text-inside="true" :stroke-width="26"
                        :percentage="scope.row.SystemStat.MemoryUsed / scope.row.SystemStat.MemoryTotal * 100"
                        status="success">
                        {{ bytesToSize(scope.row.SystemStat.MemoryUsed) }} /
                        {{ bytesToSize(scope.row.SystemStat.MemoryTotal) }}
                    </el-progress>
                </template>
            </el-table-column>
            <el-table-column label="硬盘">
                <template #default="scope">
                    <el-progress :text-inside="true" :stroke-width="26"
                        :percentage="scope.row.SystemStat.DiskUsed / scope.row.SystemStat.DiskTotal * 100"
                        status="success">
                        {{ bytesToSize(scope.row.SystemStat.DiskUsed) }} /
                        {{ bytesToSize(scope.row.SystemStat.DiskTotal) }}
                    </el-progress>
                </template>
            </el-table-column>
            <el-table-column label="网络 In/Out">
                <template #default="scope">
                    {{ bytesToSize(scope.row.SystemStat.NetBytesRecv) }} /
                    {{ bytesToSize(scope.row.SystemStat.NetBytesSent) }}
                </template>
            </el-table-column>
            <el-table-column label="运行时间">
                <template #default="scope">
                    {{ (scope.row.SystemStat.Uptime / 86400).toFixed(1) }} 天
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button link type="primary" icon="View" @click="addMachine(scope.row)">
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
