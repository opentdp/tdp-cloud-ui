export interface Payload {
    Datasets?: unknown
    Datainfo?: Datainfo
}

export interface Datainfo {
    Page: number
    PerPage: number
    Total: number
}

export * from "./zone"
export * from "./zone_record"
export * from "./custom_hostnames"
