<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

@Component
export default class Error403 extends Vue {
    public goBack() {
        this.$router.go(-1)
    }
}
</script>

<template>
    <div class="error-page">
        <div class="error-code">
            4<span>0</span>3
        </div>
        <div class="error-desc">
            啊哦~ 你没有权限访问该页面哦
        </div>
        <div class="error-handle">
            <el-button v-route="'/'" type="primary" size="large">
                返回首页
            </el-button>
            <el-button class="error-btn" type="primary" size="large" @click="goBack">
                返回上一页
            </el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
}

.error-code {
    line-height: 1;
    font-size: 250px;
    font-weight: bolder;
    color: #f02d2d;

    span {
        color: #00a854;
    }
}

.error-desc {
    font-size: 30px;
    color: #777;
}

.error-handle {
    margin-top: 30px;
    padding-bottom: 200px;

    .error-btn {
        margin-left: 100px;
    }
}
</style>
