<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { LoApi } from "@/api"
import { TaskScriptItem } from "@/api/local/task_script"

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

    public tabList: tabItem[] = []

    public createTab(config: sshConfig) {
        const tab: tabItem = {
            id: "tab-" + Date.now(),
            label: config.Addr
        }
        this.tabList.push(tab)
        // 延迟连接
        this.changeTab(tab.id)
        setTimeout(() => {
            const url = LoApi.terminal.getWebsshURL(config)
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

    public removeTab(id: string) {
        const target = this.indexTab(id)
        if (!target) {
            return
        }
        const { index, tab } = target
        if (this.curTab.id == id) {
            const next = this.tabList[index + 1] || this.tabList[index - 1]
            this.changeTab(next ? next.id : "new")
        }
        tab.webssh?.dispose()
        this.tabList.splice(index, 1)
    }

    // 获取快捷命令

    public scriptList: TaskScriptItem[] = []

    async getScriptList() {
        const res = await LoApi.taskScript.list()
        const list = [...shellList, ...res.Datasets]
        // 根据操作系统过滤脚本
        this.scriptList = LoApi.taskScript.osFilter(list, "linux")
    }

    // 执行快捷命令

    public sshExec(cmd: string) {
        const target = this.indexTab(this.curTab.id)
        if (target?.tab.webssh) {
            target.tab.webssh.exec(cmd)
        }
    }

}

interface tabItem {
    id: string
    label: string
    webssh?: WebSSH
}

interface sshConfig {
    Addr: string
    User: string
    Password: string
    PrivateKey: string
}
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                SSH 连接
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="curTab.id" type="border-card" @tab-change="changeTab" @tab-remove="removeTab">
            <el-tab-pane label="新会话" name="new">
                <SshConnect :addr="addr" @submit="createTab" />
            </el-tab-pane>
            <el-tab-pane v-for="item in tabList" :key="item.id" :name="item.id" :label="item.label" closable>
                <div :id="item.id" />
            </el-tab-pane>
        </el-tabs>
        <div class="space-10" />
        <el-card v-if="curTab.id != 'new'" shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>快捷命令</b>
                </div>
            </template>
            <div class="button-list">
                <el-button v-for="item in scriptList" :key="item.Id" @click="sshExec(item.Content)">
                    {{ item.Name }}
                </el-button>
            </div>
        </el-card>
    </div>
</template>
