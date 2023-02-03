<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { LoApi } from "@/api"
import { VendorItem } from "@/api/local/vendor"

@Component
export default class VendorListCloudflare extends Vue {
    public loading = true

    // 初始化

    public created() {
        this.getVendorList()
    }

    // 厂商列表

    public vendorList: VendorItem[] = []

    async getVendorList() {
        const res = await LoApi.vendor.list()
        this.vendorList = res.Datasets.filter(item => {
            return item.Provider == "cloudflare"
        })
        this.loading = false
    }

    // 删除厂商

    async deleteVendor(idx: number) {
        const item = this.vendorList[idx]
        await LoApi.vendor.remove(item.Id)
        this.vendorList.splice(idx, 1)
    }

    // 添加厂商

    @Ref
    public formRef!: FormInstance

    public formModel = {
        SecretId: "",
        SecretKey: "",
        Provider: "cloudflare",
        Description: "",
    }

    public formRules: FormRules = {
        SecretId: [{ required: true, message: "邮箱 不能为空" }],
        SecretKey: [{ required: true, message: "Api Token 不能为空" }],
        Description: [{ required: true, message: "别名或别名 不能为空" }],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await LoApi.vendor.create(this.formModel)
            this.formRef.resetFields()
            this.getVendorList()
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
                Cloudflare
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>账号列表</b>
                </div>
            </template>
            <el-table v-loading="loading" :data="vendorList">
                <el-table-column prop="Description" label="别名" show-overflow-tooltip fixed />
                <el-table-column prop="SecretId" label="邮箱" show-overflow-tooltip />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <router-link :to="'/vrbind/cloudflare/' + scope.row.Id">
                            <el-button link type="primary" icon="View">
                                管理
                            </el-button>
                        </router-link>
                        <el-popconfirm title="删除账号不会解绑已导入的资源，是否继续？" @confirm="deleteVendor(scope.$index)">
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
                    <b>添加账号</b>
                    <el-link href="https://apps.rehiy.com/tdp-cloud/docs/" target="_blank" icon="Position"
                        :underline="false"
                    >
                        &nbsp;操作指南
                    </el-link>
                </div>
            </template>
            <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="50px">
                <el-form-item prop="Description" label="别名">
                    <el-input v-model="formModel.Description" />
                </el-form-item>
                <el-form-item prop="SecretId" label="邮箱">
                    <el-input v-model="formModel.SecretId" />
                </el-form-item>
                <el-form-item prop="SecretKey" label="令牌">
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
