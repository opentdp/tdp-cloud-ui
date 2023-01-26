<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { QApi } from "@/api"
import * as Qcloud from "@/api/qcloud/typings"

import { dateFormat } from "@/helper/utils"

@Component({
    emits: ["change"]
})
export default class LighthouseSnapshot extends Vue {
    public dateFormat = dateFormat

    @Prop
    public instance!: Qcloud.Lighthouse.Instance

    public created() {
        this.getSnapshotList()
    }

    // 获取区域

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 快照列表

    public snapshotList!: Qcloud.Lighthouse.DescribeSnapshotsResponse

    async getSnapshotList() {
        const res = await QApi.lighthouse.describeSnapshots(this.region, {
            Filters: [{ Name: "instance-id", Values: [this.instance.InstanceId] }],
        })
        this.snapshotList = res
    }

    // 创建快照

    public createSnapshotBus = {
        dailog: false,
        loading: false,
        model: {
            name: ""
        }
    }

    async createSnapshot() {
        this.createSnapshotBus.loading = true
        await QApi.lighthouse.createInstanceSnapshot(this.region, {
            InstanceId: this.instance.InstanceId,
            SnapshotName: this.createSnapshotBus.model.name
        })
        this.createSnapshotBus.dailog = false
        this.createSnapshotBus.loading = false
        this.refreshSnapshot()
        this.$emit("change")
    }

    public createSnapshotDailog() {
        this.createSnapshotBus.model.name = 'Snapshot-' + Date.now()
        this.createSnapshotBus.dailog = true
    }

    // 回滚快照

    async applySnapshot(item: Qcloud.Lighthouse.Snapshot) {
        await QApi.lighthouse.applyInstanceSnapshot(this.region, {
            InstanceId: this.instance.InstanceId,
            SnapshotId: item.SnapshotId
        })
        this.$emit("change")
    }

    // 删除快照

    async deleteSnapshot(item: Qcloud.Lighthouse.Snapshot) {
        await QApi.lighthouse.deleteSnapshots(this.region, {
            SnapshotIds: [item.SnapshotId],
        })
        this.refreshSnapshot()
    }

    // 刷新列表

    async refreshSnapshot() {
        await this.getSnapshotList()
        if (this.snapshotList.value?.SnapshotSet.find((item) => item.Percent < 100)) {
            setTimeout(this.refreshSnapshot, 1500)
        }
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
                <el-button type="primary" plain size="small" @click="createSnapshotDailog">
                    创建快照
                </el-button>
            </div>
        </template>
        <el-table :data="snapshotList.SnapshotSet" table-layout="fixed">
            <el-table-column fixed prop="SnapshotName" label="名称" min-width="200" />
            <el-table-column label="容量" min-width="100">
                <template #default="scope">
                    {{ scope.row.DiskSize + "GB" }}
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
            <el-table-column fixed="right" label="操作" width="180" align="center">
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

    <el-dialog v-model="createSnapshotBus.dailog" destroy-on-close title="创建快照" width="400px">
        <el-form v-if="instance" :model="createSnapshotBus.model">
            <el-form-item label="名称">
                <el-input v-model="createSnapshotBus.model.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createSnapshotBus.dailog = false">取消</el-button>
                <el-button type="primary" :loading="createSnapshotBus.loading" @click="createSnapshot">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
