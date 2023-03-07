<script lang="ts">
import { Component, Ref, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { NaApi } from "@/api"
import sessionStore from "@/store/session"

@Component
export default class PassportProfile extends Vue {
    public session = sessionStore()
    public loading = true

    // 初始化

    public created() {
        this.getProfile()
    }

    // 获取用户信息

    async getProfile() {
        const res = await NaApi.passport.profile()
        Object.assign(this.formModel, res)
        this.loading = false
    }

    // 创建表单

    @Ref
    public formRef!: FormInstance

    public formModel = {
        Username: "",
        Password: "",
        Password2: "",
        Email: "",
        Description: "",
        OldPassword: "",
    }

    public formRules: FormRules = {
        Username: [{ required: true, message: "不能为空" },],
        Password2: [
            {
                validator: (rule, value, callback) => {
                    if (this.formModel.Password != this.formModel.Password2) {
                        callback(new Error("两次密码不一致"))
                    } else {
                        callback()
                    }
                }
            },
        ],
        Email: [{ required: true, message: "不能为空" },],
        Description: [{ required: true, message: "不能为空" },],
        OldPassword: [{ required: true, message: "不能为空" }],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            NaApi.passport.update(this.formModel)
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
                个人资料
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <template #header>
                        <div class="flex-between">
                            <span>基础信息</span>
                        </div>
                    </template>
                    <div class="info">
                        <div class="info-image">
                            <img src="@/assets/img/avatar.jpg">
                        </div>
                        <div class="info-name">
                            {{ session.Username }}
                        </div>
                        <div class="info-desc">
                            {{ formModel.Description }}
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <template #header>
                        <div class="flex-between">
                            <span>账户编辑</span>
                        </div>
                    </template>
                    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="70px">
                        <el-form-item label="App Id">
                            {{ session.AppId }}
                        </el-form-item>
                        <el-form-item prop="Username" label="用户名">
                            <el-input v-model="formModel.Username" />
                        </el-form-item>
                        <el-form-item prop="OldPassword" label="原密码">
                            <el-input v-model="formModel.OldPassword" show-password />
                        </el-form-item>
                        <el-form-item prop="Password" label="新密码">
                            <el-input v-model="formModel.Password" show-password />
                        </el-form-item>
                        <el-form-item prop="Password2" label="确认密码">
                            <el-input v-model="formModel.Password2" show-password />
                        </el-form-item>
                        <el-form-item prop="Email" label="邮箱">
                            <el-input v-model="formModel.Email" />
                        </el-form-item>
                        <el-form-item prop="Description" label="简介">
                            <el-input v-model="formModel.Description" type="textarea" :autosize="{ minRows: 2, maxRows: 15 }" />
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
