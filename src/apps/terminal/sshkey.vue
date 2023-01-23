<script lang="ts" setup>
import { ref, reactive } from "vue"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { Api } from "@/api"
import { SSHKeyItem } from "@/api/local/sshkey"

// 初始化

const keylist = ref<SSHKeyItem[]>([])

// 密钥列表

async function getSshkeyList() {
    const res = await Api.sshkey.list()
    keylist.value = res
}

// 添加密钥

const formRef = ref<FormInstance>()

const formModel = reactive({
    PublicKey: "",
    PrivateKey: "",
    Description: "",
})

const formRules: FormRules = {
    PublicKey: [{ required: true, message: "公钥 不能为空" }],
    PrivateKey: [{ required: true, message: "私钥 不能为空" }],
    Description: [{ required: true, message: "别名 不能为空" }],
}

function formSubmit(form: FormInstance | undefined) {
    form && form.validate(async valid => {
        if (!valid) {
            ElMessage.error("请检查表单")
            return false
        }
        await Api.sshkey.create(formModel)
        formRef.value?.resetFields()
        getSshkeyList()
    })
}

// 删除密钥

async function deleteKey(idx: number) {
    const item = keylist.value[idx]
    await Api.sshkey.remove(item.Id)
    keylist.value.splice(idx, 1)
}

// 加载数据

getSshkeyList()
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
                <el-table-column prop="Id" label="序号" width="80" />
                <el-table-column prop="Description" label="描述" width="160" />
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
                <el-form-item prop="Description" label="描述">
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
