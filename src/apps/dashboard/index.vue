<template>
    <div>
        <el-row :gutter="20">
            <el-col v-if="accountSummary" :span="8">
                <el-card class="mgb10" shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-1">
                        <el-icon class="grid-con-icon">
                            <UserFilled />
                        </el-icon>
                        <div class="grid-cont-right">
                            <div class="grid-num">
                                {{ accountSummary.User }}
                            </div>
                            <div>子账户</div>
                        </div>
                    </div>
                </el-card>
                <el-card class="mgb10" shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-3">
                        <el-icon class="grid-con-icon">
                            <Lightning />
                        </el-icon>
                        <div class="grid-cont-right">
                            <div class="grid-num">
                                {{ accountSummary.Policies }}
                            </div>
                            <div>策略</div>
                        </div>
                    </div>
                </el-card>
                <el-card shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="grid-content grid-con-2">
                        <el-icon class="grid-con-icon">
                            <Discount />
                        </el-icon>
                        <div class="grid-cont-right">
                            <div class="grid-num">
                                {{ accountSummary.Roles }}
                            </div>
                            <div>角色</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

import Api, { APIReturnType } from "@/api"

const accountSummary = ref<APIReturnType<typeof Api.cam.getAccountSummary>>()
Api.cam.getAccountSummary().then((res) => {
    accountSummary.value = res
})
</script>

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
