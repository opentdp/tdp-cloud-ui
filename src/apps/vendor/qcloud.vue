<script lang="ts" setup>
import { ref, reactive } from "vue"
import { ElMessage, FormInstance, FormRules } from "element-plus"

import { Api } from "@/api"
import sessionStore from "@/store/session"

// 初始化

const session = sessionStore()

// 厂商列表

async function getSecretList() {
    const res = await Api.vendor.list()
    session.setVendor(res)
}

// 添加厂商

const formRef = ref<FormInstance>()

const formModel = reactive({
    SecretId: "",
    SecretKey: "",
    Provider: "qcloud",
    Description: "",
})

const formRules: FormRules = {
    SecretId: [{ required: true, message: "请输入 Secret Id" }],
    SecretKey: [{ required: true, message: "请输入 Secret Key" }],
    Provider: [{ required: true, message: "请选择厂商" }],
    Description: [{ required: true, message: "请输入别名" }],
}

function formSubmit(form: FormInstance | undefined) {
    form && form.validate(async valid => {
        if (!valid) {
            ElMessage.error("请检查表单")
            return false
        }
        await Api.vendor.create(formModel)
        formRef.value?.resetFields()
        getSecretList()
    })
}

// 删除厂商

async function deleteSecret(idx: number) {
    const item = session.vendorList[idx]
    await Api.vendor.remove(item.Id)
    session.vendorList.splice(idx, 1)
}

// 加载数据

getSecretList()
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                腾讯云
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>厂商列表</b>
                </div>
            </template>
            <el-table :data="session.vendorList">
                <el-table-column prop="Id" label="序号" width="80" />
                <el-table-column prop="Description" label="描述" width="160" />
                <el-table-column prop="Provider" label="厂商" />
                <el-table-column prop="SecretId" label="Secret Id" />
                <el-table-column prop="SecretKey" label="Secret Key" />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="View">
                            <router-link :to="'/qcloud/bind/' + scope.row.Id">
                                导入
                            </router-link>
                        </el-button>
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
                    <b>添加厂商</b>
                    <el-button class="button" text icon="Position">
                        <a href="https://github.com/tdp-resource/tdp-cloud#添加腾讯云密钥" target="_blank">
                            腾讯云操作指南
                        </a>
                    </el-button>
                </div>
            </template>
            <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="100px">
                <el-form-item prop="Provider" label="厂商">
                    <el-input v-model="formModel.Provider" readonly />
                </el-form-item>
                <el-form-item prop="Description" label="描述">
                    <el-input v-model="formModel.Description" />
                </el-form-item>
                <el-form-item prop="SecretId" label="Secret Id">
                    <el-input v-model="formModel.SecretId" />
                </el-form-item>
                <el-form-item prop="SecretKey" label="Secret Key">
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
