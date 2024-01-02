<script lang="ts">
import { Ref, Prop, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { FileInfo } from '@/api/native/typings';

import * as gobyte from '@/helper/gobyte';

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class FilemanEditor extends Vue {
    @Prop
    public workerId = '';

    @Prop
    public path = '/';

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel: FileInfo = {
        Name: 'newfile.txt',
        Size: 0,
        Mode: 0,
        ModTime: 0,
        Data: '',
        Symlink: '',
        IsDir: false,
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
        const path = this.path + '/' + this.formModel.Name;
        const file: Partial<FileInfo> = {
            Data: gobyte.textToBase64(this.formModel.Data),
            ModTime: Math.floor(this.formModel.ModTime / 1000),
        };
        const req = { Action: 'write', Path: path, File: file };
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
        this.formModel = {
            Name: 'newfile.txt',
            Size: 0,
            Mode: 0,
            ModTime: Date.now(),
            Data: '',
            Symlink: '',
            IsDir: false,
        };
        this.visible = true;
    }
}
</script>

<template>
    <t-drawer v-model:visible="visible" :header="path + '/'" :close-btn="true" size="60%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" @submit="formSubmit">
            <t-form-item label="文件名">
                <t-input v-model="formModel.Name" />
            </t-form-item>
            <t-form-item label="文件内容">
                <t-textarea v-model="formModel.Data" :autosize="{ minRows: 10 }" />
            </t-form-item>
            <t-form-item label="修改时间">
                <t-date-picker v-model="formModel.ModTime" value-type="time-stamp" size="large" allow-input enable-time-picker />
            </t-form-item>
        </t-form>
        <template #footer>
            <t-button :loading="loading" theme="primary" @click="formRef.submit()">
                提交
            </t-button>
            <t-button theme="default" type="reset" @click="visible = false">
                取消
            </t-button>
        </template>
    </t-drawer>
</template>
