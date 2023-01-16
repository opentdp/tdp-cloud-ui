<script lang="ts" setup>
import { ref, reactive, defineProps } from "vue"

import { QApi } from "@/api"
import { Dnspod } from "@/api/qcloud/typings"

import RecordCreate from './record_create.vue'
import RecordUpdate from './record_update.vue'

// 初始化

const props = defineProps<{
    vid: number,
    meta: Dnspod.DomainListItem,
}>()

QApi.dnspod.vendor(props.vid)

const createModal = ref<InstanceType<typeof RecordCreate>>()
const updateModal = ref<InstanceType<typeof RecordUpdate>>()

// 域名概要

const domainInfo = reactive({
    Domain: props.meta.Name,
    Grade: props.meta.Grade,
} as Dnspod.DomainInfo)

async function getDomain() {
    const res = await QApi.dnspod.describeDomain({
        Domain: domainInfo.Domain
    })
    Object.assign(domainInfo, res.DomainInfo)
}

// 域名记录

const recordList = ref<Dnspod.RecordListItem[]>()
const recordCountInfo = ref<Dnspod.RecordCountInfo>()

async function getRecordList() {
    const res = await QApi.dnspod.describeRecordList({
        Domain: domainInfo.Domain
    })
    recordList.value = res.RecordList
    recordCountInfo.value = res.RecordCountInfo
}

// 删除记录

async function deleteRecord(recordId: number) {
    const query: Dnspod.DeleteRecordRequest = {
        Domain: domainInfo.Domain,
        RecordId: recordId
    }
    await QApi.dnspod.deleteRecord(query)
    getRecordList()
}

// 记录类型列表

const recordType = ref<string[]>([])
const recordLineList = ref<Dnspod.LineInfo[]>([])

async function getRecordType() {
    const res = await QApi.dnspod.describeRecordType({
        DomainGrade: domainInfo.Grade
    })
    recordType.value = res.TypeList
}

async function getRecordLine() {
    const res = await QApi.dnspod.describeRecordLineList({
        DomainGrade: domainInfo.Grade,
        Domain: domainInfo.Domain
    })
    recordLineList.value = res.LineList
}

// 加载数据
getDomain()
getRecordList()
getRecordType()
getRecordLine()
</script>

<template>
    <el-card shadow="hover" class="mgb10">
        <template #header>
            <div class="flex-between">
                <b>解析列表</b> &nbsp; &nbsp;
                <small>记录总数: {{ recordCountInfo?.TotalCount || 0 }}</small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small"
                    @click="createModal?.open(domainInfo.Domain, recordType, recordLineList)">
                    添加记录
                </el-button>
            </div>
        </template>
        <el-table v-loading="!recordList" :data="recordList" table-layout="fixed">
            <el-table-column fixed prop="Name" label="主机记录" min-width="100" />
            <el-table-column prop="Type" label="记录类型" min-width="100" />
            <el-table-column prop="Line" label="线路类型" min-width="100" />
            <el-table-column prop="Value" label="记录值" min-width="200" />
            <el-table-column label="MX" min-width="80">
                <template #default="scope">
                    {{ scope.row.MX > 0 ? scope.row.MX : "-" }}
                </template>
            </el-table-column>
            <el-table-column prop="TTL" label="TTL" min-width="80" />
            <el-table-column label="状态" min-width="80">
                <template #default="scope">
                    {{ scope.row.Status === "ENABLE" ? "启用" : "禁用" }}
                </template>
            </el-table-column>
            <el-table-column prop="Remark" label="备注" min-width="150" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button link type="primary" icon="Edit"
                        @click="updateModal?.open(scope.row, domainInfo.Domain, recordType, recordLineList)">
                        编辑
                    </el-button>
                    <el-popconfirm title="确定删除?" @confirm="deleteRecord(scope.row.RecordId)">
                        <template #reference>
                            <el-button link type="danger" icon="Delete">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <RecordCreate ref="createModal" @submit="getRecordList" />
        <RecordUpdate ref="updateModal" @submit="getRecordList" />
    </el-card>
</template>
