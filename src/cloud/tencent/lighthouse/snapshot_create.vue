<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { TcApi } from '@/api';
import * as TC from '@/api/tencent/typings';

@Component({
    emits: ['submit'],
    expose: ['open'],
})
export default class LighthouseSnapshotCreate extends Vue {
    public instance!: TC.Lighthouse.Instance;

    public get region() {
        return this.instance.Zone.replace(/-\d$/, '');
    }

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel = {
        name: 'Snapshot-' + Date.now(),
    };

    public formRules: FormRules<{ name: string }> = {
        name: [{ required: true }],
    };

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        await TcApi.lighthouse.createInstanceSnapshot(this.region, {
            InstanceId: this.instance.InstanceId,
            SnapshotName: this.formModel.name
        });
        this.close();
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open(instance: TC.Lighthouse.Instance) {
        this.instance = instance;
        this.visible = true;
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="创建快照" :footer="false" width="50%">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="60px" @submit="formSubmit">
            <t-form-item name="name" label="名称">
                <t-input v-model="formModel.name" />
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