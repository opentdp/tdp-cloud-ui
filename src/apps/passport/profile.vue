<script lang="ts">
import { Component, Ref, Vue } from '@/apps/basic';

import { FormInstanceFunctions, FormRules, SubmitContext, Data as TData, UploadFile, RequestMethodResponse } from 'tdesign-vue-next';
import { VueCropper } from 'vue-cropper';

import Api, { NaApi } from '@/api';
import { UserUpdate } from '@/api/native/passport';

@Component
export default class PassportProfile extends Vue {
    public loading = true;

    // 初始化

    public created() {
        this.getProfile();
    }

    // 获取用户信息

    async getProfile() {
        const res = await NaApi.passport.profile();
        Object.assign(this.formModel, res);
        this.loading = false;
    }

    // 创建表单

    @Ref
    public formRef!: FormInstanceFunctions;

    public formModel: UserUpdate = {
        Username: '',
        Password: '',
        Password2: '',
        Email: '',
        Description: '',
        OldPassword: '',
    };

    public formRules: FormRules<UserUpdate> = {
        Username: [{ required: true }],
        Password2: [{ validator: val => val == this.formModel.Password, message: '两次密码不一致' }],
        Email: [{ required: true }],
        Description: [{ required: true }],
        OldPassword: [{ required: true }],
    };

    public formSubmit(ctx: SubmitContext<TData>) {
        if (ctx.validateResult !== true) {
            Api.msg.err('请检查表单');
            return false;
        }
        NaApi.passport.profileUpdate(this.formModel);
    }

    async avatarSubmit() {
        const res = await NaApi.passport.avatarUpdate(this.imageUpload);
        this.session.Avatar = res.Avatar;
        this.imageOrigin = '';
        this.imageUpload = '';
    }

    // 图片选择

    public imageOrigin = '';

    public imageSelect(file: UploadFile) {
        const reader = new FileReader();
        file.raw && reader.readAsDataURL(file.raw);
        reader.onload = () => this.imageOrigin = String(reader.result);
        const data: RequestMethodResponse = {
            status: 'success',
            response: {}
        };
        return Promise.resolve(data);
    }

    // 图片裁剪

    @Ref
    public cropper!: typeof VueCropper;

    public imageUpload = '';

    public cropperPreview() {
        this.cropper.getCropData((data: string) => {
            this.imageUpload = data;
        });
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                个人资料
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-row :gutter="16">
            <t-col v-if="imageOrigin" :span="5">
                <t-card title="修改头像" hover-shadow header-bordered>
                    <t-space fixed direction="vertical">
                        <vueCropper ref="cropper" class="cropper" mode="contain" output-type="png" :img="imageOrigin" :auto-crop="true" :info-true="true" :fixed="true" :fixed-number="[1, 1]" :center-box="true" @real-time="cropperPreview" />
                        <t-space size="small">
                            <t-button theme="primary" @click="avatarSubmit">
                                提交
                            </t-button>
                            <t-button theme="default" @click="imageOrigin = ''">
                                取消
                            </t-button>
                        </t-space>
                    </t-space>
                </t-card>
            </t-col>
            <t-col v-else :span="5">
                <t-card title="基础信息" hover-shadow header-bordered>
                    <div class="info">
                        <t-upload theme="custom" :request-method="imageSelect">
                            <t-avatar size="96px" :image="session.Avatar" />
                        </t-upload>
                        <div class="info-name">
                            {{ session.Username }}
                        </div>
                        <div class="info-desc">
                            {{ formModel.Description }}
                        </div>
                    </div>
                </t-card>
            </t-col>
            <t-col :span="7">
                <t-card title="修改资料" hover-shadow header-bordered>
                    <t-form ref="formRef" :data="formModel" :rules="formRules" label-width="70px" @submit="formSubmit">
                        <t-form-item label="AppId">
                            {{ session.AppId }}
                        </t-form-item>
                        <t-form-item name="Username" label="用户名">
                            <t-input v-model="formModel.Username" />
                        </t-form-item>
                        <t-form-item name="OldPassword" label="原密码">
                            <t-input v-model="formModel.OldPassword" type="password" />
                        </t-form-item>
                        <t-form-item name="Password" label="新密码">
                            <t-input v-model="formModel.Password" type="password" />
                        </t-form-item>
                        <t-form-item name="Password2" label="确认密码">
                            <t-input v-model="formModel.Password2" type="password" />
                        </t-form-item>
                        <t-form-item name="Email" label="邮箱">
                            <t-input v-model="formModel.Email" />
                        </t-form-item>
                        <t-form-item name="Description" label="简介">
                            <t-textarea v-model="formModel.Description" :autosize="{ minRows: 3, maxRows: 15 }" />
                        </t-form-item>
                        <t-form-item>
                            <t-button theme="primary" type="submit">
                                提交
                            </t-button>
                        </t-form-item>
                    </t-form>
                </t-card>
            </t-col>
        </t-row>
    </t-space>
</template>

<style lang="scss" scoped>
.info {
    text-align: center;
    padding: 35px 0;

    .info-name {
        margin: 15px 0 10px;
        font-size: 150%;
        font-weight: 600;
    }
}

.cropper {
    width: 100%;
    height: 300px;
}
</style>
