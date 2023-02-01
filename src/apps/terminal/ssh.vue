<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { LoApi } from "@/api"
import { MachineItem } from "@/api/local/machine"
import { SSHKeyItem } from "@/api/local/sshkey"
import { TaskScriptItem } from "@/api/local/task_script"

import { WebSSH } from "@/helper/webssh"
import shellList from "@/helper/script/shell"

@Component
export default class TerminalSsh extends Vue {

    public created() {
        this.formModel.Addr = this.$route.params.addr + ""
        this.getMachineList()
        this.getSshkeyList()
        this.getScriptList()
    }

    // 管理标签页

    public curTab = {
        id: "new", label: ""
    }

    public tabList: sshTab[] = []

    public createTab() {
        const tab: sshTab = {
            id: "tab-" + Date.now(),
            label: this.formModel.Addr
        }
        this.tabList.push(tab)
        // 延迟连接
        this.changeTab(tab.id)
        setTimeout(() => {
            const url = LoApi.terminal.getWebsshURL(this.formModel)
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

    // 获取密钥列表

    public sshkeyList: SSHKeyItem[] = []

    async getSshkeyList() {
        const res = await LoApi.sshkey.list()
        this.sshkeyList = res.Datasets
    }

    // 获取主机列表

    public machineList: MachineItem[] = []

    async getMachineList() {
        const res = await LoApi.machine.list()
        this.machineList = res.Datasets
    }

    public machineFilter(qr: string, cb: (a: unknown[]) => void) {
        const rs: unknown[] = []
        this.machineList.forEach((item) => {
            if (item.OSType == "linux" && (item.IpAddress + item.Region).includes(qr)) {
                rs.push({ value: item.IpAddress, region: item.Region })
            }
        })
        cb(rs)
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

    // 登录服务器

    public authType = "0"

    @Ref
    public formRef!: FormInstance

    public formModel = {
        Addr: "",
        User: "root",
        Password: "",
        PrivateKey: ""
    }

    public formRules: FormRules = {
        Addr: [{ required: true, message: "格式 1.1.1.1:22" }],
        User: [{ required: true, message: "用户名 不能为空" }],
        Password: [{
            validator: (rule, value, callback) => {
                if (!this.formModel.Password && !this.formModel.PrivateKey) {
                    callback(new Error("密码或公钥至少提供一个"))
                } else {
                    callback()
                }
            }
        }],
        PrivateKey: [{
            validator: (rule, value, callback) => {
                if (!this.formModel.Password && !this.formModel.PrivateKey) {
                    callback(new Error("密码或公钥至少提供一个"))
                } else {
                    callback()
                }
            }
        }],
    }

    public formSubmit(form: FormInstance | undefined) {
        if (this.authType == "0") {
            this.formModel.PrivateKey = ""
        } else {
            this.formModel.Password = ""
        }
        form && form.validate(valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            this.createTab()
        })
    }
}

interface sshTab {
    id: string
    label: string
    webssh?: WebSSH
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
                                :value="item.PrivateKey"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="authType == '4'" prop="PrivateKey" label="私钥">
                        <el-input v-model="formModel.PrivateKey" type="textarea"
                            :autosize="{ minRows: 3, maxRows: 10 }"
                        />
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
