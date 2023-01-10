<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"

import { Api } from "@/api"
import { MachineItem } from "@/api/local/machine"

import LighthouseDetail from '../qcloud/lighthouse/detail.vue'

// 初始化

const route = useRoute()

const machineId = +route.params.id

// 获取域名

const fetchWait = ref(1)
const machine = reactive({} as MachineItem)

async function getMachine(id: number) {
    const res = await Api.machine.detail(id)
    Object.assign(machine, res)
    fetchWait.value = 0
}

// 加载数据

getMachine(machineId)
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                域名管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="fetchWait" class="loading" />
        <div v-if="machine.Model == 'qcloud/lighthouse'">
            <LighthouseDetail :vid="machine.VendorId" :meta="machine.CloudMeta" />
        </div>
    </div>
</template>
