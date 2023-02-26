<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator";

import { NaApi, AcApi } from "@/api";
import { DomainItem } from "@/api/native/domain";

@Component({
    emits: ["change"],
})
export default class DnsBind extends Vue {
    public loading = true;

    @Prop
    public vendorId = 0;

    @Prop
    public boundList: Record<string, DomainItem> = {};

    // 初始化

    public created() {
        AcApi.vendor(this.vendorId);
        this.getDomainList();
    }

    // 获取列表

    public domainList = [];
    public domainCount = 0;

    async getDomainList() {
        const res = await AcApi.alidns.describeDomainList();
        if (res.Domains) {
            this.domainList = res.Domain || [];
            this.domainCount = res.TotalCount;
        }
        this.loading = false;
    }

    // 绑定域名

    async bindDomian(item: any) {
        await NaApi.domain.create({
            VendorId: this.vendorId,
            Name: item.Name,
            NSList: item.EffectiveDNS.join(","),
            Model: "alibaba/alidns",
            CloudId: item.DomainId + "",
            CloudMeta: item,
            Description: "",
            Status: 1,
        });
        this.$emit("change");
    }

    // 同步域名

    public syncDomian(item: any) {
        const bd = this.boundList[item.DomainId];
        NaApi.domain.update({
            Id: bd ? bd.Id : 0,
            NSList: item.EffectiveDNS.join(","),
            CloudId: item.DomainId + "",
            CloudMeta: item,
        });
    }
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>域名列表</b>
                <small>记录总数: {{ domainCount }}</small>
            </div>
        </template>
        <el-table v-loading="loading" :data="domainList" table-layout="fixed">
            <el-table-column prop="name" label="域名" show-overflow-tooltip fixed />
            <el-table-column label="状态" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.status }}
                </template>
            </el-table-column>
            <el-table-column label="接入方式" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.type == "full" ? "NS" : scope.row.host?.name }}
                </template>
            </el-table-column>
            <el-table-column label="NS 服务器" show-overflow-tooltip>
                <template #default="scope">
                    <template v-if="scope.row.name_servers">
                        {{ scope.row.name_servers.join(",") }}
                    </template>
                    <template v-else> Unknown </template>
                </template>
            </el-table-column>
            <el-table-column label="套餐" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.plan.name }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90" align="center">
                <template #default="scope">
                    <el-button v-if="boundList[scope.row.id]" link icon="View" @click="syncDomian(scope.row)">
                        同步
                    </el-button>
                    <el-button v-else link type="primary" icon="View" @click="bindDomian(scope.row)">
                        导入
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
