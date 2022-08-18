<script lang="ts" setup>
import { ref, reactive } from "vue"

import { QApi } from "@/api"
import { LH_Region, LH_Instance, LH_TrafficPackage } from "@/api/qcloud/lighthouse"

import { bytesToSize, dateFormat } from "@/helper/utils"

const fetchWait = ref(1)

const regionList = reactive<Record<string, LH_Region>>({})

const instanceList = reactive<LH_Instance[]>([])
const instanceTotalCount = ref(0)

const trafficPackageList = reactive<Record<string, LH_TrafficPackage>>({})

async function getRegions() {
    const res = await QApi.lighthouse.describeRegions()
    fetchWait.value = res.TotalCount
    res.RegionSet.forEach((item) => {
        regionList[item.Region] = { ...item, InstanceCount: 0 }
        getInstances(item.Region)
    })
}

async function getInstances(region: string) {
    const res = await QApi.lighthouse.describeInstances(region)
    if (res.TotalCount > 0) {
        regionList[region].InstanceCount = res.TotalCount
        instanceTotalCount.value += res.TotalCount
        res.InstanceSet.forEach((item) => {
            const Zone = item.Zone.replace(/[^1-9]+/, "")
            instanceList.push({
                ...item,
                Region: regionList[region].RegionName,
                RgZone: Zone ? Zone + "区" : ""
            })
        })
        await getTrafficPackages(region)
    }
    fetchWait.value--
}

async function getTrafficPackages(region: string) {
    const res = await QApi.lighthouse.describeInstancesTrafficPackages(region)
    if (res.TotalCount > 0) {
        res.InstanceTrafficPackageSet.forEach((item) => {
            trafficPackageList[item.InstanceId] = {
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
                    <div class="flex-auto" />
                    <small>实例总数: {{ instanceTotalCount }}</small>
                </div>
            </template>
            <el-table v-loading="fetchWait && instanceList.length == 0" :data="instanceList" table-layout="fixed">
                <el-table-column fixed prop="InstanceName" label="名称" min-width="150" />
                <el-table-column label="地域" min-width="150">
                    <template #default="scope">
                        {{ scope.row.Region }}{{ scope.row.RgZone }}
                    </template>
                </el-table-column>
                <el-table-column prop="CPU" label="CPU" min-width="60" />
                <el-table-column label="内存" min-width="60">
                    <template #default="scope">
                        {{ scope.row.Memory + " GB" }}
                    </template>
                </el-table-column>
                <el-table-column label="系统盘" min-width="80">
                    <template #default="scope">
                        {{ scope.row.SystemDisk.DiskSize + " GB" }}
                    </template>
                </el-table-column>
                <el-table-column prop="PublicAddresses" label="外网 IP" min-width="120" />
                <el-table-column label="已用 / 流量包" min-width="180">
                    <template #default="scope">
                        <template v-if="trafficPackageList[scope.row.InstanceId]">
                            {{ trafficPackageList[scope.row.InstanceId].EasyUsed }} /
                            {{ trafficPackageList[scope.row.InstanceId].EasyTotal }}
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
            <div v-if="fetchWait && instanceList.length > 0" v-loading="true" class="loading" />
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
div.loading {
    height: 48px;
    margin-top: 24px;
}
</style>
