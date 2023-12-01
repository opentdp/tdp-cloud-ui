<script lang="ts">
import { Ref, Component, Vue } from "@/apps/basic"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { TcApi } from "@/api"
import * as TC from "@/api/tencent/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class LighthouseFirewallCreate extends Vue {
    public instance!: TC.Lighthouse.Instance

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

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await TcApi.lighthouse.createFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
            FirewallRules: [this.formModel]
        })
        this.close()
    }

    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
    }

    public open(instance: TC.Lighthouse.Instance) {
        this.instance = instance
        this.visible = true
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="添加规则" :footer="false" width="50%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="CidrBlock" label="来源">
                <t-input v-model="formModel.CidrBlock" />
            </t-form-item>
            <t-form-item name="Protocol" label="协议">
                <t-select v-model="formModel.Protocol">
                    <t-option value="TCP" label="TCP" />
                    <t-option value="UDP" label="UDP" />
                    <t-option value="ICMP" label="ICMP" />
                </t-select>
            </t-form-item>
            <t-form-item v-if="/TCP|UDP/.test(formModel.Protocol)" label="端口">
                <t-input v-model="formModel.Port" />
            </t-form-item>
            <t-form-item name="Action" label="策略">
                <t-select v-model="formModel.Action">
                    <t-option value="ACCEPT" label="允许" />
                    <t-option value="DROP" label="拒绝" />
                </t-select>
            </t-form-item>
            <t-form-item label="备注">
                <t-input v-model="formModel.FirewallRuleDescription" />
            </t-form-item>
            <t-form-item>
                <t-space size="small">
                    <t-button theme="primary" type="submit">
                        提交
                    </t-button>
                    <t-button theme="default" type="reset" @click="visible = false">
                        取消
                    </t-button>
                </t-space>
            </t-form-item>
        </t-form>
    </t-dialog>
</template>