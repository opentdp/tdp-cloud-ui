<template>
    <div class="vnc-wrap">
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item to="/">
                首页
            </el-breadcrumb-item>
            <el-breadcrumb-item to="/lighthouse/index">
                轻量服务器
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="'/lighthouse/detail/' + zone + '/' + instanceId">
                {{ instanceId }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                VNC 终端
            </el-breadcrumb-item>
        </el-breadcrumb>
        <iframe ref="frame" frameborder="no" class="mgb10" />
        <el-card shadow="hover">
            <template #header>
                <div class="card-header">
                    <b>快捷命令</b>
                </div>
            </template>
            <el-button v-for="item in cmdList" :key="item.id" @click="vncExec(item.cmd)">
                {{ item.name }}
            </el-button>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import Api from "@/api"

const route = useRoute()
const frame = ref<HTMLIFrameElement>()

const zone = route.params.zone as string
const region = zone.replace(/-\d$/, "")
const instanceId = route.params.instanceId as string

async function vncInit() {
    const data = await Api.lighthouse.describeInstanceVncUrl(region, {
        InstanceId: instanceId,
    })
    if (frame.value) {
        const vnc = '/api/terminal/vnc?InstanceVncUrl='
        frame.value.src = vnc + data.InstanceVncUrl
    }
}

function vncExec(cmd: string) {
    if (frame.value?.contentWindow) {
        const vdoc = frame.value.contentWindow.document
        const cbtn = vdoc.querySelector<HTMLAnchorElement>('a.copyBtn')
        cbtn && cbtn.click(), setTimeout(() => {
            const btn = vdoc.querySelector<HTMLButtonElement>('button.bt_confirm')
            const ipt = vdoc.querySelector<HTMLInputElement>('textarea.vnc-paste-text')
            if (btn && ipt) {
                cmd = cmd.replace(/\n\s+/g, '\n')
                cmd = cmd.replace(/\n+/g, '\n')
                cmd = cmd.trim() + '\n'
                ipt.value = cmd
                btn.click()
            }
        }, 500)
    }
}

const cmdList = [
    {
        id: 0,
        name: "清理垃圾",
        cmd: `
            find /var/log -type f -name *.[0-9] -delete
            find /var/log -type f -name *.gz -delete
            find /var/log -type f -name *.xz -delete

            > /var/log/wtmp
            > /var/log/btmp
            > /var/log/lastlog
            > /var/log/faillog

            > /root/.bash_history
        `
    }
]

onMounted(() => vncInit())
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    min-height: 860px;
}
</style>
