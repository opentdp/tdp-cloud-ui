<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { NaApi } from "@/api"
import { ScriptItem } from "@/api/local/script"

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class ScriptUpdate extends Vue {

    // 创建表单

    @Ref
    public formRef!: FormInstance

    public formModel!: ScriptItem

    public formRules: FormRules = {
        Name: [{ required: true, message: "名称 不能为空" }],
        CommandType: [{ required: true, message: "脚本类型 不能为空" }],
        Content: [{ required: true, message: "脚本内容 不能为空" }],
        Description: [{ required: true, message: "描述 不能为空" }],
        Timeout: [{ required: true, message: "超时时间 不能为空" }],
    }

    // 提交表单

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            if (this.formModel.Username == "") {
                this.formModel.Username = this.formModel.CommandType == "SHELL" ? "root" : "System"
            }
            if (this.formModel.WorkDirectory == "") {
                this.formModel.WorkDirectory = this.formModel.CommandType == "SHELL" ? "/root" : "C:\\"
            }
            await NaApi.script.update(this.formModel)
            this.close()
        })
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open(data: ScriptItem) {
        this.dailog = true
        this.formModel = data
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="修改脚本" width="600px">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
            <el-form-item prop="CommandType" label="类型">
                <el-radio-group v-model="formModel.CommandType">
                    <el-radio label="SHELL" />
                    <el-radio label="POWERSHELL" />
                    <el-radio label="CMD" />
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="Name" label="名称">
                <el-input v-model="formModel.Name" :maxlength="60" />
            </el-form-item>
            <el-form-item prop="Username" label="执行用户">
                <el-input v-model="formModel.Username"
                    :placeholder="formModel.CommandType == 'SHELL' ? '默认为 root' : '默认为 System'"
                />
            </el-form-item>
            <el-form-item prop="WorkDirectory" label="执行路径">
                <el-input v-model="formModel.WorkDirectory"
                    :placeholder="formModel.CommandType == 'SHELL' ? '默认为 /root' : '默认为 C:\\'"
                />
            </el-form-item>
            <el-form-item prop="Content" label="脚本内容">
                <el-input v-model="formModel.Content" type="textarea" :autosize="{ minRows: 2 }" />
            </el-form-item>
            <el-form-item prop="Description" label="脚本描述">
                <el-input v-model="formModel.Description" type="textarea" :autosize="{ minRows: 2 }" />
            </el-form-item>
            <el-form-item prop="Timeout" label="超时时间">
                <el-input-number v-model="formModel.Timeout" placeholder="默认为 300s" :min="1" :max="86400" />
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