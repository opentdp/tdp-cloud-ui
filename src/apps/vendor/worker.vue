<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import * as shells from "@/helper/script/shell"

import WorkerBind from "@/provider/worker/bind.vue"

@Component({
    components: { WorkerBind }
})
export default class VendorWorker extends Vue {
    public shells = shells
}
</script>

<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                子节点
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-alert title="节点接入命令" type="warning">
            <pre>{{ shells.installTDPWorker.Content }}</pre>
        </el-alert>
        <div class="space-10" />
        <WorkerBind />
    </div>
</template>
