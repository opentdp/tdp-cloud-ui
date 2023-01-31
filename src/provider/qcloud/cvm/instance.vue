<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { QcApi } from "@/api"
import * as Qcloud from "@/api/qcloud/typings"
import { InstanceStateMap } from "@/api/qcloud/cvm"
import { MachineItem } from "@/api/local/machine"

import { dateFormat } from "@/helper/format"

@Component
export default class CvmInstance extends Vue {
    public InstanceStateMap = InstanceStateMap
    public dateFormat = dateFormat

    @Prop
    public meta!: Omit<MachineItem, "CloudMeta"> & {
        CloudMeta: Required<Qcloud.Cvm.Instance>
    }

    public created() {
        QcApi.vendor(this.meta.VendorId)
        this.instance = this.meta.CloudMeta
        this.getInstance()
    }

    // 获取区域

    public get region() {
        return this.instance.Placement.Zone.replace(/-\d$/, "")
    }

    // 实例信息

    public instance!: Required<Qcloud.Cvm.Instance>

    async getInstance() {
        const res = await QcApi.cvm.describeInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        if (res.InstanceSet) {
            Object.assign(this.instance, res.InstanceSet[0])
        }
    }

    // 关闭实例

    async stopInstance() {
        this.instance.InstanceState = "STOPPING"
        await QcApi.cvm.stopInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        setTimeout(this.refreshInstance, 1500)
    }

    // 启动实例

    async startInstance() {
        this.instance.InstanceState = "STARTING"
        await QcApi.cvm.startInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        })
        setTimeout(this.refreshInstance, 1500)
    }

    // 重启实例

    async rebootInstance() {
        this.instance.InstanceState = "REBOOTING"
        await QcApi.cvm.rebootInstances(this.region, {
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

    // 修改实例名

    public modifyInstanceNameBus = {
        dailog: false,
        loading: false,
        model: {
            name: ""
        }
    }

    async modifyInstanceName() {
        this.modifyInstanceNameBus.loading = true
        if (this.modifyInstanceNameBus.model.name && this.instance.InstanceName != this.modifyInstanceNameBus.model.name) {
            await QcApi.cvm.modifyInstancesAttribute(this.region, {
                InstanceIds: [this.instance.InstanceId],
                InstanceName: this.modifyInstanceNameBus.model.name
            })
            this.instance.InstanceName = this.modifyInstanceNameBus.model.name
        }
        this.modifyInstanceNameBus.dailog = false
        this.modifyInstanceNameBus.loading = false
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
</template>
