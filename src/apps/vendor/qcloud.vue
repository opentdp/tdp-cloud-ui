<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import DnspodBind from "@/provider/qcloud/dnspod/bind.vue"
import LighthouseBind from "@/provider/qcloud/lighthouse/bind.vue"

@Component({
    components: { DnspodBind, LighthouseBind }
})
export default class VendorQcloud extends Vue {
    public vendorId = 0

    public curTab = {
        id: "lighthouse", label: ""
    }

    public created() {
        this.vendorId = +this.$route.params.id
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
                腾讯云
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="curTab.id" type="border-card">
            <el-tab-pane label="轻量服务器" name="lighthouse">
                <LighthouseBind :vendor-id="vendorId" />
            </el-tab-pane>
            <el-tab-pane label="域名解析" name="dnspod">
                <DnspodBind :vendor-id="vendorId" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
c