<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { SSHKeyItem } from "@/api/native/sshkey"

import SshkeyCreate from "./sshkey_create.vue"

@Component({
    components: { SshkeyCreate }
})
export default class TerminalSshkey extends Vue {
    public loading = true

    @Ref
    public createModal!: typeof SshkeyCreate

    // 初始化

    public created() {
        this.getSshkeyList()
    }

    // 密钥列表

    public keylist: SSHKeyItem[] = []

    async getSshkeyList() {
        const res = await NaApi.sshkey.list()
        this.keylist = res.Datasets
        this.loading = false
    }

    // 删除密钥

    async deleteKey(idx: number) {
        const item = this.keylist[idx]
        await NaApi.sshkey.remove(item.Id)
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
                SSH 密钥
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>密钥列表</b> &nbsp; &nbsp;
                    <small>记录总数: {{ keylist?.length || 0 }}</small>
                    <div class="flex-auto" />
                    <el-button type="primary" plain size="small" @click="createModal?.open()">
                        添加记录
                    </el-button>
                </div>
            </template>
            <el-table :data="keylist">
                <el-table-column prop="Description" label="别名" show-overflow-tooltip fixed />
                <el-table-column prop="PublicKey" label="公钥" show-overflow-tooltip />
                <el-table-column prop="PrivateKey" label="私钥" show-overflow-tooltip />
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
        <SshkeyCreate ref="createModal" @submit="getSshkeyList" />
    </div>
</template>
