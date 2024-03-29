<script lang="ts">
import { Ref, Prop, Component, Vue } from '@/apps/basic';

import { TcApi } from '@/api';
import { InstanceStateMap } from '@/api/tencent/cvm';
import { MachineItem } from '@/api/native/machine';
import * as TC from '@/api/tencent/typings';

import { dateFormat } from '@/helper/format';

import InstanceRename from './instance_rename.vue';

@Component({
    components: { InstanceRename }
})
export default class CvmInstance extends Vue {
    public InstanceStateMap = InstanceStateMap;
    public dateFormat = dateFormat;

    @Ref
    public renameModal!: InstanceRename;

    @Prop
    public machine!: Omit<MachineItem, 'CloudMeta'> & {
        CloudMeta: Required<TC.Cvm.Instance>
    };

    // 初始化

    public created() {
        if (this.machine.VendorId) {
            TcApi.vendor(this.machine.VendorId);
        }
        this.instance = this.machine.CloudMeta;
        this.getInstance();
    }

    // 获取区域

    public get region() {
        return this.instance.Placement.Zone.replace(/-\d$/, '');
    }

    // 实例信息

    public instance!: Required<TC.Cvm.Instance>;

    async getInstance() {
        const res = await TcApi.cvm.describeInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        });
        if (res.InstanceSet) {
            Object.assign(this.instance, res.InstanceSet[0]);
        }
    }

    // 关闭实例

    async stopInstance() {
        this.instance.InstanceState = 'STOPPING';
        await TcApi.cvm.stopInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        });
        setTimeout(this.refreshInstance, 1500);
    }

    // 启动实例

    async startInstance() {
        this.instance.InstanceState = 'STARTING';
        await TcApi.cvm.startInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        });
        setTimeout(this.refreshInstance, 1500);
    }

    // 重启实例

    async rebootInstance() {
        this.instance.InstanceState = 'REBOOTING';
        await TcApi.cvm.rebootInstances(this.region, {
            InstanceIds: [this.instance.InstanceId],
        });
        setTimeout(this.refreshInstance, 1500);
    }

    // 刷新实例

    async refreshInstance() {
        await this.getInstance();
        const s = this.instance.InstanceState;
        if (s != 'RUNNING' && s.match(/ING$/)) {
            setTimeout(this.refreshInstance, 1500);
        }
    }
}
</script>

<template>
    <t-card v-if="instance.InstanceId" title="实例信息" hover-shadow header-bordered>
        <template #subtitle>
            {{ InstanceStateMap[instance.InstanceState] }}
        </template>
        <template #actions>
            <t-space>
                <t-button theme="primary" size="small" :disabled="instance.InstanceState != 'STOPPED'" :loading="instance.InstanceState == 'STARTING'" @click="startInstance">
                    开机
                </t-button>
                <t-button theme="primary" size="small" :disabled="instance.InstanceState != 'RUNNING'" :loading="instance.InstanceState == 'STOPPING'" @click="stopInstance">
                    关机
                </t-button>
                <t-button theme="primary" size="small" :disabled="instance.InstanceState != 'RUNNING'" :loading="instance.InstanceState == 'REBOOTING'" @click="rebootInstance">
                    重启
                </t-button>
                <t-button v-if="instance.InstanceState == 'RUNNING'" v-route="'/machine/vnc/' + machine.Id" theme="primary" size="small">
                    VNC 终端
                </t-button>
                <t-button v-else theme="primary" size="small" disabled>
                    VNC 终端
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
                    <t-button shape="circle" variant="text" @click="renameModal.open(instance)">
                        <t-icon name="edit" />
                    </t-button>
                </div>
            </t-list-item>
            <t-list-item>
                <b>规格</b>
                <span>CPU: {{ instance.CPU }} 核 / 内存: {{ instance.Memory }} GB</span>
            </t-list-item>
            <t-list-item>
                <b>系统盘</b>
                <span>{{ instance.SystemDisk.DiskSize }} GB</span>
            </t-list-item>
            <t-list-item>
                <b>私网 IP</b>
                <span>{{ instance.PrivateIpAddresses.join(", ") }}</span>
            </t-list-item>
            <t-list-item>
                <b>公网 IP</b>
                <span>{{ instance.PublicIpAddresses.join(", ") }}</span>
            </t-list-item>
            <t-list-item>
                <b>镜像名称</b>
                <span>{{ instance.ImageId }}</span>
            </t-list-item>
            <t-list-item>
                <b>操作系统</b>
                <span>{{ instance.OsName }}</span>
            </t-list-item>
            <t-list-item>
                <b>创建时间</b>
                <span>{{ dateFormat(instance.CreatedTime, "yyyy-MM-dd hh:mm:ss") }}</span>
            </t-list-item>
            <t-list-item>
                <b>到期时间</b>
                <span>{{ dateFormat(instance.ExpiredTime, "yyyy-MM-dd hh:mm:ss") }}</span>
            </t-list-item>
        </t-list>
    </t-card>

    <InstanceRename ref="renameModal" @submit="getInstance" />
</template>
