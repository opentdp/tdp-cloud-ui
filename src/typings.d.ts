/// <reference types="vite/client" />

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

// Declare Vue Component

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<object, object, unknown>;
    export default component;
}
