<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item :to="{ path: '/' }">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                修改密码
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span>基础信息</span>
                        </div>
                    </template>
                    <div class="info">
                        <div class="info-image">
                            <img src="@/assets/img/avatar.jpg">
                        </div>
                        <div class="info-name">
                            {{ session.username }}
                        </div>
                        <div class="info-desc">
                            {{ session.description }}
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span>修改密码</span>
                        </div>
                    </template>
                    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="100px">
                        <el-form-item label="原密码：" prop="oldPassword">
                            <el-input v-model="formModel.oldPassword" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="新密码：" prop="newPassword">
                            <el-input v-model="formModel.newPassword" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="新密码：" prop="newPassword2">
                            <el-input v-model="formModel.newPassword2" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="formSubmit(formRef)">
                                保存
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { ElMessage, FormRules, FormInstance } from "element-plus"

import Api from "@/api"
import sessionStore from "@/store/session"

const session = sessionStore()

const formRef = ref<FormInstance>()

const formModel = reactive({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
})

const formRules = ref<FormRules>({
    oldPassword: [{ required: true, message: "请输入原始密码", trigger: "blur" }],
    newPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
    newPassword2: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
            validator: (rule, value, callback) => {
                if (formModel.newPassword != formModel.newPassword2) {
                    callback(new Error("两次密码不一致"))
                } else {
                    callback()
                }
            }, trigger: "blur"
        },
    ],
})

const formSubmit = (form: FormInstance | undefined) => {
    form && form.validate(valid => {
        if (!valid) {
            ElMessage.error("请检查表单")
            return false
        }
        Api.user.updatePassword(formModel).then(() => {
            ElMessage.success("修改成功")
        })
    })
}
</script>

<style lang="scss" scoped>
.info {
    text-align: center;
    padding: 35px 0;

    .info-image {
        margin: auto;
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 50px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .info-name {
        margin: 15px 0 10px;
        font-size: 24px;
        font-weight: 500;
        color: #262626;
    }
}
</style>
