<script lang="ts" setup>
import { useRoute } from "vue-router"

import DnspodBind from './dnspod/bind.vue'
import LighthouseBind from './lighthouse/bind.vue'

// 初始化

const route = useRoute()

const vid = +route.params.vid
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
        <LighthouseBind :vid="vid" />
        <div class="mgb10" />
        <DnspodBind :vid="vid" />
    </div>
</template>
