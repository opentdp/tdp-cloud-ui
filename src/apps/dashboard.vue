<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height: 252px">
                    <div class="user-info">
                        <img src="@/assets/img/avatar.jpg" class="user-avator" />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ nickname }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间： <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点： <span>上清</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height: 252px">
                    <template #header>
                        <div class="clearfix">
                            <span>语言详情</span>
                        </div>
                    </template>
                    Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    CSS
                    <el-progress :percentage="13.7"></el-progress>
                    HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <el-icon class="grid-con-icon">
                                    <UserFilled />
                                </el-icon>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ accountSummary.User }}</div>
                                    <div>子账户数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <el-icon class="grid-con-icon">
                                    <Message />
                                </el-icon>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ domainDescribe.DomainCountInfo?.DomainTotal || 0 }}</div>
                                    <div>域名数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <el-icon class="grid-con-icon">
                                    <Goods />
                                </el-icon>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ lighthouseInstances.TotalCount }}</div>
                                    <div>轻量实例</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height: 403px">
                    <template #header>
                        <div class="clearfix">
                            <span>域名列表</span>
                        </div>
                    </template>
                    <el-table :data="domainDescribe.DomainList" style="width: 100%">
                        <el-table-column prop="Name" label="域名"></el-table-column>
                        <el-table-column prop="GradeTitle" label="套餐" width="100"></el-table-column>
                        <el-table-column prop="VipEndAt" label="套餐到期"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" style="height: 403px">
                    <template #header>
                        <div class="clearfix">
                            <span>轻量实例</span>
                        </div>
                    </template>
                    <el-table :data="lighthouseInstances.InstanceSet" style="width: 100%">
                        <el-table-column prop="InstanceName" label="实列名"></el-table-column>
                        <el-table-column prop="Zone" label="地域"></el-table-column>
                        <el-table-column prop="CPU" label="vCPU"></el-table-column>
                        <el-table-column prop="Memory" label="内存(GiB)" ></el-table-column>
                        <el-table-column prop="PrivateAddresses" label="内网 IP" ></el-table-column>
                        <el-table-column prop="PublicAddresses" label="外网 IP"></el-table-column>
                        <el-table-column prop="ExpiredTime" label="到期时间" width="200"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <Bar :height="300" :chart-data="chart1.data" :chart-options="chart1.options" />
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <Line :height="300" :chart-data="chart2.data" :chart-options="chart2.options" />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { ref } from 'vue'

import * as Api from '@/api'

import { Bar, Line, Colors } from '@/plugin/chartjs'

export default {
    components: {
        Bar, Line
    },
    name: 'dashboard',
    setup() {
        const nickname = localStorage.getItem('vt_nickname')
        const role = nickname === 'Admin' ? '超级管理员' : '普通用户'

        const accountSummary = ref({})
        Api.cam.getAccountSummary().then(res => {
            accountSummary.value = res.Payload
        })

        const domainDescribe = ref({})
        Api.dnspod.describeDomainList().then(res => {
            domainDescribe.value = res.Payload
        })

        const lighthouseRegions = ref({})
        const lighthouseInstances = ref({ TotalCount: 0, InstanceSet: [] })
        Api.lighthouse.describeRegions().then(res => {
            lighthouseRegions.value = res.Payload
            res.Payload.RegionSet.forEach((region, idx) => {
                setTimeout(async () => {
                    const res2 = await Api.lighthouse.describeInstances(region.Region)
                    if (res2.Payload.TotalCount > 0) {
                        lighthouseInstances.value.TotalCount += res2.Payload.TotalCount
                        lighthouseInstances.value.InstanceSet = lighthouseInstances.value.InstanceSet.concat(res2.Payload.InstanceSet)
                    }
                    console.log(lighthouseInstances.value.InstanceSet)
                }, idx * 200)
            })
        })

        const chart1 = {
            type: 'bar',
            data: {
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230],
                        backgroundColor: Colors[0]

                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160],
                        backgroundColor: Colors[1]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120],
                        backgroundColor: Colors[2]
                    },
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: '最近一周各品类销售图',
                        font: {
                            size: 16
                        }
                    }
                }
            },
        }
        const chart2 = {
            type: 'line',
            data: {
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230],
                        borderColor: Colors[5]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 150, 135, 160],
                        borderColor: Colors[6]
                    },
                    {
                        label: '食品',
                        data: [74, 118, 200, 235, 90],
                        borderColor: Colors[7]
                    },
                ],
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: '最近几个月各品类销售趋势图',
                        font: {
                            size: 16
                        }
                    }
                }
            },
        }
        return {
            role,
            nickname,
            chart1,
            chart2,
            accountSummary,
            domainDescribe,
            lighthouseRegions,
            lighthouseInstances
        }
    },
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}
</style>
