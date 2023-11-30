export interface FilerPayload {
    Action: string
    Path: string
    Content?: string
}

export interface FileInfo {
    Name: string
    Size: number
    Mode: number
    ModTime: number
    IsDir: boolean
    Content?: string
}
