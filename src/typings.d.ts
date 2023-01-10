/// <reference types="vite/client" />

declare module "*.vue" {
    import { ComponentOptions } from "vue"
    const componentOptions: ComponentOptions
    export default componentOptions
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
    readonly API_BASE: string

    readonly USERNAME: string
    readonly PASSWORD: string

    readonly SECRET_ID: string
    readonly SECRET_KEY: string
}
