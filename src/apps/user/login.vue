<template>
    <div class="login-wrap">
        <div class="vt-login">
            <div class="vt-title">TDP Cloud</div>
            <el-form ref="login" :model="param" :rules="rules" label-width="0px" class="vt-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <template #prepend>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="param.password" type="password" placeholder="密码" @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div class="login-btn">
                    <router-link to="/user/register">
                        <el-button>注册</el-button>
                    </router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

import Api from '@/api';
import sessionStore from '@/store/session';

const router = useRouter();
const session = sessionStore();

const param = reactive({
    username: import.meta.env.VITE_USERNAME || '',
    password: import.meta.env.VITE_PASSWORD || '',
});

const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const login = ref(null);

const submitForm = () => {
    login.value.validate(valid => {
        if (!valid) {
            ElMessage.error('登录失败');
            return false;
        }
        Api.user.login(param).then(data => {
            ElMessage.success('登录成功');
            session.username = param.username;
            session.token = data.token;
            if (data.keyid > 0) {
                session.keyid = data.keyid;
                router.push('/');
            } else {
                router.push('/user/secret');
            }
        });
    });
};
</script>

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
