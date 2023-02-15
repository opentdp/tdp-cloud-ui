<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"

import { installWorker } from "@/helper/script/shell"

import WorkerBind from "@/provider/worker/bind.vue"

@Component({
    components: { WorkerBind }
})
export default class VendoWorkerBind extends Vue {
    public installWorker = installWorker

    // 初始化

    public created() {
        this.getMachineList()
    }

    // 已绑定主机

    public machineList: Record<string, MachineItem> = {}

    async getMachineList() {
        const res = await NaApi.machine.list()
        res.Datasets.forEach(item => {
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
        <WorkerBind v-bind="{ boundList: machineList }" @change="getMachineList" />
        <div class="space-10" />
        <pre v-highlight max-height="300" class="lang-bash">
            <h3>注册子节点</h3>
            <code>{{ installWorker.Content }}</code>
        </pre>
    </div>
</template>
