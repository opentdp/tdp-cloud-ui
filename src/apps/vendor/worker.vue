<script lang="ts" setup>

import { Api } from "@/api"

import WorkerBind from "../worker/bind.vue"

// 初始化

const workerUrl = Api.socket.getWorkerURL()

</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                子节点
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-alert title="节点接入命令" type="warning">
            <template #default>
                <p>export TDP_EXEC_ARGS="--remote {{ workerUrl }}"</p>
                <p>wget -qO- http://tdp.icu/worker-linux | sh -</p>
            </template>
        </el-alert>
        <div class="mgb10" />

        <WorkerBind />
    </div>
</template>
