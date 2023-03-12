<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { VendorItem, VendorOrig } from "@/api/native/vendor"

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
    public formRef!: FormInstanceFunctions

    public formModel: VendorOrig = {
        SecretId: "",
        SecretKey: "",
        Provider: "tencent",
        Description: "",
    }

    public formRules: FormRules<VendorOrig> = {
        SecretId: [{ required: true }],
        SecretKey: [{ required: true }],
        Description: [{ required: true }],
    }

    async formSubmit(ctx: SubmitContext<FormData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await NaApi.vendor.create(this.formModel)
        this.formRef.reset()
        this.getVendorList()
    }

    // 表格定义

    public vendorColumns = [
        { colKey: 'Description', title: '别名', ellipsis: true, sorter: true },
        { colKey: 'SecretId', title: '密钥 ID', ellipsis: true, sorter: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
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
            <t-table :data="vendorList" :columns="vendorColumns" row-key="Id">
                <template #Operation="{ row, rowIndex }">
                    <t-link v-route="'/vendor/alibaba/' + row.Id" theme="primary" hover="color">
                        管理
                    </t-link>
                    <t-popconfirm content="删除账号不会解绑已导入的资源，是否继续？" @confirm="deleteVendor(rowIndex)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>

        <t-card title="添加账号" hover-shadow header-bordered>
            <template #actions>
                <t-link href="https://apps.rehiy.com/tdp-cloud/docs/" target="_blank" hover="color">
                    <t-icon name="jump" /> &nbsp;操作指南
                </t-link>
            </template>
            <t-form ref="formRef" :data="formModel" :rules="formRules" @submit="formSubmit">
                <t-form-item name="Description" label="别名">
                    <t-input v-model="formModel.Description" />
                </t-form-item>
                <t-form-item name="SecretId" label="密钥 ID">
                    <t-input v-model="formModel.SecretId" />
                </t-form-item>
                <t-form-item name="SecretKey" label="密钥 KEY">
                    <t-input v-model="formModel.SecretKey" />
                </t-form-item>
                <t-form-item>
                    <t-button theme="primary" type="submit">
                        保存
                    </t-button>
                </t-form-item>
            </t-form>
        </t-card>
    </t-space>
</template>
