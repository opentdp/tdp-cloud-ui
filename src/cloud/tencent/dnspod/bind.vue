<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { NaApi, TcApi } from '@/api';
import { DomainItem } from '@/api/native/domain';
import { DomainStatusMap } from '@/api/tencent/dnspod';
import * as TC from '@/api/tencent/typings';

@Component({
    emits: ['change']
})
export default class DnspodBind extends Vue {
    public DomainStatusMap = DomainStatusMap;

    @Prop
    public vendorId = 0;

    @Prop
    public boundList: Record<string, DomainItem> = {};

    // 初始化

    public created() {
        TcApi.vendor(this.vendorId);
        this.getDomainList();
    }

    // 获取列表

    public domainList: TC.Dnspod.DomainListItem[] = [];
    public domainCount = 0;

    async getDomainList() {
        this.loading = true;
        const res = await TcApi.dnspod.describeDomainList();
        if (res.DomainCountInfo) {
            this.domainList = res.DomainList || [];
            this.domainCount = res.DomainCountInfo.AllTotal;
        }
        this.loading = false;
    }

    // 绑定域名

    async bindDomian(item: Required<TC.Dnspod.DomainListItem>) {
        await NaApi.domain.create({
            VendorId: this.vendorId,
            Name: item.Name,
            NSList: item.EffectiveDNS.join(','),
            Model: 'tencent/dnspod',
            CloudId: item.DomainId + '',
            CloudMeta: item,
            Status: '',
            Description: '',
        });
        this.$emit('change');
    }

    // 同步域名

    public syncDomian(item: Required<TC.Dnspod.DomainListItem>) {
        const bd = this.boundList[item.DomainId];
        NaApi.domain.update({
            Id: bd ? bd.Id : 0,
            NSList: item.EffectiveDNS.join(','),
            CloudId: item.DomainId + '',
            CloudMeta: item,
        });
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '名称', ellipsis: true },
        { colKey: 'Status', title: '状态', ellipsis: true },
        { colKey: 'RecordCount', title: '记录数', ellipsis: true },
        { colKey: 'EffectiveDNS', title: 'NS 服务器', ellipsis: true },
        { colKey: 'DNSStatus', title: 'NS 记录', ellipsis: true },
        { colKey: 'GradeTitle', title: '套餐', ellipsis: true },
        { colKey: 'VipEndAt', title: '有效期', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '110px' },
    ];
}
</script>

<template>
    <t-card :loading="loading" title="域名列表" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ domainCount }}
        </template>
        <t-table :data="domainList" :columns="tableColumns" row-key="DomainId" hover>
            <template #Status="{ row }">
                {{ DomainStatusMap[row.Status] }}
            </template>
            <template #DNSStatus="{ row }">
                {{ row.DNSStatus ? "错误" : "正常" }}
            </template>
            <template #Operation="{ row }">
                <t-link v-if="boundList[row.DomainId]" theme="success" hover="color" @click="syncDomian(row)">
                    同步
                </t-link>
                <t-link v-else theme="primary" hover="color" @click="bindDomian(row)">
                    导入
                </t-link>
            </template>
        </t-table>
    </t-card>
</template>
