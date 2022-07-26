<template>
    <div>
        <el-card shadow="hover">
            <template #header>
                <div class="card-header">
                    <b>命令列表</b> &nbsp;
                    <small>域名总数: {{ 0 }}</small>
                </div>
            </template>
            <el-table :data="tatList" table-layout="fixed">
                <el-table-column fixed prop="Name" label="名称" min-width="150" />
                <el-table-column prop="Description" label="描述" min-width="100" />
                <el-table-column prop="Content" label="命令" min-width="250" />
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template #default>
                        <el-button link type="primary" icon="View">
                            运行
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script lang="ts" setup>

import { TATItem } from '@/api/local/tat';
import Api from "@/api"
import { ref } from 'vue';

const tatList = ref<TATItem[]>()

Api.tat.fetchTATList().then((res) => {
    tatList.value = res
})
</script>
<style lang="scss" scoped>
</style>