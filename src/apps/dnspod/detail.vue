<template>
    <div>
        <el-card v-if="record" shadow="hover" class="mgb10">
            <template #header>
                <div class="card-header">
                    <b>解析列表 - {{ domain }}</b> &nbsp;
                    <small>记录总数: {{ record.RecordCountInfo.TotalCount }}</small>
                </div>
            </template>
            <el-table :data="record.RecordList" table-layout="fixed">
                <el-table-column fixed prop="Name" label="名称" min-width="100" />
                <el-table-column prop="Type" label="类型" min-width="100" />
                <el-table-column prop="Line" label="线路" min-width="100" />
                <el-table-column prop="Value" label="记录值" min-width="200" />
                <el-table-column prop="TTL" label="TTL" min-width="100" />
                <el-table-column label="状态" min-width="100">
                    <template #default="scope">
                        {{ scope.row.Status == "ENABLE" ? "启用" : "禁用" }}
                    </template>
                </el-table-column>
                <el-table-column prop="Remark" label="备注" min-width="100" />
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

import Api, { Dnspod } from "@/api"

const route = useRoute()

const domain = route.params.domain as string

const record = ref<Dnspod.DescribeRecordListResponse>()

const describeRecordList = async () => {
    const data = await Api.dnspod.describeRecordList({
        Domain: domain
    })
    record.value = data
}

describeRecordList()
</script>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
