<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { Api } from "@/api"
import layoutStore from "@/store/layout"
import sessionStore from "@/store/session"

@Component
export default class LayoutNavbar extends Vue {
    public layout = layoutStore()
    public session = sessionStore()

    public created() {
        // 小屏自动折叠
        if (document.body.clientWidth < 1000) {
            this.collapseChange()
        }
    }

    // 侧边栏折叠
    public collapseChange() {
        this.layout.setCollapse(!this.layout.collapse)
    }

    // 用户名下拉菜单选择事件
    public userDropdown(data: string) {
        switch (data) {
            case "delcache":
                Api.cache.clear()
                location.reload()
                break
            case "loginout":
                this.session.$reset()
                this.$router.push({ name: "member-login" })
                break
            case "user":
                this.$router.push({ name: "member-info" })
                break
            case "password":
                this.$router.push({ name: "member-password" })
                break
        }
    }
}
</script>

<template>
    <div class="header">
        <div class="collapse-btn" @click="collapseChange">
            <el-icon :size="30">
                <Fold v-if="!layout.collapse" />
                <Expand v-else />
            </el-icon>
        </div>
        <div class="logo">
            TDP Cloud
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="@/assets/img/avatar.jpg">
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="userDropdown">
                    <span class="el-dropdown-link">
                        &nbsp;{{ session.username }}&nbsp;
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <a href="https://github.com/tdp-resource/tdp-cloud" target="_blank">项目仓库 </a>
                            </el-dropdown-item>
                            <el-dropdown-item command="user">
                                个人中心
                            </el-dropdown-item>
                            <el-dropdown-item command="password">
                                修改密码
                            </el-dropdown-item>
                            <el-dropdown-item command="delcache">
                                清理缓存
                            </el-dropdown-item>
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
    padding-right: 24px;
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
