<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { ScriptPayload } from "@/api/native/typings"

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class ScriptCreate extends Vue {

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel!: ScriptPayload

    public formRules: FormRules<ScriptPayload> = {
        Name: [{ required: true }],
        CommandType: [{ required: true }],
        Content: [{ required: true }],
        Description: [{ required: true }],
        Timeout: [{ required: true }],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        if (this.formModel.CommandType == "SHELL" && this.formModel.Content.indexOf("#!/") !== 0) {
            Api.msg.err("请在首行声明解释器，如 #!/bin/sh")
            return false
        }
        await NaApi.script.create(this.formModel)
        this.close()
    }

    // 表单事件

    public updateCommandType() {
        switch (this.formModel.CommandType) {
            case "SHELL":
                this.formModel.Username = "root"
                this.formModel.WorkDirectory = "/root"
                if (this.formModel.Content.indexOf("#!/") !== 0) {
                    this.formModel.Content = "#!/bin/sh\n" + this.formModel.Content
                }
                break
            case "POWERSHELL":
            case "BAT":
                this.formModel.Username = "System"
                this.formModel.WorkDirectory = "C:\\"
                break
        }
    }

    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
    }

    public open() {
        this.visible = true
        this.formModel = {
            Name: "",
            CommandType: "SHELL",
            Username: "",
            WorkDirectory: "",
            Content: "",
            Description: "",
            Timeout: 300,
        }
        this.updateCommandType()
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="添加脚本" :footer="false" width="50%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="90px" @submit="formSubmit">
            <t-form-item name="CommandType" label="类型">
                <t-radio-group v-model="formModel.CommandType" @change="updateCommandType">
                    <t-radio value="SHELL" label="SHELL" />
                    <t-radio value="POWERSHELL" label="POWERSHELL" />
                    <t-radio value="BAT" label="BAT" />
                </t-radio-group>
            </t-form-item>
            <t-form-item name="Name" label="名称">
                <t-input v-model="formModel.Name" :maxlength="60" />
            </t-form-item>
            <t-form-item name="Username" label="执行用户">
                <t-input v-model="formModel.Username" readonly />
            </t-form-item>
            <t-form-item name="WorkDirectory" label="执行路径">
                <t-input v-model="formModel.WorkDirectory" />
            </t-form-item>
            <t-form-item name="Content" label="脚本内容">
                <t-textarea v-model="formModel.Content" :autosize="{ minRows: 4, maxRows: 15 }" :placeholder="formModel.CommandType == 'SHELL' ? '请在首行声明解释器，如 #!/bin/sh' : ''" />
            </t-form-item>
            <t-form-item name="Description" label="脚本描述">
                <t-textarea v-model="formModel.Description" :autosize="{ minRows: 2, maxRows: 15 }" />
            </t-form-item>
            <t-form-item name="Timeout" label="超时时间">
                <t-input-number v-model="formModel.Timeout" placeholder="默认为 300s" :min="1" :max="86400" />
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