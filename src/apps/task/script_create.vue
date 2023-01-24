<script lang="ts" setup>
import { ref, reactive } from "vue"

import { Api } from "@/api"
import { TaskScriptRequest } from '@/api/local/task_script'

// 初始化

const dailog = ref(false)
const loading = ref(false)

const emits = defineEmits(['submit'])

// 创建表单

const modelData: TaskScriptRequest = {
    Name: "",
    Username: "",
    Description: "",
    Content: "",
    CommandType: "SHELL",
    WorkDirectory: "",
    Timeout: 60,
}

const formModel = reactive({} as TaskScriptRequest)

const formRules = reactive({
    Name: [{ required: true, message: "名称 不能为空" }],
    Username: [{ required: true, message: "执行用户 不能为空" }],
    Description: [{ required: true, message: "描述 不能为空" }],
    Content: [{ required: true, message: "脚本内容 不能为空" }],
    CommandType: [{ required: true, message: "脚本类型 不能为空" }],
    WorkDirectory: [{ required: true, message: "执行路径 不能为空" }],
    Timeout: [{ required: true, message: "超时时间 不能为空" }],
})

// 提交表单

async function formSubmit() {
    loading.value = true
    if (formModel.Username == "") {
        formModel.Username = formModel.CommandType == "SHELL" ? "root" : "System"
    }
    if (formModel.WorkDirectory == "") {
        formModel.WorkDirectory = formModel.CommandType == "SHELL" ? "/root" : "C:\\"
    }
    await Api.taskScript.create(formModel)
    loading.value = false
    dailog.value = false
    emits("submit")
}

// 导出属性

defineExpose({
    open: () => {
        dailog.value = true
        loading.value = false
        Object.assign(formModel, modelData)
    }
})
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