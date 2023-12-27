<script lang="ts">
import { Ref, Component, Vue } from '@/apps/basic';

import { UploadFile, RequestMethodResponse } from 'tdesign-vue-next';

import { NaApi } from '@/api';
import { MachineModels, MachineItem } from '@/api/native/machine';
import { FileInfo } from '@/api/native/typings';

import { bytesToSize, dateFormat, octalPermissionsToText } from '@/helper/format';
import * as gobyte from '@/helper/gobyte';

import FilemanMkdir from './mkdir.vue';
import FilemanCreate from './create.vue';
import FilemanRename from './rename.vue';
import FilemanReview from './review.vue';

@Component({
    components: { FilemanMkdir, FilemanCreate, FilemanRename, FilemanReview }
})
export default class FilemanList extends Vue {
    public textExpr = /\.(bat|cmd|css|conf|html?|ini|js|json|log|php|py|sh|sql|txt|xml)$/;
    public imageExpr = /\.(bmp|gif|jpg|jpeg|png|webp)$/;

    public MachineModels = MachineModels;

    public octalPermissionsToText = octalPermissionsToText;
    public bytesToSize = bytesToSize;
    public dateFormat = dateFormat;

    @Ref
    public mkdirModal!: FilemanMkdir;

    @Ref
    public createModal!: FilemanCreate;

    @Ref
    public renameModal!: FilemanRename;

    @Ref
    public reviewModal!: FilemanReview;

    public path = '/';
    public editing = false;

    public machine!: MachineItem;
    public fileList: FileInfo[] = [];

    // 初始化

    public created() {
        const id = +this.$route.params.id;
        this.getMachine(id);
    }

    async getMachine(id: number) {
        this.loading = true;
        if (id > 0) {
            const res = await NaApi.machine.detail(id);
            this.machine = res.Item;
        } else {
            const res = await NaApi.workhub.detail('host');
            this.machine = {
                Id: 0,
                OSType: /windows/.test(res.Stat.OS) ? 'windows' : 'linux',
                HostName: res.Stat.HostName,
                WorkerId: 'host',
                Model: 'native/workhub',
            } as MachineItem;
        }
        await this.getFileList('');
        this.loading = false;
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
        if (res && res.length > 0) {
            this.fileList = res;
        }
    }

    // 下载文件

    async downloadFile(name: string) {
        this.loading = true;
        await this.reviewModal.downloadFile(name).finally(() => {
            this.loading = false;
        });
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

    // 表格定义

    public tableColumns = [
        { colKey: 'Name', title: '名称', ellipsis: true },
        { colKey: 'Size', title: '大小', ellipsis: true },
        { colKey: 'Mode', title: '权限', ellipsis: true },
        { colKey: 'Owner', title: '属主/组', ellipsis: true },
        { colKey: 'ModTime', title: '修改时间', ellipsis: true },
        { colKey: 'Operation', title: '操作', width: '150px' }
    ];
}
</script>

<template>
    <t-space fixed direction="vertical">
        <t-breadcrumb>
            <t-breadcrumb-item to="/dashboard">
                首页
            </t-breadcrumb-item>
            <t-breadcrumb-item>
                文件管理
            </t-breadcrumb-item>
            <t-breadcrumb-item v-if="machine">
                {{ machine.HostName || machine.Id }} · {{ MachineModels[machine.Model] }}
            </t-breadcrumb-item>
        </t-breadcrumb>

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
                    <t-button theme="success" variant="outline" @click="createModal.open()">
                        <template #icon>
                            <t-icon name="file-add" />
                        </template>
                        新文件
                    </t-button>
                    <t-button theme="primary" variant="outline" @click="mkdirModal.open()">
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
                        <t-link hover="color" @click="row.IsDir ? getFileList(path + '/' + row.Name) : reviewModal.open(row)">
                            {{ row.Name }}{{ row.IsDir ? '/' : '' }}
                        </t-link>
                    </template>
                    <template #Size="{ row }">
                        {{ row.IsDir ? '-' : bytesToSize(row.Size) }}
                    </template>
                    <template #Mode="{ row }">
                        {{ octalPermissionsToText(row.Mode) }}
                    </template>
                    <template #Owner="{ row }">
                        {{ row.Owner || '-' }}/{{ row.Group || '-' }}
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
                        <t-link theme="success" hover="color" @click="renameModal.open(row)">
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
        </t-card>

        <template v-if="machine">
            <FilemanMkdir ref="mkdirModal" :worker-id="machine.WorkerId" :path="path" @submit="getFileList(path)" />
            <FilemanCreate ref="createModal" :worker-id="machine.WorkerId" :path="path" @submit="getFileList(path)" />
            <FilemanRename ref="renameModal" :worker-id="machine.WorkerId" :path="path" @submit="getFileList(path)" />
            <FilemanReview ref="reviewModal" :worker-id="machine.WorkerId" :path="path" />
        </template>
    </t-space>
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
