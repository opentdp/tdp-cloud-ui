<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import { WorkerItem } from "@/api/native/workhub"

import { bytesToSize } from "@/helper/format"

@Component({
    emits: ["change"]
})
export default class WorkerBind extends Vue {
    public bytesToSize = bytesToSize

    public timer = 0

    @Prop
    public boundList: Record<string, MachineItem> = {}

    // 初始化

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

    public workerList: WorkerItem[] = []

    async getWorkerList() {
        const res = await NaApi.workhub.list()
        this.workerList = res.Datasets
    }

    // 绑定主机

    public bindMachine(item: WorkerItem) {
        const rand = Date.now() + "-" + Math.round(Math.random() * 1000 + 1000)
        NaApi.machine.create({
            VendorId: 0,
            HostName: item.WorkerMeta.HostName,
            IpAddress: item.WorkerMeta.IpAddress,
            OSType: item.WorkerMeta.OS,
            Region: "",
            Model: "native/worker",
            CloudId: "rand-" + rand,
            CloudMeta: {},
            WorkerId: item.WorkerId,
            WorkerMeta: item.WorkerMeta,
            Description: "",
            Status: 1,
        })
    }

    // 同步主机

    async syncMachine(item: WorkerItem) {
        const bd = this.boundList[item.WorkerId]
        await NaApi.machine.update({
            Id: bd ? bd.Id : 0,
            HostName: item.WorkerMeta.HostName,
            IpAddress: item.WorkerMeta.IpAddress,
            OSType: item.WorkerMeta.OS,
            WorkerId: item.WorkerId,
            WorkerMeta: item.WorkerMeta,
        })
        this.$emit("change")
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
            <el-table-column label="主机名" show-overflow-tooltip fixed>
                <template #default="scope">
                    {{ scope.row.WorkerMeta.HostName }}
                </template>
            </el-table-column>
            <el-table-column label="公网 IP" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.WorkerMeta.IpAddress }}
                </template>
            </el-table-column>
            <el-table-column label="CPU" show-overflow-tooltip>
                <template #default="scope">
                    <el-progress :text-inside="true" :stroke-width="26"
                        :percentage="+scope.row.WorkerMeta.CpuPercent[0].toFixed(2)" status="success">
                        {{ scope.row.WorkerMeta.CpuPercent[0].toFixed(2) }}%，
                        {{ scope.row.WorkerMeta.CpuCore }} Cores
                    </el-progress>
                </template>
            </el-table-column>
            <el-table-column label="内存" show-overflow-tooltip>
                <template #default="scope">
                    <el-progress :text-inside="true" :stroke-width="26"
                        :percentage="scope.row.WorkerMeta.MemoryUsed / scope.row.WorkerMeta.MemoryTotal * 100"
                        status="success">
                        {{ bytesToSize(scope.row.WorkerMeta.MemoryUsed) }} /
                        {{ bytesToSize(scope.row.WorkerMeta.MemoryTotal) }}
                    </el-progress>
                </template>
            </el-table-column>
            <el-table-column label="系统" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.WorkerMeta.OS }}
                </template>
            </el-table-column>
            <el-table-column label="运行时间" show-overflow-tooltip>
                <template #default="scope">
                    {{ (scope.row.WorkerMeta.Uptime / 86400).toFixed(1) }} 天
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="boundList[scope.row.WorkerId]" link icon="View" @click="syncMachine(scope.row)">
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
