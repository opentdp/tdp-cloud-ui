<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { CaTypeList, JobStatus, CertbotItem } from "@/api/native/certbot"

import CertbotCreate from "./certbot_create.vue"

@Component({
    components: { CertbotCreate }
})
export default class CertbotList extends Vue {
    public CaTypeList = CaTypeList
    public JobStatus = JobStatus

    public loading = true

    @Ref
    public createModal!: CertbotCreate

    // 初始化

    public created() {
        this.getCertbotList()
    }

    // 证书列表

    public certbotList: CertbotItem[] = []

    async getCertbotList() {
        const res = await NaApi.certbot.list()
        this.certbotList = res.Items
        this.loading = false
    }

    // 删除证书

    async deleteCertbot(idx: number) {
        const item = this.certbotList[idx]
        await NaApi.certbot.remove(item.Id)
        this.certbotList.splice(idx, 1)
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                证书管理
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card title="证书列表" hover-shadow header-bordered>
            <template #subtitle>
                记录总数: {{ certbotList.length }}
            </template>
            <template #actions>
                <el-button plain type="primary" size="small" icon="Plus" @click="createModal.open()">
                    添加
                </el-button>
            </template>
            <el-table v-loading="loading" :data="certbotList" table-layout="fixed">
                <el-table-column prop="Domain" label="域名" fixed sortable show-overflow-tooltip />
                <el-table-column prop="Email" label="邮箱" sortable show-overflow-tooltip />
                <el-table-column prop="CaType" label="CA" sortable show-overflow-tooltip>
                    <template #default="scope">
                        {{ CaTypeList[scope.row.CaType].Name }}
                    </template>
                </el-table-column>
                <el-table-column prop="History" label="证书" show-overflow-tooltip>
                    <template #default="scope">
                        <span v-if="scope.row.History?.event == 'cached'" v-route="'/certbot/detail/' + scope.row.Id">
                            详情
                        </span>
                        <span v-else-if="scope.row.History?.event == 'obtained'"
                            v-route="'/certbot/detail/' + scope.row.Id">
                            详情
                        </span>
                        <div v-else>
                            {{ scope.row.History?.event ? JobStatus[scope.row.History.event] : "未知" }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="90" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确定删除?" @confirm="deleteCertbot(scope.$index)">
                            <template #reference>
                                <el-button link type="danger" icon="Delete">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </t-card>

        <CertbotCreate ref="createModal" @submit="getCertbotList" />
    </t-space>
</template>
