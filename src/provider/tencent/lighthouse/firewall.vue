<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { TcApi } from "@/api"
import * as TC from "@/api/tencent/typings"

import CreateModel from "./firewall_create.vue"
import UpdateModel from "./firewall_update.vue"
import RemarkModel from "./firewall_remark.vue"

@Component({
    components: { CreateModel, UpdateModel, RemarkModel }
})
export default class LighthouseFirewall extends Vue {
    @Ref
    public createModel!: CreateModel

    @Ref
    public updateModel!: UpdateModel

    @Ref
    public remarkModel!: RemarkModel

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
    <el-card v-if="firewallRuleList" shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>防火墙</b> &nbsp; &nbsp;
                <small>规则总数: {{ firewallRuleCount }}</small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" @click="createModel.open(instance)">
                    添加规则
                </el-button>
            </div>
        </template>
        <el-table :data="firewallRuleList" table-layout="fixed">
            <el-table-column prop="CidrBlock" label="来源" show-overflow-tooltip fixed />
            <el-table-column prop="Protocol" label="协议" show-overflow-tooltip />
            <el-table-column prop="Port" label="端口" show-overflow-tooltip />
            <el-table-column prop="Action" label="策略" show-overflow-tooltip />
            <el-table-column prop="FirewallRuleDescription" label="备注" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.FirewallRuleDescription }}
                    <el-button link icon="EditPen" @click="remarkModel.open(instance, scope.row)" />
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit" @click="updateModel.open(instance, firewallRuleList, scope.$index)">
                        编辑
                    </el-button>
                    <el-popconfirm title="确定删除?" @confirm="deleteFirewallRule(scope.row)">
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
    <CreateModel ref="createModel" @submit="getFirewallRuleList" />
    <UpdateModel ref="updateModel" @submit="getFirewallRuleList" />
    <RemarkModel ref="remarkModel" @submit="getFirewallRuleList" />
</template>
