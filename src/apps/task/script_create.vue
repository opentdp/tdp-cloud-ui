<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { Api } from "@/api"
import { TaskScriptOrig } from '@/api/local/task_script'

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class TaskScriptCreate extends Vue {
    public loading = false
    public dailog = false

    public formModel = {} as TaskScriptOrig

    public formRules = {
        Name: [{ required: true, message: "名称 不能为空" }],
        Username: [{ required: true, message: "执行用户 不能为空" }],
        Description: [{ required: true, message: "描述 不能为空" }],
        Content: [{ required: true, message: "脚本内容 不能为空" }],
        CommandType: [{ required: true, message: "脚本类型 不能为空" }],
        WorkDirectory: [{ required: true, message: "执行路径 不能为空" }],
        Timeout: [{ required: true, message: "超时时间 不能为空" }],
    }

    async formSubmit() {
        this.loading = true
        if (this.formModel.Username == "") {
            this.formModel.Username = this.formModel.CommandType == "SHELL" ? "root" : "System"
        }
        if (this.formModel.WorkDirectory == "") {
            this.formModel.WorkDirectory = this.formModel.CommandType == "SHELL" ? "/root" : "C:\\"
        }
        await Api.taskScript.create(this.formModel)
        this.loading = false
        this.dailog = false
        this.$emit("submit")
    }

    // 导出属性

    public open() {
        this.dailog = true
        this.loading = false
        this.formModel = {
            Name: "",
            Username: "",
            Description: "",
            Content: "",
            CommandType: "SHELL",
            WorkDirectory: "",
            Timeout: 60,
        }
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="添加脚本" width="600px">
        <el-form :model="formModel" :rules="formRules" label-width="100px" label-suffix=":">
            <el-form-item label="脚本类型">
                <el-radio-group v-model="formModel.CommandType">
                    <el-radio label="SHELL" />
                    <el-radio label="POWERSHELL" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="formModel.Name" :maxlength="60" />
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="formModel.Description" :maxlength="120" />
            </el-form-item>
            <el-form-item label="执行路径">
                <el-input v-model="formModel.WorkDirectory"
                    :placeholder="formModel.CommandType == 'SHELL' ? '非必填，默认为 /root' : '非必填，默认为 C:\\'"
                />
            </el-form-item>
            <el-form-item label="执行用户">
                <el-input v-model="formModel.Username"
                    :placeholder="formModel.CommandType == 'SHELL' ? '非必填，默认为 root' : '非必填，默认为 System'"
                />
            </el-form-item>
            <el-form-item label="脚本内容">
                <el-input v-model="formModel.Content" type="textarea" rows="5" />
            </el-form-item>
            <el-form-item label="超时时间">
                <el-input-number v-model="formModel.Timeout" placeholder="非必填，默认为 60s" :min="1" :max="86400"
                    :value-on-clear="60"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dailog = false">取消</el-button>
                <el-button type="primary" :loading="loading" @click="formSubmit">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>