<script lang="ts">
import { Component, Ref, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { NaApi } from "@/api"
import { UserInfoResponse } from "@/api/native/passport"

import sessionStore from "@/store/session"

@Component
export default class PassportInfo extends Vue {
    public session = sessionStore()
    public loading = true

    // 初始化

    public created() {
        this.getUserInfo()
    }

    // 获取用户信息

    async getUserInfo() {
        const res = await NaApi.passport.detail()
        // 同步表单
        this.formModel.Email = res.Email
        this.formModel.Description = res.Description
        this.loading = false
    }

    // 创建表单

    @Ref
    public formRef!: FormInstance

    public formModel = {
        Email: "",
        Description: "",
    }

    public formRules: FormRules = {
        Email: [
            { required: true, message: "不能为空" },
        ],
        Description: [
            { required: true, message: "不能为空" },
            {
                validator: (rule, value, callback) => {
                    if (value.trim().length == 0) {
                        callback(new Error("不能为空"))
                    } else {
                        callback()
                    }
                },
                trigger: "blur"
            },
        ],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            NaApi.passport.updateInfo(this.formModel)
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
                个人中心
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
                            {{ session.username }}
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
                    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
                        <el-form-item label="用户名">
                            <b>{{ session.username }}</b>
                        </el-form-item>
                        <el-form-item label="App Id">
                            {{ session.appid }}
                        </el-form-item>
                        <el-form-item prop="Email" label="邮箱">
                            <el-input v-model="formModel.Email" />
                        </el-form-item>
                        <el-form-item prop="Description" label="简介">
                            <el-input v-model="formModel.Description" />
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
