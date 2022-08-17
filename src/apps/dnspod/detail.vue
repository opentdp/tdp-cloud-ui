<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRoute } from "vue-router"

import { Api, QApi, Dnspod } from "@/api"

const route = useRoute()

const domain = route.params.domain as string

// 域名概要

const describe = ref<Dnspod.DescribeDomainResponse>({} as any)

async function getDomain() {
    const data = await QApi.dnspod.describeDomain({
        Domain: domain
    })
    describe.value = data
}

// 记录类型列表

const recordType = ref<string[]>([])

async function getRecordType() {
    const data = await QApi.dnspod.describeRecordType({
        DomainGrade: describe.value.DomainInfo.Grade
    })
    recordType.value = data.TypeList
}

const recordLine = ref<Dnspod.DescribeRecordLineListResponse>()

async function getRecordLine() {
    const data = await QApi.dnspod.describeRecordLineList({
        DomainGrade: describe.value.DomainInfo.Grade,
        Domain: domain
    })
    recordLine.value = data
}

// 域名记录

const record = ref<Dnspod.DescribeRecordListResponse>()

async function getRecordList() {
    const data = await QApi.dnspod.describeRecordList({
        Domain: domain
    })
    record.value = data
}

async function refreshRecordList() {
    Api.cache.clear()
    await getRecordList()
}

// 添加记录

const recordDefault: Dnspod.RecordListItem = {
    Name: "",
    Type: "",
    Line: "",
    Value: "",
    MX: 0,
    TTL: 0,
    Weight: 0,
    Status: "",
    Remark: "",
    LineId: "0",
    RecordId: 0,
    UpdatedOn: "",
    MonitorStatus: "",
}

const createRecordBus = reactive({
    dailog: false,
    loading: false,
    model: Object.assign({}, recordDefault),
    rules: {
        Name: [{ required: true, message: "请输入别名" }],
        Type: [{ required: true, message: "请输入别名" }],
        Line: [{ required: true, message: "请输入别名" }],
        Value: [{ required: true, message: "请输入别名" }],
        MX: [{ required: true, message: "请输入别名" }],
        TTL: [{ required: true, message: "请输入别名" }],
        Weight: [{ required: true, message: "请输入别名" }],
        Status: [{ required: true, message: "请输入别名" }],
        Remark: [{ required: true, message: "请输入别名" }],
    }
})

async function createRecordDailog() {
    Object.assign(createRecordBus.model, recordDefault)
    createRecordBus.dailog = true
}

async function createRecord() {
    createRecordBus.loading = true
    const item = createRecordBus.model
    const query: Dnspod.CreateRecordRequest = {
        Domain: domain,
        SubDomain: item.Name,
        RecordType: item.Type,
        RecordLine: item.Line,
        Value: item.Value,
        MX: item.MX || 0,
        TTL: item.TTL || 0,
        Weight: item.Weight || 0
    }
    await QApi.dnspod.createRecord(query)
    await refreshRecordList()
    createRecordBus.dailog = false
    createRecordBus.loading = false
}

// 编辑记录

const modifyRecordBus = reactive({
    dailog: false,
    loading: false,
    model: Object.assign({}, recordDefault),
    rules: {
        Name: [{ required: true, message: "请输入别名" }],
        Type: [{ required: true, message: "请输入别名" }],
        Line: [{ required: true, message: "请输入别名" }],
        Value: [{ required: true, message: "请输入别名" }],
        MX: [{ required: true, message: "请输入别名" }],
        TTL: [{ required: true, message: "请输入别名" }],
        Weight: [{ required: true, message: "请输入别名" }],
        Status: [{ required: true, message: "请输入别名" }],
        Remark: [{ required: true, message: "请输入别名" }],
    }
})

async function modifyRecordDailog(item: Dnspod.RecordListItem) {
    Object.assign(modifyRecordBus.model, item)
    modifyRecordBus.dailog = true
}

async function modifyRecord() {
    modifyRecordBus.loading = true
    const item = modifyRecordBus.model
    const query: Dnspod.ModifyRecordRequest = {
        Domain: domain,
        SubDomain: item.Name,
        RecordType: item.Type,
        RecordLine: item.Line,
        Value: item.Value,
        MX: item.MX || 0,
        TTL: item.TTL || 0,
        Weight: item.Weight || 0,
        RecordId: item.RecordId || 0
    }
    await QApi.dnspod.modifyRecord(query)
    await refreshRecordList()
    modifyRecordBus.dailog = false
    modifyRecordBus.loading = false
}

// 删除记录

async function deleteRecord(recordId: number) {
    const query: Dnspod.DeleteRecordRequest = {
        Domain: domain,
        RecordId: recordId
    }
    await QApi.dnspod.deleteRecord(query)
    await refreshRecordList()
}

(async () => {
    getRecordList()
    // 获取一些参数
    await getDomain()
    getRecordType(), getRecordLine()
})()
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item to="/dnspod/index">
                域名管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{ domain || "详情" }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-if="record" shadow="hover" class="mgb10">
            <template #header>
                <div class="flex-between">
                    <b>解析列表</b> &nbsp; &nbsp;
                    <small>记录总数: {{ record.RecordCountInfo.TotalCount }}</small>
                    <div style="flex:auto" />
                    <el-button type="primary" plain size="small" @click="createRecordDailog">
                        添加记录
                    </el-button>
                </div>
            </template>
            <el-table :data="record.RecordList" table-layout="fixed">
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
                        <el-button link type="primary" icon="Edit" @click="modifyRecordDailog(scope.row)">
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
        </el-card>

        <el-dialog v-model="createRecordBus.dailog" title="添加记录" width="400px">
            <el-form :model="createRecordBus.model" :rules="createRecordBus.rules" label-width="88px">
                <el-form-item prop="Name" label="主机记录">
                    <el-input v-model="createRecordBus.model.Name" />
                </el-form-item>
                <el-form-item prop="Type" label="记录类型">
                    <el-select v-model="createRecordBus.model.Type">
                        <el-option v-for="v in recordType" :key="v" :label="v" :value="v" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="Line" label="线路类型">
                    <el-select v-model="createRecordBus.model.Line">
                        <el-option v-for="v in recordLine?.LineList" :key="v.LineId" :label="v.Name" :value="v.Name" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="Value" label="记录值">
                    <el-input v-model="createRecordBus.model.Value" />
                </el-form-item>
                <el-form-item prop="Weight" label="权重">
                    <el-input v-model="createRecordBus.model.Weight" />
                </el-form-item>
                <el-form-item prop="MX" label="MX">
                    <el-input v-model="createRecordBus.model.MX" />
                </el-form-item>
                <el-form-item prop="TTL" label="TTL">
                    <el-input v-model="createRecordBus.model.TTL" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="createRecordBus.dailog = false">取消</el-button>
                    <el-button type="primary" :loading="createRecordBus.loading" @click="createRecord">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="modifyRecordBus.dailog" title="更新记录" width="400px">
            <el-form :model="modifyRecordBus.model" :rules="modifyRecordBus.rules" label-width="88px">
                <el-form-item prop="Name" label="主机记录">
                    <el-input v-model="modifyRecordBus.model.Name" />
                </el-form-item>
                <el-form-item prop="Type" label="记录类型">
                    <el-select v-model="modifyRecordBus.model.Type">
                        <el-option v-for="v in recordType" :key="v" :label="v" :value="v" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="Line" label="线路类型">
                    <el-select v-model="modifyRecordBus.model.Line">
                        <el-option v-for="v in recordLine?.LineList" :key="v.LineId" :label="v.Name" :value="v.Name" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="Value" label="记录值">
                    <el-input v-model="modifyRecordBus.model.Value" />
                </el-form-item>
                <el-form-item prop="Weight" label="权重">
                    <el-input v-model="modifyRecordBus.model.Weight" />
                </el-form-item>
                <el-form-item prop="MX" label="MX">
                    <el-input v-model="modifyRecordBus.model.MX" />
                </el-form-item>
                <el-form-item prop="TTL" label="TTL">
                    <el-input v-model="modifyRecordBus.model.TTL" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="modifyRecordBus.dailog = false">取消</el-button>
                    <el-button type="primary" :loading="modifyRecordBus.loading" @click="modifyRecord">
                        保存
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
