export interface FilerRequest {
    Action: string
    Path: string
    File?: FileInfo
}

export interface FilerResponse {
    Success: boolean
    FileData?: string
    FileList?: FileInfo[]
}

export interface FileInfo {
    Name?: string
    Size?: number
    Mode?: number
    ModTime?: number
    IsDir?: boolean
    Data?: string
}
