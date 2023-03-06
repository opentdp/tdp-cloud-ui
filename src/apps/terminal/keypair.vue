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
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                密钥管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>密钥列表</b> &nbsp; &nbsp;
                    <small>记录总数: {{ keylist?.length || 0 }}</small>
                    <div class="flex-auto" />
                    <el-button type="primary" plain size="small" @click="createModal.open()">
                        添加密钥
                    </el-button>
                </div>
            </template>
            <el-table :data="keylist">
                <el-table-column prop="Description" label="别名" fixed sortable show-overflow-tooltip />
                <el-table-column prop="PublicKey" label="公钥" sortable show-overflow-tooltip />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确定删除?" @confirm="deleteKey(scope.$index)">
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
        <KeypairCreate ref="createModal" @submit="getKeypairList" />
    </div>
</template>
