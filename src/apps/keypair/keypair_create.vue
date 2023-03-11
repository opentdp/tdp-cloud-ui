<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { KeypairTypeList, KeypairOrig } from "@/api/native/keypair"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class KeypairCreate extends Vue {
    public KeypairTypeList = KeypairTypeList

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: KeypairOrig = {
        PublicKey: "",
        PrivateKey: "",
        KeyType: "ssh",
        Description: "",
    }

    public formRules: FormRules<KeypairOrig> = {
        PublicKey: [{ required: true }],
        PrivateKey: [{ required: true }],
        Description: [{ required: true }],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<FormData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await NaApi.keypair.create(this.formModel)
        this.close()
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open() {
        this.dailog = true
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="添加密钥" width="600px">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="KeyType" label="类型">
                <el-select v-model="formModel.KeyType" placeholder="Select">
                    <el-option v-for="v, k in KeypairTypeList" :key="k" :label="v" :value="k" />
                </el-select>
            </t-form-item>
            <t-form-item name="Description" label="别名">
                <el-input v-model="formModel.Description" />
            </t-form-item>
            <t-form-item name="PublicKey" label="公钥">
                <el-input v-model="formModel.PublicKey" type="textarea" :autosize="{ minRows: 5, maxRows: 15 }" />
            </t-form-item>
            <t-form-item name="PrivateKey" label="私钥">
                <el-input v-model="formModel.PrivateKey" type="textarea" :autosize="{ minRows: 5, maxRows: 15 }" />
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