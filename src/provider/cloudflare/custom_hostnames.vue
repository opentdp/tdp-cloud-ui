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

    // 表格定义

    public tableColumns = [
        { colKey: 'hostname', title: '主机记录', ellipsis: true },
        { colKey: 'status', title: '域名状态', ellipsis: true },
        { colKey: 'ssl.status', title: '证书状态', ellipsis: true },
        { colKey: 'expires_on', title: '证书有效期', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
}
</script>

<template>
    <template v-if="saasError == 4">
        <t-alert theme="error">
            <template #title>
                错误：如需使用自定义主机名功能，请登录Cloudflare官网，添加一个支付方式。
            </template>
            此错误不影响解析及加速功能，非必要可忽略。
        </t-alert>
        <t-space />
    </template>

    <t-card v-else :loading="loading" title="自定义主机名" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ customHostnames?.length || 0 }}
        </template>
        <template #actions>
            <t-button theme="primary" size="small" @click="refresh">
                <template #icon>
                    <t-icon name="refresh" />
                </template>
                刷新状态
            </t-button>
        </template>

        <template v-if="fallbackOrigin.origin == ''">
            <t-alert theme="error">
                错误，请设置回退域名，且必须已添加对应的A/AAAA/CNAME解析记录
            </t-alert>
            <t-space />
        </template>

        <template v-if="fallbackOrigin.status != 'active'">
            <t-alert theme="warning">
                {{ fallbackOrigin.errors ? fallbackOrigin.errors[0] : fallbackOrigin.status }}
            </t-alert>
            <t-space />
        </template>

        <t-form label-align="left" label-width="60px">
            <t-form-item label="回退源">
                <t-input v-model="fallbackOrigin.origin" /> &nbsp;
                <t-button @click="updateFallbackOrigin">
                    设置
                </t-button>
            </t-form-item>
            <t-form-item label="主机名">
                <t-input v-model="newHostname" /> &nbsp;
                <t-button @click="createCustomHostnames">
                    添加
                </t-button>
            </t-form-item>
        </t-form>

        <t-divider />

        <t-table :data="customHostnames" :columns="tableColumns" row-key="id">
            <template #expires_on="{ row }">
                {{
                    row.ssl.certificates &&
                        dateFormat(row.ssl.certificates[0].expires_on, "yyyy-MM-dd hh:mm:ss") || '-'
                }}
            </template>
            <template #Operation="{ row }">
                <t-popconfirm content="确定删除?" @confirm="deleteCustomHostnames(row.id)">
                    <t-link theme="danger" hover="color">
                        删除
                    </t-link>
                </t-popconfirm>
            </template>
        </t-table>
    </t-card>
</template>
