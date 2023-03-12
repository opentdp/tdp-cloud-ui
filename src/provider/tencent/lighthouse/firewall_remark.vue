<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext } from "tdesign-vue-next"

import Api, { TcApi } from "@/api"
import * as TC from "@/api/tencent/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class LighthouseFirewallRemark extends Vue {
    public instance!: TC.Lighthouse.Instance

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: TC.Lighthouse.FirewallRule = {
        CidrBlock: "",
        Protocol: "",
        Action: "",
        FirewallRuleDescription: ""
    }

    public formRules: FormRules<TC.Lighthouse.FirewallRule> = {
        FirewallRuleDescription: [{ required: true }],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<FormData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await TcApi.lighthouse.modifyFirewallRuleDescription(this.region, {
            InstanceId: this.instance.InstanceId,
            FirewallRule: this.formModel
        })
        this.close()
    }

    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
    }

    public open(instance: TC.Lighthouse.Instance, rule: TC.Lighthouse.FirewallRule) {
        this.instance = instance
        this.formModel = rule
        this.visible = true
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="修改描述" :footer="false" width="400px">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="FirewallRuleDescription" label="备注">
                <t-input v-model="formModel.FirewallRuleDescription" />
            </t-form-item>
            <t-form-item>
                <t-space size="small">
                    <t-button theme="primary" type="submit">
                        提交
                    </t-button>
                    <t-button theme="default" @click="visible = false">
                        取消
                    </t-button>
                </t-space>
            </t-form-item>
        </t-form>
    </t-dialog>
</template>