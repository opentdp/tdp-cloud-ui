<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { MachineItem } from "@/api/native/machine"

import { bytesToSize, dateFormat } from "@/helper/format"

import SysLoad from "./sys_load.vue"

@Component({
    components: { SysLoad }
})
export default class WorkerInstance extends Vue {
    public bytesToSize = bytesToSize
    public dateFormat = dateFormat

    @Prop
    public machine!: MachineItem
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-card title="实例负载" hover-shadow header-bordered>
            <SysLoad :id="machine.WorkerId" />
        </t-card>

        <t-card title="实例信息" hover-shadow header-bordered>
            <t-list v-if="machine.WorkerMeta" :split="true">
                <t-list-item>
                    <b>实例ID</b>
                    <span>{{ machine.WorkerMeta.HostId }}</span>
                </t-list-item>
                <t-list-item>
                    <b>主机名</b>
                    <span> {{ machine.WorkerMeta.HostName }}</span>
                </t-list-item>
                <t-list-item>
                    <b>CPU 核心</b>
                    <span>内核：{{ machine.WorkerMeta.CpuCore }}，逻辑处理器：{{ machine.WorkerMeta.CpuCoreLogic }}</span>
                </t-list-item>
                <t-list-item>
                    <b>内存</b>
                    <span> {{ bytesToSize(machine.WorkerMeta.MemoryTotal) }}</span>
                </t-list-item>
                <t-list-item>
                    <b>操作系统</b>
                    <span> {{ machine.WorkerMeta.Platform }}（{{ machine.WorkerMeta.KernelArch }}）</span>
                </t-list-item>
                <t-list-item>
                    <b>公网 IP </b>
                    <span class="text-right">
                        <div v-if="machine.WorkerMeta.PublicIpv4">
                            {{ machine.WorkerMeta.PublicIpv4 }}
                        </div>
                        <div v-if="machine.WorkerMeta.PublicIpv6">
                            {{ machine.WorkerMeta.PublicIpv6 }}
                        </div>
                    </span>
                </t-list-item>
                <t-list-item>
                    <b>上次同步</b>
                    <span> {{ dateFormat(machine.WorkerMeta.CreateAt * 1000, "yyyy-MM-dd hh:mm:ss") }}</span>
                </t-list-item>
            </t-list>
        </t-card>
    </t-space>
</template>
