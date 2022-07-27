<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item :to="{ path: '/' }">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                SSH 终端
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="curTabName" type="border-card" @tab-remove="removeTab">
            <el-tab-pane label="新建" name="new">
                <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="64px">
                    <el-form-item prop="addr" label="主机">
                        <el-input v-model="formModel.addr" />
                    </el-form-item>
                    <el-form-item prop="user" label="用户名">
                        <el-input v-model="formModel.user" />
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                        <el-input v-model="formModel.password" type="password" @keyup.enter="formSubmit(formRef)" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="formSubmit(formRef)">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane v-for="item in sshTabs" :key="item.name" :name="item.name" :label="item.label" closable>
                <div :id="item.name" class="ssh-layer" />
                <div>正在连接...</div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { ElMessage, FormInstance, FormRules } from "element-plus"

import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

import Api from "@/api"

// 标签页

interface sshTab {
    name: string
    label: string
    socket?: WebSocket
    terminal?: Terminal
}

const curTabName = ref("new")

const sshTabs = ref<sshTab[]>([])

const removeTab = (targetName: string) => {
    const tabs = sshTabs.value
    if (curTabName.value === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                curTabName.value = nextTab && nextTab.name || "new"
            }
        })
    }
    sshTabs.value = tabs.filter((tab) => tab.name !== targetName)
}

// 登录服务器

const formRef = ref<FormInstance>()

const formModel = reactive({
    addr: "",
    user: "",
    password: "",
})

const formRules: FormRules = {
    addr: [{ required: true, message: "格式 1.1.1.1:22", trigger: "blur" }],
    user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
}

const formSubmit = (form: FormInstance | undefined) => {
    form && form.validate(valid => {
        if (!valid) {
            ElMessage.error("请检查表单")
            return false
        }
        const tab: sshTab = {
            name: "tab-" + Date.now(),
            label: formModel.addr,
        }
        sshTabs.value.push(tab)
        curTabName.value = tab.name
        setTimeout(() => {
            tab.socket = initSocket()
            tab.terminal = initXterm(tab.socket, tab.name)
        }, 1000)
    })
}

// 创建终端

const initSocket = () => {
    const ws = Api.terminal.ssh(formModel)

    ws.onopen = () => {
        console.log('socket open')
    }
    ws.onclose = () => {
        console.log('socket close')
    }
    ws.onerror = () => {
        console.log('socket error')
    }

    return ws
}

const initXterm = (ws: WebSocket, id: string) => {
    const term = new Terminal({
        fontSize: 14, // 字体大小
        cursorBlink: true, // 光标闪烁
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddon.fit()

    const attachAddon = new AttachAddon(ws)
    term.loadAddon(attachAddon)

    const elem = document.getElementById(id)
    elem && term.open(elem)
    term.focus()

    return term
}
</script>

<style lang="scss" scoped>
.ssh-form {
    --el-card-padding: 20px 20px 2px 20px;
}

.ssh-layer:not(:empty)+div {
    display: none;
}

.ssh-card {
    --el-card-padding: 8px 0 8px 8px;
    --el-fill-color-blank: #000;
}
</style>
