export interface GoMemoryStat {
    Alloc: number
    Sys: number
    HeapAlloc: number
    HeapInuse: number
    HeapSys: number
    StackInuse: number
    StackSys: number
    TotalAlloc: number
    LastGC: number
    NumGC: number
}

export interface SummaryStat {
    CreateAt: number
    HostId: string
    HostName: string
    Uptime: number
    OS: string
    Platform: string
    KernelArch: string
    CpuCore: number
    CpuCoreLogic: number
    CpuPercent: number[]
    MemoryTotal: number
    MemoryUsed: number
    PublicIpv4: string
    PublicIpv6: string
}

export interface DetailStat extends SummaryStat {
    CpuModel: string[]
    NetInterface: NetInterface[]
    NetBytesRecv: number
    NetBytesSent: number
    DiskPartition: DiskPartition[]
    DiskTotal: number
    DiskUsed: number
    SwapTotal: number
    SwapUsed: number
}

export interface NetInterface {
    Name: string
    BytesRecv: number
    BytesSent: number
    Dropin: number
    Dropout: number
    Ipv4List: string[]
    Ipv6List: string[]
}

export interface DiskPartition {
    Device: string
    Mountpoint: string
    Fstype: string
    Total: number
    Used: number
}