<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { UserRegister } from '@/api/native/passport';

@Component
export default class PassportRegister extends Vue {
    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel: UserRegister = {
        Username: '',
        Password: '',
        Password2: '',
        Email: '',
    };

    public formRules: FormRules<UserRegister> = {
        Username: [{ required: true }],
        Password: [{ required: true }],
        Password2: [
            { required: true },
            { validator: val => val == this.formModel.Password, message: '两次密码不一致' }
        ],
        Email: [{ required: true }],
    };

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        this.loading = true;
        await NaApi.passport.register(this.formModel).finally(() => {
            this.loading = false;
        });
        // 切换到登陆页面
        this.$router.push('/passport/login');
    }
}
</script>

<template>
    <t-layout class="layout">
        <t-content class="content">
            <t-space fixed direction="vertical" class="magic-box">
                <div class="magic-title">
                    登录到<br>{{ layout.SiteName }} 控制面板
                </div>
                <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="0px" class="magic-body" @submit="formSubmit">
                    <t-form-item name="Username" :required-mark="false">
                        <t-input v-model="formModel.Username" size="large" placeholder="用户名">
                            <template #prefix-icon>
                                <t-icon name="user" />
                            </template>
                        </t-input>
                    </t-form-item>
                    <t-form-item name="Email" :required-mark="false">
                        <t-input v-model="formModel.Email" size="large" placeholder="邮箱">
                            <template #prefix-icon>
                                <t-icon name="mail" />
                            </template>
                        </t-input>
                    </t-form-item>
                    <t-form-item name="Password" :required-mark="false">
                        <t-input v-model="formModel.Password" type="password" size="large" placeholder="密码">
                            <template #prefix-icon>
                                <t-icon name="lock-on" />
                            </template>
                        </t-input>
                    </t-form-item>
                    <t-form-item name="Password2" :required-mark="false">
                        <t-input v-model="formModel.Password2" type="password" size="large" placeholder="确认密码">
                            <template #prefix-icon>
                                <t-icon name="lock-on" />
                            </template>
                        </t-input>
                    </t-form-item>
                    <t-form-item>
                        <t-button :loading="loading" theme="primary" size="large" type="submit" block>
                            注册
                        </t-button>
                    </t-form-item>
                </t-form>
                <div class="magic-guide">
                    已有账号？
                    <t-link v-route="'/passport/login'" theme="default">
                        登录
                    </t-link>
                </div>
            </t-space>
        </t-content>
        <t-footer class="copyright">
            <t-space :size="4" separator="•">
                <t-link :href="layout.Copylink" target="_blank">
                    {{ layout.Copytext }}
                </t-link>
                <t-link href="https://cloud.opentdp.org/" target="_blank">
                    Cloud {{ layout.Version ? "v" + layout.Version : "" }}
                </t-link>
                <t-link v-if="layout.IcpCode" href="https://beian.miit.gov.cn/" target="_blank">
                    {{ layout.IcpCode }}
                </t-link>
            </t-space>
        </t-footer>
    </t-layout>
</template>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    background-image: url(/assets/image/bg01.jpg);
    background-position: center center;
    background-size: cover;

    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
}

.magic-box {
    width: 360px;
    overflow: hidden;

    .magic-title {
        font-size: 200%;
        line-height: 1.5;
        margin-bottom: 20px;
    }

    .magic-guide {
        text-align: right;
    }
}

.copyright {
    font-size: 75%;
    user-select: none;
    text-align: center;
}
</style>
