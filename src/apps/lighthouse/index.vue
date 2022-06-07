<template>
    <div>
        <el-card shadow="hover" style="height: 403px">
            <template #header>
                <div class="clearfix">
                    <span>轻量实例</span>
                </div>
            </template>
            <el-table :data="instances" style="width: 100%">
                <el-table-column fixed prop="InstanceName" label="实列名" width="150"></el-table-column>
                <el-table-column label="地域" width="150">
                    <template #default="scope">
                        {{ showRegion(scope.row.Zone) }}
                    </template>
                </el-table-column>
                <el-table-column prop="CPU" label="vCPU" width="100"></el-table-column>
                <el-table-column prop="Memory" label="内存(GiB)" width="100"></el-table-column>
                <el-table-column label="流量(已用/总量)" width="180">
                    <template #default="scope">
                        {{ showTraffic(scope.row.InstanceId) }}
                    </template>
                </el-table-column>
                <el-table-column prop="PrivateAddresses" label="内网 IP" width="150"></el-table-column>
                <el-table-column prop="PublicAddresses" label="外网 IP" width="150"></el-table-column>
                <el-table-column prop="ExpiredTime" label="到期时间" width="180"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

import Api from '@/api';
import { bytesToSize } from '@/helper/utils';

const instances = ref([]);

const regions = reactive({});
const trafficPackages = reactive({});

const geteRegions = async () => {
    const data = await Api.lighthouse.describeRegions();
    data.RegionSet.forEach(async item => {
        regions[item.Region] = item;
        const total = await getInstances(item.Region);
        if (total > 0) {
            getTrafficPackages(item.Region);
        }
    });
};

const getInstances = async (region: string) => {
    const data = await Api.lighthouse.describeInstances(region);
    if (data.TotalCount > 0) {
        instances.value.push(...data.InstanceSet);
    }
    return data.TotalCount;
};

const getTrafficPackages = async (zone: string) => {
    const data = await Api.lighthouse.describeTrafficPackages(zone);
    if (data.TotalCount > 0) {
        data.InstanceTrafficPackageSet.forEach(item => {
            trafficPackages[item.InstanceId] = item.TrafficPackageSet.pop();
        });
    }
};

const showTraffic = (id: string) => {
    if (!trafficPackages[id]) {
        return '';
    }
    const used = bytesToSize(trafficPackages[id].TrafficUsed);
    const total = bytesToSize(trafficPackages[id].TrafficPackageTotal);
    return `${used} / ${total}`;
};

const showRegion = (zone: string) => {
    const r = zone.split('-');
    const n = r.pop();
    zone = r.join('-');
    if (!regions[zone]) {
        return '';
    }
    return regions[zone].RegionName + ` ${n} 区`;
};

geteRegions();
</script>
