<script lang="ts">
import { Ref, Prop, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { CrontabTypeList, CrontabOrig } from '@/api/native/crontab';
import { MachineItem } from '@/api/native/machine';
import { ScriptItem } from '@/api/native/script';

@Component({
    emits: ['submit'],
    expose: ['open'],
})
export default class CrontabCreate extends Vue {
    public CrontabTypeList = CrontabTypeList;

    @Prop
    public scriptList: Record<string, ScriptItem> = {};

    @Prop
    public machineList: Record<string, MachineItem> = {};

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel: CrontabOrig = {
        Name: '',
        Type: 'script',
        Target: '',
        Content: '',
        EntryId: 0,
        Second: '',
        Minute: '',
        Hour: '',
        DayofMonth: '',
        Month: '',
        DayofWeek: '',
        Location: '',
    };

    public formRules: FormRules<CrontabOrig> = {
        Name: [{ required: true }],
        Type: [{ required: true }],
        Target: [{ required: true }],
        Content: [{ required: true }],
        Second: [{ required: true }],
        Minute: [{ required: true }],
        Hour: [{ required: true }],
        DayofMonth: [{ required: true }],
        Month: [{ required: true }],
        DayofWeek: [{ required: true }],
        Location: [{ required: true }],
    };

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        await NaApi.crontab.create(this.formModel);
        this.close();
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open() {
        this.visible = true;
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="添加任务" :footer="false" width="50%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="Type" label="类型">
                <t-select v-model="formModel.Type">
                    <t-option v-for="v, k in CrontabTypeList" :key="k" :value="k" :label="v" />
                </t-select>
            </t-form-item>
            <t-form-item name="Name" label="名称">
                <t-input v-model="formModel.Name" />
            </t-form-item>
            <t-form-item name="Target" label="目标">
                <t-select v-model="formModel.Target">
                    <t-option v-for="v, k in machineList" :key="k" :value="k" :label="v.HostName" />
                </t-select>
            </t-form-item>
            <t-form-item name="Second" label="排程">
                <t-input-group class="schedule">
                    <t-input v-model="formModel.Second" placeholder="秒" align="center" />
                    <t-input v-model="formModel.Minute" placeholder="分" align="center" />
                    <t-input v-model="formModel.Hour" placeholder="时" align="center" />
                    <t-input v-model="formModel.DayofMonth" placeholder="日" align="center" />
                    <t-input v-model="formModel.Month" placeholder="月" align="center" />
                    <t-input v-model="formModel.DayofWeek" placeholder="周" align="center" />
                </t-input-group>
            </t-form-item>
            <t-form-item v-if="formModel.Type == 'script'" name="Content" label="脚本">
                <t-select v-model="formModel.Content">
                    <t-option v-for="v, k in scriptList" :key="k" :value="k" :label="v.Name" />
                </t-select>
            </t-form-item>
            <t-form-item v-else name="Content" label="内容">
                <t-textarea v-model="formModel.Content" placeholder="任务内容" :autosize="{ minRows: 3, maxRows: 5 }" />
            </t-form-item>
            <t-form-item>
                <t-space size="small">
                    <t-button theme="primary" type="submit">
                        提交
                    </t-button>
                    <t-button theme="default" type="reset" @click="visible = false">
                        取消
                    </t-button>
                </t-space>
            </t-form-item>
        </t-form>
    </t-dialog>
</template>

<style lang="scss" scoped>
.schedule {
    width: 100%;

    &>* {
        width: 16.666%;
    }
}
</style>