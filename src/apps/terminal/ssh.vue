<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { SSHRequest } from "@/api/native/terminal"
import { ScriptPayload } from "@/api/native/typings"

import { WebSSH } from "@/helper/webssh"
import shellList from "@/helper/script/shell"

import SshConnect from "./ssh_connect.vue"

@Component({
    components: { SshConnect }
})
export default class TerminalSsh extends Vue {
    public addr = ""

    // 初始化

    public created() {
        this.addr = this.$route.params.addr + ""
        this.getScriptList()
    }

    // 管理标签页

    public curTab = {
        id: "new", label: ""
    }

    public tabList: TabItem[] = []

    public createTab(config: SSHRequest) {
        const tab: TabItem = {
            id: "tab-" + Date.now(),
            label: config.Addr
        }
        this.tabList.push(tab)
        // 延迟连接
        this.changeTab(tab.id)
        setTimeout(() => {
            const url = NaApi.terminal.getWebsshURL(config)
            tab.webssh = new WebSSH(tab.id, url)
        }, 100)
    }

    public indexTab(id: string) {
        for (let i = 0; i < this.tabList.length; i++) {
            if (this.tabList[i].id == id) {
                return { index: i, tab: this.tabList[i] }
            }
        }
    }

    public changeTab(id: string) {
        const target = this.indexTab(id)
        this.curTab.id = target?.tab.id || "new"
        this.curTab.label = target?.tab.label || ""
    }

    public removeTab(item: { value: string }) {
        const target = this.indexTab(item.value)
        if (!target) {
            return
        }
        const { index, tab } = target
        if (this.curTab.id == item.value) {
            const next = this.tabList[index + 1] || this.tabList[index - 1]
            this.changeTab(next ? next.id : "new")
        }
        tab.webssh?.dispose()
        this.tabList.splice(index, 1)
    }

    // 获取快捷命令

    public scriptList: ScriptPayload[] = []

    async getScriptList() {
        const res = await NaApi.script.list()
        const list = [...shellList, ...res.Items]
        // 根据操作系统过滤脚本
        this.scriptList = NaApi.script.osFilter(list, "linux")
    }

    // 执行快捷命令

    public sshExec(cmd: string) {
        const target = this.indexTab(this.curTab.id)
        if (target?.tab.webssh) {
            target.tab.webssh.exec(cmd)
        }
    }

}

interface TabItem {
    id: string
    label: string
    webssh?: WebSSH
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                SSH 连接
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-tabs v-model="curTab.id" theme="card" @change="changeTab" @remove="removeTab">
            <t-tab-panel label="新会话" value="new">
                <SshConnect :addr="addr" @submit="createTab" />
            </t-tab-panel>
            <template v-for="v in tabList" :key="v.id">
                <t-tab-panel :value="v.id" :label="v.label" :destroy-on-hide="false" removable>
                    <div :id="v.id" />
                </t-tab-panel>
            </template>
        </t-tabs>

        <t-card v-if="curTab.id != 'new'" title="快捷命令" hover-shadow header-bordered>
            <t-space fixed break-line>
                <template v-for="v in scriptList" :key="v.Id">
                    <t-button variant="outline" @click="sshExec(v.Content)">
                        {{ v.Name }}
                    </t-button>
                </template>
            </t-space>
        </t-card>
    </t-space>
</template>
