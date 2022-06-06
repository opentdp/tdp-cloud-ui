<template>
    <div>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>域名列表</span>
                </div>
            </template>
            <el-table :data="domainDescribe.DomainList" style="width: 100%">
                <el-table-column prop="Name" label="域名"></el-table-column>
                <el-table-column prop="Status" label="状态"></el-table-column>
                <el-table-column prop="GradeTitle" label="套餐"></el-table-column>
                <el-table-column prop="VipEndAt" label="套餐到期" width="180"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Api from '@/api';

const domainDescribe = ref({});
Api.dnspod.describeDomainList().then(res => {
    domainDescribe.value = res;
});
</script>
