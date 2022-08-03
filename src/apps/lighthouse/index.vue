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
        <template v-for="region in regionsInstances" :key="region.Region">
            <el-card v-if="region.InstanceCount > 0" shadow="hover" class="mgb10">
                <template #header>
                    <div class="flex-between">
                        <b>{{ region.RegionName }}</b>
                        <small>实例总数: {{ region.InstanceCount }}</small>
                    </div>
                </template>
                <el-table :data="region.InstanceSet" table-layout="fixed">
                    <el-table-column fixed prop="InstanceName" label="名称" min-width="150" />
                    <el-table-column label="地域" min-width="150">
                        <template #default="scope">
                            {{ showRegion(scope.row.Zone) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="CPU" label="CPU" min-width="100" />
                    <el-table-column label="内存" min-width="100">
                        <template #default="scope">
                            {{ scope.row.Memory + " GB" }}
                        </template>
                    </el-table-column>
                    <el-table-column label="系统盘" min-width="150">
                        <template #default="scope">
                            {{ scope.row.SystemDisk.DiskSize + " GB" }}
                        </template>
                    </el-table-column>
                    <el-table-column label="已用 / 流量包" min-width="180">
                        <template #default="scope">
                            {{ showTraffic(scope.row.InstanceId) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="PrivateAddresses" label="内网 IP" min-width="150" />
                    <el-table-column prop="PublicAddresses" label="外网 IP" min-width="150" />
                    <el-table-column label="到期时间" min-width="180">
                        <template #default="scope">
                            {{ dateFormat(scope.row.ExpiredTime, "yyyy-MM-dd hh:mm:ss") }}
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
        </template>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"

import { QApi, Lighthouse } from "@/api"
import { bytesToSize, dateFormat } from "@/helper/utils"

const regionsInstances = reactive<
    Record<
        string,
        Lighthouse.RegionInfo & {
            InstanceSet: Lighthouse.DescribeInstancesResponse["InstanceSet"]
            InstanceCount: number
        }
    >
>({})

const trafficPackages = reactive<Record<string, Lighthouse.TrafficPackage>>({})

async function getRegions() {
    const data = await QApi.lighthouse.describeRegions()
    data.RegionSet.forEach(async (item) => {
        regionsInstances[item.Region] = { ...item, InstanceCount: 0, InstanceSet: [] }
        getInstances(item.Region)
    })
}

async function getInstances(region: string) {
    const data = await QApi.lighthouse.describeInstances(region)
    if (data.TotalCount > 0) {
        regionsInstances[region].InstanceCount = data.TotalCount
        regionsInstances[region].InstanceSet.push(...data.InstanceSet)
        getTrafficPackages(region)
    }
    return data.TotalCount
}

async function getTrafficPackages(zone: string) {
    const data = await QApi.lighthouse.describeInstancesTrafficPackages(zone)
    if (data.TotalCount > 0) {
        data.InstanceTrafficPackageSet.forEach((item) => {
            trafficPackages[item.InstanceId] = item.TrafficPackageSet[0]
        })
    }
}

function showTraffic(id: string) {
    if (!trafficPackages[id]) {
        return ""
    }
    const used = bytesToSize(trafficPackages[id].TrafficUsed)
    const total = bytesToSize(trafficPackages[id].TrafficPackageTotal)
    return `${used} / ${total}`
}

function showRegion(zone: string) {
    const r = zone.split("-")
    const n = r.pop()
    zone = r.join("-")
    if (!regionsInstances[zone]) {
        return ""
    }
    return regionsInstances[zone].RegionName + ` ${n} 区`
}

getRegions()
</script>
