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
        <el-tabs v-model="curTabId" type="border-card" @tab-remove="removeTab">
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
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { ElMessage, FormInstance, FormRules } from "element-plus"

import { WebSSH } from './webssh'

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
        createTab()
    })
}

// 标签页

interface sshTab {
    id: string
    label: string
    webssh?: WebSSH
}

const curTabId = ref("new")

const sshTabs = ref<sshTab[]>([])

const createTab = () => {
    const tab: sshTab = {
        id: "tab-" + Date.now(),
        label: formModel.addr
    }
    sshTabs.value.push(tab)
    curTabId.value = tab.id

    setTimeout(() => {
        tab.webssh = new WebSSH(tab.id, formModel)
    }, 100)
}

const removeTab = (targetId: string) => {
    const tabs = sshTabs.value
    if (curTabId.value === targetId) {
        tabs.forEach((tab, index) => {
            if (tab.id === targetId) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                curTabId.value = nextTab && nextTab.id || "new"
            }
        })
    }
    sshTabs.value = tabs.filter((tab) => {
        if (tab.id === targetId) {
            tab.webssh?.dispose()
            return false
        }
        return true
    })
}
</script>
