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
                <el-button type="primary" plain size="small" @click="createModal.open()">
                    添加密钥
                </el-button>
            </template>
            <el-table :data="keylist">
                <el-table-column prop="Description" label="别名" fixed sortable show-overflow-tooltip />
                <el-table-column prop="PublicKey" label="公钥" sortable show-overflow-tooltip />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <t-popconfirm content="确定删除?" @confirm="deleteKey(scope.$index)">
                            <t-link theme="danger" hover="color">
                                删除
                            </t-link>
                        </t-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </t-card>

        <KeypairCreate ref="createModal" @submit="getKeypairList" />
    </t-space>
</template>
