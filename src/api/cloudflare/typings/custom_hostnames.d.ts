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
