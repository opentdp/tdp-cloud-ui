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
                    <el-input v-model="formModel.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="formSubmit(formRef)">
                        保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="hover">
            <div id="xterm" class="xterm" />
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
    addr: import.meta.env.SSH_ADDR || "",
    user: import.meta.env.SSH_USER || "",
    password: import.meta.env.SSH_PASSWORD || "",
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
        sshConnect()
    })
}

// 创建终端

const sshConnect = () => {
    const term = new Terminal({
        rendererType: "canvas", // 渲染类型
        rows: 40, // 行数
        cols: 120, // 设置之后会输入多行之后覆盖现象
        convertEol: true, // 启用时，光标将设置为下一行的开头
        scrollback: 30, // 终端中的回滚量
        fontSize: 14, // 字体大小
        disableStdin: false, // 是否应禁用输入。
        cursorStyle: "block", // 光标样式
        cursorBlink: true, // 光标闪烁
        tabStopWidth: 4
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddon.fit()

    const wrap = document.getElementById('xterm')
    wrap && term.open(wrap)
    term.focus()

    const socket = Api.terminal.ssh(formModel)

    socket.onopen = () => {
        const attachAddon = new AttachAddon(socket)
        term.loadAddon(attachAddon)
        term.focus()
    }
    socket.onclose = () => {
        console.log('socket close')
    }
    socket.onerror = () => {
        console.log('socket error')
    }
}

</script>

<style lang="scss" scoped>
</style>
