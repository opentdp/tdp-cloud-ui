<script lang="ts">
import { Prop, Component, Vue } from '@/apps/basic';

import { NaApi } from '@/api';
import { FileInfo } from '@/api/native/typings';

import { bytesToSize } from '@/helper/format';
import * as gobyte from '@/helper/gobyte';

@Component({
    emits: ['submit'],
    expose: ['open', 'downloadFile']
})
export default class FilemanReview extends Vue {
    public textExpr = /\.(bat|cmd|css|conf|html?|ini|js|json|log|php|py|sh|sql|txt|xml)$/;
    public imageExpr = /\.(bmp|gif|jpg|jpeg|png|webp)$/;

    public bytesToSize = bytesToSize;

    @Prop
    public workerId = '';

    @Prop
    public path = '/';

    public fileType = '';
    public fileInfo: FileInfo = {
        Name: 'newfile.txt',
        Size: 0,
        Mode: 0,
        ModTime: 0,
        Data: '',
        Symlink: '',
        IsDir: false,
    };

    // 打开文件

    async openFileAs(type: string) {
        const name = this.fileInfo.Name;
        // 推断文件类型
        if (type == 'auto') {
            if (this.imageExpr.test(name)) {
                type = 'image';
            }
            else if (this.textExpr.test(name)) {
                type = 'text';
            }
        }
        // 尝试打开文件
        this.fileType = type;
        if (this.fileType == 'text') {
            const data = await this.getFileData(name);
            this.fileInfo.Data = gobyte.base64ToText(data);
            return;
        }
        if (this.fileType == 'image') {
            const data = await this.getFileData(name);
            this.fileInfo.Data = gobyte.base64ToImage(data);
            return;
        }
    }

    // 下载文件

    async downloadFile(name: string) {
        const data = await this.getFileData(name);
        gobyte.base64ToDownload(data, name);
    }

    // 获取文件数据

    async getFileData(name: string) {
        this.loading = true;
        const req = { Action: 'read', Path: this.path + '/' + name };
        const res = await NaApi.workhub.filer(this.workerId, req).finally(() => {
            this.loading = false;
        });
        if (res.Items && res.Items.length > 0) {
            return res.Items[0].Data;
        }
        return '';
    }

    // 对话框管理

    public visible = false;

    async open(file: FileInfo) {
        this.fileInfo = { ...file, ModTime: file.ModTime * 1000 };
        this.openFileAs('auto');
        this.visible = true;
    }
}
</script>

<template>
    <t-drawer v-model:visible="visible" :header="path + '/'" :footer="fileType == 'text'" :close-btn="true" size="60%">
        <div v-if="fileType == 'text'">
            <t-form-item label="文件名">
                <t-input v-model="fileInfo.Name" disabled />
            </t-form-item>
            <t-form-item label="文件内容">
                <t-textarea v-model="fileInfo.Data" :autosize="{ minRows: 10 }" />
            </t-form-item>
            <t-form-item label="修改时间">
                <t-date-picker v-model="fileInfo.ModTime" value-type="time-stamp" size="large" allow-input enable-time-picker />
            </t-form-item>
        </div>

        <t-space v-else-if="fileType == 'image'" fixed direction="vertical">
            <p><b>名称：</b>{{ fileInfo.Name }}</p>
            <p><b>大小：</b>{{ bytesToSize(fileInfo.Size) }}</p>
            <t-image v-if="fileInfo.Data" :src="fileInfo.Data" />
            <t-loading v-else />
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
            <t-button theme="default" type="reset" @click="visible = false">
                取消
            </t-button>
        </template>
    </t-drawer>
</template>
