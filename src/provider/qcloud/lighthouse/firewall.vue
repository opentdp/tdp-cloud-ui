<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { QApi } from "@/api"
import * as Qcloud from "@/api/qcloud/typings"

@Component
export default class LighthouseFirewall extends Vue {
    @Prop
    public instance: Qcloud.Lighthouse.Instance

    public created() {
        this.getFirewallRuleList()
    }

    // 获取区域

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 规则列表

    public firewallRuleList: Qcloud.Lighthouse.DescribeFirewallRulesResponse

    async getFirewallRuleList() {
        const res = await QApi.lighthouse.describeFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
        })
        this.firewallRuleList = res
    }

    // 添加规则

    public createFirewallRuleBus: FirewallRuleBus = {
        dailog: false,
        loading: false,
        model: {
            Protocol: "TCP",
            Port: "",
            CidrBlock: "0.0.0.0/0",
            Action: "ACCEPT",
            FirewallRuleDescription: "",
        }
    }

    async createFirewallRule() {
        this.createFirewallRuleBus.loading = true
        await QApi.lighthouse.createFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
            FirewallRules: [this.createFirewallRuleBus.model]
        })
        this.createFirewallRuleBus.dailog = false
        this.createFirewallRuleBus.loading = false
        this.getFirewallRuleList()
    }

    // 修改规则

    public modifyFirewallRuleBus: FirewallRuleBus = {
        dailog: false,
        loading: false,
        model: { Protocol: "" }
    }

    async modifyFirewallRule() {
        if (!this.firewallRuleList.value) {
            return
        }
        this.modifyFirewallRuleBus.loading = true
        await QApi.lighthouse.modifyFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
            FirewallRules: this.firewallRuleList.value.FirewallRuleSet.map(
                (item: FirewallRuleBus["model"], idx) => {
                    if (this.modifyFirewallRuleBus.index === idx) {
                        item = Object.assign({}, this.modifyFirewallRuleBus.model)
                    }
                    delete item.AppType
                    return item
                }
            )
        })
        this.modifyFirewallRuleBus.dailog = false
        this.modifyFirewallRuleBus.loading = false
        this.getFirewallRuleList()
    }

    public modifyFirewallRuleDailog(item: Qcloud.Lighthouse.FirewallRule, idx: number) {
        this.modifyFirewallRuleBus.model = Object.assign({}, item)
        this.modifyFirewallRuleBus.index = idx
        this.modifyFirewallRuleBus.dailog = true
    }

    // 修改规则描述

    public modifyFirewallRuleDescriptionBus: FirewallRuleBus = {
        dailog: false,
        loading: false,
        model: { Protocol: "" }
    }

    async modifyFirewallRuleDescription() {
        this.modifyFirewallRuleDescriptionBus.loading = true
        delete this.modifyFirewallRuleDescriptionBus.model.AppType
        await QApi.lighthouse.modifyFirewallRuleDescription(this.region, {
            InstanceId: this.instance.InstanceId,
            FirewallRule: this.modifyFirewallRuleDescriptionBus.model
        })
        this.modifyFirewallRuleDescriptionBus.dailog = false
        this.modifyFirewallRuleDescriptionBus.loading = false
        this.getFirewallRuleList()
    }

    public modifyFirewallRuleDescriptionDailog(item: Qcloud.Lighthouse.FirewallRule) {
        this.modifyFirewallRuleDescriptionBus.model = Object.assign({}, item)
        this.modifyFirewallRuleDescriptionBus.dailog = true
    }

    // 删除规则

    async deleteFirewallRule(item: FirewallRuleBus["model"]) {
        delete item.AppType
        await QApi.lighthouse.deleteFirewallRules(this.region, {
            InstanceId: this.instance.InstanceId,
            FirewallRules: [item]
        })
        this.getFirewallRuleList()
    }
}

interface FirewallRuleBus {
    dailog: boolean
    loading: boolean
    index?: number
    model: Qcloud.Lighthouse.FirewallRule & {
        AppType?: string
    }
}
</script>

<template>
    <el-card v-if="firewallRuleList" shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>防火墙</b> &nbsp; &nbsp;
                <small>规则总数: {{ firewallRuleList.TotalCount }}</small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" @click="createFirewallRuleBus.dailog = true">
                    添加规则
                </el-button>
            </div>
        </template>
        <el-table :data="firewallRuleList.FirewallRuleSet" table-layout="fixed">
            <el-table-column prop="CidrBlock" label="来源" min-width="150" />
            <el-table-column prop="Protocol" label="协议" min-width="100" />
            <el-table-column prop="Port" label="端口" min-width="120" />
            <el-table-column prop="Action" label="策略" min-width="100" />
            <el-table-column prop="FirewallRuleDescription" label="备注" min-width="200">
                <template #default="scope">
                    {{ scope.row.FirewallRuleDescription }}
                    <el-button link icon="EditPen" @click="modifyFirewallRuleDescriptionDailog(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit"
                               @click="modifyFirewallRuleDailog(scope.row, scope.$index)"
                    >
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

    <el-dialog v-model="createFirewallRuleBus.dailog" destroy-on-close title="添加规则" width="400px">
        <el-form v-if="instance" :model="createFirewallRuleBus.model">
            <el-form-item label="来源">
                <el-input v-model="createFirewallRuleBus.model.CidrBlock" />
            </el-form-item>
            <el-form-item label="协议">
                <el-select v-model="createFirewallRuleBus.model.Protocol">
                    <el-option label="TCP" value="TCP" />
                    <el-option label="UDP" value="UDP" />
                    <el-option label="ICMP" value="ICMP" />
                </el-select>
            </el-form-item>
            <el-form-item v-if="/TCP|UDP/.test(createFirewallRuleBus.model.Protocol)" label="端口">
                <el-input v-model="createFirewallRuleBus.model.Port" />
            </el-form-item>
            <el-form-item label="策略">
                <el-select v-model="createFirewallRuleBus.model.Action">
                    <el-option label="允许" value="ACCEPT" />
                    <el-option label="拒绝" value="DROP" />
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="createFirewallRuleBus.model.FirewallRuleDescription" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createFirewallRuleBus.dailog = false">取消</el-button>
                <el-button type="primary" :loading="createFirewallRuleBus.loading" @click="createFirewallRule">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="modifyFirewallRuleBus.dailog" destroy-on-close title="修改规则" width="400px">
        <el-form v-if="instance" :model="modifyFirewallRuleBus.model">
            <el-form-item label="来源">
                <el-input v-model="modifyFirewallRuleBus.model.CidrBlock" />
            </el-form-item>
            <el-form-item label="协议">
                <el-select v-model="modifyFirewallRuleBus.model.Protocol" width="100%">
                    <el-option label="TCP" value="TCP" />
                    <el-option label="UDP" value="UDP" />
                    <el-option label="ICMP" value="ICMP" />
                </el-select>
            </el-form-item>
            <el-form-item v-if="/TCP|UDP/.test(modifyFirewallRuleBus.model.Protocol)" label="端口">
                <el-input v-model="modifyFirewallRuleBus.model.Port" />
            </el-form-item>
            <el-form-item label="策略">
                <el-select v-model="modifyFirewallRuleBus.model.Action">
                    <el-option label="允许" value="ACCEPT" />
                    <el-option label="拒绝" value="DROP" />
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="modifyFirewallRuleBus.model.FirewallRuleDescription" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modifyFirewallRuleBus.dailog = false">取消</el-button>
                <el-button type="primary" :loading="modifyFirewallRuleBus.loading" @click="modifyFirewallRule">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="modifyFirewallRuleDescriptionBus.dailog" destroy-on-close title="修改备注" width="400px">
        <el-form v-if="instance" :model="modifyFirewallRuleDescriptionBus.model">
            <el-form-item label="备注">
                <el-input v-model="modifyFirewallRuleDescriptionBus.model.FirewallRuleDescription" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modifyFirewallRuleDescriptionBus.dailog = false">取消</el-button>
                <el-button type="primary" :loading="modifyFirewallRuleDescriptionBus.loading"
                           @click="modifyFirewallRuleDescription"
                >
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
