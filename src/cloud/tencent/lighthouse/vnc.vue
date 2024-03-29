<script lang="ts">
import { Prop, Ref, Component, Vue } from '@/apps/basic';

import { NaApi, TcApi } from '@/api';
import { MachineItem } from '@/api/native/machine';
import { ScriptPayload } from '@/api/native/typings';
import * as TC from '@/api/tencent/typings';

import shellList from '@/helper/script/shell';

@Component
export default class LighthouseVnc extends Vue {
    @Prop
    public machine!: Omit<MachineItem, 'CloudMeta'> & {
        CloudMeta: TC.Lighthouse.Instance
    };

    // 初始化

    public created() {
        TcApi.vendor(this.machine.VendorId);
        this.getScriptList();
        this.vncInit();
    }

    // 获取区域

    public get region() {
        return this.machine.CloudMeta.Zone.replace(/-\d$/, '');
    }

    // 加载VNC框架

    @Ref
    public frame!: HTMLIFrameElement;

    async vncInit() {
        const res = await TcApi.lighthouse.describeInstanceVncUrl(this.region, {
            InstanceId: this.machine.CloudId,
        });
        if (this.frame) {
            const vnc = '/api/tencent/vnc?InstanceVncUrl=';
            this.frame.src = vnc + res.InstanceVncUrl;
        }
    }

    // 获取快捷命令

    public scriptList: ScriptPayload[] = [];

    async getScriptList() {
        const res = await NaApi.script.list();
        const list = [...shellList, ...res.Items];
        // 根据操作系统过滤脚本
        this.scriptList = NaApi.script.osFilter(list, this.machine.OSType);
    }

    // 执行快捷命令

    public vncExec(cmd: string) {
        if (this.frame.contentWindow) {
            const vdoc = this.frame.contentWindow.document;
            const cbtn = vdoc.querySelector<HTMLAnchorElement>('a.copyBtn');
            cbtn && cbtn.click(), setTimeout(() => {
                const btn = vdoc.querySelector<HTMLButtonElement>('button.bt_confirm');
                const ipt = vdoc.querySelector<HTMLInputElement>('textarea.vnc-paste-text');
                if (btn && ipt) {
                    cmd = cmd.replace(/\n\s+/g, '\n');
                    cmd = cmd.replace(/\n+/g, '\n');
                    cmd = cmd.trim() + '\n';
                    ipt.value = cmd;
                    btn.click();
                }
            }, 500);
        }
    }
}
</script>

<template>
    <iframe ref="frame" frameborder="no" />
    <t-card title="快捷命令" hover-shadow header-bordered>
        <t-space fixed break-line>
            <template v-for="v in scriptList" :key="v.Id">
                <t-button variant="outline" @click="vncExec(v.Content)">
                    {{ v.Name }}
                </t-button>
            </template>
        </t-space>
    </t-card>
</template>

<style lang="scss" scoped>
iframe {
    width: 100%;
    min-height: 860px;
}
</style>
