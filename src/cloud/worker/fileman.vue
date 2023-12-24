<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { UploadFile, RequestMethodResponse } from 'tdesign-vue-next';

import { NaApi } from '@/api';
import { MachineModels, MachineItem } from '@/api/native/machine';
import { FileInfo } from '@/api/native/typings';

import { bytesToSize, dateFormat, octalPermissionsToText } from '@/helper/format';
import * as gobyte from '@/helper/gobyte';

@Component
export default class WorkerFileman extends Vue {
    public textExpr = /\.(bat|cmd|css|conf|html?|ini|js|json|log|php|py|sh|sql|txt|xml)$/;
    public imageExpr = /\.(bmp|gif|jpg|jpeg|png|webp)$/;

    public MachineModels = MachineModels;

    public octalPermissionsToText = octalPermissionsToText;
    public bytesToSize = bytesToSize;
    public dateFormat = dateFormat;

    public path = '/';
    public editing = false;

    public fileList: FileInfo[] = [];
    public fileInfo = {
        Type: '',
        Name: '',
        Size: 0,
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
            if (this.imageExpr.test(name)) {
                file.Type = 'image';
            }
            else if (this.textExpr.test(name)) {
                file.Type = 'text';
            }
            file.ModTime *= 1000;
            this.fileInfo = file;
        }
    }

    // 下载文件

    async downloadFile(name: string) {
        if (this.fileInfo.Name != name) {
            await this.getFileData(name);
        }
        gobyte.base64ToDownload(this.fileInfo.Data, name);
    }

    // 上传文件

    async uploadFile(file: UploadFile) {
        file.raw && gobyte.fileToBase64(file.raw, async res => {
            const path = this.path + '/' + file.name;
            const req = { Action: 'write', Path: path, File: { Data: res } };
            await NaApi.workhub.filer(this.machine.WorkerId, req);
            await this.getFileList(this.path);
        });
        const data = { status: 'success', response: { url: '/' } };
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

    async submitFile() {
        this.loading = true;
        const path = this.path + '/' + this.fileInfo.Name;
        const file: Partial<FileInfo> = {
            Data: gobyte.textToBase64(this.fileInfo.Data),
            ModTime: Math.floor(this.fileInfo.ModTime / 1000),
        };
        const req = { Action: 'write', Path: path, File: file };
        await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false;
        });
        await this.getFileList(this.path);
        this.editorShow = false;
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

    // 新建文件夹

    public mkdirShow = false;
    public mkdirOrigin = '';

    async mkdirRequest() {
        this.loading = true;
        const path = this.path + '/' + this.mkdirOrigin;
        const req = { Action: 'mkdir', Path: path };
        await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false;
        });
        await this.getFileList(this.path);
        this.mkdirShow = false;
    }

    // 文件重命名

    public renameShow = false;
    public renameOrigin = '';

    public renameFile(file: FileInfo) {
        this.fileInfo = { ...file, Type: '' };
        this.renameOrigin = file.Name;
        this.renameShow = true;
    }

    async renameRequest() {
        this.loading = true;
        const path = this.path + '/' + this.renameOrigin;
        const file = {
            Name: this.path + '/' + this.fileInfo.Name,
        };
        const req = { Action: 'mv', Path: path, File: file };
        await NaApi.workhub.filer(this.machine.WorkerId, req).finally(() => {
            this.loading = false;
        });
        await this.getFileList(this.path);
        this.renameShow = false;
    }

    // 文件编辑界面

    public editorShow = false;
    public editorType = 'review';

    public createFile() {
        this.fileInfo = {
            Type: 'text',
            Name: 'newfile.txt',
            Size: 0,
            Mode: 0,
            ModTime: Date.now(),
            Data: '',
        };
        this.openFileAs(this.fileInfo.Type);
        this.editorType = 'create';
        this.editorShow = true;
    }

    async reviewFile(name: string) {
        await this.getFileData(name);
        this.openFileAs(this.fileInfo.Type);
        this.editorType = 'review';
        this.editorShow = true;
    }

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '名称', ellipsis: true },
        { colKey: 'Mode', title: '权限', ellipsis: true },
        { colKey: 'Size', title: '大小', ellipsis: true },
        { colKey: 'ModTime', title: '修改时间', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '150px' }
    ];
}
</script>

<template>
    <t-card :loading="loading" title="文件管理" hover-shadow header-bordered>
        <template #subtitle>
            记录总数: {{ fileList.length }}
        </template>
        <template #actions>
            <t-space>
                <t-upload theme="custom" :request-method="uploadFile">
                    <t-button theme="warning" variant="outline">
                        <template #icon>
                            <t-icon name="upload" />
                        </template>
                        上传
                    </t-button>
                </t-upload>
                <t-button theme="success" variant="outline" @click="createFile()">
                    <template #icon>
                        <t-icon name="file-add" />
                    </template>
                    新文件
                </t-button>
                <t-button theme="primary" variant="outline" @click="mkdirShow = true">
                    <template #icon>
                        <t-icon name="folder-add" />
                    </template>
                    新目录
                </t-button>
            </t-space>
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
                    <t-input v-model="path" :autofocus="true" @enter="getFileList(path)">
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
                    <t-link v-else theme="primary" hover="color" @click="downloadFile(row.Name)">
                        下载
                    </t-link>
                    <t-link theme="success" hover="color" @click="renameFile(row)">
                        改名
                    </t-link>
                    <t-link theme="danger" hover="color">
                        <t-popconfirm content="确定删除?" @confirm="deleteFile(row.Name)">
                            删除
                        </t-popconfirm>
                    </t-link>
                </template>
            </t-table>
        </t-space>

        <t-dialog v-model:visible="mkdirShow" destroy-on-close header="新建目录" :footer="false" width="50%">
            <t-form ref="formRef" label-width="60px" @submit="mkdirRequest()">
                <t-form-item label="目录名">
                    <t-input v-model="mkdirOrigin" />
                </t-form-item>
                <t-form-item>
                    <t-space size="small">
                        <t-button theme="primary" type="submit">
                            提交
                        </t-button>
                        <t-button theme="default" type="reset" @click="mkdirShow = false">
                            取消
                        </t-button>
                    </t-space>
                </t-form-item>
            </t-form>
        </t-dialog>

        <t-dialog v-model:visible="renameShow" destroy-on-close header="文件改名" :footer="false" width="50%">
            <t-form ref="formRef" label-width="60px" @submit="renameRequest()">
                <t-form-item label="文件名">
                    <t-input v-model="fileInfo.Name" />
                </t-form-item>
                <t-form-item>
                    <t-space size="small">
                        <t-button theme="primary" type="submit">
                            提交
                        </t-button>
                        <t-button theme="default" type="reset" @click="renameShow = false">
                            取消
                        </t-button>
                    </t-space>
                </t-form-item>
            </t-form>
        </t-dialog>

        <t-drawer v-model:visible="editorShow" :header="path + '/'" :footer="fileInfo.Type == 'text'" :close-btn="true" size="60%">
            <div v-if="fileInfo.Type == 'text'">
                <t-form-item label="文件名">
                    <t-input v-model="fileInfo.Name" :disabled="editorType == 'review'" />
                </t-form-item>
                <t-form-item label="文件内容">
                    <t-textarea v-model="fileInfo.Data" :autosize="{ minRows: 10 }" />
                </t-form-item>
                <t-form-item label="修改时间">
                    <t-date-picker v-model="fileInfo.ModTime" value-type="time-stamp" size="large" allow-input enable-time-picker />
                </t-form-item>
            </div>
            <t-space v-else-if="fileInfo.Type == 'image'" fixed direction="vertical">
                <p><b>名称：</b>{{ fileInfo.Name }}</p>
                <p><b>大小：</b>{{ bytesToSize(fileInfo.Size) }}</p>
                <t-image :src="fileInfo.Data" />
            </t-space>
            <t-space v-else fixed direction="vertical">
                <p><b>名称：</b>{{ fileInfo.Name }}</p>
                <p><b>大小：</b>{{ bytesToSize(fileInfo.Size) }}</p>
                <t-space fixed direction="vertical">
                    <b>无法从扩展名推断文件类型，可尝试如下操作：</b>
                    <t-link @click="openFileAs('text')">
                        <b>-</b> &nbsp; 作为文本打开
                    </t-link>
                    <t-link @click="openFileAs('image')">
                        <b>-</b> &nbsp; 作为图片打开
                    </t-link>
                    <t-link @click="downloadFile(fileInfo.Name)">
                        <b>-</b> &nbsp; 下载此文件
                    </t-link>
                </t-space>
            </t-space>
            <template #footer>
                <t-button theme="primary" :loading="loading" @click="submitFile()">
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
</style>
