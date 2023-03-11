<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext } from "tdesign-vue-next"

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

    async formSubmit(ctx: SubmitContext<FormData>) {
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

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open(record: CF.ZoneRecordItem) {
        this.dailog = true
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
    <el-dialog v-model="dailog" destroy-on-close title="更新记录" width="400px">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="80px" @submit="formSubmit">
            <t-form-item name="name" label="主机记录">
                <el-input v-model="formModel.name" />
            </t-form-item>
            <t-form-item name="type" label="记录类型">
                <el-select v-model="formModel.type">
                    <el-option v-for="v, k in ZoneRecordTypes" :key="k" :label="k" :value="k" />
                </el-select>
            </t-form-item>
            <t-form-item name="content" label="记录值">
                <el-input v-model="formModel.content" type="textarea" autosize />
            </t-form-item>
            <t-form-item name="proxied" label="加速">
                <el-radio-group v-model="formModel.proxied">
                    <el-radio-button :label="true">
                        启用
                    </el-radio-button>
                    <el-radio-button :label="false">
                        禁用
                    </el-radio-button>
                </el-radio-group>
            </t-form-item>
            <t-form-item name="priority" label="权重">
                <el-input-number v-model="formModel.priority" />
            </t-form-item>
            <t-form-item name="ttl" label="TTL">
                <el-input-number v-model="formModel.ttl" />
            </t-form-item>
        </t-form>
        <template #footer>
            <span class="dialog-footer">
                <t-button @click="dailog = false">取消</t-button>
                <t-button theme="primary" type="submit">
                    保存
                </t-button>
            </span>
        </template>
    </el-dialog>
</template>