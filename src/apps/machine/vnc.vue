<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"

import LighthouseVNC from "@/provider/tencent/lighthouse/vnc.vue"

@Component({
    components: { LighthouseVNC }
})
export default class MachineVnc extends Vue {
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
            <t-breadcrumb-item>
                VNC 控制台
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-space v-if="loading" fixed align="center">
            <t-loading />
        </t-space>

        <template v-if="machine?.Model == 'tencent/lighthouse'">
            <LighthouseVNC :machine="machine" />
        </template>
    </t-space>
</template>
