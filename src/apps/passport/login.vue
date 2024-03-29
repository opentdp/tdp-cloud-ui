<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData } from 'tdesign-vue-next';

import Api, { NaApi } from '@/api';
import { UserLogin } from '@/api/native/passport';

@Component
export default class PassportLogin extends Vue {
    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel: UserLogin = {
        Username: import.meta.env.VITE_USERNAME || '',
        Password: import.meta.env.VITE_PASSWORD || '',
    };

    public formRules: FormRules<UserLogin> = {
        Username: [{ required: true }],
        Password: [{ required: true }],
    };

    // 提交表单

    async formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        this.loading = true;
        const res = await NaApi.passport.login(this.formModel).finally(() => {
            this.loading = false;
        });
        this.session.update(res);
        // 切换到后台首页
        this.$router.push('/');
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
                    <t-form-item name="Password" :required-mark="false">
                        <t-input v-model="formModel.Password" type="password" size="large" placeholder="密码">
                            <template #prefix-icon>
                                <t-icon name="lock-on" />
                            </template>
                        </t-input>
                    </t-form-item>
                    <t-form-item>
                        <t-button :loading="loading" theme="primary" size="large" type="submit" block>
                            登录
                        </t-button>
                    </t-form-item>
                </t-form>
                <div v-if="layout.Registrable" class="magic-guide">
                    没有账号吗？
                    <t-link v-route="'/passport/register'" theme="default">
                        注册新账号
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
