<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { MachineItem } from "@/api/local/machine"

import LighthouseVNC from "@/provider/qcloud/lighthouse/vnc.vue"

@Component({
    components: { LighthouseVNC }
})
export default class MachineVnc extends Vue {
    public loading = true

    public created() {
        const machineId = +this.$route.params.id
        this.getMachine(machineId)
    }

    // 获取主机

    public machine!:  MachineItem

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
            <el-breadcrumb-item>
                VNC 控制台
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="loading" class="loading" />
        <template v-if="machine?.Model == 'qcloud/lighthouse'">
            <LighthouseVNC :meta="machine" />
        </template>
    </div>
</template>
