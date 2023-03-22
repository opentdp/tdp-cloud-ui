<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { TcApi } from "@/api"
import { CertbotItem } from "@/api/native/certbot"
import * as TC from "@/api/tencent/typings"

import CertUpload from "./cert_upload.vue"

@Component({
    emits: ["change"],
    components: { CertUpload },
})
export default class SslBind extends Vue {

    public loading = true

    @Ref
    public uploadModal!: CertUpload

    @Prop
    public vendorId = 0

    @Prop
    public boundList: Record<string, CertbotItem> = {}

    // 初始化

    public created() {
        TcApi.vendor(this.vendorId)
        this.getCertList()
    }

    // 获取列表

    public certList: TC.Ssl.Certificates[] = []
    public certCount = 0

    async getCertList() {
        const res = await TcApi.ssl.describeCertificates({})
        if (res.TotalCount) {
            this.certList = res.Certificates || []
            this.certCount = res.TotalCount
        }
        this.loading = false
    }

    // 删除证书

    async deleteCert(item: TC.Ssl.Certificates) {
        await TcApi.ssl.deleteCertificate({
            CertificateId: item.CertificateId,
        })
        this.getCertList()
        this.$emit("change")
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'SubjectAltName', title: '域名', ellipsis: true },
        { colKey: 'ProductZhName', title: '类型	', ellipsis: true },
        { colKey: 'From', title: '来源', ellipsis: true },
        { colKey: 'CertEndTime', title: '有效期', ellipsis: true },
        { colKey: 'StatusName', title: '状态', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" },
    ]
}
</script>

<template>
    <t-card :loading="loading" title="证书列表" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ certCount }}
        </template>
        <template #actions>
            <t-button theme="primary" size="small" @click="uploadModal.open()">
                <template #icon>
                    <t-icon name="add" />
                </template>
                上传证书
            </t-button>
        </template>
        <t-table :data="certList" :columns="tableColumns" row-key="CertificateId">
            <template #SubjectAltName="{ row }">
                {{ row.SubjectAltName.join(", ") }}
            </template>
            <template #From="{ row }">
                {{ row.From == "upload" ? "上传托管" : "-" }}
            </template>
            <template #Operation="{ row }">
                <t-popconfirm content="确定删除？" @confirm="deleteCert(row)">
                    <t-link theme="danger" hover="color">
                        删除
                    </t-link>
                </t-popconfirm>
            </template>
        </t-table>
    </t-card>
    <CertUpload ref="uploadModal" @submit="getCertList" />
</template>
