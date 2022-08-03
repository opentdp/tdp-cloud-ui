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
                    <b>实例信息</b> &nbsp;
                    <small>{{ InstanceStateMap[instance.InstanceState] }}</small>
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
                </el-descriptions-item>
                <el-descriptions-item label="规格">
                    CPU：{{ instance.CPU }}核 / 内存：{{ instance.Memory }} GB
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
                    <b>防火墙</b> &nbsp;
                    <small>规则总数: {{ firewallRules.TotalCount }}</small>
                </div>
            </template>
            <el-table :data="firewallRules.FirewallRuleSet" table-layout="fixed">
                <el-table-column prop="AppType" label="应用类型" min-width="100" />
                <el-table-column prop="CidrBlock" label="来源" min-width="150" />
                <el-table-column prop="Protocol" label="协议" min-width="100" />
                <el-table-column prop="Port" label="端口" min-width="120" />
                <el-table-column prop="Action" label="策略" min-width="100" />
                <el-table-column prop="FirewallRuleDescription" label="备注" min-width="200" />
            </el-table>
        </el-card>

        <el-card v-if="snapshots" shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>快照</b> &nbsp;
                    <small>快照总数: {{ snapshots.TotalCount }}</small>
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
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

import { EChartsOption } from "echarts"

import Api, { Lighthouse } from "@/api"
import { InstanceStateMap } from "@/api/qcloud/lighthouse"

import { bytesToSize, dateFormat } from "@/helper/utils"

const route = useRoute()

const zone = route.params.zone as string
const region = zone.replace(/-\d$/, "")
const instanceId = route.params.instanceId as string

const instance = ref<Lighthouse.Instance>()
const snapshots = ref<Lighthouse.DescribeSnapshotsResponse>()
const firewallRules = ref<Lighthouse.DescribeFirewallRulesResponse>()

const trafficPackage = ref<Lighthouse.TrafficPackage>()

const outtrafficChart = ref<EChartsOption>()

async function getInstance() {
    const data = await Api.lighthouse.describeInstances(region, {
        InstanceIds: [instanceId],
    })
    instance.value = data.InstanceSet[0]
    getSnapshots()
    getFirewallRules()
    getTrafficPackage()
    getLighthouseOuttraffic()
}

async function getSnapshots() {
    const data = await Api.lighthouse.describeSnapshots(region, {
        Filters: [{ Name: "instance-id", Values: [instanceId] }],
    })
    snapshots.value = data
}

async function getFirewallRules() {
    const data = await Api.lighthouse.describeFirewallRules(region, {
        InstanceId: instanceId,
    })
    firewallRules.value = data
}

async function getTrafficPackage() {
    const data = await Api.lighthouse.describeInstancesTrafficPackages(region, {
        InstanceIds: [instanceId],
    })
    trafficPackage.value = data.InstanceTrafficPackageSet[0].TrafficPackageSet[0]
}

async function getLighthouseOuttraffic() {
    const data = await Api.monitor.getMonitorData(region, {
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

//////

async function stopInstance() {
    instance.value.InstanceState = "STOPPING"
    const data = await Api.lighthouse.stopInstances(region, {
        InstanceIds: [instanceId],
    })
    refreshInstance()
}

async function startInstance() {
    instance.value.InstanceState = "STARTING"
    const data = await Api.lighthouse.startInstances(region, {
        InstanceIds: [instanceId],
    })
    refreshInstance()
}

async function rebootInstance() {
    instance.value.InstanceState = "REBOOTING"
    const data = await Api.lighthouse.rebootInstances(region, {
        InstanceIds: [instanceId],
    })
    refreshInstance()
}

async function refreshInstance() {
    const data = await Api.lighthouse.describeInstances(region, {
        InstanceIds: [instanceId],
    }, 0)
    instance.value = data.InstanceSet[0]
    // 持续刷新状态
    if (instance.value.InstanceState.match(/ING$/)) {
        setTimeout(refreshInstance, 1500)
    }
}

//////

getInstance()
</script>
