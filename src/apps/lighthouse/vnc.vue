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
                <div class="flex-between">
                    <b>快捷命令</b>
                </div>
            </template>
            <el-button v-for="item in cmdList" :key="item.Id" @click="vncExec(item.Content)">
                {{ item.Name }}
            </el-button>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

import Api from "@/api"
import { TATItem } from '@/api/local/tat'

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

// 执行快捷命令

const cmdList = ref<TATItem[]>([])

async function fetchTATList() {
    const res = await Api.tat.fetchTATList()
    cmdList.value = res
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

fetchTATList()
onMounted(() => vncInit())
</script>

<style lang="scss" scoped>
iframe {
    width: 100%;
    min-height: 860px;
}
</style>
