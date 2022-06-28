<template>
    <div>
        <template v-for="region in regions" :key="region.Region">
            <el-card v-if="region.InstanceCount > 0" shadow="hover" class="mgb10">
                <template #header>
                    <div class="card-header">
                        <b>{{ region.RegionName }}</b> &nbsp;
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
                    <el-table-column prop="CPU" label="vCPU" min-width="100" />
                    <el-table-column label="内存" min-width="100">
                        <template #default="scope">
                            {{ scope.row.Memory + " GiB" }}
                        </template>
                    </el-table-column>
                    <el-table-column label="系统盘" min-width="150">
                        <template #default="scope">
                            {{ scope.row.SystemDisk.DiskSize + " GiB" }}
                        </template>
                    </el-table-column>
                    <el-table-column label="流量(已用/总量)" min-width="180">
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
                            <router-link :to="'/lighthouse/detail/' + scope.row.Zone + '/' + scope.row.InstanceId">
                                <el-button link type="primary" icon="View">
                                    查看
                                </el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"

import Api, { Lighthouse } from "@/api"
import { bytesToSize, dateFormat } from "@/helper/utils"

const regions = reactive<
    Record<
        string,
        Lighthouse.RegionInfo & {
            InstanceCount: number
            InstanceSet: Lighthouse.DescribeInstancesResponse["InstanceSet"]
        }
    >
>({})

const trafficPackages = reactive<Record<string, Lighthouse.TrafficPackage>>({})

const geteRegions = async () => {
    const data = await Api.lighthouse.describeRegions()
    data.RegionSet.forEach(async (item) => {
        regions[item.Region] = { ...item, InstanceCount: 0, InstanceSet: [] }

        getInstances(item.Region)
    })
}

const getInstances = async (region: string) => {
    const data = await Api.lighthouse.describeInstances(region)
    if (data.TotalCount > 0) {
        regions[region].InstanceCount = data.TotalCount
        regions[region].InstanceSet.push(...data.InstanceSet)
        getTrafficPackages(region)
    }
    return data.TotalCount
}

const getTrafficPackages = async (zone: string) => {
    const data = await Api.lighthouse.describeInstancesTrafficPackages(zone)
    if (data.TotalCount > 0) {
        data.InstanceTrafficPackageSet.forEach((item) => {
            trafficPackages[item.InstanceId] = item.TrafficPackageSet.pop()
        })
    }
}

const showTraffic = (id: string) => {
    if (!trafficPackages[id]) {
        return ""
    }
    const used = bytesToSize(trafficPackages[id].TrafficUsed)
    const total = bytesToSize(trafficPackages[id].TrafficPackageTotal)
    return `${used} / ${total}`
}

const showRegion = (zone: string) => {
    const r = zone.split("-")
    const n = r.pop()
    zone = r.join("-")
    if (!regions[zone]) {
        return ""
    }
    return regions[zone].RegionName + ` ${n} 区`
}

geteRegions()
</script>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
