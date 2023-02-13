export interface FallbackOrigin {
    origin: string
    status: string
    errors?: string[]
}

export interface CustomHostnameItem {
    id: string
    hostname: string
    ssl: unknown
    status: string
}

export interface CustomHostnameCreate {
    custom_metadata: {
        key: string
    }
    ssl: {
        bundle_method: string
        custom_certificate: string
        custom_key: string
        method: string
        settings: {
            ciphers: string[]
            early_hints: string
            http2: string
            min_tls_version: string
            tls_1_3: string
        }
        wildcard: boolean
    }
}
