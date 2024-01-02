<script lang="ts">
import { Ref, Prop, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { FileInfo } from '@/api/native/typings';

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class FilemanModify extends Vue {
    @Prop
    public workerId = '';

    @Prop
    public path = '/';

    public chmod() {
        const req = {
            Action: 'chmod',
            Path: this.path + '/' + this.fileInfo.Name,
            File: {
                Mode: this.formModel.Mode,
            }
        };
        return NaApi.workhub.filer(this.workerId, req);
    }

    public chtime() {
        const req = {
            Action: 'chtime',
            Path: this.path + '/' + this.fileInfo.Name,
            File: {
                ModTime: Math.floor(this.formModel.ModTime / 1000)
            }
        };
        return NaApi.workhub.filer(this.workerId, req);
    }

    public rename() {
        const req = {
            Action: 'mv',
            Path: this.path + '/' + this.fileInfo.Name,
            File: {
                Name: this.path + '/' + this.formModel.Name,
            }
        };
        return NaApi.workhub.filer(this.workerId, req);
    }

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public fileInfo!: FileInfo;
    public formModel!: FileInfo;

    public formRules: FormRules<FileInfo> = {
        Name: [{ required: true }],
        Mode: [{ required: true }],
        ModTime: [{ required: true }],
    };

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        this.loading = true;
        try {
            // 修改权限
            if (this.fileInfo.Mode !== this.formModel.Mode) {
                await this.chmod();
            }
            // 修改时间
            if (this.fileInfo.ModTime * 1000 !== this.formModel.ModTime) {
                await this.chtime();
            }
            // 修改名称
            if (this.fileInfo.Name !== this.formModel.Name) {
                await this.rename();
            }
        } catch (error) {
            // 忽略错误
        }
        this.loading = false;
        this.close();
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open(file: FileInfo) {
        this.formModel = { ...file, ModTime: file.ModTime * 1000 };
        this.fileInfo = file;
        this.visible = true;
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="修改属性" :footer="false" width="50%">
        <t-form ref="formRef" :rules="formRules" label-width="90px" @submit="formSubmit">
            <t-form-item name="Name" label="名称">
                <t-input v-model="formModel.Name" />
            </t-form-item>
            <t-form-item name="Mode" label="权限">
                <t-input v-model="formModel.Mode" />
            </t-form-item>
            <t-form-item name="ModTime" label="修改时间">
                <t-date-picker v-model="formModel.ModTime" value-type="time-stamp" size="large" allow-input enable-time-picker />
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
