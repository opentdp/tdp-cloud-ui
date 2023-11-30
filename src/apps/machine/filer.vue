<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"
import { MachineModels, MachineItem } from "@/api/native/machine"
import { FileInfo } from "@/api/native/typings"

import { bytesToSize, dateFormat } from "@/helper/format"

@Component({})
export default class MachineFiler extends Vue {
    public MachineModels = MachineModels

    public bytesToSize = bytesToSize
    public dateFormat = dateFormat

    public loading = true

    public path = '/'
    public files: FileInfo[] = []

    // 初始化

    async created() {
        const machineId = +this.$route.params.id
        await this.getMachine(machineId)
        await this.getFiles()
    }

    // 获取主机

    public machine!: MachineItem

    async getMachine(id: number) {
        const res = await NaApi.machine.detail(id)
        this.machine = res.Item
    }

    // 获取路径列表

    public splitPath() {
        const res = []
        const list = this.path.split('/').filter(v => v)
        for (let i = 0; i < list.length; i++) {
            res.push({
                path: list.slice(0, i + 1).join('/'),
                name: list[i]
            })
        }
        return res
    }

    // 改变浏览路径

    public changePath(path: string) {
        this.path = path.replace(/\\+/g, '/').replace(/\/+/g, '/')
        this.getFiles()
    }

    // 获取文件列表

    async getFiles() {
        this.loading = true
        this.files = []
        const res = await NaApi.workhub.filer(this.machine.WorkerId, {
            Action: 'list', Path: this.path
        })
        if (res && res.length > 0) {
            this.files = res
        }
        this.loading = false
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '名称', ellipsis: true },
        { colKey: 'Size', title: '大小', ellipsis: true },
        { colKey: 'Mode', title: '权限', ellipsis: true },
        { colKey: 'ModTime', title: '修改时间', ellipsis: true },
    ]
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item to="/machine/list">
                文件管理
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="machine">
                {{ machine.HostName || machine.Id }} · {{ MachineModels[machine.Model] }}
            </t-breadcrumb-item>
        </t-breadcrumb>

        <t-card :loading="loading" title="文件管理" hover-shadow header-bordered>
            <template #subtitle>
                文件总数: {{ files.length }}
            </template>
            <t-space fixed direction="vertical">
                <t-breadcrumb>
                    <t-breadcrumb-item @click="changePath('/')">
                        <small>/</small>
                    </t-breadcrumb-item>
                    <t-breadcrumb-item v-for="v, k in splitPath()" :key="k" @click="changePath(v.path)">
                        {{ v.name }}
                    </t-breadcrumb-item>
                </t-breadcrumb>
                <t-table :data="files" :columns="tableColumns" row-key="Id" hover>
                    <template #Name="{ row }">
                        <div v-if="row.IsDir" class="hover" @click="changePath(path + '/' + row.Name)">
                            {{ row.Name }}/
                        </div>
                        <div v-else>
                            {{ row.Name }}
                        </div>
                    </template>
                    <template #Size="{ row }">
                        {{ row.IsDir ? '-' : bytesToSize(row.Size) }}
                    </template>
                    <template #ModTime="{ row }">
                        {{ dateFormat(row.ModTime * 1000, "yyyy-MM-dd hh:mm:ss") }}
                    </template>
                </t-table>
            </t-space>
        </t-card>
    </t-space>
</template>

<style lang="scss" scoped>
.hover {
    cursor: pointer;
}
</style>
