<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { Api } from "@/api"

import WorkerBind from "@/provider/worker/bind.vue"

@Component({
    components: { WorkerBind }
})
export default class VendorWorker extends Vue {
    public wsurl = ""

    created() {
        this.wsurl = Api.socket.getWorkerURL()
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
                子节点
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-alert title="节点接入命令" type="warning">
            <template #default>
                <p>TDP_EXEC_ARGS="--remote {{ wsurl }}"</p>
                <p>wget -qO- http://tdp.icu/worker-linux | sh -</p>
            </template>
        </el-alert>
        <div class="space-10" />
        <WorkerBind />
    </div>
</template>
