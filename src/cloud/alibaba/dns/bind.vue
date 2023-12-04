<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { NaApi, AcApi } from '@/api';
import { DomainItem } from '@/api/native/domain';
import * as AC from '@/api/alibaba/typings';

import { dateFormat } from '@/helper/format';

@Component({
    emits: ['change'],
})
export default class DnsBind extends Vue {
    public dateFormat = dateFormat;

    @Prop
    public vendorId = 0;

    @Prop
    public boundList: Record<string, DomainItem> = {};

    // 初始化

    public created() {
        AcApi.vendor(this.vendorId);
        this.getDomainList();
    }

    // 获取列表

    public domainList: AC.Dns.DescribeDomainsResponseBodyDomainsDomain[] = [];
    public domainCount = 0;

    async getDomainList() {
        this.loading = true;
        const res = await AcApi.alidns.describeDomains();
        if (res.TotalCount > 0) {
            this.domainList = res.Domains.Domain || [];
            this.domainCount = res.TotalCount;
        }
        this.loading = false;
    }

    // 绑定域名

    async bindDomian(item: AC.Dns.DescribeDomainsResponseBodyDomainsDomain) {
        await NaApi.domain.create({
            VendorId: this.vendorId,
            Name: item.DomainName,
            NSList: item.DnsServers.DnsServer.join(','),
            Model: 'alibaba/alidns',
            CloudId: item.DomainId,
            CloudMeta: item,
            Status: '',
            Description: '',
        });
        this.$emit('change');
    }

    // 同步域名

    public syncDomian(item: AC.Dns.DescribeDomainsResponseBodyDomainsDomain) {
        const bd = this.boundList[item.DomainId];
        NaApi.domain.update({
            Id: bd ? bd.Id : 0,
            NSList: item.DnsServers.DnsServer.join(','),
            CloudId: item.DomainId,
            CloudMeta: item,
        });
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'DomainName', title: '域名', ellipsis: true },
        { colKey: 'RecordCount', title: '记录数', ellipsis: true },
        { colKey: 'DnsServers', title: 'NS 服务器', ellipsis: true },
        { colKey: 'VersionCode', title: '套餐', ellipsis: true },
        { colKey: 'CreateTimestamp', title: '接入时间', ellipsis: true },
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
            <template #DnsServers="{ row }">
                {{ row.DnsServers.DnsServer.join(",") }}
            </template>
            <template #CreateTimestamp="{ row }">
                {{ dateFormat(row.CreateTimestamp, "yyyy-MM-dd hh:mm:ss") }}
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
