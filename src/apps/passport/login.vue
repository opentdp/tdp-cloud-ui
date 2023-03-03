<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormInstance, FormRules } from "element-plus"

import { NaApi } from "@/api"
import layoutStore from "@/store/layout"
import sessionStore from "@/store/session"

@Component
export default class PassportLogin extends Vue {
    public layout = layoutStore()
    public session = sessionStore()

    public created() {
        this.layout.getOption()
        console.log(this.layout)
    }

    @Ref
    public formRef!: FormInstance

    public formModel = {
        Username: import.meta.env.VITE_USERNAME || "",
        Password: import.meta.env.VITE_PASSWORD || "",
    }

    public formRules: FormRules = {
        Username: [{ required: true, message: "不能为空" }],
        Password: [{ required: true, message: "不能为空" }],
    }

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            const res = await NaApi.passport.login(this.formModel)
            Object.assign(this.session, res)
            this.$router.push("/")
        })
    }
}
</script>

<template>
    <div class="magic-bg">
        <div class="magic-box">
            <div class="magic-title">
                管理后台
            </div>
            <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="0px" class="magic-body">
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
                    <el-input v-model="formModel.Password" placeholder="密码" show-password
                        @keyup.enter="formSubmit(formRef)">
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="magic-btn">
                    <el-button type="primary" @click="formSubmit(formRef)">
                        登录
                    </el-button>
                </div>
                <div v-if="layout.Register" class="magic-btn">
                    <router-link to="/passport/register">
                        <el-button>注册</el-button>
                    </router-link>
                </div>
            </el-form>
        </div>
        <div class="copyright">
            <small>Powered by TDP Cloud</small>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.magic-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-image: url(@/assets/img/bg01.jpg);
    background-position: center center;
    background-size: cover;
}

.magic-box {
    width: 350px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 4px 12px 12px rgb(0 0 0 / 10%);
    overflow: hidden;
}

.magic-title {
    width: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
}

.magic-body {
    padding: 30px 30px;
}

.magic-btn {
    text-align: center;

    button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }
}

.copyright {
    user-select: none;
    position: absolute;
    bottom: 10px;
    color: #ddd;
}
</style>
