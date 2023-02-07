<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { TcApi } from "@/api"
import * as TC from "@/api/tencent/typings"

import { dateFormat } from "@/helper/format"

import SnapshotCreate from "./snapshot_create.vue"

@Component({
    emits: ["change"],
    components: { SnapshotCreate }
})
export default class LighthouseSnapshot extends Vue {
    public dateFormat = dateFormat

    @Ref
    public createModal!: SnapshotCreate

    @Prop
    public instance!: TC.Lighthouse.Instance

    // 初始化

    public created() {
        this.getSnapshotList()
    }

    // 获取区域

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 快照列表

    public snapshotList!: TC.Lighthouse.DescribeSnapshotsResponse

    async getSnapshotList() {
        const res = await TcApi.lighthouse.describeSnapshots(this.region, {
            Filters: [{ Name: "instance-id", Values: [this.instance.InstanceId] }],
        })
        this.snapshotList = res
    }

    // 刷新列表

    async refreshSnapshot() {
        await this.getSnapshotList()
        if (this.snapshotList.SnapshotSet.find((item) => item.Percent < 100)) {
            setTimeout(this.refreshSnapshot, 3000)
        }
    }

    // 回滚快照

    async applySnapshot(item: TC.Lighthouse.Snapshot) {
        await TcApi.lighthouse.applyInstanceSnapshot(this.region, {
            InstanceId: this.instance.InstanceId,
            SnapshotId: item.SnapshotId
        })
        this.$emit("change")
    }

    // 删除快照

    async deleteSnapshot(item: TC.Lighthouse.Snapshot) {
        await TcApi.lighthouse.deleteSnapshots(this.region, {
            SnapshotIds: [item.SnapshotId],
        })
        this.refreshSnapshot()
    }
}
</script>

<template>
    <el-card v-if="snapshotList" shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>快照</b> &nbsp; &nbsp;
                <small>快照总数: {{ snapshotList.TotalCount }}</small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" @click="createModal?.open(instance)">
                    创建快照
                </el-button>
            </div>
        </template>
        <el-table :data="snapshotList.SnapshotSet" table-layout="fixed">
            <el-table-column prop="SnapshotName" label="名称" show-overflow-tooltip fixed />
            <el-table-column label="容量" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.DiskSize + "GB" }}
                </template>
            </el-table-column>
            <el-table-column label="进度" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.Percent + "%" }}
                </template>
            </el-table-column>
            <el-table-column label="状态" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.LatestOperationState }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip>
                <template #default="scope">
                    {{ dateFormat(scope.row.CreatedTime, "yyyy-MM-dd hh:mm:ss") }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-popconfirm title="确定回滚?" @confirm="applySnapshot(scope.row)">
                        <template #reference>
                            <el-button link type="warning" icon="Clock">
                                回滚
                            </el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm title="确定删除?" @confirm="deleteSnapshot(scope.row)">
                        <template #reference>
                            <el-button link type="danger" icon="Delete">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <SnapshotCreate ref="createModal" @submit="refreshSnapshot" />
</template>
