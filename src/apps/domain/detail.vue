<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"

import { Api } from "@/api"
import { DomainItem } from "@/api/local/domain"

import DnspodDomain from '../qcloud/dnspod/domain.vue'

// 初始化

const route = useRoute()

const domainId = +route.params.id

const loading = ref(true)

// 获取域名

const domain = reactive({} as DomainItem)

async function getDomain(id: number) {
    const res = await Api.domain.detail(id)
    Object.assign(domain, res)
    loading.value = false
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
                解析管理
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div v-loading="loading" class="loading" />
        <div v-if="domain.Model == 'qcloud/dnspod'">
            <DnspodDomain :meta="domain" />
        </div>
    </div>
</template>
