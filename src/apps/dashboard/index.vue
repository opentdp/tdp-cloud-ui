<script lang="ts" setup>
import { reactive } from "vue"

import { Api } from "@/api"

const summary = reactive({
    domain: 0,
    machine: 0,
    vendor: 0,
})

async function getAccountSummary() {
    const domains = await Api.domain.list()
    summary.domain = domains.length

    const machines = await Api.machine.list()
    summary.machine = machines.length

    const vendors = await Api.vendor.list()
    summary.vendor = vendors.length
}

// 加载数据

getAccountSummary()
</script>

<template>
    <div>
        <el-row :gutter="20">
            <el-col>
                <el-card class="mgb10" shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-2">
                        <el-icon class="grid-con-icon">
                            <Connection />
                        </el-icon>
                        <div class="grid-cont-right">
                            <div class="grid-num">
                                {{ summary.vendor }}
                            </div>
                            <div>供应商</div>
                        </div>
                    </div>
                </el-card>
                <el-card class="mgb10" shadow="hover" :body-style="{ padding: '0px' }">
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
                <el-card class="mgb10" shadow="hover" :body-style="{ padding: '0px' }">
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
            </el-col>
        </el-row>
    </div>
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
