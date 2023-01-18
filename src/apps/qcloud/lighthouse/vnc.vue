<script lang="ts" setup>
import { ref, onMounted } from "vue"

import { Api, QApi } from "@/api"
import { TaskScriptItem } from '@/api/local/task_script'

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

const scriptList = ref<TaskScriptItem[]>([])

async function getScriptList() {
    const res = await Api.taskScript.list()
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

getScriptList()
onMounted(() => vncInit())
</script>

<template>
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
</template>

<style lang="scss" scoped>
iframe {
    width: 100%;
    min-height: 860px;
}
</style>
