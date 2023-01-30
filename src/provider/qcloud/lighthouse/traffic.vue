<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { EChartsOption } from "echarts"

import { QcApi } from "@/api"
import * as Qcloud from "@/api/qcloud/typings"

import { bytesToSize, dateFormat } from "@/helper/format"

@Component
export default class LighthouseTraffic extends Vue {
    public bytesToSize = bytesToSize

    @Prop
    public instance!: Qcloud.Lighthouse.Instance

    public created() {
        this.getTrafficPackage()
        this.getLighthouseOuttraffic()
    }

    // 获取区域

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 流量信息

    public trafficPackage!: Qcloud.Lighthouse.TrafficPackage

    async getTrafficPackage() {
        const res = await QcApi.lighthouse.describeInstancesTrafficPackages(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        this.trafficPackage = res.InstanceTrafficPackageSet[0].TrafficPackageSet[0]
    }

    async getLighthouseOuttraffic() {
        const res = await QcApi.monitor.getMonitorData(this.region, {
            Namespace: "QCE/LIGHTHOUSE",
            MetricName: "LighthouseOuttraffic",
            Instances: [
                {
                    Dimensions: [
                        {
                            Name: "InstanceId",
                            Value: this.instance.InstanceId,
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
        this.setOuttrafficChartConfig(data, res.DataPoints[0].Values)
    }

    // 生成图表参数

    public outtrafficChart!: EChartsOption

    public setOuttrafficChartConfig(xdata: string[], sdata: number[]) {
        this.outtrafficChart = {
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
}
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
