<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { TcApi } from "@/api"
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
    public formRef!: FormInstance

    public formModel: TC.Lighthouse.FirewallRule = {
        CidrBlock: "",
        Protocol: "",
        Action: "",
        FirewallRuleDescription: ""
    }

    public formRules: FormRules = {
        FirewallRuleDescription: [{ required: true, message: "不能为空" }],
    }

    // 提交表单

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await TcApi.lighthouse.modifyFirewallRuleDescription(this.region, {
                InstanceId: this.instance.InstanceId,
                FirewallRule: this.formModel
            })
            this.close()
        })
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open(instance: TC.Lighthouse.Instance, rule: TC.Lighthouse.FirewallRule) {
        this.instance = instance
        this.formModel = rule
        this.dailog = true
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="修改描述" width="400px">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="60px">
            <el-form-item prop="FirewallRuleDescription" label="备注">
                <el-input v-model="formModel.FirewallRuleDescription" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dailog = false">取消</el-button>
                <el-button type="primary" @click="formSubmit(formRef)">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>