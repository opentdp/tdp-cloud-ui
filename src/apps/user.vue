<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>基础信息</span>
            </div>
          </template>
          <div class="info">
            <div class="info-image">
              <img src="@/assets/img/avatar.jpg" />
            </div>
            <div class="info-name">{{ nickname }}</div>
            <div class="info-desc">不可能！我的代码怎么可能会有bug！</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>账户编辑</span>
            </div>
          </template>
          <el-form label-width="90px">
            <el-form-item label="用户名："> {{ nickname }} </el-form-item>
            <el-form-item label="旧密码：">
              <el-input type="password" v-model="form.old"></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
              <el-input type="password" v-model="form.new"></el-input>
            </el-form-item>
            <el-form-item label="个人简介：">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'user',
  setup() {
    const nickname = localStorage.getItem('vt_nickname')
    const form = reactive({
      old: '',
      new: '',
      desc: '不可能！我的代码怎么可能会有bug！',
    })
    const onSubmit = () => { }

    return {
      nickname,
      form,
      onSubmit
    }
  },
}
</script>

<style scoped>
.info {
  text-align: center;
  padding: 35px 0;
}

.info-image {
  margin: auto;
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 50px;
  overflow: hidden;
}

.info-image img {
  width: 100%;
  height: 100%;
}

.info-name {
  margin: 15px 0 10px;
  font-size: 24px;
  font-weight: 500;
  color: #262626;
}
</style>
