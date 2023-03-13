<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { KeypairItem } from "@/api/native/keypair"

import KeypairCreate from "./keypair_create.vue"

@Component({
    components: { KeypairCreate }
})
export default class KeypairList extends Vue {
    public loading = true

    @Ref
    public createModal!: KeypairCreate

    // 初始化

    public created() {
        this.getKeypairList()
    }

    // 密钥列表

    public keylist: KeypairItem[] = []

    async getKeypairList() {
        const res = await NaApi.keypair.list()
        this.keylist = res.Items
        this.loading = false
    }

    // 删除密钥

    async deleteKey(idx: number) {
        const item = this.keylist[idx]
        await NaApi.keypair.remove(item.Id)
        this.keylist.splice(idx, 1)
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Description', title: '别名', ellipsis: true },
        { colKey: 'PublicKey', title: '公钥', ellipsis: true },
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
                密钥管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card title="密钥列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ keylist?.length || 0 }}
            </template>
            <template #actions>
                <t-button theme="primary" size="small" @click="createModal.open()">
                    <template #icon>
                        <t-icon name="add" />
                    </template>
                    添加密钥
                </t-button>
            </template>
            <t-table v-loading="loading" :data="keylist" :columns="tableColumns" row-key="Id">
                <template #Operation="{ rowIndex }">
                    <t-popconfirm content="确定删除?" @confirm="deleteKey(rowIndex)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>

        <KeypairCreate ref="createModal" @submit="getKeypairList" />
    </t-space>
</template>
