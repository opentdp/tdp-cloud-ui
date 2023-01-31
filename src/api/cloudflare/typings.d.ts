export interface CfResponse {
    Datasets: unknown
    Datainfo?: CfDatainfo
}

export interface CfDatainfo {
    Page: number
    PerPage: number
    Total: number
}
