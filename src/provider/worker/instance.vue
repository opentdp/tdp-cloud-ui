<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { MachineItem } from "@/api/local/machine"
import { WorkerItem } from "@/api/local/workhub"

@Component
export default class WorkerInstance extends Vue {
    @Prop
    public meta!: Omit<MachineItem, "CloudMeta"> & {
        CloudMeta: WorkerItem
    }

    public created() {
        console.log(this.meta)
    }
}
</script>

<template>
    <div>暂无详细信息</div>
</template>