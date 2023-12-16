<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { AcApi } from '@/api';
import { MachineItem } from '@/api/native/machine';
import { InstanceStateMap } from '@/api/alibaba/ecs';
import * as AC from '@/api/alibaba/typings';

import { dateFormat } from '@/helper/format';

@Component
export default class EcsInstance extends Vue {
    public InstanceStateMap = InstanceStateMap;
    public dateFormat = dateFormat;

    @Prop
    public machine!: Omit<MachineItem, 'CloudMeta'> & {
        CloudMeta: AC.Ecs.DescribeInstancesResponseBodyInstancesInstance
    };

    // 初始化

    public created() {
        if (this.machine.VendorId) {
            AcApi.vendor(this.machine.VendorId);
        }
        this.instance = this.machine.CloudMeta;
        this.getInstance();
    }

    // 获取区域

    public get region() {
        return this.instance.RegionId;
    }

    // 实例信息

    public instance!: AC.Ecs.DescribeInstancesResponseBodyInstancesInstance;

    async getInstance() {
        const res = await AcApi.ecs.describeInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        });
        if (res.Instances) {
            Object.assign(this.instance, res.Instances.Instance[0]);
        }
    }

    // 关闭实例

    async stopInstance() {
        this.instance.Status = 'Stopping';
        await AcApi.ecs.stopInstance(this.region, this.instance.InstanceId);
        setTimeout(this.refreshInstance, 1500);
    }

    // 启动实例

    async startInstance() {
        this.instance.Status = 'Starting';
        await AcApi.ecs.startInstance(this.region, this.instance.InstanceId);
        setTimeout(this.refreshInstance, 1500);
    }

    // 重启实例

    async rebootInstance() {
        this.instance.Status = 'Resetting';
        await AcApi.ecs.rebootInstance(this.region, this.instance.InstanceId);
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

    // 转换为GB显示

    public parseToGB(s: number) {
        return s ? (s / 1024).toFixed(1) + ' GB' : '--';
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
                    <span>CPU: {{ instance.Cpu }} 核 / 内存: {{ parseToGB(instance.Memory) }} GB</span>
                </t-list-item>
                <t-list-item>
                    <b>公网 IP</b>
                    <span>{{ instance.PublicIpAddress?.IpAddress.join(",") }}</span>
                </t-list-item>
                <t-list-item>
                    <b>操作系统</b>
                    <span>{{ instance.OSName }}</span>
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
