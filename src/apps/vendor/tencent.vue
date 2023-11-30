<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { VendorItem } from "@/api/native/vendor"

import VendorCreate from "./tencent_create.vue"
import VendorUpdate from "./tencent_update.vue"

@Component({
    components: { VendorCreate, VendorUpdate }
})
export default class VendorTencent extends Vue {
    public loading = true

    @Ref
    public createModal!: VendorCreate

    @Ref
    public updateModal!: VendorUpdate

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

    // 表格定义

    public tableColumns = [
        { colKey: 'Description', title: '别名', ellipsis: true },
        { colKey: 'SecretId', title: '密钥 ID', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "160px" },
    ]
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                腾讯云
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card :loading="loading" title="账号列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ vendorList.length }}
            </template>
            <template #actions>
                <t-button theme="primary" @click="createModal.open()">
                    <template #icon>
                        <t-icon name="add" />
                    </template>
                    绑定账号
                </t-button>
            </template>
            <t-table :data="vendorList" :columns="tableColumns" row-key="Id" hover>
                <template #Operation="{ row, rowIndex }">
                    <t-link v-route="'/vendor/tencent/' + row.Id" theme="primary" hover="color">
                        管理
                    </t-link>
                    <t-link theme="warning" hover="color" @click="updateModal.open(row)">
                        修改
                    </t-link>
                    <t-popconfirm content="删除账号不会解绑已导入的资源，是否继续？" @confirm="deleteVendor(rowIndex)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>

        <VendorCreate ref="createModal" @submit="getVendorList" />
        <VendorUpdate ref="updateModal" @submit="getVendorList" />
    </t-space>
</template>
