<script lang="ts" setup>
import { reactive } from "vue"

import { QApi } from "@/api"
import { MachineItem } from "@/api/local/machine"
import { InstanceStateMap } from "@/api/qcloud/lighthouse"
import { Lighthouse } from "@/api/qcloud/typings"

import { dateFormat } from "@/helper/utils"

import Firwwall from './firewall.vue'
import Snapshot from './snapshot.vue'
import Traffic from './traffic.vue'

// 初始化

const props = defineProps<{
    meta: MachineItem,
}>()

QApi.lighthouse.vendor(props.meta.VendorId)

// 获取区域

const region = () => {
    return props.meta.CloudMeta.Zone.replace(/-\d$/, "")
}

// 实例信息

const instance = reactive(props.meta.CloudMeta as Lighthouse.Instance)

async function getInstance() {
    const res = await QApi.lighthouse.describeInstances(region(), {
        InstanceIds: [instance.InstanceId],
    })
    Object.assign(instance, res.InstanceSet[0])
}

// 关闭实例

async function stopInstance() {
    instance.InstanceState = "STOPPING"
    await QApi.lighthouse.stopInstances(region(), {
        InstanceIds: [instance.InstanceId],
    })
    setTimeout(refreshInstance, 1500)
}

// 启动实例

async function startInstance() {
    instance.InstanceState = "STARTING"
    await QApi.lighthouse.startInstances(region(), {
        InstanceIds: [instance.InstanceId],
    })
    setTimeout(refreshInstance, 1500)
}

// 重启实例

async function rebootInstance() {
    instance.InstanceState = "REBOOTING"
    await QApi.lighthouse.rebootInstances(region(), {
        InstanceIds: [instance.InstanceId],
    })
    setTimeout(refreshInstance, 1500)
}

// 刷新实例

async function refreshInstance() {
    await getInstance()
    if (instance.InstanceState.match(/ING$/)) {
        setTimeout(refreshInstance, 1500)
    }
}

// 修改实例名

const modifyInstanceNameBus = reactive({
    dailog: false,
    loading: false,
    model: {
        name: ""
    }
})

async function modifyInstanceName() {
    modifyInstanceNameBus.loading = true
    if (modifyInstanceNameBus.model.name && instance.InstanceName != modifyInstanceNameBus.model.name) {
        await QApi.lighthouse.modifyInstancesAttribute(region(), {
            InstanceIds: [instance.InstanceId],
            InstanceName: modifyInstanceNameBus.model.name
        })
        instance.InstanceName = modifyInstanceNameBus.model.name
    }
    modifyInstanceNameBus.dailog = false
    modifyInstanceNameBus.loading = false
}

// 加载数据

getInstance()
</script>

<template>
    <el-card v-if="instance" shadow="hover" class="mgb10">
        <template #header>
            <div class="flex-between">
                <b>实例信息</b> &nbsp; &nbsp;
                <small style="color: #a0cfff;">
                    {{ InstanceStateMap[instance.InstanceState] }}
                </small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" :disabled="instance.InstanceState != 'STOPPED'"
                    :loading="instance.InstanceState == 'STARTING'" @click="startInstance">
                    开机
                </el-button>
                <el-button type="primary" plain size="small" :disabled="instance.InstanceState != 'RUNNING'"
                    :loading="instance.InstanceState == 'STOPPING'" @click="stopInstance">
                    关机
                </el-button>
                <el-button type="primary" plain size="small" :disabled="instance.InstanceState != 'RUNNING'"
                    :loading="instance.InstanceState == 'REBOOTING'" @click="rebootInstance">
                    重启
                </el-button>
                <el-button v-if="instance.InstanceState == 'RUNNING'" type="primary" plain size="small">
                    <router-link :to="'/machine/vnc/' + meta.Id">
                        VNC 终端
                    </router-link>
                </el-button>
                <el-button v-else type="primary" plain size="small" disabled>
                    VNC 终端
                </el-button>
            </div>
        </template>
        <el-descriptions :column="2" border>
            <el-descriptions-item label="实例ID">
                {{ instance.InstanceId }}
            </el-descriptions-item>
            <el-descriptions-item label="实例名">
                {{ instance.InstanceName }}
                <el-button link icon="EditPen" @click="modifyInstanceNameBus.dailog = true" />
            </el-descriptions-item>
            <el-descriptions-item label="规格">
                CPU: {{ instance.CPU }} 核 / 内存: {{ instance.Memory }} GB
            </el-descriptions-item>
            <el-descriptions-item label="系统盘">
                {{ instance.SystemDisk.DiskSize }} GB
            </el-descriptions-item>
            <el-descriptions-item label="私网 IP">
                {{ instance.PrivateAddresses.join(", ") }}
            </el-descriptions-item>
            <el-descriptions-item label="公网 IP">
                {{ instance.PublicAddresses.join(", ") }}
            </el-descriptions-item>
            <el-descriptions-item label="镜像名称">
                {{ instance.BlueprintId }}
            </el-descriptions-item>
            <el-descriptions-item label="操作系统">
                {{ instance.OsName }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
                {{ dateFormat(instance.CreatedTime, "yyyy-MM-dd hh:mm:ss") }}
            </el-descriptions-item>
            <el-descriptions-item label="到期时间">
                {{ dateFormat(instance.ExpiredTime, "yyyy-MM-dd hh:mm:ss") }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>

    <el-dialog v-model="modifyInstanceNameBus.dailog" destroy-on-close title="修改实例名" width="400px">
        <el-form v-if="instance" :model="modifyInstanceNameBus.model">
            <el-form-item label="实例名">
                <el-input v-model="modifyInstanceNameBus.model.name" :value="instance.InstanceName" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modifyInstanceNameBus.dailog = false">取消</el-button>
                <el-button type="primary" :loading="modifyInstanceNameBus.loading" @click="modifyInstanceName">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>

    <Firwwall :instance="instance" />
    <Snapshot :instance="instance" />
    <Traffic :instance="instance" />
</template>
