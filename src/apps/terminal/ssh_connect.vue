<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import { SSHRequest } from "@/api/native/terminal"
import { KeypairItem } from "@/api/native/keypair"

@Component({
    emits: ["submit"],
})
export default class TerminalSshConnect extends Vue {
    @Prop
    public addr = ""

    // 初始化

    public created() {
        this.formModel.Addr = this.addr
        this.getMachineList()
        this.getKeypairList()
    }

    // 获取密钥列表

    public keypairList: KeypairItem[] = []

    async getKeypairList() {
        const res = await NaApi.keypair.list()
        this.keypairList = res.Datasets
    }

    // 获取主机列表

    public machineList: MachineItem[] = []

    async getMachineList() {
        const res = await NaApi.machine.list()
        this.machineList = res.Datasets
    }

    public machineFilter(qr: string, cb: (a: unknown[]) => void) {
        const rs: unknown[] = []
        this.machineList.forEach(item => {
            if (item.OSType == "linux" && (item.IpAddress + item.Region).includes(qr)) {
                rs.push({ value: item.IpAddress, region: item.Region })
            }
        })
        cb(rs)
    }

    // 创建表单

    public authType = "0"

    @Ref
    public formRef!: FormInstance

    public formModel: SSHRequest = {
        Addr: "",
        User: "root",
        Password: "",
        PrivateKey: ""
    }

    public formRules: FormRules = {
        Addr: [{ required: true, message: "格式 1.1.1.1:22" }],
        User: [{ required: true, message: "不能为空" }],
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
            this.$emit("submit", this.formModel)
        })
    }
}
</script>

<template>
    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
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
                <el-option v-if="keypairList.length > 0" label="选择私玥" value="2" />
                <el-option label="输入私玥" value="4" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="authType == '0'" prop="Password" label="密码">
            <el-input v-model="formModel.Password" show-password @keyup.enter="formSubmit(formRef)" />
        </el-form-item>
        <el-form-item v-if="authType == '2'" prop="PrivateKey" label="私玥">
            <el-select v-model="formModel.PrivateKey">
                <el-option v-for="item in keypairList" :key="item.Id" :label="item.Description"
                    :value="item.PrivateKey" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="authType == '4'" prop="PrivateKey" label="私钥">
            <el-input v-model="formModel.PrivateKey" type="textarea" :autosize="{ minRows: 5 }" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="formSubmit(formRef)">
                登录
            </el-button>
        </el-form-item>
    </el-form>
</template>