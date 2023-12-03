<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { VendorOrig, VendorItem } from '@/api/native/vendor';

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class VendorTencentCUpdate extends Vue {
    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel!: VendorOrig;

    public formRules: FormRules<VendorOrig> = {
        SecretId: [{ required: true }],
        Description: [{ required: true }],
    };

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        await NaApi.vendor.update(this.formModel);
        this.formRef.reset();
        this.close();
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open(data: VendorItem) {
        this.visible = true;
        this.formModel = data;
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="修改账号" :footer="false" width="50%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" @submit="formSubmit">
            <t-form-item name="Description" label="别名">
                <t-input v-model="formModel.Description" />
            </t-form-item>
            <t-form-item name="SecretId" label="密钥 ID">
                <t-input v-model="formModel.SecretId" />
            </t-form-item>
            <t-form-item name="SecretKey" label="密钥 KEY">
                <t-input v-model="formModel.SecretKey" />
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