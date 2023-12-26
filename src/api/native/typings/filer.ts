export interface FilerRequest {
    Action: string
    Path: string
    File?: Partial<FileInfo>
}

export interface FileInfo {
    Name: string
    Size: number
    Mode: number
    ModTime: number
    Symlink: string
    IsDir: boolean
    Data: string
}
