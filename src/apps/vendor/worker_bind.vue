<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"

import { installTDPWorker } from "@/helper/script/shell"

import WorkerBind from "@/provider/worker/bind.vue"

@Component({
    components: { WorkerBind }
})
export default class VendoWorkerBind extends Vue {
    public installTDPWorker = installTDPWorker

    // 初始化

    public created() {
        this.getMachineList()
    }

    // 已绑定主机

    public machineList: Record<string, MachineItem> = {}

    async getMachineList() {
        const res = await NaApi.machine.list()
        res.Datasets.forEach((item) => {
            this.machineList[item.WorkerId] = item
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
                子节点
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-alert title="注册子节点命令" type="warning">
            <pre>{{ installTDPWorker.Content }}</pre>
        </el-alert>
        <div class="space-10" />
        <WorkerBind v-bind="{ boundList: machineList }" @change="getMachineList" />
    </div>
</template>
