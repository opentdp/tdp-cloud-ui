<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { QcApi } from "@/api"
import * as QC from "@/api/qcloud/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class LighthouseSnapshotCreate extends Vue {
    public instance!: QC.Lighthouse.Instance

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 创建表单

    @Ref
    public formRef!: FormInstance

    public formModel = {
        name: 'Snapshot-' + Date.now(),
    }

    public formRules: FormRules = {
        name: [{ required: true, message: "名称 不能为空" }],
    }

    // 提交表单

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await QcApi.lighthouse.createInstanceSnapshot(this.region, {
                InstanceId: this.instance.InstanceId,
                SnapshotName: this.formModel.name
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
    <el-dialog v-model="dailog" destroy-on-close title="创建快照" width="400px">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="50px">
            <el-form-item prop="name" label="名称">
                <el-input v-model="formModel.name" />
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