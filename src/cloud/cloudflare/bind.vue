<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { NaApi, CfApi } from '@/api';
import * as CF from '@/api/cloudflare/typings';
import { DomainItem } from '@/api/native/domain';

@Component({
    emits: ['change']
})
export default class CloudflareBind extends Vue {
    @Prop
    public vendorId = 0;

    @Prop
    public boundList: Record<string, DomainItem> = {};

    // 初始化

    public created() {
        CfApi.vendor(this.vendorId);
        this.getDomainlist();
    }

    // 获取列表

    public domainList: CF.ZoneItem[] = [];
    public domainCount = 0;

    async getDomainlist() {
        this.loading = true;
        const res = await CfApi.zones.list();
        this.domainList = res.Datasets;
        this.loading = false;
    }

    // 绑定域名

    async bindDomian(item: CF.ZoneItem) {
        const ns = item.name_servers ? item.name_servers.join(',') : 'Custom NS';
        await NaApi.domain.create({
            VendorId: this.vendorId,
            Name: item.name,
            NSList: ns,
            Model: 'cloudflare/zone',
            CloudId: item.id + '',
            CloudMeta: item,
            Status: '',
            Description: '',
        });
        this.$emit('change');
    }

    // 同步域名

    public syncDomian(item: CF.ZoneItem) {
        const ns = item.name_servers ? item.name_servers.join(',') : 'Custom NS';
        const bd = this.boundList[item.id];
        NaApi.domain.update({
            Id: bd ? bd.Id : 0,
            NSList: ns,
            CloudId: item.id + '',
            CloudMeta: item,
        });
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'name', title: '域名', ellipsis: true },
        { colKey: 'status', title: '状态', ellipsis: true },
        { colKey: 'type', title: '接入方式', ellipsis: true },
        { colKey: 'name_servers', title: 'NS 服务器', ellipsis: true },
        { colKey: 'plan.name', title: '套餐', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '110px' },
    ];
}
</script>

<template>
    <t-card :loading="loading" title="域名列表" hover-shadow header-bordered>
        <t-table :data="domainList" :columns="tableColumns" row-key="Id" hover>
            <template #type="{ row }">
                {{ row.type == "full" ? "NS" : row.host?.name }}
            </template>
            <template #name_servers="{ row }">
                <template v-if="row.name_servers">
                    {{ row.name_servers.join(",") }}
                </template>
                <template v-else>
                    Unknown
                </template>
            </template>
            <template #Operation="{ row }">
                <t-link v-if="boundList[row.id]" theme="success" hover="color" @click="syncDomian(row)">
                    同步
                </t-link>
                <t-link v-else theme="primary" hover="color" @click="bindDomian(row)">
                    导入
                </t-link>
            </template>
        </t-table>
    </t-card>
</template>
