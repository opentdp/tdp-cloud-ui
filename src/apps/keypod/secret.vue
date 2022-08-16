<script lang="ts" setup>
import { ref, reactive } from "vue"
import { ElMessage, FormInstance, FormRules } from "element-plus"

import { Api } from "@/api"
import sessionStore from "@/store/session"

const session = sessionStore()

// 密钥列表

async function getSecrets() {
    const res = await Api.secret.list()
    session.setSecrets(res)
}

// 添加密钥

const formRef = ref<FormInstance>()

const formModel = reactive({
    SecretId: "",
    SecretKey: "",
    Description: "",
})

const formRules: FormRules = {
    SecretId: [{ required: true, message: "请输入 SecretId" }],
    SecretKey: [{ required: true, message: "请输入 SecretKey" }],
    Description: [{ required: true, message: "请输入别名" }],
}

function formSubmit(form: FormInstance | undefined) {
    form && form.validate(async valid => {
        if (!valid) {
            ElMessage.error("请检查表单")
            return false
        }
        await Api.secret.create(formModel)
        formRef.value?.resetFields()
        getSecrets()
    })
}

// 删除密钥

async function deleteSecret(idx: number) {
    const item = session.secretList[idx]
    await Api.secret.remove(item.Id)
    session.secretList.splice(idx, 1)
}

getSecrets()
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                CAM 密钥
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>密钥列表</b>
                </div>
            </template>
            <el-table :data="session.secretList">
                <el-table-column prop="Id" label="序号" width="80" />
                <el-table-column prop="Description" label="描述" width="160" />
                <el-table-column prop="SecretId" label="Secret Id" />
                <el-table-column prop="SecretKey" label="Secret Key" />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确定删除?" @confirm="deleteSecret(scope.$index)">
                            <template #reference>
                                <el-button link type="danger" icon="Delete">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>添加密钥</b>
                    <el-button class="button" text icon="Position">
                        <a href="https://github.com/tdp-resource/tdp-cloud#添加腾讯云密钥" target="_blank">
                            操作指南
                        </a>
                    </el-button>
                </div>
            </template>
            <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="88px">
                <el-form-item prop="Description" label="描述">
                    <el-input v-model="formModel.Description" />
                </el-form-item>
                <el-form-item prop="SecretId" label="SecretId">
                    <el-input v-model="formModel.SecretId" />
                </el-form-item>
                <el-form-item prop="SecretKey" label="SecretKey">
                    <el-input v-model="formModel.SecretKey" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="formSubmit(formRef)">
                        保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
