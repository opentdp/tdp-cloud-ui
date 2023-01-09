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
                <el-table-column fixed prop="HostName" label="名称" min-width="150" />
                <el-table-column fixed="right" label="操作" width="90" align="center">
                    <template #default="scope">
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
