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
        this.workerList = res.Items
    }

    // 绑定主机

    public bindMachine(item: WorkerItem) {
        NaApi.machine.create({
            VendorId: 0,
            HostName: item.WorkerMeta.HostName,
            IpAddress: item.WorkerMeta.IpAddress,
            OSType: item.WorkerMeta.OS,
            Region: "",
            Model: "native/worker",
            CloudId: "",
            CloudMeta: null,
            WorkerId: item.WorkerId,
            WorkerMeta: item.WorkerMeta,
            Status: "",
            Description: "",
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
    <t-card title="在线节点" hover-shadow header-bordered>
        <el-table ref="tableRef" :data="workerList" highlight-current-row>
            <el-table-column prop="WorkerMeta.HostName" label="主机名" fixed show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.WorkerMeta.HostName }}
                </template>
            </el-table-column>
            <el-table-column prop="WorkerMeta.IpAddress" label="公网 IP" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.WorkerMeta.IpAddress }}
                </template>
            </el-table-column>
            <el-table-column prop="WorkerMeta.CpuCore" label="CPU" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.WorkerMeta.CpuPercent[0].toFixed(2) }}%，{{ scope.row.WorkerMeta.CpuCore }} Cores
                </template>
            </el-table-column>
            <el-table-column prop="WorkerMeta.MemoryTotal" label="内存" show-overflow-tooltip>
                <template #default="scope">
                    {{ bytesToSize(scope.row.WorkerMeta.MemoryUsed) }} / {{ bytesToSize(scope.row.WorkerMeta.MemoryTotal) }}
                </template>
            </el-table-column>
            <el-table-column prop="WorkerMeta.OS" label="系统" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.WorkerMeta.OS }}
                </template>
            </el-table-column>
            <el-table-column prop="WorkerMeta.Uptime" label="运行时长" show-overflow-tooltip>
                <template #default="scope">
                    {{ (scope.row.WorkerMeta.Uptime / 86400).toFixed(1) }} 天
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <t-link v-if="boundList[scope.row.WorkerId]" theme="success" hover="color"
                        @click="syncMachine(scope.row)">
                        同步
                    </t-link>
                    <t-link v-else theme="primary" hover="color" @click="bindMachine(scope.row)">
                        导入
                    </t-link>
                </template>
            </el-table-column>
        </el-table>
    </t-card>
</template>
