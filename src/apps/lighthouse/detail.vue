<template>
    <div>
        <el-card v-if="firewall" shadow="hover" class="mgb10">
            <template #header>
                <div class="card-header">
                    <b>防火墙</b> &nbsp;
                    <small>规则总数: {{ firewall.TotalCount }}</small>
                </div>
            </template>
            <el-table :data="firewall.FirewallRuleSet" table-layout="fixed">
                <el-table-column prop="AppType" label="应用类型" min-width="100" />
                <el-table-column prop="CidrBlock" label="来源" min-width="150" />
                <el-table-column prop="Protocol" label="协议" min-width="100" />
                <el-table-column prop="Port" label="端口" min-width="120" />
                <el-table-column prop="Action" label="策略" min-width="100" />
                <el-table-column prop="FirewallRuleDescription" label="备注" min-width="200" />
            </el-table>
        </el-card>
        <el-card v-if="snapshot" shadow="hover" class="mgb10">
            <template #header>
                <div class="card-header">
                    <b>快照</b> &nbsp;
                    <small>快照总数: {{ snapshot.TotalCount }}</small>
                </div>
            </template>
            <el-table :data="snapshot.SnapshotSet" table-layout="fixed">
                <el-table-column fixed prop="SnapshotName" label="名称" min-width="200" />
                <el-table-column label="容量" min-width="100">
                    <template #default="scope">
                        {{ scope.row.DiskSize + "GiB" }}
                    </template>
                </el-table-column>
                <el-table-column label="进度" min-width="150">
                    <template #default="scope">
                        {{ scope.row.Percent + "%" }}
                    </template>
                </el-table-column>
                <el-table-column label="状态" min-width="100">
                    <template #default="scope">
                        {{ scope.row.LatestOperationState }}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" min-width="180">
                    <template #default="scope">
                        {{ dateFormat(scope.row.CreatedTime, "yyyy-MM-dd hh:mm:ss") }}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

import Api, { APIReturnType } from "@/api"
import { dateFormat } from "@/helper/utils"

const route = useRoute()

const zone = route.params.zone as string
const region = zone.replace(/-\d$/, "")
const instanceId = route.params.instanceId as string

const snapshot = ref<APIReturnType<typeof Api.lighthouse.describeSnapshots>>()
const firewall =
    ref<APIReturnType<typeof Api.lighthouse.describeFirewallRules>>()

const describeSnapshots = async () => {
    const data = await Api.lighthouse.describeSnapshots(region, {
        Filters: [{ Name: "instance-id", Values: [instanceId] }],
    })
    snapshot.value = data
}

const describeFirewallRules = async () => {
    const data = await Api.lighthouse.describeFirewallRules(region, {
        InstanceId: instanceId,
    })
    firewall.value = data
}

// 外网平均每秒出流量
// const getLighthouseOuttraffic = async () => {
//   const data = await Api.monitor.getMonitorData(region, {
//     Namespace: "QCE/LIGHTHOUSE",
//     MetricName: "LighthouseOuttraffic",
//     Instances: [
//       {
//         Dimensions: [
//           {
//             Name: "InstanceId",
//             Value: instanceId,
//           },
//         ],
//       },
//     ],
//     Period: 300,
//     StartTime: "2022-06-20 00:00:00",
//     EndTime: "2022-06-30 23:59:59",
//   })
//   firewall.value = data
// }

describeSnapshots()
describeFirewallRules()
</script>

<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
