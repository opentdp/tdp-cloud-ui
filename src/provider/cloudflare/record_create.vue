<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { CfApi } from "@/api"
import { ZoneRecordTypes } from "@/api/cloudflare/zones"
import * as CF from "@/api/cloudflare/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class CloudflareRecordCreate extends Vue {
    public ZoneRecordTypes = ZoneRecordTypes

    public domainInfo!: CF.ZoneItem

    // 创建表单

    @Ref
    public formRef!: FormInstance

    public formModel!: CF.ZoneRecordCreate

    public formRules: FormRules = {
        name: [{ required: true, message: "主机记录 不能为空" }],
        type: [{ required: true, message: "记录类型 不能为空" }],
        content: [{ required: true, message: "别名 不能为空" }],
        proxied: [{ required: true, message: "加速 不能为空" }],
        priority: [{ required: true, message: "权重 不能为空" }],
        ttl: [{ required: true, message: "TTL 不能为空" }],
    }

    // 提交表单

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await CfApi.zones.dnsRecordCreate(
                this.domainInfo.id,
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
        })
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open(domain: CF.ZoneItem) {
        this.dailog = true
        this.domainInfo = domain
        this.formModel = {
            name: "",
            type: "A",
            content: "",
            proxied: true,
            priority: 0,
            ttl: 1,
            comment: "",
            tags: []
        }
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="添加记录" width="400px">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
            <el-form-item prop="name" label="主机记录">
                <el-input v-model="formModel.name" />
            </el-form-item>
            <el-form-item prop="type" label="记录类型">
                <el-select v-model="formModel.type">
                    <el-option v-for="v, k in ZoneRecordTypes" :key="k" :label="k" :value="k" />
                </el-select>
            </el-form-item>
            <el-form-item prop="content" label="记录值">
                <el-input v-model="formModel.content" type="textarea" autosize />
            </el-form-item>
            <el-form-item prop="proxied" label="加速">
                <el-radio-group v-model="formModel.proxied">
                    <el-radio-button :label="true">
                        启用
                    </el-radio-button>
                    <el-radio-button :label="false">
                        禁用
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="priority" label="权重">
                <el-input-number v-model="formModel.priority" />
            </el-form-item>
            <el-form-item prop="ttl" label="TTL">
                <el-input-number v-model="formModel.ttl" />
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