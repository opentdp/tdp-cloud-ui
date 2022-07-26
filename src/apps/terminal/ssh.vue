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
        <el-card shadow="hover" class="ssh-form mgb10">
            <el-form ref="formRef" :inline="true" :model="formModel" :rules="formRules">
                <el-form-item prop="addr">
                    <el-input v-model="formModel.addr" placeholder="远程地址" />
                </el-form-item>
                <el-form-item prop="user">
                    <el-input v-model="formModel.user" placeholder="用户名" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="formModel.password" type="password" placeholder="密码" @keyup.enter="formSubmit(formRef)" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="formSubmit(formRef)">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover" class="ssh-card">
            <div ref="termRef" id="ssh-layer" />
        </el-card>
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

// 登录服务器

const termRef = ref<HTMLElement>()
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
        initXterm(initSocket())
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

const initXterm = (ws: WebSocket) => {
    const term = new Terminal({
        fontSize: 14, // 字体大小
        cursorBlink: true, // 光标闪烁
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddon.fit()

    const attachAddon = new AttachAddon(ws)
    term.loadAddon(attachAddon)

    const wrap = termRef.value
    wrap && term.open(wrap)
    term.focus()

    return term
}
</script>

<style lang="scss" scoped>
.ssh-form {
    --el-card-padding: 20px 20px 2px 20px;
}

.ssh-card {
    --el-card-padding: 8px 0 8px 8px;
    --el-fill-color-blank: #000;
}
</style>
