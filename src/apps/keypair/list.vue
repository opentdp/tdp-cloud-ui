<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { KeypairItem } from '@/api/native/keypair';

import KeypairCreate from './create.vue';
import KeypairUpdate from './update.vue';

@Component({
    components: { KeypairCreate, KeypairUpdate }
})
export default class KeypairList extends Vue {
    @Ref
    public createModal!: KeypairCreate;

    @Ref
    public updateModal!: KeypairUpdate;

    // 初始化

    public created() {
        this.getKeypairList();
    }

    // 密钥列表

    public keylist: KeypairItem[] = [];

    async getKeypairList() {
        this.loading = true;
        const res = await NaApi.keypair.list();
        this.keylist = res.Items;
        this.loading = false;
    }

    // 删除密钥

    async deleteKey(idx: number) {
        const item = this.keylist[idx];
        await NaApi.keypair.remove(item.Id);
        this.keylist.splice(idx, 1);
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Description', title: '别名', ellipsis: true },
        { colKey: 'PublicKey', title: '公钥', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '110px' },
    ];
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                密钥管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card :loading="loading" title="密钥列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ keylist?.length || 0 }}
            </template>
            <template #actions>
                <t-button theme="primary" @click="createModal.open()">
                    <template #icon>
                        <t-icon name="add" />
                    </template>
                    添加
                </t-button>
            </template>
            <t-table :data="keylist" :columns="tableColumns" row-key="Id" hover>
                <template #Operation="{ row, rowIndex }">
                    <t-link theme="primary" hover="color" @click="updateModal.open(row)">
                        修改
                    </t-link>
                    <t-link theme="danger" hover="color">
                        <t-popconfirm content="确定删除?" @confirm="deleteKey(rowIndex)">
                            删除
                        </t-popconfirm>
                    </t-link>
                </template>
            </t-table>
        </t-card>

        <KeypairCreate ref="createModal" @submit="getKeypairList" />
        <KeypairUpdate ref="updateModal" @submit="getKeypairList" />
    </t-space>
</template>
