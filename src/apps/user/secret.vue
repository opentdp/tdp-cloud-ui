<template>
  <div>
    <el-card shadow="hover" class="mgb10">
      <template #header>
        <div class="card-header">
          <b>密钥列表</b>
        </div>
      </template>
      <el-table :data="session.secretList" style="width: 100%">
        <el-table-column prop="Id" label="序号" width="80" />
        <el-table-column prop="Description" label="别名" width="160" />
        <el-table-column prop="SecretId" label="Secret Id" />
        <el-table-column prop="SecretKey" label="Secret Key" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              link
              type="danger"
              icon="Delete"
              @click="deleteSecret(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <b>添加密钥</b>
          <el-button class="button" text @click="gotoQCloudCAM">
            腾讯云 CAM
          </el-button>
        </div>
      </template>
      <el-form label-width="90px">
        <el-form-item label="别名">
          <el-input v-model="param.description" />
        </el-form-item>
        <el-form-item label="SecretId">
          <el-input v-model="param.secretId" />
        </el-form-item>
        <el-form-item label="SecretKey">
          <el-input v-model="param.secretKey" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createSecret"> 保存 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"

import Api from "@/api"
import sessionStore from "@/store/session"

const session = sessionStore()

// 密钥列表

const fetchSecrets = () => {
  Api.user.fetchSecrets().then((res) => {
    session.setSecrets(res)
  })
}

// 添加密钥

const param = reactive({
  secretId: "",
  secretKey: "",
  description: "",
})

const createSecret = () => {
  Api.user.createSecret(param).then((data) => {
    ElMessage.success(data.Result)
    param.secretId = ""
    param.secretKey = ""
    param.description = ""
    fetchSecrets()
  })
}

// 删除密钥

const deleteSecret = (idx) => {
  ElMessageBox.confirm("确定要删除吗？", "提示", {
    type: "warning",
  }).then(() => {
    const item = session.secretList[idx]
    Api.user.deleteSecret(item.Id).then((data) => {
      session.secretList.splice(idx, 1)
      ElMessage.success(data.Result)
    })
  })
}

// 腾讯云CAM
const gotoQCloudCAM = () => {
  window.open("https://console.cloud.tencent.com/cam", "_blank")
}

fetchSecrets()
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
