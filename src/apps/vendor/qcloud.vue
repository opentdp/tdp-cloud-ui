<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import DnspodBind from '@/provider/qcloud/dnspod/bind.vue'
import LighthouseBind from '@/provider/qcloud/lighthouse/bind.vue'

@Component({
    components: { DnspodBind, LighthouseBind }
})
export default class VendorQcloud extends Vue {
    public vid = 0

    public curTab = {
        id: "lighthouse", label: ""
    }

    public created() {
        this.vid = +this.$route.params.vid
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
                <LighthouseBind :vid="vid" />
            </el-tab-pane>
            <el-tab-pane label="域名解析" name="dnspod">
                <DnspodBind :vid="vid" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
c