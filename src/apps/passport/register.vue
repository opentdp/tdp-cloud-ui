<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { UserRegister } from "@/api/native/passport"

@Component
export default class PassportRegister extends Vue {
    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: UserRegister = {
        Username: "",
        Password: "",
        Password2: "",
        Email: "",
    }

    public formRules: FormRules<UserRegister> = {
        Username: [{ required: true }],
        Password: [{ required: true }],
        Password2: [
            { required: true },
            { validator: val => val == this.formModel.Password, message: '两次密码不一致' }
        ],
        Email: [{ required: true }],
    }

    async formSubmit(ctx: SubmitContext<FormData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        await NaApi.passport.register(this.formModel)
        // 切换到登陆页面
        this.$router.push("/passport/login")
    }
}
</script>

<template>
    <div class="magic-bg">
        <div class="magic-box">
            <div class="magic-title">
                管理后台
            </div>
            <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="0px" class="magic-body"
                @submit="formSubmit">
                <t-form-item name="Username" :required-mark="false">
                    <t-input v-model="formModel.Username" placeholder="用户名">
                        <template #prefix-icon>
                            <t-icon name="user" />
                        </template>
                    </t-input>
                </t-form-item>
                <t-form-item name="Email" :required-mark="false">
                    <t-input v-model="formModel.Email" placeholder="邮箱">
                        <template #prefix-icon>
                            <t-icon name="mail" />
                        </template>
                    </t-input>
                </t-form-item>
                <t-form-item name="Password" :required-mark="false">
                    <t-input v-model="formModel.Password" type="password" placeholder="密码">
                        <template #prefix-icon>
                            <t-icon name="lock-on" />
                        </template>
                    </t-input>
                </t-form-item>
                <t-form-item name="Password2" :required-mark="false">
                    <t-input v-model="formModel.Password2" type="password" placeholder="确认密码">
                        <template #prefix-icon>
                            <t-icon name="lock-on" />
                        </template>
                    </t-input>
                </t-form-item>
                <div class="magic-btn">
                    <t-button theme="primary" type="submit">
                        注册
                    </t-button>
                </div>
                <div class="magic-btn">
                    <t-button v-route="'/passport/login'" theme="default">
                        登录
                    </t-button>
                </div>
            </t-form>
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
    background-image: url(/assets/img/bg01.jpg);
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
