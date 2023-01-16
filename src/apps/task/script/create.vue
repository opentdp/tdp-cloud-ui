<script lang="ts" setup>
import { ref, reactive, defineExpose } from "vue"

import { Api } from "@/api"
import { TaskScriptRequest } from '@/api/local/task_script'

// 初始化

const dailog = ref(0)
const loading = ref(0)

const emits = defineEmits(['submit'])

const modelDefault: TaskScriptRequest = {
    Name: "",
    Username: "",
    Description: "",
    Content: "",
    CommandType: "SHELL",
    WorkDirectory: "",
    Timeout: 60,
}

// 创建表单

const formModel = reactive(
    Object.assign({}, modelDefault)
)

const formRules = reactive({
    Name: [{ required: true, message: "请输入名称" }],
    Username: [{ required: true, message: "请输入执行用户" }],
    Description: [{ required: true, message: "请输入描述" }],
    Content: [{ required: true, message: "请输入脚本内容" }],
    CommandType: [{ required: true, message: "请选择脚本类型" }],
    WorkDirectory: [{ required: true, message: "请输入执行路径" }],
    Timeout: [{ required: true, message: "请输入超时时间" }],
})

async function formSubmit() {
    loading.value = 1
    const item = formModel
    const query: TaskScriptRequest = {
        Name: item.Name,
        Username: item.Username,
        Description: item.Description,
        Content: item.Content,
        CommandType: item.CommandType,
        WorkDirectory: item.WorkDirectory,
        Timeout: item.Timeout || 0,
    }
    await Api.taskScript.create(query)
    loading.value = 0
    dailog.value = 0
    emits("submit")
}

async function openDailog() {
    Object.assign(formModel, modelDefault)
    dailog.value = 1
}

defineExpose({
    open: openDailog
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
                    :placeholder="formModel.CommandType == 'SHELL' ? '非必填，默认为 /root' : '非必填，默认为 C:\\'" />
            </el-form-item>
            <el-form-item label="执行用户">
                <el-input v-model="formModel.Username"
                    :placeholder="formModel.CommandType == 'SHELL' ? '非必填，默认为 root' : '非必填，默认为 System'" />
            </el-form-item>
            <el-form-item label="脚本内容">
                <el-input v-model="formModel.Content" type="textarea" rows="5" />
            </el-form-item>
            <el-form-item label="超时时间">
                <el-input-number v-model="formModel.Timeout" placeholder="非必填，默认为 60s" :min="1" :max="86400"
                    :value-on-clear="60" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dailog = 0">取消</el-button>
                <el-button type="primary" :loading="loading" @click="formSubmit">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>