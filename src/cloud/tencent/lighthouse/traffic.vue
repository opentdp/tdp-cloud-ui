<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { EChartsOption } from 'echarts';

import { TcApi } from '@/api';
import * as TC from '@/api/tencent/typings';

import { bytesToSize, dateFormat } from '@/helper/format';

@Component
export default class LighthouseTraffic extends Vue {
    public bytesToSize = bytesToSize;

    @Prop
    public instance!: Required<TC.Lighthouse.Instance>;

    // 初始化

    public created() {
        this.getTrafficPackage();
        this.getLighthouseOuttraffic();
    }

    // 获取区域

    public get region() {
        return this.instance.Zone.replace(/-\d$/, '');
    }

    // 流量信息

    public trafficPackage!: TC.Lighthouse.TrafficPackage;

    async getTrafficPackage() {
        const res = await TcApi.lighthouse.describeInstancesTrafficPackages(this.region, {
            InstanceIds: [this.instance.InstanceId],
        });
        this.trafficPackage = res.InstanceTrafficPackageSet[0].TrafficPackageSet[0];
    }

    async getLighthouseOuttraffic() {
        const res = await TcApi.monitor.getMonitorData(this.region, {
            Namespace: 'QCE/LIGHTHOUSE',
            MetricName: 'LighthouseOuttraffic',
            Instances: [
                {
                    Dimensions: [
                        {
                            Name: 'InstanceId',
                            Value: this.instance.InstanceId,
                        },
                    ],
                },
            ],
            Period: 300,
            StartTime: dateFormat(Date.now() - 86400 * 30 * 1000, 'yyyy-MM-dd hh:mm:ss'),
            EndTime: dateFormat(Date.now(), 'yyyy-MM-dd hh:mm:ss'),
        });
        if (res.DataPoints == null || res.DataPoints.length === 0) {
            return; // 没有数据
        }
        const data = res.DataPoints[0].Timestamps.map(t => {
            return dateFormat(t * 1000, 'yyyy-MM-dd\nhh:mm:ss');
        });
        this.setOuttrafficChartConfig(data, res.DataPoints[0].Values);
    }

    // 生成图表参数

    public outtrafficChart!: EChartsOption;

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
        };
    }
}
</script>

<template>
    <t-card v-if="trafficPackage" title="外网出流量" hover-shadow header-bordered>
        <template #subtitle>
            流量包:
            {{ bytesToSize(trafficPackage.TrafficUsed) }} /
            {{ bytesToSize(trafficPackage.TrafficPackageTotal) }}
        </template>
        <v-chart style="height: 400px" :option="outtrafficChart" autoresize />
    </t-card>
</template>
