<script lang="ts">
import { Ref, Prop, Component, Vue } from "vue-facing-decorator"

import { TcApi } from "@/api"
import { InstanceStateMap } from "@/api/tencent/cvm"
import { MachineItem } from "@/api/native/machine"
import * as TC from "@/api/tencent/typings"

import { dateFormat } from "@/helper/format"

import RenameModel from "./instance_rename.vue"

@Component({
    components: { RenameModel }
})
export default class CvmInstance extends Vue {
    public InstanceStateMap = InstanceStateMap
    public dateFormat = dateFormat

    @Ref
    public renameModal!: RenameModel

    @Prop
    public meta!: Omit<MachineItem, "CloudMeta"> & {
        CloudMeta: Required<TC.Cvm.Instance>
    }

    // 初始化

    public created() {
        TcApi.vendor(this.meta.VendorId)
        this.instance = this.meta.CloudMeta
        this.getInstance()
    }

    // 获取区域

    public get region() {
        return this.instance.Placement.Zone.replace(/-\d$/, "")
    }

    // 实例信息

    public instance!: Required<TC.Cvm.Instance>

    async getInstance() {
        const res = await TcApi.cvm.describeInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        if (res.InstanceSet) {
            Object.assign(this.instance, res.InstanceSet[0])
        }
    }

    // 关闭实例

    async stopInstance() {
        this.instance.InstanceState = "STOPPING"
        await TcApi.cvm.stopInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        setTimeout(this.refreshInstance, 1500)
    }

    // 启动实例

    async startInstance() {
        this.instance.InstanceState = "STARTING"
        await TcApi.cvm.startInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        setTimeout(this.refreshInstance, 1500)
    }

    // 重启实例

    async rebootInstance() {
        this.instance.InstanceState = "REBOOTING"
        await TcApi.cvm.rebootInstances(this.region, {
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
                {{ instance.PrivateIpAddresses.join(", ") }}
            </el-descriptions-item>
            <el-descriptions-item label="公网 IP">
                {{ instance.PublicIpAddresses.join(", ") }}
            </el-descriptions-item>
            <el-descriptions-item label="镜像名称">
                {{ instance.ImageId }}
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
</template>
