<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { UploadFile, RequestMethodResponse } from 'tdesign-vue-next';

import { NaApi } from '@/api';
import { MachineModels, MachineItem } from '@/api/native/machine';
import { FileInfo } from '@/api/native/typings';

import { bytesToSize, dateFormat } from '@/helper/format';
import * as gobyte from '@/helper/gobyte';

@Component({})
export default class WorkerFileman extends Vue {
    public MachineModels = MachineModels;

    public bytesToSize = bytesToSize;
    public dateFormat = dateFormat;

    public loading = true;
    public editing = false;

    public path = '/';
    public fileList: FileInfo[] = [];

    @Prop
    public machine!: MachineItem;

    // 初始化

    public created() {
        this.getFileList('');
    }

    // 获取上级目录

    public prevPath() {
        const ps = this.path.split('/');
        this.getFileList(ps.slice(0, ps.length - 1).join('/'));
    }

    // 获取路径列表

    public getPathCrumb() {
        const res = [];
        const list = this.path.split('/').filter(v => v);
        for (let i = 0; i < list.length; i++) {
            res.push({
                name: list[i],
                path: list.slice(0, i + 1).join('/')
            });
        }
        return res;
    }

    // 获取文件列表

    async getFileList(p: string) {
        this.loading = true;
        this.editing = false;
        // 处理路径
        p = p.replace(/\\+/g, '/').replace(/\/+/g, '/').replace(/^\/+|\/+$/, '');
        if (this.machine.OSType != 'windows') {
            p = '/' + p;
        } else if (p == '') {
            p = 'C:';
        }
        // 获取文件列表
        this.fileList = [];
        const req = { Action: 'ls', Path: this.path = p.trim() };
        const res = await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false;
        });
        if (res.FileList && res.FileList.length > 0) {
            this.fileList = res.FileList;
        }
    }

    // 获取文件数据

    async getFileData(name: string) {
        this.loading = true;
        const req = { Action: 'read', Path: this.path + '/' + name };
        const res = await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false;
        });
        gobyte.base64ToDownload(res.FileData + '', name);
    }

    // 上传文件

    async uploadFile(file: UploadFile) {
        if (file.raw) {
            gobyte.fileToBase64(file.raw, async res => {
                await NaApi.workhub.filer(this.machine.WorkerId, {
                    Action: 'write',
                    Path: this.path + '/' + file.name,
                    File: { Data: res }
                });
                await this.getFileList(this.path);
            });
        }
        const data: RequestMethodResponse = { status: 'success', response: {} };
        return Promise.resolve(data);
    }

    // 删除文件

    async deleteFile(name: string) {
        this.loading = true;
        const req = { Action: 'rm', Path: this.path + '/' + name };
        await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false;
        });
        await this.getFileList(this.path);
    }

    // 权限转换

    public octalPermissionsToText(permissions: number): string {
        let result = '';
        const octalString = permissions.toString(8);
        const permissionMap = ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'];
        for (let i = 0; i < octalString.length; i++) {
            result += permissionMap[parseInt(octalString[i], 10)];
        }
        return result;
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '名称', ellipsis: true },
        { colKey: 'Mode', title: '权限', ellipsis: true },
        { colKey: 'Size', title: '大小', ellipsis: true },
        { colKey: 'ModTime', title: '修改时间', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '110px' }
    ];
}
</script>

<template>
    <t-card :loading="loading" title="文件管理" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ fileList.length }}
        </template>
        <template #actions>
            <t-upload theme="custom" :request-method="uploadFile" />
        </template>
        <t-space fixed direction="vertical">
            <t-row>
                <t-col class="col-btn">
                    <t-button shape="circle" variant="text" @click="getFileList('')">
                        <t-icon name="home" />
                    </t-button>
                </t-col>
                <t-col class="col-btn">
                    <t-button shape="circle" variant="text" @click="getFileList(path)">
                        <t-icon name="load" />
                    </t-button>
                </t-col>
                <t-col class="col-btn">
                    <t-button shape="circle" variant="text" :disabled="path.split('/').length < 2" @click="prevPath()">
                        <t-icon name="rollback" />
                    </t-button>
                </t-col>
                <t-col v-if="!editing" flex="auto">
                    <t-breadcrumb class="breadcrumb">
                        <t-breadcrumb-item v-if="machine?.OSType != 'windows'" @click="getFileList('')">
                            <small>/</small>
                        </t-breadcrumb-item>
                        <t-breadcrumb-item v-for="v, k in getPathCrumb()" :key="k" @click="getFileList(v.path)">
                            {{ v.name }}
                        </t-breadcrumb-item>
                    </t-breadcrumb>
                </t-col>
                <t-col v-else flex="auto">
                    <t-input v-model="path">
                        <template #suffixIcon>
                            <t-icon name="enter" class="pointer" @click="getFileList(path)" />
                        </template>
                    </t-input>
                </t-col>
                <t-col v-if="!editing" class="col-gray">
                    <t-button shape="circle" variant="text" @click="editing = true">
                        <t-icon name="edit-2" />
                    </t-button>
                </t-col>
            </t-row>
            <t-table :data="fileList" :columns="tableColumns" row-key="Id" hover>
                <template #Name="{ row }">
                    {{ row.Name }}{{ row.IsDir ? '/' : '' }}
                </template>
                <template #Mode="{ row }">
                    {{ octalPermissionsToText(row.Mode) }}
                </template>
                <template #Size="{ row }">
                    {{ row.IsDir ? '-' : bytesToSize(row.Size) }}
                </template>
                <template #ModTime="{ row }">
                    {{ dateFormat(row.ModTime * 1000, "yyyy-MM-dd hh:mm:ss") }}
                </template>
                <template #Operation="{ row }">
                    <t-link v-if="row.IsDir" theme="primary" hover="color" @click="getFileList(path + '/' + row.Name)">
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
.pointer {
    cursor: pointer;
}

.col-btn {
    width: 50px;
}

.col-gray {
    background-color: var(--td-gray-color-1);
}

.breadcrumb {
    padding: 5px 10px;
    background-color: var(--td-gray-color-1);
}
</style>
