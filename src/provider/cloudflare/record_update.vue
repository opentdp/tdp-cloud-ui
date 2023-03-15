<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { CfApi } from "@/api"
import { ZoneRecordTypes } from "@/api/cloudflare/zones"
import * as CF from "@/api/cloudflare/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class CloudflareRecordUpdate extends Vue {
    public ZoneRecordTypes = ZoneRecordTypes

    public recordInfo!: CF.ZoneRecordItem

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel!: CF.ZoneRecordCreate

    public formRules: FormRules<CF.ZoneRecordCreate> = {
        name: [{ required: true }],
        type: [{ required: true }],
        content: [{ required: true }],
        proxied: [{ required: true }],
        priority: [{ required: true }],
        ttl: [{ required: true }],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await CfApi.zones.dnsRecordUpdate(
            this.recordInfo.zone_id,
            this.recordInfo.id,
            {
                name: this.formModel.name,
                type: this.formModel.type,
                content: this.formModel.content,
                proxied: this.formModel.proxied,
                priority: this.formModel.priority || 0,
                ttl: +this.formModel.ttl || 1,
                comment: this.formModel.comment || "",
                tags: this.formModel.tags || []
            }
        )
        this.close()
    }

    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
    }

    public open(record: CF.ZoneRecordItem) {
        this.visible = true
        this.recordInfo = record
        this.formModel = {
            name: record.name.replace(record.zone_name, "").replace(/\.$/, "") || "@",
            type: record.type,
            content: record.content,
            proxied: record.proxied,
            priority: record.priority || 0,
            ttl: record.ttl,
            comment: record.comment || "",
            tags: record.tags
        }
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="更新记录" :footer="false" width="400px">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="80px" @submit="formSubmit">
            <t-form-item name="name" label="主机记录">
                <t-input v-model="formModel.name" />
            </t-form-item>
            <t-form-item name="type" label="记录类型">
                <t-select v-model="formModel.type">
                    <t-option v-for="v, k in ZoneRecordTypes" :key="k" :value="k" :label="k" />
                </t-select>
            </t-form-item>
            <t-form-item name="content" label="记录值">
                <t-textarea v-model="formModel.content" autosize />
            </t-form-item>
            <t-form-item name="proxied" label="加速">
                <t-radio-group v-model="formModel.proxied">
                    <t-radio-button :value="true" label="启用" />
                    <t-radio-button :value="false" label="禁用" />
                </t-radio-group>
            </t-form-item>
            <t-form-item name="priority" label="权重">
                <t-input-number v-model="formModel.priority" />
            </t-form-item>
            <t-form-item name="ttl" label="TTL">
                <t-input-number v-model="formModel.ttl" />
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