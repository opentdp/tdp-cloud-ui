<script lang="ts">
import { Component, Vue } from "@/apps/basic"

import { MachineItem } from "@/api/native/machine"

import { installWorker } from "@/helper/script/shell"

@Component
export default class WorkhubWorkerInstall extends Vue {
    public installWorker = installWorker

    public machine!: MachineItem

    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
    }

    public open(machine: MachineItem) {
        this.visible = true
        this.machine = machine
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="注册节点" :footer="false" width="50%">
        <t-space v-if="machine" fixed direction="vertical">
            <div>主机未使用 <i>TDP Cloud Worker</i> 连接，请运行脚本完成注册。此脚本仅支持在 <b>{{ machine.HostName }}</b> 上注册客户端，请勿在其它主机上运行！</div>
            <pre v-highlight>
                <code class="language-bash">{{ installWorker.Content.replace("/workhub", "/workhub/" + machine.Id) }}</code>
            </pre>
        </t-space>
    </t-dialog>
</template>
