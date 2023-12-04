<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { CaTypeList, JobStatus, CertbotItem } from '@/api/native/certbot';

import CertbotCreate from './create.vue';

@Component({
    components: { CertbotCreate }
})
export default class CertbotList extends Vue {
    public CaTypeList = CaTypeList;
    public JobStatus = JobStatus;

    @Ref
    public createModal!: CertbotCreate;

    // 初始化

    public created() {
        this.getCertbotList();
    }

    // 证书列表

    public certbotList: CertbotItem[] = [];

    async getCertbotList() {
        this.loading = true;
        const res = await NaApi.certbot.list();
        this.certbotList = res.Items;
        this.loading = false;
    }

    // 删除证书

    async deleteCertbot(idx: number) {
        const item = this.certbotList[idx];
        await NaApi.certbot.remove(item.Id);
        this.certbotList.splice(idx, 1);
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Domain', title: '域名', ellipsis: true },
        { colKey: 'Email', title: '邮箱', ellipsis: true },
        { colKey: 'CaType', title: 'CA', ellipsis: true },
        { colKey: 'History', title: '状态', ellipsis: true },
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
                云端部署
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card :loading="loading" title="证书列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ certbotList.length }}
            </template>
            <template #actions>
                <t-button theme="primary" @click="createModal.open()">
                    <template #icon>
                        <t-icon name="add" />
                    </template>
                    添加
                </t-button>
            </template>
            <t-table :data="certbotList" :columns="tableColumns" row-key="Id" hover>
                <template #CaType="{ row }">
                    {{ CaTypeList[row.CaType].Name }}
                </template>
                <template #History="{ row }">
                    {{ row.History?.event ? JobStatus[row.History.event] : "未知" }}
                </template>
                <template #Operation="{ row, rowIndex }">
                    <t-link v-if="row.History && /cached|obtained/.test(row.History.event)" v-route="'/certbot/detail/' + row.Id" theme="primary" hover="color">
                        查看
                    </t-link>
                    <t-link v-else theme="default" hover="color" :disabled="true">
                        查看
                    </t-link>
                    <t-popconfirm content="确定删除?" @confirm="deleteCertbot(rowIndex)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-card>

        <CertbotCreate ref="createModal" @submit="getCertbotList" />
    </t-space>
</template>
