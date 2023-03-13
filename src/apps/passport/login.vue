<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { FormInstanceFunctions, FormRules, SubmitContext } from "tdesign-vue-next"

import Api, { NaApi } from "@/api"
import { UserLogin } from "@/api/native/passport"

import layoutStore from "@/store/layout"
import sessionStore from "@/store/session"

@Component
export default class PassportLogin extends Vue {
    public layout = layoutStore()
    public session = sessionStore()

    public created() {
        this.layout.initUIConfig()
    }

    @Ref
    public formRef!: FormInstanceFunctions

    public formModel: UserLogin = {
        Username: import.meta.env.VITE_USERNAME || "",
        Password: import.meta.env.VITE_PASSWORD || "",
    }

    public formRules: FormRules<UserLogin> = {
        Username: [{ required: true }],
        Password: [{ required: true }],
    }

    async formSubmit(ctx: SubmitContext<FormData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err("请检查表单")
            return false
        }
        const res = await NaApi.passport.login(this.formModel)
        this.session.update(res)
        this.$router.push("/")
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
                <t-form-item name="Password" :required-mark="false">
                    <t-input v-model="formModel.Password" type="password" placeholder="密码">
                        <template #prefix-icon>
                            <t-icon name="lock-on" />
                        </template>
                    </t-input>
                </t-form-item>
                <div class="magic-btn">
                    <t-button theme="primary" type="submit">
                        登录
                    </t-button>
                </div>
                <div v-if="layout.Register" class="magic-btn">
                    <t-button v-route="'/passport/register'" theme="default">
                        注册
                    </t-button>
                </div>
            </t-form>
        </div>
        <div class="copyright">
            <small>Powered by TDP Cloud {{ layout.Version ? "v" + layout.Version : "" }}</small>
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
