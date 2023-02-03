<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { QcApi } from "@/api"
import * as QC from "@/api/qcloud/typings"
import { InstanceStateMap } from "@/api/qcloud/lighthouse"
import { MachineItem } from "@/api/local/machine"

import { dateFormat } from "@/helper/format"

import Firwwall from "./firewall.vue"
import Snapshot from "./snapshot.vue"
import Traffic from "./traffic.vue"
import RenameModel from "./instance_rename.vue"

@Component({
    components: { Firwwall, Snapshot, Traffic, RenameModel }
})
export default class LighthouseInstance extends Vue {
    public InstanceStateMap = InstanceStateMap
    public dateFormat = dateFormat

    @Ref
    public renameModal!: RenameModel

    @Prop
    public meta!: Omit<MachineItem, "CloudMeta"> & {
        CloudMeta: QC.Lighthouse.Instance
    }

    // 初始化

    public created() {
        QcApi.vendor(this.meta.VendorId)
        this.instance = this.meta.CloudMeta
        this.getInstance()
    }

    // 获取区域

    public get region() {
        return this.instance.Zone.replace(/-\d$/, "")
    }

    // 实例信息

    public instance!: QC.Lighthouse.Instance

    async getInstance() {
        const res = await QcApi.lighthouse.describeInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        if (res.InstanceSet) {
            this.instance = res.InstanceSet[0]
        }
    }

    // 关闭实例

    async stopInstance() {
        this.instance.InstanceState = "STOPPING"
        await QcApi.lighthouse.stopInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        setTimeout(this.refreshInstance, 1500)
    }

    // 启动实例

    async startInstance() {
        this.instance.InstanceState = "STARTING"
        await QcApi.lighthouse.startInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        setTimeout(this.refreshInstance, 1500)
    }

    // 重启实例

    async rebootInstance() {
        this.instance.InstanceState = "REBOOTING"
        await QcApi.lighthouse.rebootInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        setTimeout(this.refreshInstance, 1500)
    }

    // 刷新实例

    async refreshInstance() {
        await this.getInstance()
        if (this.instance.InstanceState.match(/ING$/)) {
            setTimeout(this.refreshInstance, 1500)
        }
    }
}
</script>

<template>
    <el-card v-if="instance.InstanceId" shadow="hover">
        <template #header>
            <div class="flex-between">
                <b>实例信息</b> &nbsp; &nbsp;
                <small style="color: #a0cfff;">
                    {{ InstanceStateMap[instance.InstanceState] }}
                </small>
                <div class="flex-auto" />
                <el-button type="primary" plain size="small" :disabled="instance.InstanceState != 'STOPPED'"
                    :loading="instance.InstanceState == 'STARTING'" @click="startInstance"
                >
                    开机
                </el-button>
                <el-button type="primary" plain size="small" :disabled="instance.InstanceState != 'RUNNING'"
                    :loading="instance.InstanceState == 'STOPPING'" @click="stopInstance"
                >
                    关机
                </el-button>
                <el-button type="primary" plain size="small" :disabled="instance.InstanceState != 'RUNNING'"
                    :loading="instance.InstanceState == 'REBOOTING'" @click="rebootInstance"
                >
                    重启
                </el-button>
                <router-link v-if="instance.InstanceState == 'RUNNING'" :to="'/machine/vnc/' + meta.Id">
                    <el-button type="primary" plain size="small">
                        VNC 终端
                    </el-button>
                </router-link>
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
                <el-button link icon="EditPen" @click="renameModal?.open(instance)" />
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
    <RenameModel ref="renameModal" @submit="getInstance" />
    <div class="space-10" />
    <Firwwall :instance="instance" />
    <div class="space-10" />
    <Snapshot :instance="instance" />
    <div class="space-10" />
    <Traffic :instance="instance" />
</template>
