<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChange">
      <el-icon :size="30">
        <Fold v-if="!layout.collapse" />
        <Expand v-else />
      </el-icon>
    </div>
    <div class="logo">TDP Cloud</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 密钥管理 -->
        <el-icon v-if="session.secretList.length > 0" :size="30">
          <Key />
        </el-icon>
        <el-dropdown
          v-if="session.secretList.length > 0"
          class="user-name"
          trigger="click"
          @command="secretDropdown"
        >
          <span class="el-dropdown-link">
            &nbsp;{{ session.keyname || "请选择" }}&nbsp;
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in session.secretList"
                :key="item.Id"
                :command="item"
              >
                {{ item.Description }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/assets/img/avatar.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="userDropdown">
          <span class="el-dropdown-link">
            &nbsp;{{ username }}&nbsp;
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <a href="https://github.com/rehiy/vue-admin-template">
                <el-dropdown-item>项目仓库</el-dropdown-item>
              </a>
              <el-dropdown-item command="user"> 个人中心 </el-dropdown-item>
              <el-dropdown-item divided command="loginout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"

import Api from "@/api"
import layoutStore from "@/store/layout"
import sessionStore from "@/store/session"

const router = useRouter()
const layout = layoutStore()
const session = sessionStore()

const username = session.username

// 侧边栏折叠
const collapseChange = () => {
  layout.setCollapse(!layout.collapse)
}

// 小屏自动折叠
onMounted(() => {
  if (document.body.clientWidth < 1000) {
    collapseChange()
  }
})

// 密钥列表
Api.user.fetchSecrets().then((res) => {
  session.setSecrets(res)
})

// 密钥下拉菜单选择事件
const secretDropdown = (data) => {
  session.keyname = data.Description
  session.keyid = data.Id
  location.reload()
}

// 用户名下拉菜单选择事件
const userDropdown = (data) => {
  switch (data) {
    case "loginout":
      session.$reset()
      router.push("/user/login")
      break
    case "user":
      router.push("/user/info")
      break
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background-color: #242f42;
  color: #fff;

  .logo {
    flex: auto;
    width: 250px;
  }

  .collapse-btn {
    height: 28px;
    padding: 0 20px;
    background: rgb(40, 52, 70);
    cursor: pointer;
  }
}

.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.el-dropdown-link {
  display: flex;
  color: #fff;
  cursor: pointer;
}
</style>
