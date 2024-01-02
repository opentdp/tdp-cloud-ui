<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { AcApi } from '@/api';
import { RecordLineMap, RecordTypeMap } from '@/api/alibaba/alidns';
import * as AC from '@/api/alibaba/typings';

@Component({
    emits: ['submit'],
    expose: ['open'],
})
export default class DnsRecordUpdate extends Vue {
    public domainInfo!: AC.Dns.DescribeDomainInfoResponseBody;

    public recordType = RecordTypeMap;
    public recordLineList = RecordLineMap;

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel!: AC.Dns.DescribeDomainRecordsResponseBodyDomainRecordsRecord;

    public formRules: FormRules<AC.Dns.UpdateDomainRecordRequest> = {
        RR: [{ required: true }],
        Type: [{ required: true }],
        Line: [{ required: true }],
        Value: [{ required: true }],
        TTL: [{ required: true }],
        Priority: [{ required: true }],
    };

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        const query = {
            RecordId: this.formModel.RecordId,
            RR: this.formModel.RR,
            Type: this.formModel.Type,
            Line: this.formModel.Line,
            Value: this.formModel.Value,
            TTL: +this.formModel.TTL || 600,
            Priority: +this.formModel.Priority || 1
        };
        await AcApi.alidns.updateDomainRecord(query);
        this.close();
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open(info: AC.Dns.DescribeDomainInfoResponseBody, record: AC.Dns.DescribeDomainRecordsResponseBodyDomainRecordsRecord) {
        this.visible = true;
        this.domainInfo = info;
        this.formModel = record;
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="更新记录" :footer="false" width="50%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="90px" @submit="formSubmit">
            <t-form-item name="RR" label="主机记录">
                <t-input v-model="formModel.RR" />
            </t-form-item>
            <t-form-item name="Type" label="记录类型">
                <t-select v-model="formModel.Type">
                    <t-option v-for="v, k in recordType" :key="k" :value="k" :label="v" />
                </t-select>
            </t-form-item>
            <t-form-item name="Line" label="线路类型">
                <t-select v-model="formModel.Line">
                    <t-option v-for="v, k in recordLineList" :key="k" :value="k" :label="v" />
                </t-select>
            </t-form-item>
            <t-form-item name="Value" label="记录值">
                <t-textarea v-model="formModel.Value" autosize />
            </t-form-item>
            <t-form-item v-if="formModel.Type == 'MX'" name="Priority" label="优先级">
                <t-input-number v-model="formModel.Priority" />
            </t-form-item>
            <t-form-item name="TTL" label="TTL">
                <t-input-number v-model="formModel.TTL" />
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