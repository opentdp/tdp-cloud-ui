<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { TcApi } from "@/api"
import * as TC from "@/api/tencent/typings"

import FirewallCreate from "./firewall_create.vue"
import FirewallUpdate from "./firewall_update.vue"
import FirewallRemark from "./firewall_remark.vue"

@Component({
    components: { FirewallCreate, FirewallUpdate, FirewallRemark }
})
export default class LighthouseFirewall extends Vue {
    @Ref
    public createModal!: FirewallCreate

    @Ref
    public updateModal!: FirewallUpdate

    @Ref
    public remarkModal!: FirewallRemark

    @Prop
    public instance!: TC.Lighthouse.Instance

    // 初始化

    public created() {
        this.getFirewallRuleList()
    }

    // 获取区域

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 规则列表

    public firewallRuleList!: TC.Lighthouse.FirewallRule[]
    public firewallRuleCount = 0

    async getFirewallRuleList() {
        const res = await TcApi.lighthouse.describeFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
        })
        this.firewallRuleList = res.FirewallRuleSet.map(item => {
            delete (item as Partial<TC.Lighthouse.FirewallRuleInfo>).AppType
            return item
        })
        this.firewallRuleCount = res.TotalCount
    }

    // 删除规则

    async deleteFirewallRule(item: TC.Lighthouse.FirewallRule) {
        await TcApi.lighthouse.deleteFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
            FirewallRules: [item]
        })
        this.getFirewallRuleList()
    }
}
</script>

<template>
    <t-card v-if="firewallRuleList" title="防火墙" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ firewallRuleCount }}
        </template>
        <template #actions>
            <t-button theme="primary" size="small" @click="createModal.open(instance)">
                <template #icon>
                    <t-icon name="add" />
                </template>
                添加规则
            </t-button>
        </template>
        <el-table :data="firewallRuleList" table-layout="fixed">
            <el-table-column prop="CidrBlock" label="来源" fixed sortable show-overflow-tooltip />
            <el-table-column prop="Protocol" label="协议" sortable show-overflow-tooltip />
            <el-table-column prop="Port" label="端口" sortable show-overflow-tooltip />
            <el-table-column prop="Action" label="策略" sortable show-overflow-tooltip />
            <el-table-column prop="FirewallRuleDescription" label="备注" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.FirewallRuleDescription }}
                    <t-button shape="circle" variant="text" @click="remarkModal.open(instance, scope.row)">
                        <t-icon name="edit" />
                    </t-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <t-link theme="primary" hover="color"
                        @click="updateModal.open(instance, firewallRuleList, scope.$index)">
                        编辑
                    </t-link>
                    <t-popconfirm content="确定删除?" @confirm="deleteFirewallRule(scope.row)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </t-card>

    <FirewallCreate ref="createModal" @submit="getFirewallRuleList" />
    <FirewallUpdate ref="updateModal" @submit="getFirewallRuleList" />
    <FirewallRemark ref="remarkModal" @submit="getFirewallRuleList" />
</template>
