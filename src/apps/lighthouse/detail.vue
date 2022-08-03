<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item to="/lighthouse/index">
                轻量服务器
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ instanceId }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-if="instance" shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>实例信息</b> &nbsp; &nbsp;
                    <small style="color: #a0cfff;">
                        {{ InstanceStateMap[instance.InstanceState] }}
                    </small>
                    <div style="flex:auto" />
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
                    <el-button link icon="EditPen" @click="modifyInstanceNameModel.dailog = true" />
                </el-descriptions-item>
                <el-descriptions-item label="规格">
                    CPU：{{ instance.CPU }} 核 / 内存：{{ instance.Memory }} GB
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

        <el-card v-if="firewallRules" shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>防火墙</b> &nbsp; &nbsp;
                    <small>规则总数: {{ firewallRules.TotalCount }}</small>
                    <div class="flex-auto" />
                    <el-button type="primary" plain size="small" @click="createSnapshotModel.dailog = true">
                        添加规则
                    </el-button>
                </div>
            </template>
            <el-table :data="firewallRules.FirewallRuleSet" table-layout="fixed">
                <el-table-column prop="AppType" label="应用类型" min-width="100" />
                <el-table-column prop="CidrBlock" label="来源" min-width="150" />
                <el-table-column prop="Protocol" label="协议" min-width="100" />
                <el-table-column prop="Port" label="端口" min-width="120" />
                <el-table-column prop="Action" label="策略" min-width="100" />
                <el-table-column prop="FirewallRuleDescription" label="备注" min-width="200">
                    <template #default="scope">
                        {{ scope.row.FirewallRuleDescription }}
                        <el-button link icon="EditPen" @click="modifyInstanceNameModel.dailog = true" />
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="Edit">
                            编辑
                        </el-button>
                        <el-popconfirm title="确定删除?" @confirm="onDelete(scope.row)">
                            <template #reference>
                                <el-button link type="primary" icon="Delete">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card v-if="snapshots" shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>快照</b> &nbsp; &nbsp;
                    <small>快照总数: {{ snapshots.TotalCount }}</small>
                    <div class="flex-auto" />
                    <el-button type="primary" plain size="small" @click="createSnapshotModel.dailog = true">
                        创建快照
                    </el-button>
                </div>
            </template>
            <el-table :data="snapshots.SnapshotSet" table-layout="fixed">
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
                        <el-popconfirm title="确定删除?" @confirm="applySnapshot(scope.row)">
                            <template #reference>
                                <el-button link type="primary" icon="Clock">
                                    回滚
                                </el-button>
                            </template>
                        </el-popconfirm>
                        <el-popconfirm title="确定删除?" @confirm="deleteSnapshot(scope.row)">
                            <template #reference>
                                <el-button link type="primary" icon="Delete">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>外网出流量</b>
                    <small v-if="trafficPackage">
                        流量包:
                        {{ bytesToSize(trafficPackage.TrafficUsed) }} /
                        {{ bytesToSize(trafficPackage.TrafficPackageTotal) }}
                    </small>
                </div>
            </template>
            <v-chart :option="outtrafficChart" style="height: 400px" />
        </el-card>

        <el-dialog v-model="modifyInstanceNameModel.dailog" title="修改实例名">
            <el-form v-if="instance" :model="modifyInstanceNameModel">
                <el-form-item label="实例名">
                    <el-input v-model="modifyInstanceNameModel.name" :value="instance.InstanceName" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="modifyInstanceNameModel.dailog = false">取消</el-button>
                    <el-button type="primary" :loading="modifyInstanceNameModel.loading" @click="modifyInstanceName">保存
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="createSnapshotModel.dailog" title="创建快照">
            <el-form v-if="instance" :model="createSnapshotModel">
                <el-form-item label="快照名">
                    <el-input v-model="createSnapshotModel.name" :value="'Snapshot-' + Date.now()" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="createSnapshotModel.dailog = false">取消</el-button>
                    <el-button type="primary" :loading="createSnapshotModel.loading" @click="createSnapshot">保存
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"

import { EChartsOption } from "echarts"

import { Api, QApi, Lighthouse } from "@/api"
import { InstanceStateMap } from "@/api/qcloud/lighthouse"

import { bytesToSize, dateFormat } from "@/helper/utils"

const route = useRoute()

const zone = route.params.zone as string
const region = zone.replace(/-\d$/, "")
const instanceId = route.params.instanceId as string

////// 实例信息

const instance = ref<Lighthouse.Instance>()

async function getInstance() {
    const data = await QApi.lighthouse.describeInstances(region, {
        InstanceIds: [instanceId],
    })
    instance.value = data.InstanceSet[0]
}

////// 电源管理

async function stopInstance() {
    if (instance.value) {
        instance.value.InstanceState = "STOPPING"
    }
    await QApi.lighthouse.stopInstances(region, {
        InstanceIds: [instanceId],
    })
    setTimeout(refreshInstance, 1500)
}

async function startInstance() {
    if (instance.value) {
        instance.value.InstanceState = "STARTING"
    }
    await QApi.lighthouse.startInstances(region, {
        InstanceIds: [instanceId],
    })
    setTimeout(refreshInstance, 1500)
}

async function rebootInstance() {
    if (instance.value) {
        instance.value.InstanceState = "REBOOTING"
    }
    await QApi.lighthouse.rebootInstances(region, {
        InstanceIds: [instanceId],
    })
    setTimeout(refreshInstance, 1500)
}

async function refreshInstance() {
    Api.cache.clear()
    await getInstance()
    if (instance.value?.InstanceState.match(/ING$/)) {
        setTimeout(refreshInstance, 1500)
    }
}

////// 修改实例名

const modifyInstanceNameModel = reactive({
    dailog: false,
    loading: false,
    name: ""
})

async function modifyInstanceName() {
    modifyInstanceNameModel.loading = true
    if (instance.value && modifyInstanceNameModel.name &&
        instance.value.InstanceName != modifyInstanceNameModel.name) {
        await QApi.lighthouse.modifyInstancesAttribute(region, {
            InstanceIds: [instanceId],
            InstanceName: modifyInstanceNameModel.name
        })
        instance.value.InstanceName = modifyInstanceNameModel.name
    }
    modifyInstanceNameModel.dailog = false
    modifyInstanceNameModel.loading = false
}

////// 快照管理

const snapshots = ref<Lighthouse.DescribeSnapshotsResponse>()

const createSnapshotModel = reactive({
    dailog: false,
    loading: false,
    name: ""
})

async function getSnapshots() {
    const data = await QApi.lighthouse.describeSnapshots(region, {
        Filters: [{ Name: "instance-id", Values: [instanceId] }],
    })
    snapshots.value = data
}

async function createSnapshot() {
    createSnapshotModel.loading = true
    const name = createSnapshotModel.name || 'Snapshot-' + Date.now()
    await QApi.lighthouse.createInstanceSnapshot(region, {
        InstanceId: instanceId,
        SnapshotName: name
    })
    createSnapshotModel.dailog = false
    createSnapshotModel.loading = false
    refreshSnapshot()
}

async function applySnapshot(item: Lighthouse.Snapshot) {
    await QApi.lighthouse.applyInstanceSnapshot(region, {
        InstanceId: instanceId,
        SnapshotId: item.SnapshotId
    })
    refreshInstance
}

async function deleteSnapshot(item: Lighthouse.Snapshot) {
    await QApi.lighthouse.deleteSnapshots(region, {
        SnapshotIds: [item.SnapshotId],
    })
    refreshSnapshot()
}

async function refreshSnapshot() {
    Api.cache.clear()
    await getSnapshots()
    if (snapshots.value?.SnapshotSet.find((item) => item.Percent < 100)) {
        setTimeout(refreshSnapshot, 1500)
    }
}

////// 防火墙管理

const firewallRules = ref<Lighthouse.DescribeFirewallRulesResponse>()

async function getFirewallRules() {
    const data = await QApi.lighthouse.describeFirewallRules(region, {
        InstanceId: instanceId,
    })
    firewallRules.value = data
}

////// 流量包信息

const trafficPackage = ref<Lighthouse.TrafficPackage>()

const outtrafficChart = ref<EChartsOption>()

async function getTrafficPackage() {
    const data = await QApi.lighthouse.describeInstancesTrafficPackages(region, {
        InstanceIds: [instanceId],
    })
    trafficPackage.value = data.InstanceTrafficPackageSet[0].TrafficPackageSet[0]
}

async function getLighthouseOuttraffic() {
    const data = await QApi.monitor.getMonitorData(region, {
        Namespace: "QCE/LIGHTHOUSE",
        MetricName: "LighthouseOuttraffic",
        Instances: [
            {
                Dimensions: [
                    {
                        Name: "InstanceId",
                        Value: instanceId,
                    },
                ],
            },
        ],
        Period: 300,
        StartTime: dateFormat(Date.now() - 86400 * 30 * 1000, "yyyy-MM-dd hh:mm:ss"),
        EndTime: dateFormat(Date.now(), "yyyy-MM-dd hh:mm:ss"),
    })
    const xdata = data.DataPoints[0].Timestamps.map(t => {
        return dateFormat(t * 1000, "yyyy-MM-dd\nhh:mm:ss")
    })
    outtrafficChart.value = getOuttrafficChartConfig(xdata, data.DataPoints[0].Values)
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

////// 初始化

(async () => {
    await getInstance()
    getSnapshots()
    getFirewallRules()
    getTrafficPackage()
    getLighthouseOuttraffic()
})()
</script>
