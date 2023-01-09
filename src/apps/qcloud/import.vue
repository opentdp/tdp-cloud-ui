<script lang="ts" setup>
import { useRoute } from "vue-router"

import vDnspod from './dnspod/import.vue'
import vLighthouse from './lighthouse/import.vue'

// 初始化

const route = useRoute()

const vid = route.params.vid as string
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                腾讯云
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                导入资源
            </el-breadcrumb-item>
        </el-breadcrumb>
        <vLighthouse :vid="vid" />
        <div class="mgb10" />
        <vDnspod :vid="vid" />
    </div>
</template>
