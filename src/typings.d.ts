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
    readonly VITE_API_BASE: string

    readonly VITE_USERNAME: string
    readonly VITE_PASSWORD: string

    readonly SSH_ADDR: string
    readonly SSH_USER: string
    readonly SSH_PASSWORD: string
}
