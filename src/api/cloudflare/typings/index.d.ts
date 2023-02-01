export interface Payload {
    Datasets?: unknown
    Datainfo?: Datainfo
}

export interface Datainfo {
    Page: number
    PerPage: number
    Total: number
}

export { ZoneItem } from "./zones"
