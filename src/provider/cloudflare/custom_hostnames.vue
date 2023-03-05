<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { CfApi } from "@/api"
import * as CF from "@/api/cloudflare/typings"

import { dateFormat } from "@/helper/format"

@Component
export default class CloudflareCustomHostnames extends Vue {
    public dateFormat = dateFormat

    public loading = true

    @Prop
    public domainInfo!: CF.ZoneItem

    // 初始化

    public created() {
        this.refresh()
    }

    // 刷新记录

    public saasError = 0

    public refresh() {
        this.loading = true
        this.getFallbackOrigin().then(
            () => {
                this.getCustomHostnames()
            },
            (e: Error) => {
                const msg = e && e.message || ""
                if (msg.indexOf("has not been granted") >= 0) {
                    return this.saasError = 4
                }
                if (msg.indexOf("Resource not found") >= 0) {
                    return this.saasError = 2
                }
            }
        ).finally(() => {
            this.loading = false
        })
    }

    // 默认回退源

    public fallbackOrigin: CF.FallbackOrigin = {
        origin: "",
        status: "active"
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

    public newHostname = ""
    public customHostnames: CF.CustomHostnameItem[] = []

    async getCustomHostnames() {
        const res = await CfApi.zones.customHostnames(this.domainInfo.id)
        this.customHostnames = res.Datasets
    }

    async createCustomHostnames() {
        await CfApi.zones.customHostnamesCreate(this.domainInfo.id, this.newHostname)
        this.getCustomHostnames()
        this.newHostname = ""
    }

    async deleteCustomHostnames(rid: string) {
        await CfApi.zones.customHostnamesDelete(this.domainInfo.id, rid)
        this.getCustomHostnames()
    }
}
</script>

<template>
    <el-form-item v-if="saasError == 4">
        <el-alert type="error">
            <h3>错误：如需使用自定义主机名功能，请登录Cloudflare官网，添加一个支付方式。</h3>
            <p>此错误不影响解析及加速功能，非必要可忽略。</p>
        </el-alert>
    </el-form-item>

    <el-card v-else v-loading="loading" shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>自定义主机名</b> &nbsp; &nbsp;
                <small>记录总数: {{ customHostnames?.length || 0 }}</small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" @click="refresh">
                    刷新状态
                </el-button>
            </div>
        </template>

        <el-form-item v-if="fallbackOrigin.origin == ''">
            <el-alert :closable="false" type="error">
                错误，请设置回退域名，且必须已添加对应的A/AAAA/CNAME解析记录
            </el-alert>
        </el-form-item>
        <el-form-item v-if="fallbackOrigin.status != 'active'">
            <el-alert :closable="false" type="warning">
                {{ fallbackOrigin.errors ? fallbackOrigin.errors[0] : fallbackOrigin.status }}
            </el-alert>
        </el-form-item>

        <el-form-item label="回退源">
            <el-input v-model="fallbackOrigin.origin">
                <template #append>
                    <el-button @click="updateFallbackOrigin">
                        设置
                    </el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="主机名">
            <el-input v-model="newHostname">
                <template #append>
                    <el-button @click="createCustomHostnames">
                        添加
                    </el-button>
                </template>
            </el-input>
        </el-form-item>

        <el-divider />
        <el-table :data="customHostnames" table-layout="fixed">
            <el-table-column prop="hostname" label="主机记录" fixed sortable show-overflow-tooltip />
            <el-table-column prop="status" label="域名状态" sortable show-overflow-tooltip />
            <el-table-column prop="ssl.status" label="证书状态" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.ssl.status }}
                </template>
            </el-table-column>
            <el-table-column prop="ssl.certificates" label="证书有效期" show-overflow-tooltip>
                <template #default="scope">
                    {{
                        scope.row.ssl.certificates &&
                            dateFormat(scope.row.ssl.certificates[0].expires_on, "yyyy-MM-dd hh:mm:ss") || '-'
                    }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-popconfirm title="确定删除?" @confirm="deleteCustomHostnames(scope.row.id)">
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
