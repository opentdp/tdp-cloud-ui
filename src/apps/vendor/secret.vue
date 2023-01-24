<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { Api } from "@/api"
import sessionStore from "@/store/session"

@Component
export default class VendorWorker extends Vue {
    public session = sessionStore()

    public created() {
        this.getSecretList()
    }

    // 厂商列表
    async getSecretList() {
        const res = await Api.vendor.list()
        this.session.setVendor(res)
    }

    // 删除厂商
    async deleteSecret(idx: number) {
        const item = this.session.vendorList[idx]
        await Api.vendor.remove(item.Id)
        this.session.vendorList.splice(idx, 1)
    }

    // 添加厂商

    @Ref
    public formRef!: FormInstance

    public formModel = {
        SecretId: "",
        SecretKey: "",
        Provider: "qcloud",
        Description: "",
    }

    public formRules: FormRules = {
        SecretId: [{ required: true, message: "密钥 ID 不能为空" }],
        SecretKey: [{ required: true, message: "密钥 KEY 不能为空" }],
        Provider: [{ required: true, message: "云厂商 不能为空" }],
        Description: [{ required: true, message: "描述或别名 不能为空" }],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await Api.vendor.create(this.formModel)
            this.formRef.resetFields()
            this.getSecretList()
        })
    }
}
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                公有云
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>密钥列表</b>
                </div>
            </template>
            <el-table :data="session.vendorList">
                <el-table-column prop="Id" label="序号" width="80" />
                <el-table-column prop="Description" label="描述" width="160" />
                <el-table-column prop="Provider" label="厂商" />
                <el-table-column prop="SecretId" label="密钥 ID" />
                <el-table-column prop="SecretKey" label="密钥 KEY" />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button v-if="scope.row.Provider == 'qcloud'" link type="primary" icon="View">
                            <router-link :to="'/vendor/qcloud/' + scope.row.Id">
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
        <div class="space-10" />
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>添加密钥</b>
                    <el-button v-if="formModel.Provider == 'qcloud'" class="button" text icon="Position">
                        <a href="https://github.com/tdp-resource/tdp-cloud#添加腾讯云账号" target="_blank">
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
                <el-form-item prop="SecretId" label="密钥 ID">
                    <el-input v-model="formModel.SecretId" />
                </el-form-item>
                <el-form-item prop="SecretKey" label="密钥 KEY">
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
