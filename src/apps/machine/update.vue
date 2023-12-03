<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { MachineOrig, MachineItem } from '@/api/native/machine';

@Component({
    emits: ['submit'],
    expose: ['open'],
})
export default class MachineUpdate extends Vue {
    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel!: MachineOrig;

    public formRules: FormRules<MachineOrig> = {
        Region: [
            { required: true },
        ],
        Description: [
            { required: true },
        ],
    };

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        await NaApi.machine.update(this.formModel);
        this.close();
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open(data: MachineItem) {
        this.visible = true;
        this.formModel = { ...data };
        if (this.formModel.WorkerMeta) {
            delete this.formModel.WorkerMeta;
        }
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="修改信息" :footer="false" width="50%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="Region" label="地域">
                <t-input v-model="formModel.Region" />
            </t-form-item>
            <t-form-item name="Description" label="备注">
                <t-input v-model="formModel.Description" />
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