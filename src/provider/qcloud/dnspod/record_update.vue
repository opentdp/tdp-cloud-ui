<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { QApi } from "@/api"
import * as Qcloud from "@/api/qcloud/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class DnspodRecordUpdate extends Vue {
    public loading = false
    public dailog = false

    public domainInfo!: Qcloud.Dnspod.DomainInfo

    // 创建表单

    public formModel!: Qcloud.Dnspod.RecordListItem

    public formRules = {
        Name: [{ required: true, message: "别名 不能为空" }],
        Type: [{ required: true, message: "别名 不能为空" }],
        Line: [{ required: true, message: "别名 不能为空" }],
        Value: [{ required: true, message: "别名 不能为空" }],
        MX: [{ required: true, message: "别名 不能为空" }],
        TTL: [{ required: true, message: "别名 不能为空" }],
        Weight: [{ required: true, message: "别名 不能为空" }],
        Status: [{ required: true, message: "别名 不能为空" }],
        Remark: [{ required: true, message: "别名 不能为空" }],
    }

    // 提交表单

    async formSubmit() {
        this.loading = false
        const query: Qcloud.Dnspod.ModifyRecordRequest = {
            Domain: this.domainInfo.Domain,
            SubDomain: this.formModel.Name,
            RecordType: this.formModel.Type,
            RecordLine: this.formModel.Line,
            Value: this.formModel.Value,
            MX: +this.formModel.MX || 0,
            TTL: +this.formModel.TTL || 600,
            Weight: +this.formModel.Weight || 0,
            RecordId: this.formModel.RecordId || 0
        }
        await QApi.dnspod.modifyRecord(query)
        this.loading = false
        this.dailog = false
        this.$emit("submit")
    }

    // 记录类型及线路

    public recordType = [] as string[]
    public recordLineList = [] as Qcloud.Dnspod.LineInfo[]

    async getRecordType() {
        const res = await QApi.dnspod.describeRecordType({
            DomainGrade: this.domainInfo.Grade
        })
        this.recordType = res.TypeList || []
    }

    async getRecordLine() {
        const res = await QApi.dnspod.describeRecordLineList({
            DomainGrade: this.domainInfo.Grade,
            Domain: this.domainInfo.Domain
        })
        this.recordLineList = res.LineList || []
    }

    // 导出属性

    public open(info: Qcloud.Dnspod.DomainInfo, record: Qcloud.Dnspod.RecordListItem) {
        this.dailog = true
        this.loading = false
        this.domainInfo = info
        this.formModel = record
        // 加载数据
        this.recordType.length === 0 && this.getRecordType()
        this.recordLineList.length === 0 && this.getRecordLine()
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="更新记录" width="400px">
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