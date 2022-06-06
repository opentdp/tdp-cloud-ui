<template>
    <div>
        <el-card shadow="hover" style="height: 403px">
            <template #header>
                <div class="clearfix">
                    <span>轻量实例</span>
                </div>
            </template>
            <el-table :data="lighthouseInstances" style="width: 100%">
                <el-table-column prop="InstanceName" label="实列名"></el-table-column>
                <el-table-column prop="Zone" label="地域"></el-table-column>
                <el-table-column prop="CPU" label="vCPU"></el-table-column>
                <el-table-column prop="Memory" label="内存(GiB)"></el-table-column>
                <el-table-column prop="PrivateAddresses" label="内网 IP"></el-table-column>
                <el-table-column prop="PublicAddresses" label="外网 IP"></el-table-column>
                <el-table-column prop="ExpiredTime" label="到期时间" width="180"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import Api from '@/api';

const lighthouseRegions = ref([]);
const lighthouseInstances = ref([]);
Api.lighthouse.describeRegionsInstances().then(res => {
    lighthouseRegions.value = res.RegionSet;
    lighthouseInstances.value = res.InstanceSet;
});
</script>
