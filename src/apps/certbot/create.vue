<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { CaTypeList, CertbotOrig } from "@/api/native/certbot"
import { DomainItem } from "@/api/native/domain"

import sessionStore from "@/store/session"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class CertbotCreate extends Vue {
    public session = sessionStore()
    public CaTypeList = CaTypeList

    // 域名列表

    public domainList: DomainItem[] = []

    async getDomainList() {
        const res = await NaApi.domain.list()
        this.domainList = res.Items
    }

    // 创建表单

    public domainId!: number
    public domainSub = ""

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: CertbotOrig = {
        VendorId: 0,
        Email: "",
        Domain: "",
        CaType: "",
        EabKeyId: "",
        EabMacKey: "",
        History: {
            event: "queued",
            identifier: ""
        },
    }

    public formRules: FormRules<CertbotOrig> = {
        Email: [{ required: true }],
        CaType: [{ required: true }],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        const domain = this.domainList[this.domainId]
        if (!domain) {
            Api.msg.err("请选择主域名")
            return false
        }
        const prefix = this.domainSub ? this.domainSub + "." : ""
        this.formModel.Domain = prefix + domain.Name
        this.formModel.VendorId = domain.VendorId
        await NaApi.certbot.create(this.formModel)
        this.close()
    }

    // 表单事件

    public caEab = 0

    public updateCaEab() {
        const ca = CaTypeList[this.formModel.CaType]
        this.caEab = ca ? ca.Eab : 0
    }

    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
    }

    public open() {
        this.visible = true
        this.formModel.Email = this.session.Email
        // 加载数据
        this.domainList.length == 0 && this.getDomainList()
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="添加计划" :footer="false" width="600px">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="110px" @submit="formSubmit">
            <t-form-item name="Domain" label="域名">
                <t-input-adornment>
                    <t-input v-model="domainSub" suffix="." placeholder="子域名" />
                    <template #append>
                        <t-select v-if="domainList.length > 0" v-model="domainId">
                            <t-option v-for="v, k in domainList" :key="k" :value="k" :label="v.Name" />
                        </t-select>
                        <t-input v-else value="请先导入域名资源" disabled />
                    </template>
                </t-input-adornment>
            </t-form-item>
            <t-form-item name="Email" label="邮箱">
                <t-input v-model="formModel.Email" />
            </t-form-item>
            <t-form-item name="CaType" label="CA">
                <t-select v-model="formModel.CaType" @change="updateCaEab">
                    <t-option v-for="v, k in CaTypeList" :key="k" :value="k" :label="v.Name" />
                </t-select>
            </t-form-item>
            <t-form-item name="EabKeyId" label="EAB KeyId" :required="caEab == 2">
                <t-input v-model="formModel.EabKeyId" :disabled="caEab == 0" />
            </t-form-item>
            <t-form-item name="EabMacKey" label="EAB MacKey" :required="caEab == 2">
                <t-input v-model="formModel.EabMacKey" :disabled="caEab == 0" />
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