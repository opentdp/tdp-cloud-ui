<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { QcApi } from "@/api"
import * as Qcloud from "@/api/qcloud/typings"

@Component({
    emits: ["close"],
    expose: ["open"],
})
export default class DnspodRecordCreate extends Vue {
    public loading = false

    public domainInfo!: Qcloud.Dnspod.DomainInfo

    // 创建表单

    public formModel!: Qcloud.Dnspod.RecordListItem

    public formRules = {
        Name: [{ required: true, message: "主机记录 不能为空" }],
        Type: [{ required: true, message: "记录类型 不能为空" }],
        Line: [{ required: true, message: "线路类型 不能为空" }],
        Value: [{ required: true, message: "别名 不能为空" }],
        MX: [{ required: true, message: "记录值 不能为空" }],
        TTL: [{ required: true, message: "TTL 不能为空" }],
        Weight: [{ required: true, message: "权重 不能为空" }],
        Status: [{ required: true, message: "状态 不能为空" }],
        Remark: [{ required: true, message: "备注 不能为空" }],
    }

    // 提交表单

    async formSubmit() {
        this.loading = true
        const query: Qcloud.Dnspod.CreateRecordRequest = {
            Domain: this.domainInfo.Domain,
            SubDomain: this.formModel.Name,
            RecordType: this.formModel.Type,
            RecordLine: this.formModel.Line,
            Value: this.formModel.Value,
            MX: +this.formModel.MX || 0,
            TTL: +this.formModel.TTL || 600,
            Weight: +this.formModel.Weight || 0
        }
        await QcApi.dnspod.createRecord(query)
        this.loading = false
        this.close()
    }

    // 记录类型及线路

    public recordType: string[] = []
    public recordLineList: Qcloud.Dnspod.LineInfo[] = []

    async getRecordType() {
        const res = await QcApi.dnspod.describeRecordType({
            DomainGrade: this.domainInfo.Grade
        })
        this.recordType = res.TypeList || []
    }

    async getRecordLine() {
        const res = await QcApi.dnspod.describeRecordLineList({
            DomainGrade: this.domainInfo.Grade,
            Domain: this.domainInfo.Domain
        })
        this.recordLineList = res.LineList || []
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("close")
    }


    public open(info: Qcloud.Dnspod.DomainInfo) {
        this.dailog = true
        this.loading = false
        this.domainInfo = info
        this.formModel = {
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
        // 加载数据
        this.recordType.length == 0 && this.getRecordType()
        this.recordLineList.length == 0 && this.getRecordLine()
    }
}
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