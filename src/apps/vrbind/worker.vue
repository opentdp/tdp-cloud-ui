<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { MachineItem } from "@/api/local/machine"

import { installTDPWorker } from "@/helper/script/shell"

import WorkerBind from "@/provider/worker/bind.vue"

@Component({
    components: { WorkerBind }
})
export default class VendorBindWorker extends Vue {
    public installTDPWorker = installTDPWorker

    // 初始化

    public created() {
        this.getMachineList()
    }

    // 已绑定主机

    public machineList: Record<string, MachineItem> = {}

    async getMachineList() {
        const res = await LoApi.machine.list()
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
        <WorkerBind :meta="{ boundList: machineList }" />
    </div>
</template>
