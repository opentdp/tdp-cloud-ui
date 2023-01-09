<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue"

import { Api, QApi } from "@/api"
import { TATScriptItem } from '@/api/local/tat'

// 初始化

const props = defineProps<{
    vid: string,
    zone: string,
    instanceId: string,
}>()

QApi.lighthouse.vendor(props.vid)

// 获取区域

const region = () => {
    return props.zone.replace(/-\d$/, "")
}

// 加载VNC框架

const frame = ref<HTMLIFrameElement>()

async function vncInit() {
    const res = await QApi.lighthouse.describeInstanceVncUrl(region(), {
        InstanceId: props.instanceId,
    })
    if (frame.value) {
        const vnc = '/api/qcloud/vnc?InstanceVncUrl='
        frame.value.src = vnc + res.InstanceVncUrl
    }
}

// 执行快捷命令

const scriptList = ref<TATScriptItem[]>([])

async function getTATScriptList() {
    const res = await Api.tat.listScript()
    scriptList.value = res
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

// 加载数据

getTATScriptList()
onMounted(() => vncInit())
</script>

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
            <div class="button-list">
                <el-button v-for="item in scriptList" :key="item.Id" @click="vncExec(item.Content)">
                    {{ item.Name }}
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
iframe {
    width: 100%;
    min-height: 860px;
}
</style>
