<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { MachineItem } from '@/api/native/machine';
import { ScriptItem } from '@/api/native/script';
import { TasklineItem } from '@/api/native/taskline';

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class ScriptExec extends Vue {
    public machines!: MachineItem[];

    public timer = 0;

    public unmounted() {
        clearInterval(this.timer);
    }

    // 机器列表

    public get hostnames() {
        if (this.machines) {
            return this.machines.map(item => item.HostName);
        }
        return [];
    }

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel!: ScriptItem;

    public formRules: FormRules<ScriptItem> = {
        Content: [{ required: true }],
    };

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        this.result = null;
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        // 批量提交任务
        this.loading = true;
        const taskIds: number[] = [];
        for (const machine of this.machines) {
            const res = await NaApi.workhub.exec(machine.WorkerId, this.formModel);
            taskIds.push(res.Id);
        }
        // 循环获取状态
        if (taskIds.length > 1) {
            this.message = '批量提交成功，请在任务列表查看执行结果';
            this.loading = false;
        } else {
            this.timer = setInterval(() => this.getOutput(taskIds[0]), 1500);
        }
    }

    // 获取结果

    public message = '';
    public result!: TasklineItem | null;

    async getOutput(id: number) {
        const res = await NaApi.taskline.detail(id);
        this.result = res.Item;
        if (res.Item.Status != 'Doing') {
            clearInterval(this.timer);
            this.loading = false;
        }
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open(machines: MachineItem[], script: ScriptItem) {
        this.result = null;
        this.visible = true;
        this.loading = false;
        this.machines = machines;
        this.formModel = { ...script };
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close :header="'执行脚本：' + formModel?.Name" :footer="false" width="50%">
        <t-space fixed direction="vertical">
            <div v-if="message">
                <t-alert theme="success" :message="message" close />
            </div>
            <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="90px" @submit="formSubmit">
                <t-form-item name="CommandType" label="类型">
                    {{ formModel.CommandType }}
                </t-form-item>
                <t-form-item name="Timeout" label="超时时间">
                    <t-input-number v-model="formModel.Timeout" placeholder="默认为 300s" :min="1" :max="86400" />
                </t-form-item>
                <t-form-item name="Username" label="执行用户">
                    <t-input v-model="formModel.Username" :placeholder="formModel.CommandType == 'SHELL' ? '默认为 root' : '默认为 System'" />
                </t-form-item>
                <t-form-item name="WorkDirectory" label="执行路径">
                    <t-input v-model="formModel.WorkDirectory" :placeholder="formModel.CommandType == 'SHELL' ? '默认为 /root' : '默认为 C:\\'" />
                </t-form-item>
                <t-form-item name="Hostnames" label="目标机器">
                    <t-tag-input v-model="hostnames" readonly />
                </t-form-item>
                <t-form-item name="Description" label="脚本描述">
                    <t-textarea v-model="formModel.Description" :autosize="{ minRows: 1, maxRows: 8 }" disabled />
                </t-form-item>
                <t-form-item name="Content" label="脚本内容">
                    <t-textarea v-model="formModel.Content" :autosize="{ minRows: 5, maxRows: 15 }" />
                </t-form-item>
                <t-form-item>
                    <t-space size="small">
                        <t-button theme="primary" type="submit" :loading="loading">
                            提交
                        </t-button>
                        <t-button theme="default" @click="visible = false">
                            取消
                        </t-button>
                    </t-space>
                </t-form-item>
            </t-form>
            <div v-if="result && (result.Response.Error || result.Response.Output)">
                <pre v-if="result.Response.Error" v-highlight>
                    <h3>错误信息</h3>
                    <code max-height="300" class="lang-json">{{ JSON.stringify(result.Response.Error, null, 4) }}</code>
                </pre>
                <pre v-if="result.Response.Output" v-highlight>
                    <h3>响应内容</h3>
                    <code max-height="300" class="language-text">{{ result.Response.Output }}</code>
                </pre>
            </div>
        </t-space>
    </t-dialog>
</template>
