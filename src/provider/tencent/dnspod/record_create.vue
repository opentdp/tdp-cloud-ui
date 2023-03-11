<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext } from "tdesign-vue-next"

import Api, { TcApi } from "@/api"
import * as TC from "@/api/tencent/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class DnspodRecordCreate extends Vue {
    public domainInfo!: TC.Dnspod.DomainInfo

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel!: TC.Dnspod.RecordListItem

    public formRules: FormRules<TC.Dnspod.RecordListItem> = {
        Name: [{ required: true }],
        Type: [{ required: true }],
        Line: [{ required: true }],
        Value: [{ required: true }],
        MX: [{ required: true }],
        TTL: [{ required: true }],
        Weight: [{ required: true }],
        Status: [{ required: true }],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<FormData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        const query: TC.Dnspod.CreateRecordRequest = {
            Domain: this.domainInfo.Domain,
            SubDomain: this.formModel.Name,
            RecordType: this.formModel.Type,
            RecordLine: this.formModel.Line,
            Value: this.formModel.Value,
            MX: +this.formModel.MX || 0,
            TTL: +this.formModel.TTL || 600,
            Weight: +this.formModel.Weight || 0
        }
        await TcApi.dnspod.createRecord(query)
        this.close()
    }

    // 记录类型及线路

    public recordType: string[] = []
    public recordLineList: TC.Dnspod.LineInfo[] = []

    async getRecordType() {
        const res = await TcApi.dnspod.describeRecordType({
            DomainGrade: this.domainInfo.Grade
        })
        this.recordType = res.TypeList || []
    }

    async getRecordLine() {
        const res = await TcApi.dnspod.describeRecordLineList({
            DomainGrade: this.domainInfo.Grade,
            Domain: this.domainInfo.Domain
        })
        this.recordLineList = res.LineList || []
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open(info: TC.Dnspod.DomainInfo) {
        this.dailog = true
        this.domainInfo = info
        this.formModel = {
            Name: "",
            Type: "A",
            Line: "默认",
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
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="80px" @submit="formSubmit">
            <t-form-item name="Name" label="主机记录">
                <el-input v-model="formModel.Name" />
            </t-form-item>
            <t-form-item name="Type" label="记录类型">
                <el-select v-model="formModel.Type">
                    <el-option v-for="v in recordType" :key="v" :label="v" :value="v" />
                </el-select>
            </t-form-item>
            <t-form-item name="Line" label="线路类型">
                <el-select v-model="formModel.Line">
                    <el-option v-for="v in recordLineList" :key="v.LineId" :label="v.Name" :value="v.Name" />
                </el-select>
            </t-form-item>
            <t-form-item name="Value" label="记录值">
                <el-input v-model="formModel.Value" type="textarea" autosize />
            </t-form-item>
            <t-form-item name="Weight" label="权重">
                <el-input-number v-model="formModel.Weight" />
            </t-form-item>
            <t-form-item name="MX" label="MX">
                <el-input-number v-model="formModel.MX" />
            </t-form-item>
            <t-form-item name="TTL" label="TTL">
                <el-input-number v-model="formModel.TTL" />
            </t-form-item>
        </t-form>
        <template #footer>
            <span class="dialog-footer">
                <t-button @click="dailog = false">取消</t-button>
                <t-button theme="primary" type="submit">
                    保存
                </t-button>
            </span>
        </template>
    </el-dialog>
</template>