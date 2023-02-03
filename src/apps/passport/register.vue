<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { LoApi } from "@/api"

@Component
export default class PassportRegister extends Vue {
    @Ref
    public formRef!: FormInstance

    public formModel = {
        Username: "",
        Password: "",
        Password2: "",
    }

    public formRules: FormRules = {
        Username: [{ required: true, message: "用户名 不能为空" }],
        Password: [{ required: true, message: "密码 不能为空" }],
        Password2: [{ required: true, message: "密码 不能为空" }],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            await LoApi.passport.register(this.formModel)
            // 切换到登陆页面
            this.$router.push("/passport/login")
        })
    }
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
                        @keyup.enter="formSubmit(formRef)"
                    >
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
                    <router-link to="/passport/login">
                        <el-button>登录</el-button>
                    </router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.register-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-image: url(@/assets/img/bg01.jpg);
    background-position: center center;
    background-size: cover;
}

.vt-register {
    width: 350px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 4px 12px 12px rgb(0 0 0 / 10%);
    overflow: hidden;
}

.vt-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
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
