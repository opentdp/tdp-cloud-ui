<script lang="ts" setup>
import { ref, reactive, defineExpose } from "vue"

import { QApi } from "@/api"
import { Dnspod } from "@/api/qcloud/typings"

// 初始化

const dailog = ref(false)
const loading = ref(false)

const emits = defineEmits(['submit'])

let domainName = ref("")
let recordType = ref<string[]>([])
let recordLineList = ref<Dnspod.LineInfo[]>([])

// 创建表单

const modelData: Dnspod.RecordListItem = {
    Name: "",
    Type: "",
    Line: "",
    Value: "",
    MX: 0,
    TTL: 600,
    Weight: 0,
    Status: "",
    Remark: "",
    LineId: "0",
    RecordId: 0,
    UpdatedOn: "",
    MonitorStatus: "",
}

const formModel = reactive({} as Dnspod.RecordListItem)

const formRules = reactive({
    Name: [{ required: true, message: "请输入别名" }],
    Type: [{ required: true, message: "请输入别名" }],
    Line: [{ required: true, message: "请输入别名" }],
    Value: [{ required: true, message: "请输入别名" }],
    MX: [{ required: true, message: "请输入别名" }],
    TTL: [{ required: true, message: "请输入别名" }],
    Weight: [{ required: true, message: "请输入别名" }],
    Status: [{ required: true, message: "请输入别名" }],
    Remark: [{ required: true, message: "请输入别名" }],
})

// 提交表单

async function formSubmit() {
    loading.value = true
    const query: Dnspod.CreateRecordRequest = {
        Domain: domainName.value,
        SubDomain: formModel.Name,
        RecordType: formModel.Type,
        RecordLine: formModel.Line,
        Value: formModel.Value,
        MX: +formModel.MX || 0,
        TTL: +formModel.TTL || 600,
        Weight: +formModel.Weight || 0
    }
    await QApi.dnspod.createRecord(query)
    loading.value = false
    dailog.value = false
    emits("submit")
}

// 导出属性

defineExpose({
    open: (name: string, rType: string[], rLineList: Dnspod.LineInfo[]) => {
        dailog.value = true
        loading.value = false
        domainName.value = name
        recordType.value = rType
        recordLineList.value = rLineList
        Object.assign(formModel, modelData)
    }
})
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="添加记录" width="400px">
        <el-form :model="formModel" :rules="formRules" label-width="88px">
            <el-form-item prop="Name" label="主机记录">
                <el-input v-model="formModel.Name" />
            </el-form-item>
            <el-form-item prop="Type" label="记录类型">
                <el-select v-model="formModel.Type">
                    <el-option v-for="v in recordType" :key="v" :label="v" :value="v" />
                </el-select>
            </el-form-item>
            <el-form-item prop="Line" label="线路类型">
                <el-select v-model="formModel.Line">
                    <el-option v-for="v in recordLineList" :key="v.LineId" :label="v.Name" :value="v.Name" />
                </el-select>
            </el-form-item>
            <el-form-item prop="Value" label="记录值">
                <el-input v-model="formModel.Value" />
            </el-form-item>
            <el-form-item prop="Weight" label="权重">
                <el-input v-model="formModel.Weight" />
            </el-form-item>
            <el-form-item prop="MX" label="MX">
                <el-input v-model="formModel.MX" />
            </el-form-item>
            <el-form-item prop="TTL" label="TTL">
                <el-input v-model="formModel.TTL" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dailog = false">取消</el-button>
                <el-button type="primary" :loading="loading" @click="formSubmit">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>