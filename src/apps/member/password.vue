<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { LoApi } from "@/api"
import sessionStore from "@/store/session"

@Component
export default class MemberPassword extends Vue {
    public session = sessionStore()

    @Ref
    public formRef!: FormInstance

    public formModel = {
        OldPassword: "",
        NewPassword: "",
        NewPassword2: "",
    }

    public formRules: FormRules = {
        OldPassword: [{ required: true, message: "原始密码 不能为空" }],
        NewPassword: [{ required: true, message: "密码 不能为空" }],
        NewPassword2: [
            { required: true, message: "密码 不能为空" },
            {
                validator: (rule, value, callback) => {
                    if (this.formModel.NewPassword != this.formModel.NewPassword2) {
                        callback(new Error("两次密码不一致"))
                    } else {
                        callback()
                    }
                }
            },
        ],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            LoApi.user.updatePassword(this.formModel)
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
                修改密码
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
                            <span>修改密码</span>
                        </div>
                    </template>
                    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="64px">
                        <el-form-item label="原密码" prop="OldPassword">
                            <el-input v-model="formModel.OldPassword" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="新密码" prop="NewPassword">
                            <el-input v-model="formModel.NewPassword" type="password" autocomplete="off" />
                        </el-form-item>
                        <el-form-item label="新密码" prop="NewPassword2">
                            <el-input v-model="formModel.NewPassword2" type="password" autocomplete="off" />
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
