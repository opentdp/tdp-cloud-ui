<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { Api } from "@/api"
import { MachineItem } from "@/api/local/machine"

import WorkerInstance from '@/provider/worker/instance.vue'
import LighthouseInstance from '@/provider/qcloud/lighthouse/instance.vue'

@Component({
    components: { WorkerInstance, LighthouseInstance }
})
export default class MachineDetail extends Vue {
    public loading = true

    public created() {
        const machineId = +this.$route.params.id
        this.getMachine(machineId)
    }

    // 获取主机

    public machine!: MachineItem

    async getMachine(id: number) {
        const res = await Api.machine.detail(id)
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
            <el-breadcrumb-item>
                主机详情
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="loading" class="loading" />
        <div v-if="machine.Model == 'qcloud/lighthouse'">
            <LighthouseInstance :meta="machine" />
        </div>
        <div v-if="machine.Model == 'local/worker'">
            <WorkerInstance :meta="machine" />
        </div>
    </div>
</template>
