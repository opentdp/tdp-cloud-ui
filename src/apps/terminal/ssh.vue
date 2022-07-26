<template>
    <div>
        <el-card shadow="hover" class="mgb10">
            <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="90px">
                <el-form-item prop="addr" label="远程地址">
                    <el-input v-model="formModel.addr" />
                </el-form-item>
                <el-form-item prop="user" label="用户名">
                    <el-input v-model="formModel.user" />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="formModel.password" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="formSubmit(formRef)">
                        链接
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover" class="ssh-card">
            <div class="ssh-layer" />
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
        initXterm()
    })
}

// 创建终端

const initSocket = () => {
    const socket = Api.terminal.ssh(formModel)

    socket.onopen = () => {
        console.log('socket open')
    }
    socket.onclose = () => {
        console.log('socket close')
    }
    socket.onerror = () => {
        console.log('socket error')
    }

    return socket
}

const initXterm = () => {
    const sock = initSocket()

    const term = new Terminal({
        fontSize: 14, // 字体大小
        cursorBlink: true, // 光标闪烁
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddon.fit()

    const attachAddon = new AttachAddon(sock)
    term.loadAddon(attachAddon)

    const wrap = document.querySelector('.ssh-layer')
    wrap && term.open(wrap as HTMLElement)
    term.focus()

    return [sock, term]
}
</script>

<style lang="scss" scoped>
.ssh-card {
    --el-card-padding: 8px 0 8px 8px;
    --el-fill-color-blank: #000;
}
</style>
