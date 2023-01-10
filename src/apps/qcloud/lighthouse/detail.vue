<script lang="ts" setup>
import { ref, reactive, defineProps } from "vue"

import { EChartsOption } from "echarts"

import { Api, QApi } from "@/api"
import { InstanceStateMap } from "@/api/qcloud/lighthouse"
import { Lighthouse } from "@/api/qcloud/typings"

import { bytesToSize, dateFormat } from "@/helper/utils"

// 初始化

const props = defineProps<{
    vid: string,
    zone: string,
    instanceId: string,
}>()

QApi.lighthouse.vendor(props.vid)

// 获取区域

const region = () => {
    return props.zone.replace(/-\d$/, "")
}

// 实例信息

const instance = ref<Lighthouse.Instance>()

async function getInstance() {
    const res = await QApi.lighthouse.describeInstances(region(), {
        InstanceIds: [props.instanceId],
    })
    instance.value = res.InstanceSet[0]
}

// 电源管理

async function stopInstance() {
    if (instance.value) {
        instance.value.InstanceState = "STOPPING"
    }
    await QApi.lighthouse.stopInstances(region(), {
        InstanceIds: [props.instanceId],
    })
    setTimeout(refreshInstance, 1500)
}

async function startInstance() {
    if (instance.value) {
        instance.value.InstanceState = "STARTING"
    }
    await QApi.lighthouse.startInstances(region(), {
        InstanceIds: [props.instanceId],
    })
    setTimeout(refreshInstance, 1500)
}

async function rebootInstance() {
    if (instance.value) {
        instance.value.InstanceState = "REBOOTING"
    }
    await QApi.lighthouse.rebootInstances(region(), {
        InstanceIds: [props.instanceId],
    })
    setTimeout(refreshInstance, 1500)
}

async function refreshInstance() {
    Api.cache.clear(), await getInstance()
    if (instance.value?.InstanceState.match(/ING$/)) {
        setTimeout(refreshInstance, 1500)
    }
}

// 修改实例名

const modifyInstanceNameBus = reactive({
    dailog: false,
    loading: false,
    model: {
        name: ""
    }
})

async function modifyInstanceName() {
    modifyInstanceNameBus.loading = true
    if (instance.value && modifyInstanceNameBus.model.name &&
        instance.value.InstanceName != modifyInstanceNameBus.model.name) {
        await QApi.lighthouse.modifyInstancesAttribute(region(), {
            InstanceIds: [props.instanceId],
            InstanceName: modifyInstanceNameBus.model.name
        })
        instance.value.InstanceName = modifyInstanceNameBus.model.name
    }
    modifyInstanceNameBus.dailog = false
    modifyInstanceNameBus.loading = false
}

// 防火墙管理

const firewallRuleList = ref<Lighthouse.DescribeFirewallRulesResponse>()

interface FirewallRuleBus {
    dailog: boolean
    loading: boolean
    index?: number
    model: Lighthouse.FirewallRule & {
        AppType?: string
    }
}

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

const modifyFirewallRuleBus = reactive<FirewallRuleBus>({
    dailog: false,
    loading: false,
    model: { Protocol: "" }
})

const modifyFirewallRuleDescriptionBus = reactive<FirewallRuleBus>({
    dailog: false,
    loading: false,
    model: { Protocol: "" }
})

async function getFirewallRuleList() {
    const res = await QApi.lighthouse.describeFirewallRules(region(), {
        InstanceId: props.instanceId,
    })
    firewallRuleList.value = res
}

async function createFirewallRule() {
    createFirewallRuleBus.loading = true
    await QApi.lighthouse.createFirewallRules(region(), {
        InstanceId: props.instanceId,
        FirewallRules: [createFirewallRuleBus.model]
    })
    createFirewallRuleBus.dailog = false
    createFirewallRuleBus.loading = false
    refreshFirewallRules()
}

async function modifyFirewallRule() {
    if (!firewallRuleList.value) {
        return
    }
    modifyFirewallRuleBus.loading = true
    await QApi.lighthouse.modifyFirewallRules(region(), {
        InstanceId: props.instanceId,
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
    refreshFirewallRules()
}

function modifyFirewallRuleDailog(item: Lighthouse.FirewallRule, idx: number) {
    modifyFirewallRuleBus.model = Object.assign({}, item)
    modifyFirewallRuleBus.index = idx
    modifyFirewallRuleBus.dailog = true
}

async function modifyFirewallRuleDescription() {
    modifyFirewallRuleDescriptionBus.loading = true
    delete modifyFirewallRuleDescriptionBus.model.AppType
    await QApi.lighthouse.modifyFirewallRuleDescription(region(), {
        InstanceId: props.instanceId,
        FirewallRule: modifyFirewallRuleDescriptionBus.model
    })
    modifyFirewallRuleDescriptionBus.dailog = false
    modifyFirewallRuleDescriptionBus.loading = false
    refreshFirewallRules()
}

function modifyFirewallRuleDescriptionDailog(item: Lighthouse.FirewallRule) {
    modifyFirewallRuleDescriptionBus.model = Object.assign({}, item)
    modifyFirewallRuleDescriptionBus.dailog = true
}

async function deleteFirewallRule(item: FirewallRuleBus["model"]) {
    delete item.AppType
    await QApi.lighthouse.deleteFirewallRules(region(), {
        InstanceId: props.instanceId,
        FirewallRules: [item]
    })
    refreshFirewallRules()
}

async function refreshFirewallRules() {
    Api.cache.clear(), await getFirewallRuleList()
}

// 快照管理

const snapshotList = ref<Lighthouse.DescribeSnapshotsResponse>()

const createSnapshotBus = reactive({
    dailog: false,
    loading: false,
    model: {
        name: ""
    }
})

async function getSnapshotList() {
    const res = await QApi.lighthouse.describeSnapshots(region(), {
        Filters: [{ Name: "instance-id", Values: [props.instanceId] }],
    })
    snapshotList.value = res
}

async function createSnapshot() {
    createSnapshotBus.loading = true
    await QApi.lighthouse.createInstanceSnapshot(region(), {
        InstanceId: props.instanceId,
        SnapshotName: createSnapshotBus.model.name
    })
    createSnapshotBus.dailog = false
    createSnapshotBus.loading = false
    refreshSnapshot()
}

function createSnapshotDailog() {
    createSnapshotBus.model.name = 'Snapshot-' + Date.now()
    createSnapshotBus.dailog = true
}

async function applySnapshot(item: Lighthouse.Snapshot) {
    await QApi.lighthouse.applyInstanceSnapshot(region(), {
        InstanceId: props.instanceId,
        SnapshotId: item.SnapshotId
    })
    refreshInstance()
}

async function deleteSnapshot(item: Lighthouse.Snapshot) {
    await QApi.lighthouse.deleteSnapshots(region(), {
        SnapshotIds: [item.SnapshotId],
    })
    refreshSnapshot()
}

async function refreshSnapshot() {
    Api.cache.clear(), await getSnapshotList()
    if (snapshotList.value?.SnapshotSet.find((item) => item.Percent < 100)) {
        setTimeout(refreshSnapshot, 1500)
    }
}

// 流量包信息

const trafficPackage = ref<Lighthouse.TrafficPackage>()

const outtrafficChart = ref<EChartsOption>()

async function getTrafficPackage() {
    const res = await QApi.lighthouse.describeInstancesTrafficPackages(region(), {
        InstanceIds: [props.instanceId],
    })
    trafficPackage.value = res.InstanceTrafficPackageSet[0].TrafficPackageSet[0]
}

async function getLighthouseOuttraffic() {
    const res = await QApi.monitor.getMonitorData(region(), {
        Namespace: "QCE/LIGHTHOUSE",
        MetricName: "LighthouseOuttraffic",
        Instances: [
            {
                Dimensions: [
                    {
                        Name: "InstanceId",
                        Value: props.instanceId,
                    },
                ],
            },
        ],
        Period: 300,
        StartTime: dateFormat(Date.now() - 86400 * 30 * 1000, "yyyy-MM-dd hh:mm:ss"),
        EndTime: dateFormat(Date.now(), "yyyy-MM-dd hh:mm:ss"),
    })
    const data = res.DataPoints[0].Timestamps.map(t => {
        return dateFormat(t * 1000, "yyyy-MM-dd\nhh:mm:ss")
    })
    outtrafficChart.value = getOuttrafficChartConfig(data, res.DataPoints[0].Values)
}

function getOuttrafficChartConfig(xdata: string[], sdata: number[]): EChartsOption {
    return {
        backgroundColor: '#fcfcfc',
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '时间：{b0}<br />流量：{c0} MB/s'
        },
        grid: {
            left: 80,
            right: 80,
            bottom: 90
        },
        dataZoom: [
            {
                type: 'inside',
                start: 80
            },
            {
                type: 'slider'
            }
        ],
        xAxis: {
            silent: false,
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            },
            data: xdata
        },
        yAxis: {
            axisLabel: {
                formatter: '{value} MB/s'
            },
            splitArea: {
                show: false
            }
        },
        series: [
            {
                type: 'line',
                areaStyle: {},
                name: '流量',
                data: sdata
            }
        ]
    }
}

// 加载数据

(async () => {
    await getInstance()
    getSnapshotList()
    getFirewallRuleList()
    getTrafficPackage()
    getLighthouseOuttraffic()
})()
</script>

<template>
    <el-card v-if="instance" shadow="hover" class="mgb10">
        <template #header>
            <div class="flex-between">
                <b>实例信息</b> &nbsp; &nbsp;
                <small style="color: #a0cfff;">
                    {{ InstanceStateMap[instance.InstanceState] }}
                </small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" :disabled="instance.InstanceState != 'STOPPED'"
                    :loading="instance.InstanceState == 'STARTING'" @click="startInstance">
                    开机
                </el-button>
                <el-button type="primary" plain size="small" :disabled="instance.InstanceState != 'RUNNING'"
                    :loading="instance.InstanceState == 'STOPPING'" @click="stopInstance">
                    关机
                </el-button>
                <el-button type="primary" plain size="small" :disabled="instance.InstanceState != 'RUNNING'"
                    :loading="instance.InstanceState == 'REBOOTING'" @click="rebootInstance">
                    重启
                </el-button>
                <el-button v-if="instance.InstanceState == 'RUNNING'" type="primary" plain size="small">
                    <router-link :to="'/lighthouse/vnc/' + zone + '/' + instanceId">
                        VNC 终端
                    </router-link>
                </el-button>
                <el-button v-else type="primary" plain size="small" disabled>
                    VNC 终端
                </el-button>
            </div>
        </template>
        <el-descriptions :column="2" border>
            <el-descriptions-item label="实例ID">
                {{ instance.InstanceId }}
            </el-descriptions-item>
            <el-descriptions-item label="实例名">
                {{ instance.InstanceName }}
                <el-button link icon="EditPen" @click="modifyInstanceNameBus.dailog = true" />
            </el-descriptions-item>
            <el-descriptions-item label="规格">
                CPU: {{ instance.CPU }} 核 / 内存: {{ instance.Memory }} GB
            </el-descriptions-item>
            <el-descriptions-item label="系统盘">
                {{ instance.SystemDisk.DiskSize }} GB
            </el-descriptions-item>
            <el-descriptions-item label="私网 IP">
                {{ instance.PrivateAddresses.join(", ") }}
            </el-descriptions-item>
            <el-descriptions-item label="公网 IP">
                {{ instance.PublicAddresses.join(", ") }}
            </el-descriptions-item>
            <el-descriptions-item label="镜像名称">
                {{ instance.BlueprintId }}
            </el-descriptions-item>
            <el-descriptions-item label="操作系统">
                {{ instance.OsName }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
                {{ dateFormat(instance.CreatedTime, "yyyy-MM-dd hh:mm:ss") }}
            </el-descriptions-item>
            <el-descriptions-item label="到期时间">
                {{ dateFormat(instance.ExpiredTime, "yyyy-MM-dd hh:mm:ss") }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>

    <el-dialog v-model="modifyInstanceNameBus.dailog" title="修改实例名" width="400px">
        <el-form v-if="instance" :model="modifyInstanceNameBus.model">
            <el-form-item label="实例名">
                <el-input v-model="modifyInstanceNameBus.model.name" :value="instance.InstanceName" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modifyInstanceNameBus.dailog = false">取消</el-button>
                <el-button type="primary" :loading="modifyInstanceNameBus.loading" @click="modifyInstanceName">保存
                </el-button>
            </span>
        </template>
    </el-dialog>

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

    <el-dialog v-model="createFirewallRuleBus.dailog" title="添加规则" width="400px">
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

    <el-dialog v-model="modifyFirewallRuleBus.dailog" title="修改规则" width="400px">
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

    <el-dialog v-model="modifyFirewallRuleDescriptionBus.dailog" title="修改备注" width="400px">
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

    <el-card v-if="snapshotList" shadow="hover" class="mgb10">
        <template #header>
            <div class="flex-between">
                <b>快照</b> &nbsp; &nbsp;
                <small>快照总数: {{ snapshotList.TotalCount }}</small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" @click="createSnapshotDailog">
                    创建快照
                </el-button>
            </div>
        </template>
        <el-table :data="snapshotList.SnapshotSet" table-layout="fixed">
            <el-table-column fixed prop="SnapshotName" label="名称" min-width="200" />
            <el-table-column label="容量" min-width="100">
                <template #default="scope">
                    {{ scope.row.DiskSize + "GB" }}
                </template>
            </el-table-column>
            <el-table-column label="进度" min-width="150">
                <template #default="scope">
                    {{ scope.row.Percent + "%" }}
                </template>
            </el-table-column>
            <el-table-column label="状态" min-width="100">
                <template #default="scope">
                    {{ scope.row.LatestOperationState }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" min-width="180">
                <template #default="scope">
                    {{ dateFormat(scope.row.CreatedTime, "yyyy-MM-dd hh:mm:ss") }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template #default="scope">
                    <el-popconfirm title="确定回滚?" @confirm="applySnapshot(scope.row)">
                        <template #reference>
                            <el-button link type="warning" icon="Clock">
                                回滚
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm title="确定删除?" @confirm="deleteSnapshot(scope.row)">
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

    <el-dialog v-model="createSnapshotBus.dailog" title="创建快照" width="400px">
        <el-form v-if="instance" :model="createSnapshotBus.model">
            <el-form-item label="名称">
                <el-input v-model="createSnapshotBus.model.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createSnapshotBus.dailog = false">取消</el-button>
                <el-button type="primary" :loading="createSnapshotBus.loading" @click="createSnapshot">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-card v-if="trafficPackage" shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>外网出流量</b>
                <small>
                    流量包:
                    {{ bytesToSize(trafficPackage.TrafficUsed) }} /
                    {{ bytesToSize(trafficPackage.TrafficPackageTotal) }}
                </small>
            </div>
        </template>
        <v-chart :option="outtrafficChart" style="height: 400px" />
    </el-card>
</template>
