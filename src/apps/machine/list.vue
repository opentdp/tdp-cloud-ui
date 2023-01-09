<script lang="ts" setup>
import { ref, reactive } from "vue"

import { Api } from "@/api"
import { MachineItem } from "@/api/local/machine"

import { dateFormat } from "@/helper/utils"

// 主机列表

const fetchWait = ref(1)
const machineList = reactive<MachineItem[]>([])

async function getMachineList() {
    const res = await Api.machine.list()
    machineList.push(...res)
    fetchWait.value = 0
}

// 加载数据

getMachineList()
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                主机管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>实例列表</b>
                    <div class="flex-auto" />
                    <small>实例总数: {{ machineList.length }}</small>
                </div>
            </template>
            <el-table v-loading="fetchWait" :data="machineList" table-layout="fixed">
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
            <div v-if="fetchWait && machineList.length > 0" v-loading="true" class="loading" />
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
div.loading {
    height: 48px;
    margin-top: 24px;
}
</style>
