<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { NaApi } from "@/api"
import { KeypairTypeList } from "@/api/native/keypair"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class KeypairCreate extends Vue {
    public KeypairTypeList = KeypairTypeList

    // 创建表单

    @Ref
    public formRef!: FormInstance

    public formModel = {
        PublicKey: "",
        PrivateKey: "",
        KeyType: "ssh",
        Description: "",
    }

    public formRules: FormRules = {
        PublicKey: [{ required: true, message: "不能为空" }],
        PrivateKey: [{ required: true, message: "不能为空" }],
        Description: [{ required: true, message: "不能为空" }],
    }

    // 提交表单

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await NaApi.keypair.create(this.formModel)
            this.close()
        })
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open() {
        this.dailog = true
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="添加密钥" width="600px">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="50px">
            <el-form-item prop="KeyType" label="类型">
                <el-select v-model="formModel.KeyType" placeholder="Select">
                    <el-option v-for="v, k in KeypairTypeList" :key="k" :label="v" :value="k" />
                </el-select>
            </el-form-item>
            <el-form-item prop="Description" label="别名">
                <el-input v-model="formModel.Description" />
            </el-form-item>
            <el-form-item prop="PublicKey" label="公钥">
                <el-input v-model="formModel.PublicKey" type="textarea" :autosize="{ minRows: 5 }" />
            </el-form-item>
            <el-form-item prop="PrivateKey" label="私钥">
                <el-input v-model="formModel.PrivateKey" type="textarea" :autosize="{ minRows: 5 }" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dailog = false">取消</el-button>
                <el-button type="primary" @click="formSubmit(formRef)">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>