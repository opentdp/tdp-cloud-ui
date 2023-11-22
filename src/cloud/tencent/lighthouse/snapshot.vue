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
        if (this.snapshotList.SnapshotSet.find(item => item.Percent < 100)) {
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

    // 表格定义

    public tableColumns = [
        { colKey: 'SnapshotName', title: '名称', ellipsis: true },
        { colKey: 'DiskSize', title: '容量', ellipsis: true },
        { colKey: 'Percent', title: '进度', ellipsis: true },
        { colKey: 'LatestOperationState', title: '状态', ellipsis: true },
        { colKey: 'CreatedTime', title: '创建时间', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
}
</script>

<template>
    <t-card v-if="snapshotList" title="快照" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ snapshotList.TotalCount }}
        </template>
        <template #actions>
            <t-button theme="primary" size="small" @click="createModal.open(instance)">
                <template #icon>
                    <t-icon name="add" />
                </template>
                创建快照
            </t-button>
        </template>
        <t-table :data="snapshotList.SnapshotSet" :columns="tableColumns" row-key="SnapshotId" hover>
            <template #DiskSize="{ row }">
                {{ row.DiskSize + "GB" }}
            </template>
            <template #Percent="{ row }">
                {{ row.Percent + "%" }}
            </template>
            <template #CreatedTime="{ row }">
                {{ dateFormat(row.CreatedTime, "yyyy-MM-dd hh:mm:ss") }}
            </template>
            <template #Operation="{ row }">
                <t-popconfirm content="确定回滚?" @confirm="applySnapshot(row)">
                    <t-link theme="warning" hover="color">
                        回滚
                    </t-link>
                </t-popconfirm>
                <t-popconfirm content="确定删除?" @confirm="deleteSnapshot(row)">
                    <t-link theme="danger" hover="color">
                        删除
                    </t-link>
                </t-popconfirm>
            </template>
        </t-table>
    </t-card>

    <SnapshotCreate ref="createModal" @submit="refreshSnapshot" />
</template>
