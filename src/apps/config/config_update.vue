<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { ConfigOrig, ConfigItem } from "@/api/native/config"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class ConfigUpdate extends Vue {

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel!: ConfigOrig

    public formRules: FormRules<ConfigOrig> = {
        Value: [
            { required: true, message: '不能为空' },
            { max: 64, message: '字符数量不能超过 64' },
        ],
        Description: [{ required: true }],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await NaApi.config.update(this.formModel)
        this.close()
    }

    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
    }

    public open(data: ConfigItem) {
        this.visible = true
        this.formModel = data
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="修改参数" :footer="false" width="750px">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="Description" label="参数名">
                <t-input v-model="formModel.Description" readonly />
            </t-form-item>
            <t-form-item name="Value" label="参数值">
                <t-input v-model="formModel.Value" />
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