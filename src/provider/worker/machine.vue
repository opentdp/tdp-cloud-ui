<script lang="ts" setup>
import { ref } from "vue"

import { Api } from "@/api"
import { WorkerItem } from "@/api/local/workhub"

// 节点列表

const workerList = ref<WorkerItem[]>([])

async function getWorkerList() {
    const res = await Api.workhub.list()
    workerList.value = res
}

// 加载数据

getWorkerList()
</script>

<template>
    <div>暂无详细信息</div>
</template>