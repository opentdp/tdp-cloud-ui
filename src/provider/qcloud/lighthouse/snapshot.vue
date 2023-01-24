<script lang="ts" setup>
import { ref, reactive } from "vue"

import { QApi } from "@/api"
import { Qcloud } from "@/api/qcloud/typings"

import { dateFormat } from "@/helper/utils"

// 初始化

const props = defineProps<{
    instance: Qcloud.Lighthouse.Instance,
}>()

const emits = defineEmits(['change'])

// 获取区域

const region = () => {
    return props.instance.Zone.replace(/-\d$/, "")
}

// 快照列表

const snapshotList = ref<Qcloud.Lighthouse.DescribeSnapshotsResponse>()

async function getSnapshotList() {
    const res = await QApi.lighthouse.describeSnapshots(region(), {
        Filters: [{ Name: "instance-id", Values: [props.instance.InstanceId] }],
    })
    snapshotList.value = res
}

// 创建快照

const createSnapshotBus = reactive({
    dailog: false,
    loading: false,
    model: {
        name: ""
    }
})

async function createSnapshot() {
    createSnapshotBus.loading = true
    await QApi.lighthouse.createInstanceSnapshot(region(), {
        InstanceId: props.instance.InstanceId,
        SnapshotName: createSnapshotBus.model.name
    })
    createSnapshotBus.dailog = false
    createSnapshotBus.loading = false
    refreshSnapshot()
    emits("change")
}

function createSnapshotDailog() {
    createSnapshotBus.model.name = 'Snapshot-' + Date.now()
    createSnapshotBus.dailog = true
}

// 回滚快照

async function applySnapshot(item: Qcloud.Lighthouse.Snapshot) {
    await QApi.lighthouse.applyInstanceSnapshot(region(), {
        InstanceId: props.instance.InstanceId,
        SnapshotId: item.SnapshotId
    })
    emits("change")
}

// 删除快照

async function deleteSnapshot(item: Qcloud.Lighthouse.Snapshot) {
    await QApi.lighthouse.deleteSnapshots(region(), {
        SnapshotIds: [item.SnapshotId],
    })
    refreshSnapshot()
}

// 刷新列表

async function refreshSnapshot() {
    await getSnapshotList()
    if (snapshotList.value?.SnapshotSet.find((item) => item.Percent < 100)) {
        setTimeout(refreshSnapshot, 1500)
    }
}

// 加载数据

getSnapshotList()
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
