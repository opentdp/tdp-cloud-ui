<script lang="ts">
import { Ref, Prop, Component, Vue } from '@/apps/basic';

import { TcApi } from '@/api';
import * as TC from '@/api/tencent/typings';

import FirewallCreate from './firewall_create.vue';
import FirewallUpdate from './firewall_update.vue';
import FirewallRemark from './firewall_remark.vue';

@Component({
    components: { FirewallCreate, FirewallUpdate, FirewallRemark }
})
export default class LighthouseFirewall extends Vue {
    @Ref
    public createModal!: FirewallCreate;

    @Ref
    public updateModal!: FirewallUpdate;

    @Ref
    public remarkModal!: FirewallRemark;

    @Prop
    public instance!: Required<TC.Lighthouse.Instance>;

    // 初始化

    public created() {
        this.getFirewallRuleList();
    }

    // 获取区域

    public get region() {
        return this.instance.Zone.replace(/-\d$/, '');
    }

    // 规则列表

    public firewallRuleList!: TC.Lighthouse.FirewallRule[];
    public firewallRuleCount = 0;

    async getFirewallRuleList() {
        const res = await TcApi.lighthouse.describeFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
        });
        this.firewallRuleList = res.FirewallRuleSet.map(item => {
            delete (item as Partial<TC.Lighthouse.FirewallRuleInfo>).AppType;
            return item;
        });
        this.firewallRuleCount = res.TotalCount;
    }

    // 删除规则

    async deleteFirewallRule(item: TC.Lighthouse.FirewallRule) {
        await TcApi.lighthouse.deleteFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
            FirewallRules: [item]
        });
        this.getFirewallRuleList();
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'CidrBlock', title: '来源', ellipsis: true },
        { colKey: 'Protocol', title: '协议', ellipsis: true },
        { colKey: 'Port', title: '端口', ellipsis: true },
        { colKey: 'Action', title: '策略', ellipsis: true },
        { colKey: 'FirewallRuleDescription', title: '备注', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '110px' },
    ];
}
</script>

<template>
    <t-card v-if="firewallRuleList" title="防火墙" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ firewallRuleCount }}
        </template>
        <template #actions>
            <t-button theme="primary" @click="createModal.open(instance)">
                <template #icon>
                    <t-icon name="add" />
                </template>
                添加
            </t-button>
        </template>
        <t-table :data="firewallRuleList" :columns="tableColumns" row-key="Id" hover>
            <template #FirewallRuleDescription="{ row }">
                {{ row.FirewallRuleDescription }}
                <t-button shape="circle" variant="text" @click="remarkModal.open(instance, row)">
                    <t-icon name="edit" />
                </t-button>
            </template>
            <template #Operation="{ row, rowIndex }">
                <t-link theme="primary" hover="color" @click="updateModal.open(instance, firewallRuleList, rowIndex)">
                    修改
                </t-link>
                <t-link theme="danger" hover="color">
                    <t-popconfirm content="确定删除?" @confirm="deleteFirewallRule(row)">
                        删除
                    </t-popconfirm>
                </t-link>
            </template>
        </t-table>
    </t-card>

    <FirewallCreate ref="createModal" @submit="getFirewallRuleList" />
    <FirewallUpdate ref="updateModal" @submit="getFirewallRuleList" />
    <FirewallRemark ref="remarkModal" @submit="getFirewallRuleList" />
</template>
