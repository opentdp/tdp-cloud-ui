<script lang="ts">
import { Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { MachineItem } from '@/api/native/machine';

import LighthouseVNC from '@/cloud/tencent/lighthouse/vnc.vue';

@Component({
    components: { LighthouseVNC }
})
export default class MachineVnc extends Vue {
    // 初始化

    public created() {
        const machineId = +this.$route.params.id;
        this.getMachine(machineId);
    }

    // 获取主机

    public machine!: MachineItem;

    async getMachine(id: number) {
        this.loading = true;
        const res = await NaApi.machine.detail(id);
        this.machine = res.Item;
        this.loading = false;
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
