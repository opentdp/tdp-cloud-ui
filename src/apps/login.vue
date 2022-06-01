<template>
  <div class="login-wrap">
    <div class="vt-login">
      <div class="vt-title">TDP Cloud</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="vt-content">
        <el-form-item prop="username">
          <el-input placeholder="SecretId" v-model="param.username">
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
          <el-input type="password" placeholder="SecretKey" v-model="param.password" @keyup.enter="submitForm()">
            <template #prepend>
              <el-button>
                <el-icon>
                  <Lock />
                </el-icon>
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import cam from '@/api/cam';

export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const param = reactive({
      username: '',
      password: '',
    })

    const rules = {
      username: [
        { required: true, message: '请输入 SecretId', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入 SecretKey', trigger: 'blur' }
      ],
    }

    const login = ref(null)

    const submitForm = () => {
      login.value.validate(valid => {
        if (!valid) {
          ElMessage.error('登录失败')
          return false
        }
        localStorage.setItem('vt_nickname', 'Admin')
        localStorage.setItem('vt_username', param.username)
        localStorage.setItem('vt_password', param.password)
        cam.getAccountSummary().then(
          res => {
            ElMessage.success('登录成功')
            router.push('/')
          },
          err => {
            ElMessage.error('登录失败')
          }
        )
      })
    }

    store.commit('clearTags')

    return {
      param,
      rules,
      login,
      submitForm,
    }
  },
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #324157;
  background-image: url(@/assets/img/login-bg.jpg);
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
