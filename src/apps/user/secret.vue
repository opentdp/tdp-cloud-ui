<template>
    <div>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>密钥列表</span>
                </div>
            </template>
            <el-table :data="secretList" style="width: 100%">
                <el-table-column prop="ID" label="序号" width="80"></el-table-column>
                <el-table-column prop="Describe" label="别名" width="160"></el-table-column>
                <el-table-column prop="SecretId" label="Secret Id"></el-table-column>
                <el-table-column prop="SecretKey" label="Secret Key"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Api from '@/api';

const secretList = ref([]);
Api.user.fetchSecrets().then(res => {
    secretList.value = res;
});
</script>

<style lang="scss" scoped>
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
