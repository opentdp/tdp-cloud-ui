<script lang="ts">
import { Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { MachineModels, MachineItem } from '@/api/native/machine';

import AlibabaEcs from '@/cloud/alibaba/ecs/instance.vue';
import AlibabaSwas from '@/cloud/alibaba/swas/instance.vue';

import TencentCvm from '@/cloud/tencent/cvm/instance.vue';
import TencentLighthouse from '@/cloud/tencent/lighthouse/instance.vue';

import NativeWorker from '@/cloud/worker/instance.vue';

@Component({
    components: { AlibabaEcs, AlibabaSwas, TencentCvm, TencentLighthouse, NativeWorker }
})
export default class MachineDetail extends Vue {
    public MachineModels = MachineModels;

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
            <t-breadcrumb-item to="/machine/list">
                主机管理
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="machine">
                {{ machine.HostName || machine.Id }} · {{ MachineModels[machine.Model] }}
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-space v-if="loading" fixed align="center">
            <t-loading />
        </t-space>

        <template v-if="machine?.Model == 'alibaba/ecs'">
            <AlibabaEcs :machine="machine" />
        </template>

        <template v-if="machine?.Model == 'alibaba/swas'">
            <AlibabaSwas :machine="machine" />
        </template>

        <template v-if="machine?.Model == 'tencent/cvm'">
            <TencentCvm :machine="machine" />
        </template>

        <template v-if="machine?.Model == 'tencent/lighthouse'">
            <TencentLighthouse :machine="machine" />
        </template>

        <template v-if="machine?.Model == 'native/worker'">
            <NativeWorker :machine="machine" />
        </template>
    </t-space>
</template>
