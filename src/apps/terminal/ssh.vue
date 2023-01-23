<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { Api } from "@/api"
import { MachineItem } from "@/api/local/machine"
import { SSHKeyItem } from "@/api/local/sshkey"
import { TaskScriptItem } from '@/api/local/task_script'

import { WebSSH } from "@/helper/webssh"

// 初始化

const route = useRoute()

const ipAddress = route.params.addr as string

// 管理标签页

interface sshTab {
    id: string
    label: string
    webssh?: WebSSH
}

const curTab = reactive({
    id: "new", label: ""
})

const tabList = reactive<sshTab[]>([])

function createTab() {
    const tab: sshTab = {
        id: "tab-" + Date.now(),
        label: formModel.Addr
    }
    tabList.push(tab)
    // 延迟连接
    changeTab(tab.id)
    setTimeout(() => {
        const url = Api.socket.getWebsshURL(formModel)
        tab.webssh = new WebSSH(tab.id, url)
    }, 100)
}

function indexTab(id: string) {
    for (let i = 0; i < tabList.length; i++) {
        if (tabList[i].id === id) {
            return { index: i, tab: tabList[i] }
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
        const next = tabList[index + 1] || tabList[index - 1]
        changeTab(next ? next.id : "new")
    }
    tab.webssh?.dispose()
    tabList.splice(index, 1)
}

// 登录服务器

let authType = ref("0")

const formRef = ref<FormInstance>()

const formModel = reactive({
    Addr: ipAddress,
    User: "root",
    Password: "",
    PrivateKey: ""
})

const formRules: FormRules = {
    Addr: [{ required: true, message: "格式 1.1.1.1:22" }],
    User: [{ required: true, message: "用户名 不能为空" }],
    Password: [{
        validator: (rule, value, callback) => {
            if (!formModel.Password && !formModel.PrivateKey) {
                callback(new Error("密码或公钥至少提供一个"))
            } else {
                callback()
            }
        }
    }],
    PrivateKey: [{
        validator: (rule, value, callback) => {
            if (!formModel.Password && !formModel.PrivateKey) {
                callback(new Error("密码或公钥至少提供一个"))
            } else {
                callback()
            }
        }
    }],
}

function formSubmit(form: FormInstance | undefined) {
    if (authType.value === "0") {
        formModel.PrivateKey = ""
    } else {
        formModel.Password = ""
    }
    form && form.validate(valid => {
        if (!valid) {
            ElMessage.error("请检查表单")
            return false
        }
        createTab()
    })
}

// 获取主机列表

const machineList = reactive([] as MachineItem[])

async function getMachineList() {
    const res = await Api.machine.list()
    machineList.push(...res)
}

function machineFilter(qr: string, cb: (a: unknown[]) => void) {
    const rs: unknown[] = []
    machineList.forEach((item) => {
        if (item.OSType === "LINUX_UNIX" && (item.IpAddress + item.Region).includes(qr)) {
            rs.push({ value: item.IpAddress, region: item.Region })
        }
    })
    cb(rs)
}

// 获取密钥列表

const sshkeyList = ref<SSHKeyItem[]>([])

async function getSshkeyList() {
    const res = await Api.sshkey.list()
    sshkeyList.value = res
}

// 执行快捷命令

const scriptList = ref<TaskScriptItem[]>([])

async function getScriptList() {
    const res = await Api.taskScript.list()
    scriptList.value = res
}

function sshExec(cmd: string) {
    const target = indexTab(curTab.id)
    if (target?.tab.webssh) {
        target.tab.webssh.exec(cmd)
    }
}

// 加载数据

getMachineList()
getSshkeyList()
getScriptList()
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
                <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="88px">
                    <el-form-item prop="Addr" label="主机">
                        <el-autocomplete v-model="formModel.Addr" :fetch-suggestions="machineFilter" clearable>
                            <template #default="{ item }">
                                {{ item.value }} - {{ item.region }}
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item prop="User" label="用户名">
                        <el-input v-model="formModel.User" />
                    </el-form-item>
                    <el-form-item label="验证方式">
                        <el-select v-model="authType">
                            <el-option label="用户密码" value="0" />
                            <el-option v-if="sshkeyList.length > 0" label="选择私玥" value="2" />
                            <el-option label="输入私玥" value="4" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="authType == '0'" prop="Password" label="密码">
                        <el-input v-model="formModel.Password" type="password" @keyup.enter="formSubmit(formRef)" />
                    </el-form-item>
                    <el-form-item v-if="authType == '2'" prop="PrivateKey" label="私玥">
                        <el-select v-model="formModel.PrivateKey">
                            <el-option v-for="item in sshkeyList" :key="item.Id" :label="item.Description"
                                :value="item.PrivateKey" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="authType == '4'" prop="PrivateKey" label="私钥">
                        <el-input v-model="formModel.PrivateKey" type="textarea"
                            :autosize="{ minRows: 3, maxRows: 10 }" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="formSubmit(formRef)">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
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
