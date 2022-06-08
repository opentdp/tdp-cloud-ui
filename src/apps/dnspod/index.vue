<template>
    <div>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>域名列表</span>
                </div>
            </template>
            <el-table :data="domainDescribe.DomainList" style="width: 100%">
                <el-table-column fixed prop="Name" label="域名"></el-table-column>
                <el-table-column label="状态" width="100">
                    <template #default="scope">
                        {{ statusMap[scope.row.Status] }}
                    </template>
                </el-table-column>
                <el-table-column label="NS 设置" width="100">
                    <template #default="scope">
                        {{ scope.row.DNSStatus ? '错误' : '正常' }}
                    </template>
                </el-table-column>
                <el-table-column prop="EffectiveDNS" label="NS 服务器" width="250"></el-table-column>
                <el-table-column prop="GradeTitle" label="套餐" width="100"></el-table-column>
                <el-table-column prop="VipEndAt" label="套餐有效期" width="180"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Api from '@/api';

const statusMap = {
    ENABLE: '正常',
    PAUSE: '暂停',
    SPAM: '封禁',
};

const domainDescribe = ref({});
Api.dnspod.describeDomainList().then(res => {
    domainDescribe.value = res;
});
</script>
