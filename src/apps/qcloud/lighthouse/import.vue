<script lang="ts" setup>
import { ref, reactive, defineProps } from "vue"

import { QApi } from "@/api"
import { LH_Region, LH_Instance } from "@/api/qcloud/lighthouse"

import { dateFormat } from "@/helper/utils"

// 初始化

const props = defineProps<{
    vid: string,
}>()

QApi.lighthouse.vendor(props.vid)

// 获取列表

const fetchWait = ref(1)

const regionList = reactive<Record<string, LH_Region>>({})

const instanceList = reactive<LH_Instance[]>([])
const instanceTotalCount = ref(0)

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
    }
    fetchWait.value--
}

// 加载数据

getRegions()
</script>

<template>
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
            <el-table-column label="地域" min-width="120">
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
            <el-table-column label="到期时间" min-width="100">
                <template #default="scope">
                    {{ dateFormat(scope.row.ExpiredTime, "yyyy-MM-dd") }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button link type="primary" icon="View">
                        <router-link :to="'/lighthouse/detail/' + scope.row.Zone + '/' + scope.row.InstanceId">
                            导入
                        </router-link>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="fetchWait && instanceList.length > 0" v-loading="true" class="loading" />
    </el-card>
</template>

<style lang="scss" scoped>
div.loading {
    height: 48px;
    margin-top: 24px;
}
</style>
