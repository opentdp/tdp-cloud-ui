<template>
    <div class="header">
        <div class="collapse-btn" @click="collapseChage">
            <el-icon :size="30">
                <Fold v-if="!collapse" />
                <Expand v-else />
            </el-icon>
        </div>
        <div class="logo">TDP Cloud</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message ? `有 ${message} 条未读消息` : `消息中心`" placement="bottom">
                        <router-link to="/user">
                            <el-icon :size="30">
                                <Bell />
                            </el-icon>
                        </router-link>
                    </el-tooltip>
                    <span v-if="message" class="btn-bell-badge"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="@/assets/img/avatar.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        &nbsp;{{ nickname }}&nbsp;
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <a href="https://github.com/rehiy/vue-admin-template">
                                <el-dropdown-item>项目仓库</el-dropdown-item>
                            </a>
                            <el-dropdown-item command="user">个人中心</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import useStore from '@/store/main';

const nickname = localStorage.getItem('vt_nickname');
const message = 2;

const store = useStore();

// 侧边栏折叠
const collapse = computed(() => store.collapse);
const collapseChage = () => {
    store.handleCollapse(!collapse.value);
};

onMounted(() => {
    if (document.body.clientWidth < 1200) {
        collapseChage();
    }
});

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = command => {
    if (command == 'loginout') {
        localStorage.removeItem('vt_nickname');
        localStorage.removeItem('vt_username');
        localStorage.removeItem('vt_password');
        router.push('/login');
    } else if (command == 'user') {
        router.push('/user');
    }
};
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
}

.collapse-btn {
    height: 28px;
    padding: 0 20px;
    background: rgb(40, 52, 70);
    cursor: pointer;
}

.header .logo {
    flex: auto;
    width: 250px;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.btn-bell {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}

.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}

.btn-bell .el-icon {
    color: #fff;
}

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

.el-dropdown-link {
    display: flex;
    color: #fff;
    cursor: pointer;
}
</style>
