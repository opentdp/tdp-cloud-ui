<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { QcApi } from "@/api"
import * as QC from "@/api/qcloud/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class LighthouseInstanceRename extends Vue {
    public instance!: QC.Lighthouse.Instance

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 创建表单

    @Ref
    public formRef!: FormInstance

    public formModel: QC.Lighthouse.FirewallRule = {
        Protocol: "TCP",
        Port: "",
        CidrBlock: "0.0.0.0/0",
        Action: "ACCEPT",
        FirewallRuleDescription: "",
    }

    public formRules: FormRules = {
        Protocol: [{ required: true, message: "协议 不能为空" }],
        Action: [{ required: true, message: "策略 不能为空" }]
    }

    // 提交表单

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await QcApi.lighthouse.createFirewallRules(this.region, {
                InstanceId: this.instance.InstanceId,
                FirewallRules: [this.formModel]
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

    public open(instance: QC.Lighthouse.Instance) {
        this.instance = instance
        this.dailog = true
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="添加规则" width="400px">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="50px">
            <el-form-item prop="CidrBlock" label="来源">
                <el-input v-model="formModel.CidrBlock" />
            </el-form-item>
            <el-form-item prop="Protocol" label="协议">
                <el-select v-model="formModel.Protocol">
                    <el-option label="TCP" value="TCP" />
                    <el-option label="UDP" value="UDP" />
                    <el-option label="ICMP" value="ICMP" />
                </el-select>
            </el-form-item>
            <el-form-item v-if="/TCP|UDP/.test(formModel.Protocol)" label="端口">
                <el-input v-model="formModel.Port" />
            </el-form-item>
            <el-form-item prop="Action" label="策略">
                <el-select v-model="formModel.Action">
                    <el-option label="允许" value="ACCEPT" />
                    <el-option label="拒绝" value="DROP" />
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
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