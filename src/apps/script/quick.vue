<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import { ScriptItem } from "@/api/native/script"

import { installWorker } from "@/helper/script/shell"

import QuickExec from "./quick_exec.vue"

@Component({
    components: { QuickExec }
})
export default class ScriptQuick extends Vue {
    public installWorker = installWorker

    public loading = true

    @Prop
    public machine!: MachineItem

    @Ref
    public execModal!: QuickExec

    // 初始化

    public created() {
        this.getScriptList()
    }

    // 获取脚本列表

    public scriptList: ScriptItem[] = []

    async getScriptList() {
        const res = await NaApi.script.list()
        this.scriptList = res.Items
        this.loading = false
    }

    // 执行快捷命令

    public workerExec(cmd: ScriptItem) {
        NaApi.workhub.exec(this.machine.WorkerId, cmd)
    }
}
</script>

<template>
    <div v-if="machine.WorkerMeta" v-loading="loading">
        <p v-if="scriptList.length == 0">
            暂无可用命令，请在 <b v-route="'/script/list'">脚本管理</b> 页面添加命令。
        </p>
        <template v-for="v in scriptList" :key="v.Id">
            <t-button variant="outline" @click="execModal.open(machine, v)">
                {{ v.Name }}
            </t-button>
        </template>
    </div>
    <div v-else>
        <p>主机未使用 <i>TDP Cloud Worker</i> 连接，请使用下述脚本完成注册。</p>
        <p>此脚本仅支持在 <b>{{ machine.HostName }}</b> 上注册客户端，请勿在其它主机上运行！</p>
        <pre v-highlight class="lang-bash">
            <code>{{ installWorker.Content.replace("/workhub", "/workhub/" + machine.Id) }}</code>
        </pre>
    </div>
    <QuickExec ref="execModal" />
</template>

<style lang="scss" scoped>
div>p {
    margin: 0;
    color: var(--el-color-info);
}
</style>