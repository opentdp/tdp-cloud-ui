<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import layoutStore from "@/store/layout"
import sessionStore from "@/store/session"

@Component
export default class LayoutNavbar extends Vue {
    public layout = layoutStore()
    public session = sessionStore()

    // 初始化

    public created() {
        // 小屏自动折叠
        if (document.body.clientWidth < 1000) {
            this.collapseChange()
        }
    }

    // 侧边栏折叠
    public collapseChange() {
        this.layout.setCollapse(!this.layout.Collapse)
    }

    // 用户名下拉菜单选择事件
    public userDropdown(data: string) {
        switch (data) {
            case "delcache":
                NaApi.cache.clear()
                location.reload()
                break
            case "loginout":
                this.session.$reset()
                this.$router.push({ name: "passport-login" })
                break
            case "user":
                this.$router.push({ name: "passport-info" })
                break
            case "password":
                this.$router.push({ name: "passport-password" })
                break
        }
    }
}
</script>

<template>
    <div class="header">
        <div class="collapse-btn" @click="collapseChange">
            <el-icon :size="30">
                <Fold v-if="!layout.Collapse" />
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
                        &nbsp;{{ session.Username }}&nbsp;
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="user">
                                个人中心
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
