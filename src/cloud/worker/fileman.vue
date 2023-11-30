<script lang="ts">
import { Prop, Component, Vue } from "vue-facing-decorator"

import { UploadFile, RequestMethodResponse } from "tdesign-vue-next"

import { NaApi } from "@/api"
import { MachineModels, MachineItem } from "@/api/native/machine"
import { FileInfo } from "@/api/native/typings"

import { bytesToSize, dateFormat } from "@/helper/format"
import * as gobyte from "@/helper/gobyte"

@Component({})
export default class WorkerFileman extends Vue {
    public MachineModels = MachineModels

    public bytesToSize = bytesToSize
    public dateFormat = dateFormat

    public loading = true

    public path = '/'
    public fileList: FileInfo[] = []

    @Prop
    public machine!: MachineItem

    // 初始化

    async created() {
        if (this.machine.OSType == 'windows') {
            this.path = 'C:'
        }
        await this.getFileList()
    }

    // 改变浏览路径

    public setPath(path: string) {
        this.path = path.replace(/\\+/g, '/').replace(/\/+/g, '/')
        this.getFileList()
    }

    // 获取路径列表

    public getPathCrumb() {
        const res = []
        const list = this.path.split('/').filter(v => v)
        for (let i = 0; i < list.length; i++) {
            res.push({
                name: list[i],
                path: list.slice(0, i + 1).join('/')
            })
        }
        return res
    }

    // 获取文件列表

    async getFileList() {
        this.loading = true
        this.fileList = []
        const req = { Action: 'ls', Path: this.path }
        const res = await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false
        })
        if (res.FileList && res.FileList.length > 0) {
            this.fileList = res.FileList
        }
    }

    // 获取文件数据

    async getFileData(name: string) {
        this.loading = true
        const req = { Action: 'read', Path: this.path + '/' + name }
        const res = await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false
        })
        gobyte.base64ToDownload(res.FileData + "", name)
    }

    // 上传文件

    async uploadFile(file: UploadFile) {
        if (file.raw) {
            gobyte.fileToBase64(file.raw, async res => {
                const req = {
                    Action: 'write',
                    Path: this.path + '/' + file.name,
                    File: { Data: res }
                }
                await NaApi.workhub.filer(this.machine.WorkerId, req)
                await this.getFileList()
            })
        }
        const data: RequestMethodResponse = {
            status: 'success',
            response: {}
        }
        return Promise.resolve(data)
    }

    // 删除文件

    async deleteFile(name: string) {
        this.loading = true
        const req = { Action: 'rm', Path: this.path + '/' + name }
        await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false
        })
        await this.getFileList()
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '名称', ellipsis: true },
        { colKey: 'Size', title: '大小', ellipsis: true },
        { colKey: 'Mode', title: '权限', ellipsis: true },
        { colKey: 'ModTime', title: '修改时间', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: "110px" }
    ]
}
</script>

<template>
    <t-card :loading="loading" title="文件管理" hover-shadow header-bordered>
        <template #subtitle>
            文件总数: {{ fileList.length }}
        </template>
        <template #actions>
            <t-space>
                <t-upload theme="custom" :request-method="uploadFile" />
                <t-button theme="primary" @click="getFileList()">
                    <template #icon>
                        <t-icon name="load" />
                    </template>
                    刷新
                </t-button>
            </t-space>
        </template>
        <t-space fixed direction="vertical">
            <t-breadcrumb>
                <t-breadcrumb-item v-if="machine?.OSType != 'windows'" @click="setPath('/')">
                    <small>/</small>
                </t-breadcrumb-item>
                <t-breadcrumb-item v-for="v, k in getPathCrumb()" :key="k" @click="setPath(v.path)">
                    {{ v.name }}
                </t-breadcrumb-item>
            </t-breadcrumb>
            <t-table :data="fileList" :columns="tableColumns" row-key="Id" hover>
                <template #Name="{ row }">
                    {{ row.Name }}{{ row.IsDir ? '/' : '' }}
                </template>
                <template #Size="{ row }">
                    {{ row.IsDir ? '-' : bytesToSize(row.Size) }}
                </template>
                <template #ModTime="{ row }">
                    {{ dateFormat(row.ModTime * 1000, "yyyy-MM-dd hh:mm:ss") }}
                </template>
                <template #Operation="{ row }">
                    <t-link v-if="row.IsDir" theme="primary" hover="color" @click="setPath(path + '/' + row.Name)">
                        浏览
                    </t-link>
                    <t-link v-else theme="success" hover="color" @click="getFileData(row.Name)">
                        下载
                    </t-link>
                    <t-popconfirm content="确定删除?" @confirm="deleteFile(row.Name)">
                        <t-link theme="danger" hover="color">
                            删除
                        </t-link>
                    </t-popconfirm>
                </template>
            </t-table>
        </t-space>
    </t-card>
</template>

<style lang="scss" scoped>
.hover {
    cursor: pointer;
}
</style>
