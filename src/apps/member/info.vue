<script lang="ts" setup>
import { ref, reactive } from "vue"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { Api } from "@/api"
import sessionStore from "@/store/session"

// 初始化

const session = sessionStore()

// 构造表单

const formRef = ref<FormInstance>()

const formModel = reactive({
    Description: session.description,
})

const formRules = ref<FormRules>({
    desc: [
        { required: true, message: "请输入个人简介" },
        {
            validator: (rule, value, callback) => {
                if (value.trim().length === 0) {
                    callback(new Error("请输入个人简介"))
                } else {
                    callback()
                }
            },
            trigger: "blur"
        },
    ],
})

// 提交表单

function formSubmit(form: FormInstance | undefined) {
    form && form.validate(async valid => {
        if (!valid) {
            ElMessage.error("请检查表单")
            return false
        }
        await Api.user.updateInfo(formModel)
        session.description = formModel.Description
    })
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
                            {{ session.description }}
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
                    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="72px">
                        <el-form-item label="用户名">
                            <b>{{ session.username }}</b>
                        </el-form-item>
                        <el-form-item label="个人简介" prop="description">
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
