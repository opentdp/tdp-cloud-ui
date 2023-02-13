<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { NaApi } from "@/api"
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
    public formRef!: FormInstance

    public formModel!: ScriptItem

    public formRules: FormRules = {
        Content: [{ required: true, message: "脚本内容 不能为空" }],
    }

    // 提交表单

    public formSubmit(form: FormInstance | undefined) {
        this.result = null
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            this.loading = true
            const res = await NaApi.workhub.exec({
                WorkerId: this.machine.WorkerId,
                Payload: this.formModel
            })
            // 循环获取状态
            this.timer = setInterval(() => {
                this.getOutput(res.Id)
            }, 1500)
        })
    }

    // 获取结果

    public result!: TasklineItem | null

    async getOutput(id: number) {
        this.result = await NaApi.taskline.detail(id)
        if (this.result.Status != "Doing") {
            clearInterval(this.timer)
            this.loading = false
        }
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
        clearInterval(this.timer)
    }

    public open(machine: MachineItem, script: ScriptItem) {
        this.result = null
        this.dailog = true
        this.loading = false
        this.machine = machine
        this.formModel = { ...script }
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close :title="'执行脚本：' + formModel?.Name" width="600px">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
            <el-form-item prop="CommandType" label="类型">
                {{ formModel.CommandType }}
            </el-form-item>
            <el-form-item prop="Description" label="脚本描述">
                {{ formModel.Description }}
            </el-form-item>
            <el-form-item prop="Timeout" label="超时时间">
                <el-input-number v-model="formModel.Timeout" placeholder="默认为 300s" :min="1" :max="86400" />
            </el-form-item>
            <el-form-item prop="Username" label="执行用户">
                <el-input v-model="formModel.Username"
                    :placeholder="formModel.CommandType == 'SHELL' ? '默认为 root' : '默认为 System'" />
            </el-form-item>
            <el-form-item prop="WorkDirectory" label="执行路径">
                <el-input v-model="formModel.WorkDirectory"
                    :placeholder="formModel.CommandType == 'SHELL' ? '默认为 /root' : '默认为 C:\\'" />
            </el-form-item>
            <el-form-item prop="Content" label="脚本内容">
                <el-input v-model="formModel.Content" type="textarea" :autosize="{ minRows: 4 }" />
            </el-form-item>
        </el-form>
        <div v-if="result">
            <template v-if="result.Response.Error">
                <h3>错误信息</h3>
                <JsonPretty :data="result.Response.Error" />
            </template>
            <h3>响应内容</h3>
            <pre v-highlight data-remove-indent max-height="300">
                <code>{{ result.Response.Output }}</code>
            </pre>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dailog = false">取消</el-button>
                <el-button type="primary" :loading="loading" @click="formSubmit(formRef)">
                    执行
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
