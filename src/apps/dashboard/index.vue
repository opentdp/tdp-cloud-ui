<script lang="ts">
import { Component, Vue } from "vue-facing-decorator"

import { NaApi } from "@/api"

@Component
export default class DashboardIndex extends Vue {
    public loading = true

    // 初始化

    public created() {
        this.getAccountSummary()
    }

    // 概要信息

    public summary = {
        domain: 0,
        machine: 0,
        vendor: 0,
    }

    async getAccountSummary() {
        const rs1 = await NaApi.domain.list()
        this.summary.domain = rs1.Datasets.length

        const rs2 = await NaApi.machine.list()
        this.summary.machine = rs2.Datasets.length

        const rs3 = await NaApi.vendor.list()
        this.summary.vendor = rs3.Datasets.length

        this.loading = false
    }
}
</script>

<template>
    <el-row :gutter="20">
        <el-col>
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="grid-content grid-con-2">
                    <el-icon class="grid-con-icon">
                        <Connection />
                    </el-icon>
                    <div class="grid-cont-right">
                        <div class="grid-num">
                            {{ summary.vendor }}
                        </div>
                        <div>厂商</div>
                    </div>
                </div>
            </el-card>
            <div class="space-10" />
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="grid-content grid-con-3">
                    <el-icon class="grid-con-icon">
                        <Monitor />
                    </el-icon>
                    <div class="grid-cont-right">
                        <div class="grid-num">
                            {{ summary.machine }}
                        </div>
                        <div>主机</div>
                    </div>
                </div>
            </el-card>
            <div class="space-10" />
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="grid-content grid-con-1">
                    <el-icon class="grid-con-icon">
                        <Lightning />
                    </el-icon>
                    <div class="grid-cont-right">
                        <div class="grid-num">
                            {{ summary.domain }}
                        </div>
                        <div>域名</div>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.grid-content {
    display: flex;
    align-items: center;
    height: 100px;

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }
}

.grid-con-1 {
    .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-num {
        color: rgb(45, 140, 240);
    }
}

.grid-con-2 {
    .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-num {
        color: rgb(45, 140, 240);
    }
}

.grid-con-3 {
    .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-num {
        color: rgb(242, 94, 67);
    }
}
</style>
