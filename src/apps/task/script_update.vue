<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { LoApi } from "@/api"
import { TaskScriptItem } from "@/api/local/task_script"

@Component({
    emits: ['close'],
    expose: ['open']
})
export default class TaskScriptUpdate extends Vue {
    public formModel!: TaskScriptItem

    public formRules: FormRules = {
        Name: [{ required: true, message: "名称 不能为空" }],
        CommandType: [{ required: true, message: "脚本类型 不能为空" }],
        Content: [{ required: true, message: "脚本内容 不能为空" }],
        Description: [{ required: true, message: "描述 不能为空" }],
        Timeout: [{ required: true, message: "超时时间 不能为空" }],
    }

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
            await LoApi.taskScript.update(this.formModel)
            this.close()
        })
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("close")
    }

    public open(data: TaskScriptItem) {
        this.dailog = true
        this.formModel = data
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="修改脚本" width="600px">
        <el-form :model="formModel" :rules="formRules" label-width="100px" label-suffix=":">
            <el-form-item label="类型">
                <el-radio-group v-model="formModel.CommandType">
                    <el-radio label="SHELL" />
                    <el-radio label="POWERSHELL" />
                    <el-radio label="CMD" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="formModel.Name" :maxlength="60" />
            </el-form-item>
            <el-form-item label="执行用户">
                <el-input v-model="formModel.Username"
                    :placeholder="formModel.CommandType == 'SHELL' ? '默认为 root' : '默认为 System'"
                />
            </el-form-item>
            <el-form-item label="执行路径">
                <el-input v-model="formModel.WorkDirectory"
                    :placeholder="formModel.CommandType == 'SHELL' ? '默认为 /root' : '默认为 C:\\'"
                />
            </el-form-item>
            <el-form-item label="脚本内容">
                <el-input v-model="formModel.Content" type="textarea" :autosize="{ minRows: 2 }" />
            </el-form-item>
            <el-form-item label="脚本描述">
                <el-input v-model="formModel.Description" type="textarea" :autosize="{ minRows: 2 }" />
            </el-form-item>
            <el-form-item label="超时时间">
                <el-input-number v-model="formModel.Timeout" placeholder="默认为 300s" :min="1" :max="86400" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dailog = false">取消</el-button>
                <el-button type="primary" @click="formSubmit">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>