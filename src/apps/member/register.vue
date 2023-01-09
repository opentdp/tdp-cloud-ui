<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { ElMessage, FormInstance, FormRules } from "element-plus"

import { Api } from "@/api"

// 初始化

const router = useRouter()

// 构造表单

const formRef = ref<FormInstance>()

const formModel = reactive({
    Username: "",
    Password: "",
    Password2: "",
})

const formRules: FormRules = {
    Username: [{ required: true, message: "请输入用户名" }],
    Password: [{ required: true, message: "请输入密码" }],
    Password2: [{ required: true, message: "请输入密码" }],
}

// 提交表单

function formSubmit(form: FormInstance | undefined) {
    form && form.validate(async valid => {
        if (!valid) {
            ElMessage.error("请检查表单")
            return false
        }
        await Api.user.register(formModel)
        ElMessage.success("注册成功")
        router.push("/member/login")
    })
}
</script>

<template>
    <div class="register-wrap">
        <div class="vt-register">
            <div class="vt-title">
                TDP Cloud
            </div>
            <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="0px" class="vt-content">
                <el-form-item prop="Username">
                    <el-input v-model="formModel.Username" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="Password">
                    <el-input v-model="formModel.Password" type="password" placeholder="密码">
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="Password2">
                    <el-input v-model="formModel.Password2" type="password" placeholder="确认密码"
                        @keyup.enter="formSubmit(formRef)">
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="register-btn">
                    <el-button type="primary" @click="formSubmit(formRef)">
                        注册
                    </el-button>
                </div>
                <div class="register-btn">
                    <el-button>
                        <router-link to="/member/login">
                            登录
                        </router-link>
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.register-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: #324157;
    background-image: url(@/assets/img/bg01.jpg);
    background-size: cover;
}

.vt-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
}

.vt-register {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.vt-content {
    padding: 30px 30px;
}

.register-btn {
    text-align: center;
}

.register-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>
