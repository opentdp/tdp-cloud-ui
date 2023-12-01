<script lang="ts">
import { Component, Vue } from "@/apps/basic"

import { NaApi } from "@/api"
import { MachineModels, MachineItem } from "@/api/native/machine"

import WorkerFileman from "@/cloud/worker/fileman.vue"

@Component({
    components: { WorkerFileman }
})
export default class MachineFileman extends Vue {
    public MachineModels = MachineModels

    public loading = true

    // 初始化

    async created() {
        const machineId = +this.$route.params.id
        await this.getMachine(machineId)
    }

    // 获取主机

    public machine!: MachineItem

    async getMachine(id: number) {
        const res = await NaApi.machine.detail(id)
        this.machine = res.Item
        this.loading = false
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item to="/machine/list">
                文件管理
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="machine">
                {{ machine.HostName || machine.Id }} · {{ MachineModels[machine.Model] }}
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-space v-if="loading" fixed align="center">
            <t-loading />
        </t-space>

        <template v-if="machine">
            <WorkerFileman :machine="machine" />
        </template>
    </t-space>
</template>
