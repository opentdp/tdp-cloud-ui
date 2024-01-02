<script lang="ts">
import { Ref, Prop, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { FileInfo } from '@/api/native/typings';

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class FilemanMkdir extends Vue {
    @Prop
    public workerId = '';

    @Prop
    public path = '/';

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel = { Name: '' };

    public formRules: FormRules<FileInfo> = {
        Name: [{ required: true }],
    };

    // 提交表单

    public formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        this.loading = true;
        const path = this.path + '/' + this.formModel.Name;
        const req = { Action: 'mkdir', Path: path };
        NaApi.workhub.filer(this.workerId, req).finally(() => {
            this.loading = false;
            this.close();
        });
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open() {
        this.formModel = { Name: '' };
        this.visible = true;
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="新建目录" :footer="false" width="50%">
        <t-form ref="formRef" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="Name" label="目录名">
                <t-input v-model="formModel.Name" />
            </t-form-item>
            <t-form-item>
                <t-space size="small">
                    <t-button :loading="loading" theme="primary" type="submit">
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
