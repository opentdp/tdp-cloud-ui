<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                SSH 终端
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="curTab.id" type="border-card" class="mgb10" @tab-change="changeTab" @tab-remove="removeTab">
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
            <el-tab-pane v-for="item in sshTabs" :key="item.id" :name="item.id" :label="item.label" closable>
                <div :id="item.id" />
            </el-tab-pane>
        </el-tabs>
        <el-card v-if="curTab.id !== 'new'" shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>快捷命令</b>
                </div>
            </template>
            <el-button v-for="item in cmdList" :key="item.Id" @click="sshExec(item.Content)">
                {{ item.Name }}
            </el-button>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { ElMessage, FormInstance, FormRules } from "element-plus"

import Api from "@/api"
import { TATItem } from '@/api/local/tat'

import { WebSSH } from "@/helper/webssh"

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

function formSubmit(form: FormInstance | undefined) {
    form && form.validate(valid => {
        if (!valid) {
            ElMessage.error("请检查表单")
            return false
        }
        createTab()
    })
}

// 管理标签页

interface sshTab {
    id: string
    label: string
    webssh?: WebSSH
}

const curTab = reactive({
    id: "new", label: ""
})

const sshTabs = reactive<sshTab[]>([])

function createTab() {
    const tab: sshTab = {
        id: "tab-" + Date.now(),
        label: formModel.addr
    }
    sshTabs.push(tab)
    // 延迟连接
    changeTab(tab.id)
    setTimeout(() => {
        const url = Api.terminal.getWebsshWsurl(formModel)
        tab.webssh = new WebSSH(tab.id, url)
    }, 100)
}

function indexTab(id: string) {
    for (let i = 0; i < sshTabs.length; i++) {
        if (sshTabs[i].id === id) {
            return { index: i, tab: sshTabs[i] }
        }
    }
}

function changeTab(id: string) {
    const target = indexTab(id)
    curTab.id = target?.tab.id || "new"
    curTab.label = target?.tab.label || ""
}

function removeTab(id: string) {
    const target = indexTab(id)
    if (!target) {
        return
    }
    const { index, tab } = target
    if (curTab.id === id) {
        const next = sshTabs[index + 1] || sshTabs[index - 1]
        changeTab(next ? next.id : "new")
    }
    tab.webssh?.dispose()
    sshTabs.splice(index, 1)
}

// 执行快捷命令

const cmdList = ref<TATItem[]>([])

async function fetchTATList() {
    const res = await Api.tat.fetchTATList()
    cmdList.value = res
}

function sshExec(cmd: string) {
    const target = indexTab(curTab.id)
    if (target?.tab.webssh) {
        target.tab.webssh.exec(cmd)
    }
}

fetchTATList()
</script>
