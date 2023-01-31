<script lang="ts">
import { Prop, Ref, Component, Vue } from "vue-facing-decorator"

import { LoApi, QcApi } from "@/api"
import * as Qcloud from "@/api/qcloud/typings"
import { MachineItem } from "@/api/local/machine"
import { TaskScriptItem } from "@/api/local/task_script"

import shellList from "@/helper/script/shell"

@Component
export default class LighthouseVnc extends Vue {
    @Prop
    public meta!: Omit<MachineItem, "CloudMeta"> & {
        CloudMeta: Qcloud.Lighthouse.Instance
    }

    public created() {
        QcApi.vendor(this.meta.VendorId)
        this.getScriptList()
        this.vncInit()
    }

    // 获取区域

    public get region() {
        return this.meta.CloudMeta.Zone.replace(/-\d$/, "")
    }

    // 加载VNC框架

    @Ref
    public frame!: HTMLIFrameElement

    async vncInit() {
        const res = await QcApi.lighthouse.describeInstanceVncUrl(this.region, {
            InstanceId: this.meta.CloudId,
        })
        if (this.frame) {
            const vnc = '/api/qcloud/vnc?InstanceVncUrl='
            this.frame.src = vnc + res.InstanceVncUrl
        }
    }

    // 获取快捷命令

    public scriptList: TaskScriptItem[] = []

    async getScriptList() {
        this.scriptList.push(...shellList)
        const res = await LoApi.taskScript.list()
        this.scriptList.push(...res.Datasets)
    }

    // 执行快捷命令

    public vncExec(cmd: string) {
        if (this.frame.contentWindow) {
            const vdoc = this.frame.contentWindow.document
            const cbtn = vdoc.querySelector<HTMLAnchorElement>('a.copyBtn')
            cbtn && cbtn.click(), setTimeout(() => {
                const btn = vdoc.querySelector<HTMLButtonElement>('button.bt_confirm')
                const ipt = vdoc.querySelector<HTMLInputElement>('textarea.vnc-paste-text')
                if (btn && ipt) {
                    cmd = cmd.replace(/\n\s+/g, '\n')
                    cmd = cmd.replace(/\n+/g, '\n')
                    cmd = cmd.trim() + '\n'
                    ipt.value = cmd
                    btn.click()
                }
            }, 500)
        }
    }
}
</script>

<template>
    <iframe ref="frame" frameborder="no" />
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>快捷命令</b>
            </div>
        </template>
        <div class="button-list">
            <el-button v-for="item in scriptList" :key="item.Id" @click="vncExec(item.Content)">
                {{ item.Name }}
            </el-button>
        </div>
    </el-card>
</template>

<style lang="scss" scoped>
iframe {
    width: 100%;
    min-height: 860px;
}
</style>
