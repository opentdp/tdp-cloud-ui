<template>
    <div>
        <el-card shadow="hover" class="mgb20">
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
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button link type="danger" @click="deleteSecret(scope.$index)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>添加密钥</span>
                </div>
            </template>
            <el-form label-width="90px">
                <el-form-item label="别名">
                    <el-input v-model="form.describe"></el-input>
                </el-form-item>
                <el-form-item label="SecretId">
                    <el-input v-model="form.secretId"></el-input>
                </el-form-item>
                <el-form-item label="SecretKey">
                    <el-input v-model="form.secretKey"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createSecret">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import Api from '@/api';

// 密钥列表

const secretList = ref([]);

const fetchSecrets = () => {
    Api.user.fetchSecrets().then(res => {
        secretList.value = res;
    });
};

// 添加密钥

const form = reactive({
    describe: '',
    secretId: '',
    secretKey: '',
});

const createSecret = () => {
    Api.user.createSecret(form).then(data => {
        ElMessage.success(data.result);
        form.describe = '';
        form.secretId = '';
        form.secretKey = '';
        fetchSecrets();
    });
};

// 删除密钥

const deleteSecret = idx => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        type: 'warning',
    }).then(() => {
        const item = secretList.value[idx];
        Api.user.deleteSecret(item.ID).then(data => {
            secretList.value.splice(idx, 1);
            ElMessage.success(data.result);
        });
    });
};

fetchSecrets();
</script>
