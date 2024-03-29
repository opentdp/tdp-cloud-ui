<script lang="ts">
import { Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { DomainModels, DomainItem } from '@/api/native/domain';

@Component
export default class DomainList extends Vue {
    public DomainModels = DomainModels;

    // 初始化

    public created() {
        this.cache.initVendorList();
        this.getDomainList();
    }

    // 域名列表

    public domainList: DomainItem[] = [];

    async getDomainList() {
        this.loading = true;
        const res = await NaApi.domain.list();
        this.domainList = res.Items;
        this.loading = false;
    }

    // 删除域名

    async deleteDomain(idx: number) {
        const item = this.domainList[idx];
        await NaApi.domain.remove(item.Id);
        this.domainList.splice(idx, 1);
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '域名', ellipsis: true },
        { colKey: 'NSList', title: 'NS 服务器', ellipsis: true },
        { colKey: 'Model', title: '云账号', ellipsis: true },
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
                域名管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card title="域名列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ domainList.length }}
            </template>
            <template #actions>
                <t-button :loading="loading" theme="primary" @click="getDomainList()">
                    <template #icon>
                        <t-icon name="refresh" />
                    </template>
                    刷新
                </t-button>
            </template>
            <t-table :data="domainList" :columns="tableColumns" row-key="Id" hover>
                <template #Model="{ row }">
                    <t-tooltip :content="DomainModels[row.Model]">
                        {{ cache.vendorList[row.VendorId]?.Description || "-" }}
                    </t-tooltip>
                </template>
                <template #Operation="{ row, rowIndex }">
                    <t-link v-route="'/domain/detail/' + row.Id" theme="primary" hover="color">
                        管理
                    </t-link>
                    <t-link theme="danger" hover="color">
                        <t-popconfirm content="确定删除?" @confirm="deleteDomain(rowIndex)">
                            删除
                        </t-popconfirm>
                    </t-link>
                </template>
            </t-table>
        </t-card>
    </t-space>
</template>
