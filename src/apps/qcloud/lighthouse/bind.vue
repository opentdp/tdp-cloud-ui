<script lang="ts" setup>
import { ref, reactive, defineProps } from "vue"

import { Api, QApi } from "@/api"
import { Lighthouse } from "@/api/qcloud/typings"

import { dateFormat } from "@/helper/utils"

// 初始化

const props = defineProps<{
    vid: string,
}>()

QApi.lighthouse.vendor(props.vid)

// 获取列表

const fetchWait = ref(1)

const regionList = reactive<Record<string, Lighthouse.RegionInfo>>({})

const instanceList = reactive<Lighthouse.Instance[]>([])
const instanceCount = ref(0)

async function getRegionList() {
    const res = await QApi.lighthouse.describeRegions()
    fetchWait.value = res.TotalCount
    res.RegionSet.forEach((item) => {
        regionList[item.Region] = item
        getInstanceList(item.Region)
    })
}

async function getInstanceList(region: string) {
    const res = await QApi.lighthouse.describeInstances(region)
    if (res.TotalCount > 0) {
        instanceCount.value += res.TotalCount
        instanceList.push(...res.InstanceSet)
    }
    fetchWait.value--
}

function parseRegion(s: string) {
    const [r, z] = s.replace(/-(\d+)$/, ':$1').split(':')
    return regionList[r].RegionName + (r ? " " + z + "区" : "")
}

// 绑定主机

function addMachine(item: Lighthouse.Instance) {
    Api.machine.create({
        VendorId: +props.vid,
        HostName: item.InstanceName,
        IpAddress: item.PublicAddresses[0],
        Region: parseRegion(item.Zone),
        Model: "qcloud/lighthouse",
        CloudId: item.InstanceId,
        CloudMeta: JSON.stringify(item),
        Description: "",
        Status: "",
    })
}

// 加载数据

getRegionList()
</script>

<template>
    <el-card shadow="hover" class="mgb10">
        <template #header>
            <div class="flex-between">
                <b>实例列表</b>
                <div class="flex-auto" />
                <small>实例总数: {{ instanceCount }}</small>
            </div>
        </template>
        <el-table v-loading="fetchWait && instanceList.length == 0" :data="instanceList" table-layout="fixed">
            <el-table-column fixed prop="InstanceName" label="名称" min-width="150" />
            <el-table-column label="地域" min-width="120">
                <template #default="scope">
                    {{ parseRegion(scope.row.Zone) }}
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
                    <el-button link type="primary" icon="View" @click="addMachine(scope.row)">
                        导入
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
