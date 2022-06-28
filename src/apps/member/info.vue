<template>
    <div>
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
                            <span>账户编辑</span>
                        </div>
                    </template>
                    <el-form ref="formRef" :model="form" :rules="formRules" label-width="100px">
                        <el-form-item label="用户名：">
                            {{ session.username }}
                        </el-form-item>
                        <el-form-item label="个人简介：" prop="desc">
                            <el-input v-model="form.desc" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">
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
import { ref } from "vue"
import { FormRules, FormInstance } from "element-plus"

import Api from "@/api"
import sessionStore from "@/store/session"

const session = sessionStore()

const form = ref({
    desc: session.description,
})

const formRef = ref<FormInstance>()
const formRules = ref<FormRules>({
    desc: [
        { required: true, message: "请输入个人简介", trigger: "blur" },
        {
            validator: (rule, value, callback) => {
                if (value.trim().length == 0) {
                    callback(new Error("请输入个人简介"))
                } else {
                    callback()
                }
            }, trigger: "blur"
        },
    ],
})

const onSubmit = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            const description = form.value.desc.trim()
            await Api.member.updateInfo({
                description: description,
            })
            session.description = description
        }
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
