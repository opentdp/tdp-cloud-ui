<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { NaApi } from "@/api"
import { VendorItem } from "@/api/native/vendor"

@Component
export default class VendorTencent extends Vue {
    public loading = true

    // 初始化

    public created() {
        this.getVendorList()
    }

    // 厂商列表

    public vendorList: VendorItem[] = []

    async getVendorList() {
        const res = await NaApi.vendor.list({ Provider: "tencent" })
        this.vendorList = res.Items
        this.loading = false
    }

    // 删除厂商

    async deleteVendor(idx: number) {
        const item = this.vendorList[idx]
        await NaApi.vendor.remove(item.Id)
        this.vendorList.splice(idx, 1)
    }

    // 添加厂商

    @Ref
    public formRef!: FormInstance

    public formModel = {
        SecretId: "",
        SecretKey: "",
        Provider: "tencent",
        Description: "",
    }

    public formRules: FormRules = {
        SecretId: [{ required: true, message: "不能为空" }],
        SecretKey: [{ required: true, message: "不能为空" }],
        Description: [{ required: true, message: "不能为空" }],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await NaApi.vendor.create(this.formModel)
            this.formRef.resetFields()
            this.getVendorList()
        })
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                腾讯云
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card title="账号列表" hover-shadow header-bordered>
            <el-table v-loading="loading" :data="vendorList">
                <el-table-column prop="Description" label="别名" fixed sortable show-overflow-tooltip />
                <el-table-column prop="SecretId" label="密钥 ID" sortable show-overflow-tooltip />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button v-route="'/vendor/tencent/' + scope.row.Id" link type="primary" icon="View">
                            管理
                        </el-button>
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
        </t-card>

        <t-card title="添加账号" hover-shadow header-bordered>
            <template #actions>
                <el-link href="https://apps.rehiy.com/tdp-cloud/docs/" target="_blank" icon="Position" :underline="false">
                    &nbsp;操作指南
                </el-link>
            </template>
            <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="90px">
                <el-form-item prop="Description" label="别名">
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
        </t-card>
    </t-space>
</template>
