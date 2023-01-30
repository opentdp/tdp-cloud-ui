<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { LoApi } from "@/api"
import sessionStore from "@/store/session"

@Component
export default class MemberLogin extends Vue {
    public session = sessionStore()

    @Ref
    public formRef!: FormInstance

    public formModel = {
        Username: import.meta.env.VITE_USERNAME || "",
        Password: import.meta.env.VITE_PASSWORD || "",
    }

    public formRules: FormRules = {
        Username: [{ required: true, message: "用户名 不能为空" }],
        Password: [{ required: true, message: "密码 不能为空" }],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            const res = await LoApi.user.login(this.formModel)
            if (res.Username) {
                ElMessage.success("登录成功")
            }
            this.session.appid = res.AppId
            this.session.username = res.Username
            this.session.description = res.Description
            this.session.token = res.Token
            this.$router.push("/")
        })
    }
}
</script>

<template>
    <div class="login-wrap">
        <div class="vt-login">
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
                    <el-input v-model="formModel.Password" type="password" placeholder="密码"
                        @keyup.enter="formSubmit(formRef)"
                    >
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="formSubmit(formRef)">
                        登录
                    </el-button>
                </div>
                <div class="login-btn">
                    <router-link to="/member/register">
                        <el-button>注册</el-button>
                    </router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-wrap {
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

.vt-login {
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

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>
