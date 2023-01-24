<script lang="ts" setup>
import { ref } from "vue"

import { EChartsOption } from "echarts"

import { QApi } from "@/api"

import { bytesToSize, dateFormat } from "@/helper/utils"

// 初始化

const props = defineProps<{
    instance: Qcloud.Lighthouse.Instance,
}>()

// 获取区域

const region = () => {
    return props.instance.Zone.replace(/-\d$/, "")
}

// 流量信息

const trafficPackage = ref<Qcloud.Lighthouse.TrafficPackage>()

const outtrafficChart = ref<EChartsOption>()

async function getTrafficPackage() {
    const res = await QApi.lighthouse.describeInstancesTrafficPackages(region(), {
        InstanceIds: [props.instance.InstanceId],
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
                        Value: props.instance.InstanceId,
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

getTrafficPackage()
getLighthouseOuttraffic()
</script>

<template>
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
