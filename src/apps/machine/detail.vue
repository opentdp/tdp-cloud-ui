<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineModels, MachineItem } from "@/api/native/machine"

import CvmInstance from "@/provider/tencent/cvm/instance.vue"
import LighthouseInstance from "@/provider/tencent/lighthouse/instance.vue"
import WorkerInstance from "@/provider/worker/instance.vue"

@Component({
    components: { CvmInstance, LighthouseInstance, WorkerInstance }
})
export default class MachineDetail extends Vue {
    public MachineModels = MachineModels

    public loading = true

    // 初始化

    public created() {
        const machineId = +this.$route.params.id
        this.getMachine(machineId)
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
            <t-breadcrumb-item to="/">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item to="/machine/list">
                主机管理
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="machine">
                {{ MachineModels[machine.Model] }} · {{ machine.HostName || machine.Id }}
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-space v-if="loading" fixed align="center">
            <t-loading />
        </t-space>

        <template v-if="machine?.Model == 'tencent/cvm'">
            <CvmInstance :machine="machine" />
        </template>

        <template v-if="machine?.Model == 'tencent/lighthouse'">
            <LighthouseInstance :machine="machine" />
        </template>

        <template v-if="machine?.Model == 'native/worker'">
            <WorkerInstance :machine="machine" />
        </template>
    </t-space>
</template>
