<script lang="ts">
import { Ref, Component, Vue } from "@/apps/basic"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { NaApi, TcApi } from "@/api"
import { CertbotItem } from "@/api/native/certbot"
import * as TC from "@/api/tencent/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class SslCertUpload extends Vue {
    public loading = false

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel!: TC.Ssl.UploadCertificateRequest

    public formRules: FormRules<TC.Ssl.UploadCertificateRequest> = {
        CertificatePublicKey: [{ required: true }],
        CertificatePrivateKey: [{ required: true }],
        CertificateType: [{ required: true }],
        Alias: [],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await TcApi.ssl.uploadCertificate(this.formModel)
        this.close()
    }

    // 已绑定证书

    public certbotList: CertbotItem[] = []

    async getCertbotList() {
        const res = await NaApi.certbot.list()
        this.certbotList = res.Items
    }

    // 选择证书

    public certbotId!: number

    async detailCertificate() {
        this.loading = true
        const res = await NaApi.certbot.detail(this.certbotId).finally(() => {
            this.loading = false
        })
        if (res.Cert) {
            this.formModel.CertificatePublicKey = NaApi.certbot.certFormat(res.Cert.Certificate).trim()
            this.formModel.CertificatePrivateKey = atob(res.Cert.PrivateKey).trim()
            this.formModel.CertificateType = "SVR"
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
            CertificatePublicKey: "",
            CertificatePrivateKey: "",
            CertificateType: "SVR",
            Alias: "",
        }
        // 加载数据
        this.certbotList.length == 0 && this.getCertbotList()
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="上传证书" :footer="false" width="50%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="80px" @submit="formSubmit">
            <t-form-item label="选择证书">
                <t-select v-model="certbotId" @change="detailCertificate">
                    <template v-for="v in certbotList">
                        <template v-if="v.History && /cached|obtained/.test(v.History.event)">
                            <t-option :key="v.Id" :value="v.Id" :label="v.Domain" />
                        </template>
                    </template>
                </t-select>
            </t-form-item>
            <t-form-item name="CertificatePublicKey" label="公钥">
                <t-textarea v-model="formModel.CertificatePublicKey" placeholder="CA证书请输入任意字符" :autosize="{ minRows: 3, maxRows: 5 }" />
            </t-form-item>
            <t-form-item name="CertificatePrivateKey" label="私钥">
                <t-textarea v-model="formModel.CertificatePrivateKey" :autosize="{ minRows: 5, maxRows: 10 }" />
            </t-form-item>
            <!--t-form-item name="CertificateType" label="类型">
                    <t-select v-model="formModel.CertificateType">
                        <t-option value="SVR" label="服务器证书" />
                        <t-option value="CA" label="客户端证书" />
                    </t-select>
                </t-form-item-->
            <t-form-item name="Alias" label="备注">
                <t-input v-model="formModel.Alias" />
            </t-form-item>
            <t-form-item>
                <t-space size="small">
                    <t-button :loading="loading" theme="primary" type="submit">
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