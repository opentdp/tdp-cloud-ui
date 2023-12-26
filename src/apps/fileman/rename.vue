<script lang="ts">
import { Ref, Prop, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { FileInfo } from '@/api/native/typings';

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class FilemanRename extends Vue {
    @Prop
    public workerId = '';

    @Prop
    public path = '/';

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel = {
        OriginName: '',
        Name: '',
    };

    public formRules: FormRules<FileInfo> = {
        Name: [{ required: true }],
    };

    public formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        this.loading = true;
        const path = this.path + '/' + this.formModel.OriginName;
        const file = {
            Name: this.path + '/' + this.formModel.Name,
        };
        const req = { Action: 'mv', Path: path, File: file };
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

    public open(file: FileInfo) {
        this.formModel = {
            OriginName: file.Name, Name: file.Name
        };
        this.visible = true;
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="文件改名" :footer="false" width="50%">
        <t-form ref="formRef" label-width="60px" @submit="formSubmit">
            <t-form-item name="Name" label="文件名">
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
