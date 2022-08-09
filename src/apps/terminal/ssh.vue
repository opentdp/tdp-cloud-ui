<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { Api, QApi } from "@/api"
import { TATItem } from '@/api/local/tat'
import { SSHKeyItem } from "@/api/local/ssh_key"

import { WebSSH } from "@/helper/webssh"

const route = useRoute()

// 登录服务器

let authType = ref("0")

const formRef = ref<FormInstance>()

const formModel = reactive({
    addr: "" + route.params.addr,
    user: "root",
    password: "",
    privateKey: ""
})

const formRules: FormRules = {
    addr: [{ required: true, message: "格式 1.1.1.1:22" }],
    user: [{ required: true, message: "请输入用户名" }],
    password: [{
        validator: (rule, value, callback) => {
            if (!formModel.password && !formModel.privateKey) {
                callback(new Error("密码或公钥至少提供一个"))
            } else {
                callback()
            }
        }
    }],
    privateKey: [{
        validator: (rule, value, callback) => {
            if (!formModel.password && !formModel.privateKey) {
                callback(new Error("密码或公钥至少提供一个"))
            } else {
                callback()
            }
        }
    }],
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

// 获取实例列表

const lighthouseInstances = reactive<
    {
        ipAddresse: string
        platformType: string
        regionName: string
    }[]
>([])

async function getLighthouseInstances() {
    const data = await QApi.lighthouse.describeRegions()
    data.RegionSet.forEach(async (region) => {
        const data = await QApi.lighthouse.describeInstances(region.Region)
        data.InstanceSet.forEach(instance => {
            lighthouseInstances.push({
                regionName: region.RegionName,
                ipAddresse: instance.PublicAddresses[0],
                platformType: instance.PlatformType
            })
        })
    })
}

function lighthouseSearch(qr: string, cb: (a: unknown[]) => void) {
    const rs: unknown[] = []
    lighthouseInstances.forEach((item) => {
        if (item.platformType === "LINUX_UNIX"
            && (item.ipAddresse + item.regionName).includes(qr)) {
            rs.push({ value: item.ipAddresse, region: item.regionName })
        }
    })
    cb(rs)
}

// 获取密钥列表

const keylist = ref<SSHKeyItem[]>([])

async function fetchSSHKeys() {
    const res = await Api.sshkey.fetch()
    keylist.value = res
}

// 执行快捷命令

const cmdlist = ref<TATItem[]>([])

async function getTATCommondList() {
    const res = await Api.tat.fetchTATList()
    cmdlist.value = res
}

function sshExec(cmd: string) {
    const target = indexTab(curTab.id)
    if (target?.tab.webssh) {
        target.tab.webssh.exec(cmd)
    }
}

////// 初始化

getLighthouseInstances()
getTATCommondList()
fetchSSHKeys()
</script>

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
                <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="88px">
                    <el-form-item prop="addr" label="主机">
                        <el-autocomplete v-model="formModel.addr" :fetch-suggestions="lighthouseSearch" clearable>
                            <template #default="{ item }">
                                {{ item.value }} - {{ item.region }}
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                    <el-form-item prop="user" label="用户名">
                        <el-input v-model="formModel.user" />
                    </el-form-item>
                    <el-form-item label="验证方式">
                        <el-select v-model="authType">
                            <el-option label="用户密码" value="0" />
                            <el-option v-if="keylist.length > 0" label="选择私玥" value="2" />
                            <el-option label="输入私玥" value="4" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="authType == '0'" prop="password" label="密码">
                        <el-input v-model="formModel.password" type="password" @keyup.enter="formSubmit(formRef)" />
                    </el-form-item>
                    <el-form-item v-if="authType == '2'" prop="privateKey" label="私玥">
                        <el-select v-model="formModel.privateKey">
                            <el-option v-for="item in keylist" :key="item.Id" :label="item.Description"
                                :value="item.PrivateKey" />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="authType == '4'" prop="privateKey" label="私钥">
                        <el-input v-model="formModel.privateKey" type="textarea"
                            :autosize="{ minRows: 3, maxRows: 10 }" />
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
            <el-button v-for="item in cmdlist" :key="item.Id" @click="sshExec(item.Content)">
                {{ item.Name }}
            </el-button>
        </el-card>
    </div>
</template>
