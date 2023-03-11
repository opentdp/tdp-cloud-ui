<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext } from "tdesign-vue-next"

import Api, { TcApi } from "@/api"
import * as TC from "@/api/tencent/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class LighthouseFirewallUpdate extends Vue {
    public instance!: TC.Lighthouse.Instance
    public firewallRuleList!: TC.Lighthouse.FirewallRule[]

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: TC.Lighthouse.FirewallRule = {
        Protocol: "TCP",
        Port: "",
        CidrBlock: "0.0.0.0/0",
        Action: "ACCEPT",
        FirewallRuleDescription: "",
    }

    public formRules: FormRules<TC.Lighthouse.FirewallRule> = {
        Protocol: [{ required: true }],
        Action: [{ required: true }]
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<FormData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await TcApi.lighthouse.modifyFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
            FirewallRules: this.firewallRuleList
        })
        this.close()
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open(instance: TC.Lighthouse.Instance, rules: TC.Lighthouse.FirewallRule[], idx: number) {
        this.instance = instance
        this.firewallRuleList = rules
        this.formModel = rules[idx]
        this.dailog = true
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="修改规则" width="400px">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="CidrBlock" label="来源">
                <t-input v-model="formModel.CidrBlock" />
            </t-form-item>
            <t-form-item name="Protocol" label="协议">
                <el-select v-model="formModel.Protocol">
                    <el-option label="TCP" value="TCP" />
                    <el-option label="UDP" value="UDP" />
                    <el-option label="ICMP" value="ICMP" />
                </el-select>
            </t-form-item>
            <t-form-item v-if="/TCP|UDP/.test(formModel.Protocol)" label="端口">
                <t-input v-model="formModel.Port" />
            </t-form-item>
            <t-form-item name="Action" label="策略">
                <el-select v-model="formModel.Action">
                    <el-option label="允许" value="ACCEPT" />
                    <el-option label="拒绝" value="DROP" />
                </el-select>
            </t-form-item>
            <t-form-item label="备注">
                <t-input v-model="formModel.FirewallRuleDescription" />
            </t-form-item>
            <t-form-item>
                <t-space size="small">
                    <t-button theme="primary" type="submit">
                        提交
                    </t-button>
                    <t-button theme="default" type="reset" @click="dailog = false">
                        取消
                    </t-button>
                </t-space>
            </t-form-item>
        </t-form>
    </el-dialog>
</template>