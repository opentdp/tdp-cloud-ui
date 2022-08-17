<script lang="ts" setup>
import { reactive } from "vue"

import { QApi } from "@/api"
import { LH_Region, LH_Instance, LH_TrafficPackage } from "@/api/qcloud/lighthouse"

import { bytesToSize, dateFormat } from "@/helper/utils"

const regions = reactive<Record<string, LH_Region>>({})

const instances = reactive<LH_Instance[]>([])
const trafficPackages = reactive<Record<string, LH_TrafficPackage>>({})

async function getRegions() {
    const data = await QApi.lighthouse.describeRegions()
    data.RegionSet.forEach((item) => {
        regions[item.Region] = { ...item, InstanceCount: 0 }
        getInstances(item.Region)
    })
}

async function getInstances(region: string) {
    const data = await QApi.lighthouse.describeInstances(region)
    if (data.TotalCount > 0) {
        data.InstanceSet.forEach((item) => {
            const Zone = item.Zone.replace(/[^1-9]+/, "")
            instances.push({
                ...item,
                Region: regions[region].RegionName,
                RgZone: Zone ? Zone + "区" : ""
            })
        })
        getTrafficPackages(region)
    }
}

async function getTrafficPackages(region: string) {
    const data = await QApi.lighthouse.describeInstancesTrafficPackages(region)
    if (data.TotalCount > 0) {
        data.InstanceTrafficPackageSet.forEach((item) => {
            trafficPackages[item.InstanceId] = {
                ...item.TrafficPackageSet[0],
                EasyUsed: bytesToSize(item.TrafficPackageSet[0].TrafficUsed),
                EasyTotal: bytesToSize(item.TrafficPackageSet[0].TrafficPackageTotal)
            }
        })
    }
}

// 初始化

getRegions()
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                轻量服务器
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>实例列表</b>
                    <small>实例总数: {{ instances.length }}</small>
                </div>
            </template>
            <el-table v-loading="instances.length == 0" :data="instances" table-layout="fixed">
                <el-table-column fixed prop="InstanceName" label="名称" min-width="150" />
                <el-table-column label="地域" min-width="150">
                    <template #default="scope">
                        {{ scope.row.Region }}
                    </template>
                </el-table-column>
                <el-table-column prop="CPU" label="CPU" min-width="80" />
                <el-table-column label="内存" min-width="80">
                    <template #default="scope">
                        {{ scope.row.Memory + " GB" }}
                    </template>
                </el-table-column>
                <el-table-column label="系统盘" min-width="100">
                    <template #default="scope">
                        {{ scope.row.SystemDisk.DiskSize + " GB" }}
                    </template>
                </el-table-column>
                <el-table-column prop="PublicAddresses" label="外网 IP" min-width="130" />
                <el-table-column label="已用 / 流量包" min-width="150">
                    <template #default="scope">
                        <template v-if="trafficPackages[scope.row.InstanceId]">
                            {{ trafficPackages[scope.row.InstanceId].EasyUsed }} /
                            {{ trafficPackages[scope.row.InstanceId].EasyTotal }}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="到期时间" min-width="100">
                    <template #default="scope">
                        {{ dateFormat(scope.row.ExpiredTime, "yyyy-MM-dd") }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="primary" icon="Connection">
                            <router-link :to="'/lighthouse/vnc/' + scope.row.Zone + '/' + scope.row.InstanceId">
                                VNC
                            </router-link>
                        </el-button>
                        <el-button link type="primary" icon="View">
                            <router-link :to="'/lighthouse/detail/' + scope.row.Zone + '/' + scope.row.InstanceId">
                                管理
                            </router-link>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
