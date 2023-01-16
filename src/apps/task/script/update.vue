<script lang="ts" setup>
import { ref } from "vue"

import { Api } from "@/api"
import { TaskScriptItem } from '@/api/local/task_script'

const updateForm = ref<TaskScriptItem>()
const updateDialogVisible = ref(false)

function openUpdateDialog(row: TaskScriptItem) {
    updateForm.value = { ...row }
    updateDialogVisible.value = true
}

async function updateScript() {
    if (updateForm.value) {
        updateDialogVisible.value = false
        if (updateForm.value.Username == "") {
            updateForm.value.Username = updateForm.value.CommandType == "SHELL" ? "root" : "System"
        }
        if (updateForm.value.WorkDirectory == "") {
            updateForm.value.WorkDirectory = updateForm.value.CommandType == "SHELL" ? "/root" : "C:\\"
        }
        await Api.taskScript.update(updateForm.value)
    }
}
</script>

<template>
    <el-dialog v-model="updateDialogVisible" destroy-on-close title="修改脚本" width="400px">
        <el-form v-if="updateForm" :model="updateForm" label-width="100px" label-suffix=":">
            <el-form-item label="名称">
                <el-input v-model="updateForm.Name" :maxlength="60" />
            </el-form-item>
            <el-form-item label="描述：">
                <el-input v-model="updateForm.Description" :maxlength="120" />
            </el-form-item>
            <el-form-item label="脚本类型">
                <el-radio-group v-model="updateForm.CommandType">
                    <el-radio label="SHELL" />
                    <el-radio label="POWERSHELL" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="执行路径">
                <el-input v-model="updateForm.WorkDirectory"
                    :placeholder="updateForm.CommandType == 'SHELL' ? '非必填，默认为 /root' : '非必填，默认为 C:\\'" />
            </el-form-item>
            <el-form-item label="执行用户">
                <el-input v-model="updateForm.Username"
                    :placeholder="updateForm.CommandType == 'SHELL' ? '非必填，默认为 root' : '非必填，默认为 System'" />
            </el-form-item>
            <el-form-item label="脚本">
                <el-input v-model="updateForm.Content" type="textarea" rows="5" />
            </el-form-item>
            <el-form-item label="超时时间">
                <el-input-number v-model="updateForm.Timeout" placeholder="非必填，默认为 60s" :min="1" :max="86400"
                    :value-on-clear="60" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateScript">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>