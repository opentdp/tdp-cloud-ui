<template>
    <div class="vnc-wrap">
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item to="/lighthouse/index">
                轻量服务器
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="'/lighthouse/detail/' + zone + '/' + instanceId">
                {{ instanceId }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                VNC 终端
            </el-breadcrumb-item>
        </el-breadcrumb>
        <iframe ref="frame" frameborder="no" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import Api from "@/api"

const route = useRoute()
const frame = ref<HTMLIFrameElement>()

const zone = route.params.zone as string
const region = zone.replace(/-\d$/, "")
const instanceId = route.params.instanceId as string

onMounted(async () => {
    const data = await Api.lighthouse.describeInstanceVncUrl(region, {
        InstanceId: instanceId,
    })
    const vnc = 'https://img.qcloud.com/qcloud/app/active_vnc/index.html?InstanceVncUrl='
    if (frame.value) {
        frame.value.src = vnc + data.InstanceVncUrl
    }
})
</script>

<style lang="scss" scoped>
.vnc-wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

iframe {
    width: 100%;
    flex: auto;
}
</style>
