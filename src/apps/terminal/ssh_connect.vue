<script lang="ts">
import { Ref, Prop, Component, Vue } from "@/apps/basic"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData, AutoCompleteOption } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import { KeypairItem } from "@/api/native/keypair"
import { SSHRequest } from "@/api/native/terminal"

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
        this.keypairList = res.Items
    }

    // 获取主机列表

    public machineList: MachineItem[] = []

    async getMachineList() {
        const res = await NaApi.machine.list()
        this.machineList = res.Items
    }

    public machineFilter() {
        const rs: AutoCompleteOption[] = []
        this.machineList.forEach(item => {
            if (item.OSType == "linux") {
                rs.push({
                    label: item.IpAddress + " - " + item.Region,
                    text: item.IpAddress
                })
            }
        })
        return rs
    }

    // 创建表单

    public authType = "0"

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: SSHRequest = {
        Addr: "",
        User: "root",
        Password: "",
        PrivateKey: ""
    }

    public formRules: FormRules<SSHRequest> = {
        Addr: [{ required: true, message: "格式 1.1.1.1:22" }],
        User: [{ required: true }],
        Password: [{ required: true }],
        PrivateKey: [{ required: true }],
    }

    public formSubmit(ctx: SubmitContext<TData>) {
        if (this.authType == "0") {
            this.formModel.PrivateKey = ""
        } else {
            this.formModel.Password = ""
        }
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }

        this.$emit("submit", this.formModel)
    }
}
</script>

<template>
    <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="90px" @submit="formSubmit">
        <t-form-item name="Addr" label="主机">
            <t-auto-complete v-model="formModel.Addr" :options="machineFilter()" clearable />
        </t-form-item>
        <t-form-item name="User" label="用户名">
            <t-input v-model="formModel.User" />
        </t-form-item>
        <t-form-item label="验证方式">
            <t-select v-model="authType">
                <t-option value="0" label="输入密码" />
                <t-option value="2" label="输入私玥" />
                <t-option v-if="keypairList.length > 0" value="4" label="选择私玥" />
            </t-select>
        </t-form-item>
        <t-form-item v-if="authType == '0'" name="Password" label="密码">
            <t-input v-model="formModel.Password" type="password" />
        </t-form-item>
        <t-form-item v-if="authType == '2'" name="PrivateKey" label="私钥">
            <t-textarea v-model="formModel.PrivateKey" :autosize="{ minRows: 5, maxRows: 15 }" />
        </t-form-item>
        <t-form-item v-if="authType == '4'" name="PrivateKey" label="私玥">
            <t-select v-model="formModel.PrivateKey">
                <t-option v-for="v in keypairList" :key="v.Id" :value="v.Id" :label="v.Description" />
            </t-select>
        </t-form-item>
        <t-form-item>
            <t-button theme="primary" type="submit">
                登录
            </t-button>
        </t-form-item>
    </t-form>
</template>