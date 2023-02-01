<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { LoApi } from "@/api"
import { SSHKeyItem } from "@/api/local/sshkey"

@Component
export default class TerminalSshkey extends Vue {
    public loading = true

    // 初始化

    public created() {
        this.getSshkeyList()
    }

    // 密钥列表

    public keylist: SSHKeyItem[] = []

    async getSshkeyList() {
        const res = await LoApi.sshkey.list()
        this.keylist = res.Datasets
        this.loading = false
    }

    // 删除密钥

    async deleteKey(idx: number) {
        const item = this.keylist[idx]
        await LoApi.sshkey.remove(item.Id)
        this.keylist.splice(idx, 1)
    }

    // 添加密钥

    @Ref
    public formRef!: FormInstance

    public formModel = {
        PublicKey: "",
        PrivateKey: "",
        Description: "",
    }

    public formRules: FormRules = {
        PublicKey: [{ required: true, message: "公钥 不能为空" }],
        PrivateKey: [{ required: true, message: "私钥 不能为空" }],
        Description: [{ required: true, message: "别名 不能为空" }],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await LoApi.sshkey.create(this.formModel)
            this.formRef.resetFields()
            this.getSshkeyList()
        })
    }
}
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                SSH 密钥
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>密钥列表</b>
                </div>
            </template>
            <el-table :data="keylist">
                <el-table-column prop="Description" label="别名" show-overflow-tooltip fixed />
                <el-table-column prop="PublicKey" label="公钥" show-overflow-tooltip />
                <el-table-column prop="PrivateKey" label="私钥" show-overflow-tooltip />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确定删除?" @confirm="deleteKey(scope.$index)">
                            <template #reference>
                                <el-button link type="danger" icon="Delete">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="space-10" />
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>添加密钥</b>
                </div>
            </template>
            <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="55px">
                <el-form-item prop="Description" label="别名">
                    <el-input v-model="formModel.Description" />
                </el-form-item>
                <el-form-item prop="PublicKey" label="公钥">
                    <el-input v-model="formModel.PublicKey" type="textarea" rows="5" />
                </el-form-item>
                <el-form-item prop="PrivateKey" label="私钥">
                    <el-input v-model="formModel.PrivateKey" type="textarea" rows="5" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="formSubmit(formRef)">
                        保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
