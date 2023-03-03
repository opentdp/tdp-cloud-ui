<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { NaApi } from "@/api"
import { CaTypeList } from "@/api/native/certbot"
import { DomainItem } from "@/api/native/domain"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class CertbotCreate extends Vue {
    public CaTypeList = CaTypeList

    // 域名列表

    public domainList: DomainItem[] = []

    async getDomainList() {
        const res = await NaApi.domain.list()
        this.domainList = res.Datasets
    }

    // 创建表单

    public domainId = 0
    public domainSub = ""

    @Ref
    public formRef!: FormInstance

    public formModel = {
        VendorId: 0,
        Email: "",
        Domain: "",
        CaType: "",
        EabKeyId: "",
        EabMacKey: "",
        History: `{"event":"queued"}`,
    }

    public formRules: FormRules = {
        Email: [{ required: true, message: "不能为空" }],
        CaType: [{ required: true, message: "不能为空" }],
    }

    // 提交表单

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            const domain = this.domainList[this.domainId]
            const prefix = this.domainSub ? this.domainSub + "." : ""
            this.formModel.Domain = prefix + domain.Name
            this.formModel.VendorId = domain.VendorId
            await NaApi.certbot.create(this.formModel)
            this.close()
        })
    }

    // 表单事件

    public caEab = 0

    public updateCaEab() {
        const ca = CaTypeList[this.formModel.CaType]
        this.caEab = ca ? ca.Eab : 0
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open() {
        this.dailog = true
        // 加载数据
        this.domainList.length == 0 && this.getDomainList()
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="添加计划" width="600px">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="110px">
            <el-form-item prop="Domain" label="域名">
                <el-col :span="11">
                    <el-input v-model="domainSub" />
                </el-col>
                <el-col class="text-center" :span="1">
                    <div>.</div>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="domainId">
                        <el-option v-for="v, k in domainList" :key="k" :label="v.Name" :value="k" />
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item prop="Email" label="邮箱">
                <el-input v-model="formModel.Email" />
            </el-form-item>
            <el-form-item prop="CaType" label="CA">
                <el-select v-model="formModel.CaType" @change="updateCaEab">
                    <el-option v-for="v, k in CaTypeList" :key="k" :label="v.Name" :value="k" />
                </el-select>
            </el-form-item>
            <el-form-item prop="EabKeyId" label="EAB KeyId" :required="caEab == 2">
                <el-input v-model="formModel.EabKeyId" :disabled="caEab == 0" />
            </el-form-item>
            <el-form-item prop="EabMacKey" label="EAB MacKey" :required="caEab == 2">
                <el-input v-model="formModel.EabMacKey" :disabled="caEab == 0" />
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