<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"

import { installWorker } from "@/helper/script/shell"

import WorkerBind from "@/cloud/worker/bind.vue"

@Component({
    components: { WorkerBind }
})
export default class WorkhubWorkerBind extends Vue {
    public installWorker = installWorker

    // 初始化

    public created() {
        this.getMachineList()
    }

    // 已绑定主机

    public machineList: Record<string, MachineItem> = {}

    async getMachineList() {
        const res = await NaApi.machine.list()
        res.Items.forEach(item => {
            this.machineList[item.WorkerId] = item
        })
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                节点管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <WorkerBind v-bind="{ boundList: machineList }" @change="getMachineList" />

        <pre v-highlight max-height="300" class="lang-bash">
            <h3>注册子节点</h3>
            <code>{{ installWorker.Content }}</code>
        </pre>
    </t-space>
</template>
