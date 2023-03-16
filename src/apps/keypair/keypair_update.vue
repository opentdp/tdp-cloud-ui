<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { KeypairTypeList, KeypairOrig, KeypairItem } from "@/api/native/keypair"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class KeypairUpdate extends Vue {
    public KeypairTypeList = KeypairTypeList

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel!: KeypairOrig

    public formRules: FormRules<KeypairOrig> = {
        PublicKey: [{ required: true }],
        Description: [{ required: true }],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await NaApi.keypair.update(this.formModel)
        this.close()
    }

    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
    }

    public open(data: KeypairItem) {
        this.visible = true
        this.formModel = data
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="修改密钥" :footer="false" width="600px">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="KeyType" label="类型">
                <t-select v-model="formModel.KeyType">
                    <t-option v-for="v, k in KeypairTypeList" :key="k" :value="k" :label="v" />
                </t-select>
            </t-form-item>
            <t-form-item name="Description" label="别名">
                <t-input v-model="formModel.Description" />
            </t-form-item>
            <t-form-item name="PublicKey" label="公钥">
                <t-textarea v-model="formModel.PublicKey" :autosize="{ minRows: 3, maxRows: 5 }" />
            </t-form-item>
            <t-form-item name="PrivateKey" label="私钥">
                <t-textarea v-model="formModel.PrivateKey" :autosize="{ minRows: 5, maxRows: 10 }" />
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