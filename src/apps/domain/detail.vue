<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"

import { Api } from "@/api"
import { DomainItem } from "@/api/local/domain"

import DnspodDetail from '../qcloud/dnspod/detail.vue'

// 初始化

const route = useRoute()

const domainId = +route.params.id

// 获取域名

const fetchWait = ref(1)

const domain = reactive({} as DomainItem)

async function getDomain(id: number) {
    const res = await Api.domain.detail(id)
    Object.assign(domain, res)
    fetchWait.value = 0
}

// 加载数据

getDomain(domainId)
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
        <div v-if="domain.Model == 'qcloud/dnspod'">
            <DnspodDetail :vid="domain.VendorId" :meta="domain.CloudMeta" />
        </div>
    </div>
</template>
