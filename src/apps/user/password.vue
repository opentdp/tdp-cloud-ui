<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>基础信息</span>
            </div>
          </template>
          <div class="info">
            <div class="info-image">
              <img src="@/assets/img/avatar.jpg" />
            </div>
            <div class="info-name">
              {{ session.username }}
            </div>
            <div class="info-desc">{{ session.description }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>修改密码</span>
            </div>
          </template>
          <el-form
            ref="formRef"
            :model="form"
            :rules="formRules"
            label-width="100px"
          >
            <el-form-item label="原密码：" prop="oldpass">
              <el-input
                v-model="form.oldpass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="新密码：" prop="newpass">
              <el-input
                v-model="form.newpass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="新密码：" prop="newpass2">
              <el-input
                v-model="form.newpass2"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit"> 保存 </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { ElMessage, FormRules, FormInstance } from "element-plus"

import Api from "@/api"
import sessionStore from "@/store/session"

const session = sessionStore()

const formRef = ref<FormInstance>()
const form = ref({
  oldpass: "",
  newpass: "",
  newpass2: "",
})
const validateDesc = (rule: any, value: any, callback: any) => {
  if (form.value.newpass != form.value.newpass2) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}
const formRules = ref<FormRules>({
  oldpass: [{ required: true, message: "请输入原始", trigger: "blur" }],
  newpass: [{ required: true, message: "请输入密码", trigger: "blur" }],
  newpass2: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { validator: validateDesc, trigger: "blur" },
  ],
})

const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await Api.user.updatePassword({
        oldPassword: form.value.oldpass,
        newPassword: form.value.newpass,
      })
      ElMessage.success("修改成功")
    }
  })
}
</script>

<style lang="scss" scoped>
.info {
  text-align: center;
  padding: 35px 0;
  .info-image {
    margin: auto;
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 50px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info-name {
    margin: 15px 0 10px;
    font-size: 24px;
    font-weight: 500;
    color: #262626;
  }
}
</style>
