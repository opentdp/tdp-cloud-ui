<script lang="ts" setup>
import { ref, reactive } from "vue"

import { QApi } from "@/api"
import { Lighthouse } from "@/api/qcloud/typings"

// 初始化

const props = defineProps<{
    instance: Lighthouse.Instance,
}>()

interface FirewallRuleBus {
    dailog: boolean
    loading: boolean
    index?: number
    model: Lighthouse.FirewallRule & {
        AppType?: string
    }
}

// 获取区域

const region = () => {
    return props.instance.Zone.replace(/-\d$/, "")
}

// 规则列表

const firewallRuleList = ref<Lighthouse.DescribeFirewallRulesResponse>()

async function getFirewallRuleList() {
    const res = await QApi.lighthouse.describeFirewallRules(region(), {
        InstanceId: props.instance.InstanceId,
    })
    firewallRuleList.value = res
}

// 添加规则

const createFirewallRuleBus = reactive<FirewallRuleBus>({
    dailog: false,
    loading: false,
    model: {
        Protocol: "TCP",
        Port: "",
        CidrBlock: "0.0.0.0/0",
        Action: "ACCEPT",
        FirewallRuleDescription: "",
    }
})

async function createFirewallRule() {
    createFirewallRuleBus.loading = true
    await QApi.lighthouse.createFirewallRules(region(), {
        InstanceId: props.instance.InstanceId,
        FirewallRules: [createFirewallRuleBus.model]
    })
    createFirewallRuleBus.dailog = false
    createFirewallRuleBus.loading = false
    getFirewallRuleList()
}

// 修改规则

const modifyFirewallRuleBus = reactive<FirewallRuleBus>({
    dailog: false,
    loading: false,
    model: { Protocol: "" }
})

async function modifyFirewallRule() {
    if (!firewallRuleList.value) {
        return
    }
    modifyFirewallRuleBus.loading = true
    await QApi.lighthouse.modifyFirewallRules(region(), {
        InstanceId: props.instance.InstanceId,
        FirewallRules: firewallRuleList.value.FirewallRuleSet.map(
            (item: FirewallRuleBus["model"], idx) => {
                if (modifyFirewallRuleBus.index === idx) {
                    item = Object.assign({}, modifyFirewallRuleBus.model)
                }
                delete item.AppType
                return item
            }
        )
    })
    modifyFirewallRuleBus.dailog = false
    modifyFirewallRuleBus.loading = false
    getFirewallRuleList()
}

function modifyFirewallRuleDailog(item: Lighthouse.FirewallRule, idx: number) {
    modifyFirewallRuleBus.model = Object.assign({}, item)
    modifyFirewallRuleBus.index = idx
    modifyFirewallRuleBus.dailog = true
}

// 修改规则描述

const modifyFirewallRuleDescriptionBus = reactive<FirewallRuleBus>({
    dailog: false,
    loading: false,
    model: { Protocol: "" }
})

async function modifyFirewallRuleDescription() {
    modifyFirewallRuleDescriptionBus.loading = true
    delete modifyFirewallRuleDescriptionBus.model.AppType
    await QApi.lighthouse.modifyFirewallRuleDescription(region(), {
        InstanceId: props.instance.InstanceId,
        FirewallRule: modifyFirewallRuleDescriptionBus.model
    })
    modifyFirewallRuleDescriptionBus.dailog = false
    modifyFirewallRuleDescriptionBus.loading = false
    getFirewallRuleList()
}

function modifyFirewallRuleDescriptionDailog(item: Lighthouse.FirewallRule) {
    modifyFirewallRuleDescriptionBus.model = Object.assign({}, item)
    modifyFirewallRuleDescriptionBus.dailog = true
}

// 删除规则

async function deleteFirewallRule(item: FirewallRuleBus["model"]) {
    delete item.AppType
    await QApi.lighthouse.deleteFirewallRules(region(), {
        InstanceId: props.instance.InstanceId,
        FirewallRules: [item]
    })
    getFirewallRuleList()
}

// 加载数据

getFirewallRuleList()
</script>

<template>
    <el-card v-if="firewallRuleList" shadow="hover" class="mgb10">
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
                        @click="modifyFirewallRuleDailog(scope.row, scope.$index)">
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
                    @click="modifyFirewallRuleDescription">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
