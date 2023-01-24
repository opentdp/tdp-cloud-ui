/// <reference types="vite/client" />

declare module "*.vue" {
    import { ComponentOptions } from "vue"
    const componentOptions: ComponentOptions
    export default componentOptions
}

// Import Meta

interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
    readonly VITE_API_BASE: string

    readonly VITE_USERNAME: string
    readonly VITE_PASSWORD: string

    readonly VITE_SECRET_ID: string
    readonly VITE_SECRET_KEY: string
}

// Qcloud Typing

declare namespace Qcloud {
    import type * as Cam from "tencentcloud-sdk-nodejs/tencentcloud/services/cam/v20190116/cam_models"
    import type * as Dnspod from "tencentcloud-sdk-nodejs/tencentcloud/services/dnspod/v20210323/dnspod_models"
    import type * as Lighthouse from "tencentcloud-sdk-nodejs/tencentcloud/services/lighthouse/v20200324/lighthouse_models"
    import type * as Monitor from "tencentcloud-sdk-nodejs/tencentcloud/services/monitor/v20180724/monitor_models"
    import type * as TAT from "tencentcloud-sdk-nodejs/tencentcloud/services/tat/v20201028/tat_models"

    export { Cam, Dnspod, Lighthouse, Monitor, TAT }
}
