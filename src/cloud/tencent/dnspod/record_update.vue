<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { TcApi } from '@/api';
import * as TC from '@/api/tencent/typings';

@Component({
    emits: ['submit'],
    expose: ['open'],
})
export default class DnspodRecordUpdate extends Vue {
    public domainInfo!: Required<TC.Dnspod.DomainInfo>;

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel!: TC.Dnspod.RecordListItem;

    public formRules: FormRules<TC.Dnspod.RecordListItem> = {
        Name: [{ required: true }],
        Type: [{ required: true }],
        Line: [{ required: true }],
        Value: [{ required: true }],
        MX: [{ required: true }],
        TTL: [{ required: true }],
        Weight: [{ required: true }],
        Status: [{ required: true }],
    };

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        const query: TC.Dnspod.ModifyRecordRequest = {
            RecordId: this.formModel.RecordId || 0,
            Domain: this.domainInfo.Domain,
            SubDomain: this.formModel.Name,
            RecordType: this.formModel.Type,
            RecordLine: this.formModel.Line,
            Value: this.formModel.Value,
            MX: +this.formModel.MX || 0,
            TTL: +this.formModel.TTL || 600,
            Weight: +this.formModel.Weight || 0,
            Status: this.formModel.Status || 'ENABLE',
        };
        await TcApi.dnspod.modifyRecord(query);
        this.close();
    }

    // 记录类型及线路

    public recordType: string[] = [];
    public recordLineList: TC.Dnspod.LineInfo[] = [];

    async getRecordType() {
        const res = await TcApi.dnspod.describeRecordType({
            DomainGrade: this.domainInfo.Grade
        });
        this.recordType = res.TypeList || [];
    }

    async getRecordLine() {
        const res = await TcApi.dnspod.describeRecordLineList({
            DomainGrade: this.domainInfo.Grade,
            Domain: this.domainInfo.Domain
        });
        this.recordLineList = res.LineList || [];
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open(info: Required<TC.Dnspod.DomainInfo>, record: TC.Dnspod.RecordListItem) {
        this.visible = true;
        this.domainInfo = info;
        this.formModel = record;
        this.formModel.Weight = record.Weight || 0;
        // 加载数据
        this.recordType.length == 0 && this.getRecordType();
        this.recordLineList.length == 0 && this.getRecordLine();
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="更新记录" :footer="false" width="50%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="80px" @submit="formSubmit">
            <t-form-item name="Name" label="主机记录">
                <t-input v-model="formModel.Name" />
            </t-form-item>
            <t-form-item name="Type" label="记录类型">
                <t-select v-model="formModel.Type">
                    <t-option v-for="v in recordType" :key="v" :value="v" :label="v" />
                </t-select>
            </t-form-item>
            <t-form-item name="Line" label="线路类型">
                <t-select v-model="formModel.Line">
                    <t-option v-for="v in recordLineList" :key="v.LineId" :value="v.Name" :label="v.Name" />
                </t-select>
            </t-form-item>
            <t-form-item name="Value" label="记录值">
                <t-textarea v-model="formModel.Value" autosize />
            </t-form-item>
            <t-form-item name="Weight" label="权重">
                <t-input-number v-model="formModel.Weight" />
            </t-form-item>
            <t-form-item v-if="formModel.Type == 'MX'" name="MX" label="MX">
                <t-input-number v-model="formModel.MX" />
            </t-form-item>
            <t-form-item name="TTL" label="TTL">
                <t-input-number v-model="formModel.TTL" />
            </t-form-item>
            <t-form-item name="Status" label="状态">
                <t-radio-group v-model="formModel.Status">
                    <t-radio value="ENABLE" label="启用" />
                    <t-radio value="DISABLE" label="禁用" />
                </t-radio-group>
            </t-form-item>
            <t-form-item>
                <t-space size="small">
                    <t-button theme="primary" type="submit">
                        提交
                    </t-button>
                    <t-button theme="default" @click="visible = false">
                        取消
                    </t-button>
                </t-space>
            </t-form-item>
        </t-form>
    </t-dialog>
</template>