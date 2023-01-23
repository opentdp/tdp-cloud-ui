<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"

import { Api } from "@/api"
import { MachineItem } from "@/api/local/machine"

import LighthouseVNC from '@/provider/qcloud/lighthouse/vnc.vue'

// 初始化

const route = useRoute()

const machineId = +route.params.id

const loading = ref(true)

// 获取主机

const machine = reactive({} as MachineItem)

async function getMachine(id: number) {
    const res = await Api.machine.detail(id)
    Object.assign(machine, res)
    loading.value = false
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
                VNC 控制台
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="loading" class="loading" />
        <div v-if="machine.Model == 'qcloud/lighthouse'">
            <LighthouseVNC :meta="machine" />
        </div>
    </div>
</template>
