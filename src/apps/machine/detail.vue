<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { MachineModels, MachineItem } from "@/api/local/machine"

import WorkerInstance from "@/provider/worker/instance.vue"
import CvmInstance from "@/provider/qcloud/cvm/instance.vue"
import LighthouseInstance from "@/provider/qcloud/lighthouse/instance.vue"

@Component({
    components: { CvmInstance, LighthouseInstance, WorkerInstance }
})
export default class MachineDetail extends Vue {
    public MachineModels = MachineModels
    public loading = true

    public created() {
        const machineId = +this.$route.params.id
        this.getMachine(machineId)
    }

    // 获取主机

    public machine!: MachineItem

    async getMachine(id: number) {
        const res = await LoApi.machine.detail(id)
        this.machine = res || {}
        this.loading = false
    }
}
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item to="/machine/list">
                主机管理
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="machine">
                {{ MachineModels[machine.Model] }} · {{ machine.HostName || machine.Id }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="loading" class="loading" />
        <template v-if="machine?.Model == 'qcloud/cvm'">
            <CvmInstance :meta="machine" />
        </template>
        <template v-if="machine?.Model == 'qcloud/lighthouse'">
            <LighthouseInstance :meta="machine" />
        </template>
        <template v-if="machine?.Model == 'local/worker'">
            <WorkerInstance :meta="machine" />
        </template>
    </div>
</template>
