<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { MachineItem } from '@/api/native/machine';
import { ScriptItem } from '@/api/native/script';

import { installWorker } from '@/helper/script/shell';

import ScriptExec from './exec.vue';

@Component({
    components: { ScriptExec }
})
export default class ScriptQuick extends Vue {
    public installWorker = installWorker;

    public machines!: MachineItem[];

    @Ref
    public execModal!: ScriptExec;

    // 机器列表

    public get hostnames() {
        if (this.machines) {
            return this.machines.map(item => item.HostName);
        }
        return [];
    }

    // 脚本列表

    public scriptList: ScriptItem[] = [];

    async getScriptList() {
        this.loading = true;
        const res = await NaApi.script.list();
        this.scriptList = res.Items.filter(item => {
            const osType = this.machines[0].OSType;
            if (osType == 'windows') {
                return item.CommandType != 'SHELL';
            } else {
                return item.CommandType == 'SHELL';
            }
        });
        this.loading = false;
    }

    // 执行快捷命令

    public workerExec(cmd: ScriptItem) {
        for (const machine of this.machines) {
            NaApi.workhub.exec(machine.WorkerId, cmd);
        }
    }

    // 对话框管理

    public visible = false;

    public close() {
        this.visible = false;
        this.$emit('submit');
    }

    public open(machines: MachineItem[]) {
        this.visible = true;
        this.loading = false;
        this.machines = machines;
        this.getScriptList();
    }
}
</script>

<template>
    <t-dialog v-model:visible="visible" destroy-on-close header="执行脚本" :footer="false" width="50%">
        <t-space v-if="loading" fixed align="center">
            <t-loading />
        </t-space>

        <t-space fixed direction="vertical">
            <b>选择命令</b>
            <div v-if="scriptList.length == 0">
                暂无可用命令，请在 <b v-route="'/script/list'">脚本管理</b> 页面添加命令。
            </div>
            <t-space v-else break-line size="8px">
                <template v-for="v in scriptList" :key="v.Id">
                    <t-button variant="outline" @click="execModal.open(machines, v)">
                        {{ v.Name }}
                    </t-button>
                </template>
            </t-space>
            <b>目标机器</b>
            <t-tag-input v-model="hostnames" readonly />
        </t-space>

        <ScriptExec ref="execModal" />
    </t-dialog>
</template>
