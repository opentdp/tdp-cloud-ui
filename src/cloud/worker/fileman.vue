<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { UploadFile, RequestMethodResponse } from 'tdesign-vue-next';

import { NaApi } from '@/api';
import { MachineModels, MachineItem } from '@/api/native/machine';
import { FileInfo } from '@/api/native/typings';

import { bytesToSize, dateFormat } from '@/helper/format';
import * as gobyte from '@/helper/gobyte';

@Component
export default class WorkerFileman extends Vue {
    public MachineModels = MachineModels;

    public bytesToSize = bytesToSize;
    public dateFormat = dateFormat;

    public path = '/';
    public editing = false;

    public fileList: FileInfo[] = [];
    public fileInfo = {
        Type: '',
        Name: '',
        Mode: 0,
        ModTime: 0,
        Data: '',
    };

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
        const list = [];
        const part = this.path.split('/').filter(v => v);
        for (let i = 0; i < part.length; i++) {
            list.push({
                name: part[i], path: part.slice(0, i + 1).join('/')
            });
        }
        return list;
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

    // 获取文件信息

    async getFileData(name: string) {
        this.loading = true;
        const req = { Action: 'read', Path: this.path + '/' + name };
        const res = await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false;
        });
        // 缓存文件信息
        if (res.FileList && res.FileList.length > 0) {
            const file = { ...res.FileList[0], Type: '' };
            if (/\.(bat|cmd|css|conf|html?|ini|js|json|log|php|py|sh|sql|txt|xml)$/.test(name)) {
                file.Type = 'text';
            } else if (/\.(bmp|gif|jpg|jpeg|png|webp)$/.test(name)) {
                file.Type = 'image';
            }
            file.ModTime *= 1000;
            this.fileInfo = file;
        }
    }

    // 下载文件

    async downloadFile(name: string) {
        await this.getFileData(name);
        gobyte.base64ToDownload(this.fileInfo.Data, name);
    }

    // 上传文件

    async uploadFile(file: UploadFile) {
        file.raw && gobyte.fileToBase64(file.raw, async res => {
            const req = {
                Action: 'write',
                Path: this.path + '/' + file.name,
                File: { Data: res }
            };
            await NaApi.workhub.filer(this.machine.WorkerId, req);
            await this.getFileList(this.path);
        });
        const data = { status: 'success', response: {} };
        return Promise.resolve(data as RequestMethodResponse);
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

    // 保存文件

    async saveFile() {
        this.loading = true;
        const file: Partial<FileInfo> = {
            Data: gobyte.textToBase64(this.fileInfo.Data),
            ModTime: Math.floor(this.fileInfo.ModTime / 1000),
        };
        const path = this.path + '/' + this.fileInfo.Name;
        const req = { Action: 'write', Path: path, File: file };
        await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false;
        });
    }

    // 打开文件

    async openFileAs(type: string) {
        const data = this.fileInfo.Data;
        if (type == 'text') {
            this.fileInfo.Type = type;
            this.fileInfo.Data = gobyte.base64ToText(data);
        } else if (type == 'image') {
            this.fileInfo.Type = type;
            this.fileInfo.Data = gobyte.base64ToImage(data);
        }
    }

    // 权限转换

    public octalPermissionsToText(perm: number): string {
        let result = '';
        const octalString = perm.toString(8);
        const permissionMap = ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'];
        for (let i = 0; i < octalString.length; i++) {
            result += permissionMap[parseInt(octalString[i], 10)];
        }
        return result;
    }

    // 打开抽屉

    public visible = false;

    async reviewFile(name: string) {
        await this.getFileData(name);
        this.openFileAs(this.fileInfo.Type);
        this.visible = true;
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
            <t-row class="navbar">
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
                <t-col v-if="editing" flex="auto">
                    <t-input v-model="path" @enter="getFileList(path)">
                        <template #suffixIcon>
                            <t-icon name="enter" class="pointer" @click="getFileList(path)" />
                        </template>
                    </t-input>
                </t-col>
                <t-col v-if="!editing" flex="auto" @click="editing = true">
                    <t-breadcrumb class="breadcrumb">
                        <t-breadcrumb-item v-if="machine?.OSType != 'windows'" v-event-stop @click="getFileList('')">
                            <small>/</small>
                        </t-breadcrumb-item>
                        <t-breadcrumb-item v-for="v, k in getPathCrumb()" :key="k" v-event-stop @click="getFileList(v.path)">
                            {{ v.name }}
                        </t-breadcrumb-item>
                    </t-breadcrumb>
                </t-col>
                <t-col v-if="!editing" class="col-gray">
                    <t-button shape="circle" variant="text" @click="editing = true">
                        <t-icon name="edit-2" />
                    </t-button>
                </t-col>
            </t-row>
            <t-table :data="fileList" :columns="tableColumns" row-key="Id" hover>
                <template #Name="{ row }">
                    <t-link hover="color" @click="row.IsDir ? getFileList(path + '/' + row.Name) : reviewFile(row.Name)">
                        {{ row.Name }}{{ row.IsDir ? '/' : '' }}
                    </t-link>
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
                    <t-link v-else theme="success" hover="color" @click="downloadFile(row.Name)">
                        下载
                    </t-link>
                    <t-link theme="danger" hover="color">
                        <t-popconfirm content="确定删除?" @confirm="deleteFile(row.Name)">
                            删除
                        </t-popconfirm>
                    </t-link>
                </template>
            </t-table>
        </t-space>

        <t-drawer v-model:visible="visible" :header="fileInfo.Name" :footer="fileInfo.Type == 'text'" :close-btn="true" size="60%">
            <div v-if="fileInfo.Type == 'text'">
                <t-form-item label="文件内容">
                    <t-textarea v-model="fileInfo.Data" :autosize="{ minRows: 10 }" />
                </t-form-item>
                <t-form-item label="文件修改日期">
                    <t-date-picker v-model="fileInfo.ModTime" value-type="time-stamp" size="large" allow-input enable-time-picker />
                </t-form-item>
            </div>
            <div v-else-if="fileInfo.Type == 'image'">
                <t-image :src="fileInfo.Data" />
            </div>
            <div v-else>
                <h3>无法识别文件类型，可尝试如下操作：</h3>
                <p class="open-as">
                    <t-link @click="openFileAs('text')">
                        <b>-</b> &nbsp; 作为文本打开
                    </t-link>
                </p>
                <p class="open-as">
                    <t-link @click="openFileAs('image')">
                        <b>-</b> &nbsp; 作为图片打开
                    </t-link>
                </p>
            </div>
            <template #footer>
                <t-button theme="primary" :loading="loading" @click="saveFile()">
                    提交
                </t-button>
            </template>
        </t-drawer>
    </t-card>
</template>

<style lang="scss" scoped>
.navbar {
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
}

.open-as {
    margin: 10px 0 0 10px;
}
</style>
