<script lang="ts">
import { Ref, Component, Vue } from "@/apps/basic"

import { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import { ScriptItem } from "@/api/native/script"

import { installWorker } from "@/helper/script/shell"

import ScriptExec from "./exec.vue"

@Component({
    components: { ScriptExec }
})
export default class ScriptQuick extends Vue {
    public installWorker = installWorker
    public loading = true

    public machine!: MachineItem

    @Ref
    public execModal!: ScriptExec

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
    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
    }

    public open(machine: MachineItem) {
        this.visible = true
        this.loading = false
        this.machine = machine
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="选择脚本" :footer="false" width="50%">
        <div v-if="machine?.WorkerMeta">
            <t-space v-if="loading" fixed align="center">
                <t-loading />
            </t-space>
            <div v-if="scriptList.length == 0">
                暂无可用命令，请在 <b v-route="'/script/list'">脚本管理</b> 页面添加命令。
            </div>
            <t-space break-line size="8px">
                <template v-for="v in scriptList" :key="v.Id">
                    <t-button variant="outline" @click="execModal.open(machine, v)">
                        {{ v.Name }}
                    </t-button>
                </template>
            </t-space>
            <ScriptExec ref="execModal" />
        </div>
        <div v-else-if="machine">
            <div>主机未使用 <i>TDP Cloud Worker</i> 连接，请使用下述脚本完成注册。</div>
            <div>此脚本仅支持在 <b>{{ machine.HostName }}</b> 上注册客户端，请勿在其它主机上运行！</div>
            <pre v-highlight>
                <code class="language-bash">{{ installWorker.Content.replace("/workhub", "/workhub/" + machine.Id) }}</code>
            </pre>
        </div>
    </t-dialog>
</template>

<style lang="scss" scoped></style>