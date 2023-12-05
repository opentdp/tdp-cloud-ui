<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { AcApi } from '@/api';
import { MachineItem } from '@/api/native/machine';
import { InstanceStateMap } from '@/api/alibaba/swas';
import * as AC from '@/api/alibaba/typings';

import { dateFormat } from '@/helper/format';

@Component
export default class SwasInstance extends Vue {
    public InstanceStateMap = InstanceStateMap;
    public dateFormat = dateFormat;

    @Prop
    public machine!: Omit<MachineItem, 'CloudMeta'> & {
        CloudMeta: AC.Swas.ListInstancesResponseBodyInstances
    };

    // 初始化

    public created() {
        AcApi.vendor(this.machine.VendorId);
        this.instance = this.machine.CloudMeta;
        this.getInstance();
    }

    // 获取区域

    public get region() {
        return this.instance.RegionId;
    }

    // 实例信息

    public instance!: AC.Swas.ListInstancesResponseBodyInstances;

    async getInstance() {
        const res = await AcApi.swas.listInstances(this.region, {
            InstanceIds: this.instance.InstanceId,
        });
        if (res.Instances) {
            Object.assign(this.instance, res.Instances[0]);
        }
    }
    // 关闭实例

    async stopInstance() {
        this.instance.Status = 'Stopping';
        await AcApi.swas.stopInstance(this.region, this.instance.InstanceId);
        setTimeout(this.refreshInstance, 1500);
    }

    // 启动实例

    async startInstance() {
        this.instance.Status = 'Starting';
        await AcApi.swas.startInstance(this.region, this.instance.InstanceId);
        setTimeout(this.refreshInstance, 1500);
    }

    // 重启实例

    async rebootInstance() {
        this.instance.Status = 'Resetting';
        await AcApi.swas.rebootInstance(this.region, this.instance.InstanceId);
        setTimeout(this.refreshInstance, 1500);
    }

    // 刷新实例

    async refreshInstance() {
        await this.getInstance();
        const s = this.instance.Status;
        if (s != 'Running' && s.match(/ing$/)) {
            setTimeout(this.refreshInstance, 1500);
        }
    }
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-card v-if="instance.InstanceId" title="实例信息" hover-shadow header-bordered>
            <template #subtitle>
                {{ InstanceStateMap[instance.Status] }}
            </template>
            <template #actions>
                <t-space>
                    <t-button theme="primary" size="small" :disabled="instance.Status != 'Stopped'" :loading="instance.Status == 'Starting'" @click="startInstance">
                        开机
                    </t-button>
                    <t-button theme="primary" size="small" :disabled="instance.Status != 'Running'" :loading="instance.Status == 'Stopping'" @click="stopInstance">
                        关机
                    </t-button>
                    <t-button theme="primary" size="small" :disabled="instance.Status != 'Running'" :loading="instance.Status == 'Resetting'" @click="rebootInstance">
                        重启
                    </t-button>
                </t-space>
            </template>
            <t-list :split="true">
                <t-list-item>
                    <b>实例ID</b>
                    <span>{{ instance.InstanceId }}</span>
                </t-list-item>
                <t-list-item>
                    <b>实例名</b>
                    <div>
                        {{ instance.InstanceName }}
                    </div>
                </t-list-item>
                <t-list-item>
                    <b>规格</b>
                    <span>CPU: {{ instance.ResourceSpec.Cpu }} 核 / 内存: {{ instance.ResourceSpec.Memory }} GB</span>
                </t-list-item>
                <t-list-item>
                    <b>系统盘</b>
                    <span>{{ instance.ResourceSpec.DiskSize }} GB</span>
                </t-list-item>
                <t-list-item>
                    <b>公网 IP</b>
                    <span>{{ instance.PublicIpAddress }}</span>
                </t-list-item>
                <t-list-item>
                    <b>镜像 Id</b>
                    <span>{{ instance.ImageId }}</span>
                </t-list-item>
                <t-list-item>
                    <b>创建时间</b>
                    <span>{{ dateFormat(instance.CreationTime, "yyyy-MM-dd hh:mm:ss") }}</span>
                </t-list-item>
                <t-list-item>
                    <b>到期时间</b>
                    <span>{{ dateFormat(instance.ExpiredTime, "yyyy-MM-dd hh:mm:ss") }}</span>
                </t-list-item>
            </t-list>
        </t-card>
    </t-space>
</template>
