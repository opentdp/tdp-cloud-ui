<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { MachineItem } from "@/api/native/machine"
import { ScriptItem } from "@/api/native/script"
import { TasklineItem } from "@/api/native/taskline"

@Component({
    emits: ['submit'],
    expose: ['open']
})
export default class ScriptQuickExec extends Vue {
    public machine!: MachineItem

    public loading = false
    public timer = 0

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel!: ScriptItem

    public formRules: FormRules<ScriptItem> = {
        Content: [{ required: true }],
    }

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        this.result = null
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        this.loading = true
        const res = await NaApi.workhub.exec(
            this.machine.WorkerId, this.formModel
        )
        // 循环获取状态
        this.timer = setInterval(() => {
            this.getOutput(res.Id)
        }, 1500)
    }

    // 获取结果

    public result!: TasklineItem | null

    async getOutput(id: number) {
        const res = await NaApi.taskline.detail(id)
        this.result = res.Item
        if (this.result.Status != "Doing") {
            clearInterval(this.timer)
            this.loading = false
        }
    }

    // 对话框管理

    public visible = false

    public close() {
        this.visible = false
        this.$emit("submit")
        clearInterval(this.timer)
    }

    public open(machine: MachineItem, script: ScriptItem) {
        this.result = null
        this.visible = true
        this.loading = false
        this.machine = machine
        this.formModel = { ...script }
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close :header="'执行脚本：' + formModel?.Name" :footer="false" width="600px">
        <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="80px" @submit="formSubmit">
            <t-form-item name="CommandType" label="类型">
                {{ formModel.CommandType }}
            </t-form-item>
            <t-form-item name="Description" label="脚本描述">
                {{ formModel.Description }}
            </t-form-item>
            <t-form-item name="Timeout" label="超时时间">
                <t-input-number v-model="formModel.Timeout" placeholder="默认为 300s" :min="1" :max="86400" />
            </t-form-item>
            <t-form-item name="Username" label="执行用户">
                <t-input v-model="formModel.Username"
                    :placeholder="formModel.CommandType == 'SHELL' ? '默认为 root' : '默认为 System'" />
            </t-form-item>
            <t-form-item name="WorkDirectory" label="执行路径">
                <t-input v-model="formModel.WorkDirectory"
                    :placeholder="formModel.CommandType == 'SHELL' ? '默认为 /root' : '默认为 C:\\'" />
            </t-form-item>
            <t-form-item name="Content" label="脚本内容">
                <t-textarea v-model="formModel.Content" :autosize="{ minRows: 4, maxRows: 15 }" />
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
        <div v-if="result">
            <pre v-if="result.Response.Error" v-highlight max-height="300" class="lang-json">
                <h3>错误信息</h3>
                <code>{{ JSON.stringify(result.Response.Error, null, 4) }}</code>
            </pre>
            <pre v-highlight max-height="300">
                <h3>响应内容</h3>
                <code>{{ result.Response.Output }}</code>
            </pre>
        </div>
    </t-dialog>
</template>
