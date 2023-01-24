<script lang="ts" setup>
import { ref, reactive } from "vue"

import { Api, QApi } from "@/api"
import { Qcloud } from "@/api/qcloud/typings"
import { DomainStatusMap } from "@/api/qcloud/dnspod"

// 初始化

const loading = ref(true)

const props = defineProps<{
    vid: number,
}>()

QApi.dnspod.vendor(props.vid)

// 获取列表

const domainList = reactive<Qcloud.Dnspod.DomainListItem[]>([])
const domainTotalCount = ref(0)

async function getDomainList() {
    const res = await QApi.dnspod.describeDomainList()
    domainTotalCount.value = res.DomainCountInfo.AllTotal
    domainList.push(...res.DomainList)
    loading.value = false
}

// 绑定域名

function addDomian(item: Qcloud.Dnspod.DomainListItem) {
    Api.domain.create({
        VendorId: props.vid,
        Name: item.Name,
        NSList: item.EffectiveDNS.join(","),
        Model: "qcloud/dnspod",
        CloudId: item.DomainId + '',
        CloudMeta: JSON.stringify(item),
        Description: "",
        Status: "{}",
    })
}

// 加载数据

getDomainList()
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>域名列表</b>
                <small>域名总数: {{ domainTotalCount }}</small>
            </div>
        </template>
        <el-table v-loading="loading" :data="domainList" table-layout="fixed">
            <el-table-column fixed prop="Name" label="域名" min-width="150" />
            <el-table-column label="状态" min-width="80">
                <template #default="scope">
                    {{ DomainStatusMap[scope.row.Status] }}
                </template>
            </el-table-column>
            <el-table-column prop="RecordCount" label="记录数" min-width="80" />
            <el-table-column prop="EffectiveDNS" label="NS 服务器" min-width="250" />
            <el-table-column label="NS 记录" min-width="80">
                <template #default="scope">
                    {{ scope.row.DNSStatus ? "错误" : "正常" }}
                </template>
            </el-table-column>
            <el-table-column prop="GradeTitle" label="套餐" min-width="80" />
            <el-table-column prop="VipEndAt" label="套餐有效期" min-width="180" />
            <el-table-column fixed="right" label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button link type="primary" icon="View" @click="addDomian(scope.row)">
                        导入
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
