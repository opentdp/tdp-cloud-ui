<template>
    <div class="register-wrap">
        <div class="vt-register">
            <div class="vt-title">TDP Cloud</div>
            <el-form ref="register" :model="param" :rules="rules" label-width="0px" class="vt-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <template #prepend>
                            <el-button>
                                <el-icon>
                                    <User />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="param.password" type="password" placeholder="密码">
                        <template #prepend>
                            <el-button>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-input v-model="param.password2" type="password" placeholder="确认密码" @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="register-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
                <div class="register-btn">
                    <router-link to="/user/login">
                        <el-button>登录</el-button>
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
import useStore from '@/store/layout';

const store = useStore();
const router = useRouter();

const param = reactive({
    username: '',
    password: '',
    password2: '',
});

const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    password2: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const register = ref(null);

const submitForm = () => {
    register.value.validate(valid => {
        if (!valid) {
            ElMessage.error('注册失败');
            return false;
        }
        Api.user.register(param).then(() => {
            ElMessage.success('注册成功');
            router.push('/user/login');
        });
    });
};

store.clearTabs();
</script>

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
