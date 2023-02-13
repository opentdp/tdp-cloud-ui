<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { CfApi } from "@/api"
import * as CF from "@/api/cloudflare/typings"

@Component
export default class CloudflareCustomHostnames extends Vue {

    @Prop
    public domainInfo!: CF.ZoneItem

    // 初始化

    public created() {
        this.getFallbackOrigin()
        this.getCustomHostnames()
    }

    // 回退源

    public fallbackOrigin: CF.FallbackOrigin = {
        origin: "",
        status: ""
    }

    async getFallbackOrigin() {
        const res = await CfApi.zones.fallbackOrigin(this.domainInfo.id)
        this.fallbackOrigin = res.Datasets
    }

    async updateFallbackOrigin() {
        const res = await CfApi.zones.fallbackOriginUpdate(this.domainInfo.id, this.fallbackOrigin.origin)
        setTimeout(() => this.getFallbackOrigin(), 3000)
        this.fallbackOrigin = res.Datasets
    }

    public deleteFallbackOrigin() {
        CfApi.zones.fallbackOriginDelete(this.domainInfo.id)
    }

    // 自定义主机名

    public customHostnames: CF.CustomHostnameItem[] = []

    async getCustomHostnames() {
        const res = await CfApi.zones.customHostnames(this.domainInfo.id)
        this.customHostnames = res.Datasets
    }

    // 删除记录

    async deleteRecord(id: string) {
        await CfApi.zones.dnsRecordDelete(this.domainInfo.id, id)
        this.getCustomHostnames()
    }
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>自定义主机名</b> &nbsp; &nbsp;
                <small>记录总数: {{ customHostnames?.length || 0 }}</small>
                <div class="flex-auto" />
                <!--el-button link type="primary" icon="Edit" @click="updateModal?.open(scope.row)">
                        添加主机名
                    </el-button-->
            </div>
        </template>
        <el-form-item label="回退源">
            <el-input v-model="fallbackOrigin.origin">
                <template #append>
                    <el-button @click="updateFallbackOrigin">
                        设置
                    </el-button>
                </template>
            </el-input>
        </el-form-item>
        <template v-if="fallbackOrigin.status != 'active'">
            <div class="space-10" />
            <el-alert type="warning" show-icon :closable="false">
                <p>{{ fallbackOrigin.errors ? fallbackOrigin.errors[0] : fallbackOrigin.status }}</p>
            </el-alert>
        </template>
        <el-divider />
        <el-table v-loading="!customHostnames" :data="customHostnames" table-layout="fixed">
            <el-table-column prop="hostname" label="主机记录" show-overflow-tooltip fixed />
            <el-table-column label="证书状态">
                <template #default="scope">
                    {{ scope.row.ssl.status }}
                </template>
            </el-table-column>
            <el-table-column label="证书有效期">
                <template #default="scope">
                    {{ scope.row.ssl.certificates[0].expires_on }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="域名状态" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <!--el-button link type="primary" icon="Edit" @click="updateModal?.open(scope.row)">
                        编辑
                    </el-button-->
                    <el-popconfirm title="确定删除?" @confirm="deleteRecord(scope.row.id)">
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
</template>
