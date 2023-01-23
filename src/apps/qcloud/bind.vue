<script lang="ts" setup>
import { reactive } from "vue"
import { useRoute } from "vue-router"

import DnspodBind from './dnspod/bind.vue'
import LighthouseBind from './lighthouse/bind.vue'

// 初始化

const route = useRoute()

const vid = +route.params.vid

// 管理标签页

const curTab = reactive({
    id: "lighthouse", label: ""
})
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
        <el-tabs v-model="curTab.id" type="border-card">
            <el-tab-pane label="轻量服务器" name="lighthouse">
                <LighthouseBind :vid="vid" />
            </el-tab-pane>
            <el-tab-pane label="域名解析" name="dnspod">
                <DnspodBind :vid="vid" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
c