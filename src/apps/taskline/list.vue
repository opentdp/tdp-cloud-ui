
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { TasklineItem } from "@/api/native/taskline"
import { dateFormat } from "@/helper/format"

@Component
export default class TasklineList extends Vue {
    public dateFormat = dateFormat

    public timer = 0

    // 初始化

    public created() {
        this.getHistory()
        this.timer = setInterval(() => {
            this.expanded || this.getHistory()
        }, 5000)
    }

    public unmounted() {
        clearInterval(this.timer)
    }

    // 历史记录

    public historyList: TasklineItem[] = []

    async getHistory() {
        const res = await NaApi.taskline.list()
        this.historyList = res.Datasets
    }

    // 侧边栏开关

    public expanded = false

    async expandChange(row: TasklineItem[], rs: TasklineItem[]) {
        this.expanded = rs.length > 0
    }
}
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                任务记录
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <template #header>
                <div class="flex-between">
                    <b>任务记录</b> &nbsp; &nbsp;
                    <small>记录总数: {{ historyList.length }}</small>
                </div>
            </template>
            <el-table :data="historyList" @expand-change="expandChange">
                <el-table-column prop="Id" label="任务ID" show-overflow-tooltip fixed />
                <el-table-column prop="HostName" label="主机名" show-overflow-tooltip />
                <el-table-column prop="Subject" label="任务名称" show-overflow-tooltip />
                <el-table-column prop="Status" label="执行状态" show-overflow-tooltip />
                <el-table-column label="更新时间" show-overflow-tooltip>
                    <template #default="scope">
                        {{ dateFormat(scope.row.UpdatedAt * 1000, "yyyy-MM-dd hh:mm:ss") }}
                    </template>
                </el-table-column>
                <el-table-column label="详情" type="expand" width="90">
                    <template #default="scope">
                        <div class="expand-output">
                            <h3>请求信息</h3>
                            <pre v-highlight data-remove-indent max-height="500" class="lang-json">
                                <code>{{ JSON.stringify(scope.row.Request, null, 4) }}</code>
                            </pre>
                            <template v-if="scope.row.Response.Error">
                                <h3>错误信息</h3>
                                <pre v-highlight data-remove-indent max-height="500" class="lang-json">
                                    <code>{{ JSON.stringify(scope.row.Response.Error) }}</code>
                                </pre>
                            </template>
                            <h3>响应内容</h3>
                            <pre v-highlight data-remove-indent max-height="500">
                                <code>{{ scope.row.Response.Output }}</code>
                            </pre>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.expand-output {
    margin: -8px 0;
    padding: 0 8px;
}
</style>
