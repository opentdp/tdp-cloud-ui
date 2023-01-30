<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { CfApi } from "@/api"
import { DomainItem } from "@/api/local/domain"

@Component
export default class CloudflareBind extends Vue {
    public loading = true

    @Prop
    public meta!: {
        vendorId: number
        boundList: Record<string, DomainItem>
    }
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>域名列表</b>
            </div>
        </template>
    </el-card>
</template>
