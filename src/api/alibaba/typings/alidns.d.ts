/**
 * Convert from @alicloud/alidns20150109
 */

export interface AddCustomLineRequest {
    DomainName: string
    IpSegment: AddCustomLineRequestIpSegment[]
    Lang: string
    LineName: string
}

export interface AddCustomLineResponseBody {
    LineCode: string
    LineId: number
    RequestId: string
}

export interface AddCustomLineResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddCustomLineResponseBody
}

export interface AddDnsCacheDomainRequest {
    CacheTtlMax: number
    CacheTtlMin: number
    DomainName: string
    InstanceId: string
    Lang: string
    Remark: string
    SourceDnsServer: AddDnsCacheDomainRequestSourceDnsServer[]
    SourceEdns: string
    SourceProtocol: string
}

export interface AddDnsCacheDomainResponseBody {
    RequestId: string
}

export interface AddDnsCacheDomainResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddDnsCacheDomainResponseBody
}

export interface AddDnsGtmAccessStrategyRequest {
    DefaultAddrPool: AddDnsGtmAccessStrategyRequestDefaultAddrPool[]
    DefaultAddrPoolType: string
    DefaultLatencyOptimization: string
    DefaultLbaStrategy: string
    DefaultMaxReturnAddrNum: number
    DefaultMinAvailableAddrNum: number
    FailoverAddrPool: AddDnsGtmAccessStrategyRequestFailoverAddrPool[]
    FailoverAddrPoolType: string
    FailoverLatencyOptimization: string
    FailoverLbaStrategy: string
    FailoverMaxReturnAddrNum: number
    FailoverMinAvailableAddrNum: number
    InstanceId: string
    Lang: string
    Lines: string
    StrategyMode: string
    StrategyName: string
}

export interface AddDnsGtmAccessStrategyResponseBody {
    RequestId: string
    StrategyId: string
}

export interface AddDnsGtmAccessStrategyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddDnsGtmAccessStrategyResponseBody
}

export interface AddDnsGtmAddressPoolRequest {
    Addr: AddDnsGtmAddressPoolRequestAddr[]
    EvaluationCount: number
    InstanceId: string
    Interval: number
    IspCityNode: AddDnsGtmAddressPoolRequestIspCityNode[]
    Lang: string
    LbaStrategy: string
    MonitorExtendInfo: string
    MonitorStatus: string
    Name: string
    ProtocolType: string
    Timeout: number
    Type: string
}

export interface AddDnsGtmAddressPoolResponseBody {
    AddrPoolId: string
    MonitorConfigId: string
    RequestId: string
}

export interface AddDnsGtmAddressPoolResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddDnsGtmAddressPoolResponseBody
}

export interface AddDnsGtmMonitorRequest {
    AddrPoolId: string
    EvaluationCount: number
    Interval: number
    IspCityNode: AddDnsGtmMonitorRequestIspCityNode[]
    Lang: string
    MonitorExtendInfo: string
    ProtocolType: string
    Timeout: number
}

export interface AddDnsGtmMonitorResponseBody {
    MonitorConfigId: string
    RequestId: string
}

export interface AddDnsGtmMonitorResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddDnsGtmMonitorResponseBody
}

export interface AddDomainRequest {
    DomainName: string
    GroupId: string
    Lang: string
    ResourceGroupId: string
}

export interface AddDomainResponseBody {
    DnsServers: AddDomainResponseBodyDnsServers
    DomainId: string
    DomainName: string
    GroupId: string
    GroupName: string
    PunyCode: string
    RequestId: string
}

export interface AddDomainResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddDomainResponseBody
}

export interface AddDomainBackupRequest {
    DomainName: string
    Lang: string
    PeriodType: string
}

export interface AddDomainBackupResponseBody {
    DomainName: string
    PeriodType: string
    RequestId: string
}

export interface AddDomainBackupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddDomainBackupResponseBody
}

export interface AddDomainGroupRequest {
    GroupName: string
    Lang: string
}

export interface AddDomainGroupResponseBody {
    GroupId: string
    GroupName: string
    RequestId: string
}

export interface AddDomainGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddDomainGroupResponseBody
}

export interface AddDomainRecordRequest {
    DomainName: string
    Lang: string
    Line: string
    Priority: number
    RR: string
    TTL: number
    Type: string
    UserClientIp: string
    Value: string
}

export interface AddDomainRecordResponseBody {
    RecordId: string
    RequestId: string
}

export interface AddDomainRecordResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddDomainRecordResponseBody
}

export interface AddGtmAccessStrategyRequest {
    AccessLines: string
    DefaultAddrPoolId: string
    FailoverAddrPoolId: string
    InstanceId: string
    Lang: string
    StrategyName: string
}

export interface AddGtmAccessStrategyResponseBody {
    RequestId: string
    StrategyId: string
}

export interface AddGtmAccessStrategyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddGtmAccessStrategyResponseBody
}

export interface AddGtmAddressPoolRequest {
    Addr: AddGtmAddressPoolRequestAddr[]
    EvaluationCount: number
    InstanceId: string
    Interval: number
    IspCityNode: AddGtmAddressPoolRequestIspCityNode[]
    Lang: string
    MinAvailableAddrNum: number
    MonitorExtendInfo: string
    MonitorStatus: string
    Name: string
    ProtocolType: string
    Timeout: number
    Type: string
}

export interface AddGtmAddressPoolResponseBody {
    AddrPoolId: string
    MonitorConfigId: string
    RequestId: string
}

export interface AddGtmAddressPoolResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddGtmAddressPoolResponseBody
}

export interface AddGtmMonitorRequest {
    AddrPoolId: string
    EvaluationCount: number
    Interval: number
    IspCityNode: AddGtmMonitorRequestIspCityNode[]
    Lang: string
    MonitorExtendInfo: string
    ProtocolType: string
    Timeout: number
}

export interface AddGtmMonitorResponseBody {
    MonitorConfigId: string
    RequestId: string
}

export interface AddGtmMonitorResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddGtmMonitorResponseBody
}

export interface AddGtmRecoveryPlanRequest {
    FaultAddrPool: string
    Lang: string
    Name: string
    Remark: string
}

export interface AddGtmRecoveryPlanResponseBody {
    RecoveryPlanId: string
    RequestId: string
}

export interface AddGtmRecoveryPlanResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddGtmRecoveryPlanResponseBody
}

export interface BindInstanceDomainsRequest {
    DomainNames: string
    InstanceId: string
    Lang: string
}

export interface BindInstanceDomainsResponseBody {
    FailedCount: number
    RequestId: string
    SuccessCount: number
}

export interface BindInstanceDomainsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: BindInstanceDomainsResponseBody
}

export interface ChangeDomainGroupRequest {
    DomainName: string
    GroupId: string
    Lang: string
}

export interface ChangeDomainGroupResponseBody {
    GroupId: string
    GroupName: string
    RequestId: string
}

export interface ChangeDomainGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ChangeDomainGroupResponseBody
}

export interface ChangeDomainOfDnsProductRequest {
    Force: boolean
    InstanceId: string
    Lang: string
    NewDomain: string
    UserClientIp: string
}

export interface ChangeDomainOfDnsProductResponseBody {
    OriginalDomain: string
    RequestId: string
}

export interface ChangeDomainOfDnsProductResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ChangeDomainOfDnsProductResponseBody
}

export interface CopyGtmConfigRequest {
    CopyType: string
    Lang: string
    SourceId: string
    TargetId: string
}

export interface CopyGtmConfigResponseBody {
    RequestId: string
}

export interface CopyGtmConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CopyGtmConfigResponseBody
}

export interface CreatePdnsAppKeyRequest {
    Lang: string
}

export interface CreatePdnsAppKeyResponseBody {
    RequestId: string
}

export interface CreatePdnsAppKeyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreatePdnsAppKeyResponseBody
}

export interface CreatePdnsUdpIpSegmentRequest {
    Ip: string
    Lang: string
    Name: string
}

export interface CreatePdnsUdpIpSegmentResponseBody {
    RequestId: string
    ValidMessage: string
}

export interface CreatePdnsUdpIpSegmentResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreatePdnsUdpIpSegmentResponseBody
}

export interface DeleteCustomLinesRequest {
    Lang: string
    LineIds: string
}

export interface DeleteCustomLinesResponseBody {
    RequestId: string
}

export interface DeleteCustomLinesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteCustomLinesResponseBody
}

export interface DeleteDnsCacheDomainRequest {
    DomainName: string
    Lang: string
}

export interface DeleteDnsCacheDomainResponseBody {
    RequestId: string
}

export interface DeleteDnsCacheDomainResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDnsCacheDomainResponseBody
}

export interface DeleteDnsGtmAccessStrategyRequest {
    Lang: string
    StrategyId: string
}

export interface DeleteDnsGtmAccessStrategyResponseBody {
    RequestId: string
}

export interface DeleteDnsGtmAccessStrategyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDnsGtmAccessStrategyResponseBody
}

export interface DeleteDnsGtmAddressPoolRequest {
    AddrPoolId: string
    Lang: string
}

export interface DeleteDnsGtmAddressPoolResponseBody {
    RequestId: string
}

export interface DeleteDnsGtmAddressPoolResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDnsGtmAddressPoolResponseBody
}

export interface DeleteDomainRequest {
    DomainName: string
    Lang: string
}

export interface DeleteDomainResponseBody {
    DomainName: string
    RequestId: string
}

export interface DeleteDomainResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDomainResponseBody
}

export interface DeleteDomainGroupRequest {
    GroupId: string
    Lang: string
}

export interface DeleteDomainGroupResponseBody {
    GroupName: string
    RequestId: string
}

export interface DeleteDomainGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDomainGroupResponseBody
}

export interface DeleteDomainRecordRequest {
    Lang: string
    RecordId: string
    UserClientIp: string
}

export interface DeleteDomainRecordResponseBody {
    RecordId: string
    RequestId: string
}

export interface DeleteDomainRecordResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDomainRecordResponseBody
}

export interface DeleteGtmAccessStrategyRequest {
    Lang: string
    StrategyId: string
}

export interface DeleteGtmAccessStrategyResponseBody {
    RequestId: string
}

export interface DeleteGtmAccessStrategyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteGtmAccessStrategyResponseBody
}

export interface DeleteGtmAddressPoolRequest {
    AddrPoolId: string
    Lang: string
}

export interface DeleteGtmAddressPoolResponseBody {
    RequestId: string
}

export interface DeleteGtmAddressPoolResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteGtmAddressPoolResponseBody
}

export interface DeleteGtmRecoveryPlanRequest {
    Lang: string
    RecoveryPlanId: number
}

export interface DeleteGtmRecoveryPlanResponseBody {
    RequestId: string
}

export interface DeleteGtmRecoveryPlanResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteGtmRecoveryPlanResponseBody
}

export interface DeleteSubDomainRecordsRequest {
    DomainName: string
    Lang: string
    RR: string
    Type: string
    UserClientIp: string
}

export interface DeleteSubDomainRecordsResponseBody {
    RR: string
    RequestId: string
    TotalCount: string
}

export interface DeleteSubDomainRecordsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteSubDomainRecordsResponseBody
}

export interface DescribeBatchResultCountRequest {
    BatchType: string
    Lang: string
    TaskId: number
}

export interface DescribeBatchResultCountResponseBody {
    BatchType: string
    FailedCount: number
    Reason: string
    RequestId: string
    Status: number
    SuccessCount: number
    TaskId: number
    TotalCount: number
}

export interface DescribeBatchResultCountResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeBatchResultCountResponseBody
}

export interface DescribeBatchResultDetailRequest {
    BatchType: string
    Lang: string
    PageNumber: number
    PageSize: number
    Status: string
    TaskId: number
}

export interface DescribeBatchResultDetailResponseBody {
    BatchResultDetails: DescribeBatchResultDetailResponseBodyBatchResultDetails
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeBatchResultDetailResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeBatchResultDetailResponseBody
}

export interface DescribeCustomLineRequest {
    Lang: string
    LineId: number
}

export interface DescribeCustomLineResponseBody {
    Code: string
    DomainName: string
    Id: number
    IpSegmentList: DescribeCustomLineResponseBodyIpSegmentList[]
    Name: string
    RequestId: string
}

export interface DescribeCustomLineResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeCustomLineResponseBody
}

export interface DescribeCustomLinesRequest {
    DomainName: string
    Lang: string
    PageNumber: number
    PageSize: number
}

export interface DescribeCustomLinesResponseBody {
    CustomLines: DescribeCustomLinesResponseBodyCustomLines[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeCustomLinesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeCustomLinesResponseBody
}

export interface DescribeDNSSLBSubDomainsRequest {
    DomainName: string
    Lang: string
    PageNumber: number
    PageSize: number
    Rr: string
    UserClientIp: string
}

export interface DescribeDNSSLBSubDomainsResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    SlbSubDomains: DescribeDNSSLBSubDomainsResponseBodySlbSubDomains
    TotalCount: number
}

export interface DescribeDNSSLBSubDomainsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDNSSLBSubDomainsResponseBody
}

export interface DescribeDnsCacheDomainsRequest {
    Keyword: string
    Lang: string
    PageNumber: number
    PageSize: number
}

export interface DescribeDnsCacheDomainsResponseBody {
    Domains: DescribeDnsCacheDomainsResponseBodyDomains[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDnsCacheDomainsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsCacheDomainsResponseBody
}

export interface DescribeDnsGtmAccessStrategiesRequest {
    InstanceId: string
    Lang: string
    PageNumber: number
    PageSize: number
    StrategyMode: string
}

export interface DescribeDnsGtmAccessStrategiesResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Strategies: DescribeDnsGtmAccessStrategiesResponseBodyStrategies
    TotalItems: number
    TotalPages: number
}

export interface DescribeDnsGtmAccessStrategiesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmAccessStrategiesResponseBody
}

export interface DescribeDnsGtmAccessStrategyRequest {
    Lang: string
    StrategyId: string
}

export interface DescribeDnsGtmAccessStrategyResponseBody {
    AccessMode: string
    CreateTime: string
    CreateTimestamp: number
    DefaultAddrPoolGroupStatus: string
    DefaultAddrPoolType: string
    DefaultAddrPools: DescribeDnsGtmAccessStrategyResponseBodyDefaultAddrPools
    DefaultAvailableAddrNum: number
    DefaultLatencyOptimization: string
    DefaultLbaStrategy: string
    DefaultMaxReturnAddrNum: number
    DefaultMinAvailableAddrNum: number
    EffectiveAddrPoolGroupType: string
    FailoverAddrPoolGroupStatus: string
    FailoverAddrPoolType: string
    FailoverAddrPools: DescribeDnsGtmAccessStrategyResponseBodyFailoverAddrPools
    FailoverAvailableAddrNum: number
    FailoverLatencyOptimization: string
    FailoverLbaStrategy: string
    FailoverMaxReturnAddrNum: number
    FailoverMinAvailableAddrNum: number
    InstanceId: string
    Lines: DescribeDnsGtmAccessStrategyResponseBodyLines
    RequestId: string
    StrategyId: string
    StrategyMode: string
    StrategyName: string
}

export interface DescribeDnsGtmAccessStrategyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmAccessStrategyResponseBody
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigRequest {
    InstanceId: string
    Lang: string
    StrategyMode: string
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBody {
    DomainAddrPools: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyDomainAddrPools
    Ipv4AddrPools: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyIpv4AddrPools
    Ipv6AddrPools: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyIpv6AddrPools
    Lines: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyLines
    RequestId: string
    SelectedDomainLines: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodySelectedDomainLines
    SelectedIpv4Lines: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodySelectedIpv4Lines
    SelectedIpv6Lines: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodySelectedIpv6Lines
    SuggestSetDefaultLine: boolean
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmAccessStrategyAvailableConfigResponseBody
}

export interface DescribeDnsGtmAddrAttributeInfoRequest {
    Addrs: string
    Lang: string
    Type: string
}

export interface DescribeDnsGtmAddrAttributeInfoResponseBody {
    Addr: DescribeDnsGtmAddrAttributeInfoResponseBodyAddr
    RequestId: string
}

export interface DescribeDnsGtmAddrAttributeInfoResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmAddrAttributeInfoResponseBody
}

export interface DescribeDnsGtmAddressPoolAvailableConfigRequest {
    InstanceId: string
    Lang: string
}

export interface DescribeDnsGtmAddressPoolAvailableConfigResponseBody {
    AttributeInfos: DescribeDnsGtmAddressPoolAvailableConfigResponseBodyAttributeInfos
    RequestId: string
}

export interface DescribeDnsGtmAddressPoolAvailableConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmAddressPoolAvailableConfigResponseBody
}

export interface DescribeDnsGtmAvailableAlertGroupRequest {
    Lang: string
}

export interface DescribeDnsGtmAvailableAlertGroupResponseBody {
    AvailableAlertGroup: string
    RequestId: string
}

export interface DescribeDnsGtmAvailableAlertGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmAvailableAlertGroupResponseBody
}

export interface DescribeDnsGtmInstanceRequest {
    InstanceId: string
    Lang: string
}

export interface DescribeDnsGtmInstanceResponseBody {
    Config: DescribeDnsGtmInstanceResponseBodyConfig
    CreateTime: string
    CreateTimestamp: number
    ExpireTime: string
    ExpireTimestamp: number
    InstanceId: string
    PaymentType: string
    RequestId: string
    ResourceGroupId: string
    SmsQuota: number
    TaskQuota: number
    UsedQuota: DescribeDnsGtmInstanceResponseBodyUsedQuota
    VersionCode: string
}

export interface DescribeDnsGtmInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmInstanceResponseBody
}

export interface DescribeDnsGtmInstanceAddressPoolRequest {
    AddrPoolId: string
    Lang: string
}

export interface DescribeDnsGtmInstanceAddressPoolResponseBody {
    AddrCount: number
    AddrPoolId: string
    Addrs: DescribeDnsGtmInstanceAddressPoolResponseBodyAddrs
    CreateTime: string
    CreateTimestamp: number
    LbaStrategy: string
    MonitorConfigId: string
    MonitorStatus: string
    Name: string
    RequestId: string
    Type: string
    UpdateTime: string
    UpdateTimestamp: number
}

export interface DescribeDnsGtmInstanceAddressPoolResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmInstanceAddressPoolResponseBody
}

export interface DescribeDnsGtmInstanceAddressPoolsRequest {
    InstanceId: string
    Lang: string
    PageNumber: number
    PageSize: number
}

export interface DescribeDnsGtmInstanceAddressPoolsResponseBody {
    AddrPools: DescribeDnsGtmInstanceAddressPoolsResponseBodyAddrPools
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeDnsGtmInstanceAddressPoolsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmInstanceAddressPoolsResponseBody
}

export interface DescribeDnsGtmInstanceStatusRequest {
    InstanceId: string
    Lang: string
}

export interface DescribeDnsGtmInstanceStatusResponseBody {
    AddrAvailableNum: number
    AddrNotAvailableNum: number
    AddrPoolGroupNotAvailableNum: number
    RequestId: string
    StrategyNotAvailableNum: number
    SwitchToFailoverStrategyNum: number
}

export interface DescribeDnsGtmInstanceStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmInstanceStatusResponseBody
}

export interface DescribeDnsGtmInstanceSystemCnameRequest {
    InstanceId: string
    Lang: string
}

export interface DescribeDnsGtmInstanceSystemCnameResponseBody {
    RequestId: string
    SystemCname: string
}

export interface DescribeDnsGtmInstanceSystemCnameResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmInstanceSystemCnameResponseBody
}

export interface DescribeDnsGtmInstancesRequest {
    Keyword: string
    Lang: string
    PageNumber: number
    PageSize: number
    ResourceGroupId: string
}

export interface DescribeDnsGtmInstancesResponseBody {
    GtmInstances: DescribeDnsGtmInstancesResponseBodyGtmInstances[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeDnsGtmInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmInstancesResponseBody
}

export interface DescribeDnsGtmLogsRequest {
    EndTimestamp: number
    InstanceId: string
    Keyword: string
    Lang: string
    PageNumber: number
    PageSize: number
    StartTimestamp: number
}

export interface DescribeDnsGtmLogsResponseBody {
    Logs: DescribeDnsGtmLogsResponseBodyLogs
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeDnsGtmLogsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmLogsResponseBody
}

export interface DescribeDnsGtmMonitorAvailableConfigRequest {
    Lang: string
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBody {
    DomainIpv4IspCityNodes: DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv4IspCityNodes
    DomainIpv6IspCityNodes: DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv6IspCityNodes
    Ipv4IspCityNodes: DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv4IspCityNodes
    Ipv6IspCityNodes: DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv6IspCityNodes
    RequestId: string
}

export interface DescribeDnsGtmMonitorAvailableConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmMonitorAvailableConfigResponseBody
}

export interface DescribeDnsGtmMonitorConfigRequest {
    Lang: string
    MonitorConfigId: string
}

export interface DescribeDnsGtmMonitorConfigResponseBody {
    CreateTime: string
    CreateTimestamp: number
    EvaluationCount: number
    Interval: number
    IspCityNodes: DescribeDnsGtmMonitorConfigResponseBodyIspCityNodes
    MonitorConfigId: string
    MonitorExtendInfo: string
    ProtocolType: string
    RequestId: string
    Timeout: number
    UpdateTime: string
    UpdateTimestamp: number
}

export interface DescribeDnsGtmMonitorConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsGtmMonitorConfigResponseBody
}

export interface DescribeDnsProductInstanceRequest {
    InstanceId: string
    Lang: string
    UserClientIp: string
}

export interface DescribeDnsProductInstanceResponseBody {
    BindCount: number
    BindDomainCount: number
    BindDomainUsedCount: number
    BindUsedCount: number
    DDosDefendFlow: number
    DDosDefendQuery: number
    DnsSLBCount: number
    DnsSecurity: string
    DnsServers: DescribeDnsProductInstanceResponseBodyDnsServers
    Domain: string
    DomainType: string
    EndTime: string
    EndTimestamp: number
    Gslb: boolean
    ISPLines: string
    ISPRegionLines: string
    InBlackHole: boolean
    InClean: boolean
    InstanceId: string
    MonitorFrequency: number
    MonitorNodeCount: number
    MonitorTaskCount: number
    OverseaDDosDefendFlow: number
    OverseaLine: string
    PaymentType: string
    RegionLines: boolean
    RequestId: string
    SearchEngineLines: string
    StartTime: string
    StartTimestamp: number
    SubDomainLevel: number
    TTLMinValue: number
    URLForwardCount: number
    VersionCode: string
    VersionName: string
}

export interface DescribeDnsProductInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsProductInstanceResponseBody
}

export interface DescribeDnsProductInstancesRequest {
    DomainType: string
    Lang: string
    PageNumber: number
    PageSize: number
    UserClientIp: string
    VersionCode: string
}

export interface DescribeDnsProductInstancesResponseBody {
    DnsProducts: DescribeDnsProductInstancesResponseBodyDnsProducts
    DomainType: string
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDnsProductInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDnsProductInstancesResponseBody
}

export interface DescribeDohAccountStatisticsRequest {
    EndDate: string
    Lang: string
    StartDate: string
}

export interface DescribeDohAccountStatisticsResponseBody {
    RequestId: string
    Statistics: DescribeDohAccountStatisticsResponseBodyStatistics[]
}

export interface DescribeDohAccountStatisticsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDohAccountStatisticsResponseBody
}

export interface DescribeDohDomainStatisticsRequest {
    DomainName: string
    EndDate: string
    Lang: string
    StartDate: string
}

export interface DescribeDohDomainStatisticsResponseBody {
    RequestId: string
    Statistics: DescribeDohDomainStatisticsResponseBodyStatistics[]
}

export interface DescribeDohDomainStatisticsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDohDomainStatisticsResponseBody
}

export interface DescribeDohDomainStatisticsSummaryRequest {
    DomainName: string
    EndDate: string
    Lang: string
    PageNumber: number
    PageSize: number
    StartDate: string
}

export interface DescribeDohDomainStatisticsSummaryResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Statistics: DescribeDohDomainStatisticsSummaryResponseBodyStatistics[]
    TotalItems: number
    TotalPages: number
}

export interface DescribeDohDomainStatisticsSummaryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDohDomainStatisticsSummaryResponseBody
}

export interface DescribeDohSubDomainStatisticsRequest {
    EndDate: string
    Lang: string
    StartDate: string
    SubDomain: string
}

export interface DescribeDohSubDomainStatisticsResponseBody {
    RequestId: string
    Statistics: DescribeDohSubDomainStatisticsResponseBodyStatistics[]
}

export interface DescribeDohSubDomainStatisticsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDohSubDomainStatisticsResponseBody
}

export interface DescribeDohSubDomainStatisticsSummaryRequest {
    DomainName: string
    EndDate: string
    Lang: string
    PageNumber: number
    PageSize: number
    StartDate: string
    SubDomain: string
}

export interface DescribeDohSubDomainStatisticsSummaryResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Statistics: DescribeDohSubDomainStatisticsSummaryResponseBodyStatistics[]
    TotalItems: number
    TotalPages: number
}

export interface DescribeDohSubDomainStatisticsSummaryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDohSubDomainStatisticsSummaryResponseBody
}

export interface DescribeDohUserInfoRequest {
    EndDate: string
    Lang: string
    StartDate: string
}

export interface DescribeDohUserInfoResponseBody {
    DomainCount: number
    PdnsId: number
    RequestId: string
    SubDomainCount: number
}

export interface DescribeDohUserInfoResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDohUserInfoResponseBody
}

export interface DescribeDomainDnssecInfoRequest {
    DomainName: string
    Lang: string
}

export interface DescribeDomainDnssecInfoResponseBody {
    Algorithm: string
    Digest: string
    DigestType: string
    DomainName: string
    DsRecord: string
    Flags: string
    KeyTag: string
    PublicKey: string
    RequestId: string
    Status: string
}

export interface DescribeDomainDnssecInfoResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainDnssecInfoResponseBody
}

export interface DescribeDomainGroupsRequest {
    KeyWord: string
    Lang: string
    PageNumber: number
    PageSize: number
}

export interface DescribeDomainGroupsResponseBody {
    DomainGroups: DescribeDomainGroupsResponseBodyDomainGroups
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDomainGroupsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainGroupsResponseBody
}

export interface DescribeDomainInfoRequest {
    DomainName: string
    Lang: string
    NeedDetailAttributes: boolean
}

export interface DescribeDomainInfoResponseBody {
    AliDomain: boolean
    AvailableTtls: DescribeDomainInfoResponseBodyAvailableTtls
    CreateTime: string
    DnsServers: DescribeDomainInfoResponseBodyDnsServers
    DomainId: string
    DomainName: string
    GroupId: string
    GroupName: string
    InBlackHole: boolean
    InClean: boolean
    InstanceId: string
    LineType: string
    MinTtl: number
    PunyCode: string
    RecordLineTreeJson: string
    RecordLines: DescribeDomainInfoResponseBodyRecordLines
    RegionLines: boolean
    Remark: string
    RequestId: string
    ResourceGroupId: string
    SlaveDns: boolean
    VersionCode: string
    VersionName: string
}

export interface DescribeDomainInfoResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainInfoResponseBody
}

export interface DescribeDomainLogsRequest {
    GroupId: string
    KeyWord: string
    Lang: string
    PageNumber: number
    PageSize: number
    StartDate: string
    Type: string
    EndDate: string
}

export interface DescribeDomainLogsResponseBody {
    DomainLogs: DescribeDomainLogsResponseBodyDomainLogs
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDomainLogsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainLogsResponseBody
}

export interface DescribeDomainNsRequest {
    DomainName: string
    Lang: string
}

export interface DescribeDomainNsResponseBody {
    AllAliDns: boolean
    DnsServers: DescribeDomainNsResponseBodyDnsServers
    ExpectDnsServers: DescribeDomainNsResponseBodyExpectDnsServers
    IncludeAliDns: boolean
    RequestId: string
}

export interface DescribeDomainNsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainNsResponseBody
}

export interface DescribeDomainRecordInfoRequest {
    Lang: string
    RecordId: string
    UserClientIp: string
}

export interface DescribeDomainRecordInfoResponseBody {
    DomainId: string
    DomainName: string
    GroupId: string
    GroupName: string
    Line: string
    Locked: boolean
    Priority: number
    PunyCode: string
    RR: string
    RecordId: string
    RequestId: string
    Status: string
    TTL: number
    Type: string
    Value: string
}

export interface DescribeDomainRecordInfoResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainRecordInfoResponseBody
}

export interface DescribeDomainRecordsRequest {
    Direction: string
    DomainName: string
    GroupId: number
    KeyWord: string
    Lang: string
    Line: string
    OrderBy: string
    PageNumber: number
    PageSize: number
    RRKeyWord: string
    SearchMode: string
    Status: string
    Type: string
    TypeKeyWord: string
    ValueKeyWord: string
}

export interface DescribeDomainRecordsResponseBody {
    DomainRecords: DescribeDomainRecordsResponseBodyDomainRecords
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDomainRecordsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainRecordsResponseBody
}

export interface DescribeDomainStatisticsRequest {
    DomainName: string
    DomainType: string
    EndDate: string
    Lang: string
    StartDate: string
}

export interface DescribeDomainStatisticsResponseBody {
    RequestId: string
    Statistics: DescribeDomainStatisticsResponseBodyStatistics
}

export interface DescribeDomainStatisticsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainStatisticsResponseBody
}

export interface DescribeDomainStatisticsSummaryRequest {
    EndDate: string
    Keyword: string
    Lang: string
    PageNumber: number
    PageSize: number
    SearchMode: string
    StartDate: string
    Threshold: number
}

export interface DescribeDomainStatisticsSummaryResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Statistics: DescribeDomainStatisticsSummaryResponseBodyStatistics
    TotalItems: number
    TotalPages: number
}

export interface DescribeDomainStatisticsSummaryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainStatisticsSummaryResponseBody
}

export interface DescribeDomainsRequest {
    GroupId: string
    KeyWord: string
    Lang: string
    PageNumber: number
    PageSize: number
    ResourceGroupId: string
    SearchMode: string
    Starmark: boolean
}

export interface DescribeDomainsResponseBody {
    Domains: DescribeDomainsResponseBodyDomains
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDomainsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDomainsResponseBody
}

export interface DescribeGtmAccessStrategiesRequest {
    InstanceId: string
    Lang: string
    PageNumber: number
    PageSize: number
}

export interface DescribeGtmAccessStrategiesResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Strategies: DescribeGtmAccessStrategiesResponseBodyStrategies
    TotalItems: number
    TotalPages: number
}

export interface DescribeGtmAccessStrategiesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmAccessStrategiesResponseBody
}

export interface DescribeGtmAccessStrategyRequest {
    Lang: string
    StrategyId: string
}

export interface DescribeGtmAccessStrategyResponseBody {
    AccessMode: string
    AccessStatus: string
    DefaultAddrPoolMonitorStatus: string
    DefaultAddrPoolName: string
    DefaultAddrPoolStatus: string
    DefultAddrPoolId: string
    FailoverAddrPoolId: string
    FailoverAddrPoolMonitorStatus: string
    FailoverAddrPoolName: string
    FailoverAddrPoolStatus: string
    InstanceId: string
    Lines: DescribeGtmAccessStrategyResponseBodyLines
    RequestId: string
    StrategyId: string
    StrategyMode: string
    StrategyName: string
}

export interface DescribeGtmAccessStrategyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmAccessStrategyResponseBody
}

export interface DescribeGtmAccessStrategyAvailableConfigRequest {
    InstanceId: string
    Lang: string
}

export interface DescribeGtmAccessStrategyAvailableConfigResponseBody {
    AddrPools: DescribeGtmAccessStrategyAvailableConfigResponseBodyAddrPools
    Lines: DescribeGtmAccessStrategyAvailableConfigResponseBodyLines
    RequestId: string
}

export interface DescribeGtmAccessStrategyAvailableConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmAccessStrategyAvailableConfigResponseBody
}

export interface DescribeGtmAvailableAlertGroupRequest {
    Lang: string
}

export interface DescribeGtmAvailableAlertGroupResponseBody {
    AvailableAlertGroup: string
    RequestId: string
}

export interface DescribeGtmAvailableAlertGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmAvailableAlertGroupResponseBody
}

export interface DescribeGtmInstanceRequest {
    InstanceId: string
    Lang: string
    NeedDetailAttributes: boolean
}

export interface DescribeGtmInstanceResponseBody {
    AccessStrategyNum: number
    AddressPoolNum: number
    AlertGroup: string
    Cname: string
    CnameMode: string
    CreateTime: string
    CreateTimestamp: number
    ExpireTime: string
    ExpireTimestamp: number
    InstanceId: string
    InstanceName: string
    LbaStrategy: string
    RequestId: string
    ResourceGroupId: string
    Ttl: number
    UserDomainName: string
    VersionCode: string
}

export interface DescribeGtmInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmInstanceResponseBody
}

export interface DescribeGtmInstanceAddressPoolRequest {
    AddrPoolId: string
    Lang: string
}

export interface DescribeGtmInstanceAddressPoolResponseBody {
    AddrCount: number
    AddrPoolId: string
    Addrs: DescribeGtmInstanceAddressPoolResponseBodyAddrs
    CreateTime: string
    CreateTimestamp: number
    MinAvailableAddrNum: number
    MonitorConfigId: string
    MonitorStatus: string
    Name: string
    RequestId: string
    Status: string
    Type: string
    UpdateTime: string
    UpdateTimestamp: number
}

export interface DescribeGtmInstanceAddressPoolResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmInstanceAddressPoolResponseBody
}

export interface DescribeGtmInstanceAddressPoolsRequest {
    InstanceId: string
    Lang: string
    PageNumber: number
    PageSize: number
}

export interface DescribeGtmInstanceAddressPoolsResponseBody {
    AddrPools: DescribeGtmInstanceAddressPoolsResponseBodyAddrPools
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeGtmInstanceAddressPoolsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmInstanceAddressPoolsResponseBody
}

export interface DescribeGtmInstanceStatusRequest {
    InstanceId: string
    Lang: string
}

export interface DescribeGtmInstanceStatusResponseBody {
    AddrNotAvailableNum: number
    AddrPoolNotAvailableNum: number
    RequestId: string
    Status: string
    StatusReason: string
    StrategyNotAvailableNum: number
    SwitchToFailoverStrategyNum: number
}

export interface DescribeGtmInstanceStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmInstanceStatusResponseBody
}

export interface DescribeGtmInstanceSystemCnameRequest {
    InstanceId: string
    Lang: string
}

export interface DescribeGtmInstanceSystemCnameResponseBody {
    RequestId: string
    SystemCname: string
}

export interface DescribeGtmInstanceSystemCnameResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmInstanceSystemCnameResponseBody
}

export interface DescribeGtmInstancesRequest {
    Keyword: string
    Lang: string
    NeedDetailAttributes: boolean
    PageNumber: number
    PageSize: number
    ResourceGroupId: string
}

export interface DescribeGtmInstancesResponseBody {
    GtmInstances: DescribeGtmInstancesResponseBodyGtmInstances
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeGtmInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmInstancesResponseBody
}

export interface DescribeGtmLogsRequest {
    EndTimestamp: number
    InstanceId: string
    Keyword: string
    Lang: string
    PageNumber: number
    PageSize: number
    StartTimestamp: number
}

export interface DescribeGtmLogsResponseBody {
    Logs: DescribeGtmLogsResponseBodyLogs
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeGtmLogsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmLogsResponseBody
}

export interface DescribeGtmMonitorAvailableConfigRequest {
    Lang: string
}

export interface DescribeGtmMonitorAvailableConfigResponseBody {
    IspCityNodes: DescribeGtmMonitorAvailableConfigResponseBodyIspCityNodes
    RequestId: string
}

export interface DescribeGtmMonitorAvailableConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmMonitorAvailableConfigResponseBody
}

export interface DescribeGtmMonitorConfigRequest {
    Lang: string
    MonitorConfigId: string
}

export interface DescribeGtmMonitorConfigResponseBody {
    CreateTime: string
    CreateTimestamp: number
    EvaluationCount: number
    Interval: number
    IspCityNodes: DescribeGtmMonitorConfigResponseBodyIspCityNodes
    MonitorConfigId: string
    MonitorExtendInfo: string
    ProtocolType: string
    RequestId: string
    Timeout: number
    UpdateTime: string
    UpdateTimestamp: number
}

export interface DescribeGtmMonitorConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmMonitorConfigResponseBody
}

export interface DescribeGtmRecoveryPlanRequest {
    Lang: string
    RecoveryPlanId: number
}

export interface DescribeGtmRecoveryPlanResponseBody {
    CreateTime: string
    CreateTimestamp: number
    FaultAddrPoolNum: number
    FaultAddrPools: DescribeGtmRecoveryPlanResponseBodyFaultAddrPools
    LastExecuteTime: string
    LastExecuteTimestamp: number
    LastRollbackTime: string
    LastRollbackTimestamp: number
    Name: string
    RecoveryPlanId: number
    Remark: string
    RequestId: string
    Status: string
    UpdateTime: string
    UpdateTimestamp: number
}

export interface DescribeGtmRecoveryPlanResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmRecoveryPlanResponseBody
}

export interface DescribeGtmRecoveryPlanAvailableConfigRequest {
    Lang: string
}

export interface DescribeGtmRecoveryPlanAvailableConfigResponseBody {
    Instances: DescribeGtmRecoveryPlanAvailableConfigResponseBodyInstances
    RequestId: string
}

export interface DescribeGtmRecoveryPlanAvailableConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmRecoveryPlanAvailableConfigResponseBody
}

export interface DescribeGtmRecoveryPlansRequest {
    Keyword: string
    Lang: string
    PageNumber: number
    PageSize: number
}

export interface DescribeGtmRecoveryPlansResponseBody {
    PageNumber: number
    PageSize: number
    RecoveryPlans: DescribeGtmRecoveryPlansResponseBodyRecoveryPlans
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeGtmRecoveryPlansResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeGtmRecoveryPlansResponseBody
}

export interface DescribeInstanceDomainsRequest {
    InstanceId: string
    Lang: string
    PageNumber: number
    PageSize: number
}

export interface DescribeInstanceDomainsResponseBody {
    InstanceDomains: DescribeInstanceDomainsResponseBodyInstanceDomains[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeInstanceDomainsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceDomainsResponseBody
}

export interface DescribeIspFlushCacheInstancesRequest {
    Direction: string
    Isp: string
    Keyword: string
    Lang: string
    OrderBy: string
    PageNumber: number
    PageSize: number
    Type: string
}

export interface DescribeIspFlushCacheInstancesResponseBody {
    IspFlushCacheInstances: DescribeIspFlushCacheInstancesResponseBodyIspFlushCacheInstances[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeIspFlushCacheInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeIspFlushCacheInstancesResponseBody
}

export interface DescribeIspFlushCacheRemainQuotaRequest {
    Lang: string
}

export interface DescribeIspFlushCacheRemainQuotaResponseBody {
    RequestId: string
    TelecomRemainQuota: number
}

export interface DescribeIspFlushCacheRemainQuotaResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeIspFlushCacheRemainQuotaResponseBody
}

export interface DescribeIspFlushCacheTaskRequest {
    Lang: string
    TaskId: string
}

export interface DescribeIspFlushCacheTaskResponseBody {
    CreateTime: string
    CreateTimestamp: number
    DomainName: string
    FlushCacheResults: DescribeIspFlushCacheTaskResponseBodyFlushCacheResults[]
    InstanceId: string
    InstanceName: string
    Isp: string
    RequestId: string
    TaskId: string
    TaskStatus: string
}

export interface DescribeIspFlushCacheTaskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeIspFlushCacheTaskResponseBody
}

export interface DescribeIspFlushCacheTasksRequest {
    Direction: string
    DomainName: string
    InstanceId: string
    Isp: string
    Lang: string
    OrderBy: string
    PageNumber: number
    PageSize: number
}

export interface DescribeIspFlushCacheTasksResponseBody {
    IspFlushCacheTasks: DescribeIspFlushCacheTasksResponseBodyIspFlushCacheTasks[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface DescribeIspFlushCacheTasksResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeIspFlushCacheTasksResponseBody
}

export interface DescribePdnsAccountSummaryRequest {
    EndDate: string
    Lang: string
    StartDate: string
}

export interface DescribePdnsAccountSummaryResponseBody {
    Data: DescribePdnsAccountSummaryResponseBodyData
    RequestId: string
}

export interface DescribePdnsAccountSummaryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsAccountSummaryResponseBody
}

export interface DescribePdnsAppKeyRequest {
    AppKeyId: string
    Lang: string
}

export interface DescribePdnsAppKeyResponseBody {
    AppKey: DescribePdnsAppKeyResponseBodyAppKey
    RequestId: string
}

export interface DescribePdnsAppKeyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsAppKeyResponseBody
}

export interface DescribePdnsAppKeysRequest {
    Lang: string
}

export interface DescribePdnsAppKeysResponseBody {
    AppKeys: DescribePdnsAppKeysResponseBodyAppKeys[]
    RequestId: string
}

export interface DescribePdnsAppKeysResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsAppKeysResponseBody
}

export interface DescribePdnsOperateLogsRequest {
    ActionType: string
    EndDate: string
    Keyword: string
    Lang: string
    PageNumber: number
    PageSize: number
    StartDate: string
}

export interface DescribePdnsOperateLogsResponseBody {
    Logs: DescribePdnsOperateLogsResponseBodyLogs[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribePdnsOperateLogsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsOperateLogsResponseBody
}

export interface DescribePdnsRequestStatisticRequest {
    DomainName: string
    EndDate: string
    Lang: string
    StartDate: string
    SubDomain: string
}

export interface DescribePdnsRequestStatisticResponseBody {
    Data: DescribePdnsRequestStatisticResponseBodyData[]
    RequestId: string
}

export interface DescribePdnsRequestStatisticResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsRequestStatisticResponseBody
}

export interface DescribePdnsRequestStatisticsRequest {
    DomainName: string
    EndDate: string
    Lang: string
    PageNumber: number
    PageSize: number
    StartDate: string
    SubDomain: string
    Type: string
}

export interface DescribePdnsRequestStatisticsResponseBody {
    Data: DescribePdnsRequestStatisticsResponseBodyData[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribePdnsRequestStatisticsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsRequestStatisticsResponseBody
}

export interface DescribePdnsThreatLogsRequest {
    EndDate: string
    Keyword: string
    Lang: string
    PageNumber: number
    PageSize: number
    StartDate: string
    ThreatLevel: string
    ThreatSourceIp: string
    ThreatType: string
}

export interface DescribePdnsThreatLogsResponseBody {
    Logs: DescribePdnsThreatLogsResponseBodyLogs[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribePdnsThreatLogsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsThreatLogsResponseBody
}

export interface DescribePdnsThreatStatisticRequest {
    EndDate: string
    Lang: string
    StartDate: string
    ThreatSourceIp: string
}

export interface DescribePdnsThreatStatisticResponseBody {
    Data: DescribePdnsThreatStatisticResponseBodyData[]
    RequestId: string
}

export interface DescribePdnsThreatStatisticResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsThreatStatisticResponseBody
}

export interface DescribePdnsThreatStatisticsRequest {
    Direction: string
    DomainName: string
    EndDate: string
    Lang: string
    OrderBy: string
    PageNumber: number
    PageSize: number
    StartDate: string
    SubDomain: string
    ThreatLevel: string
    ThreatSourceIp: string
    ThreatType: string
    Type: string
}

export interface DescribePdnsThreatStatisticsResponseBody {
    Data: DescribePdnsThreatStatisticsResponseBodyData[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribePdnsThreatStatisticsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsThreatStatisticsResponseBody
}

export interface DescribePdnsUdpIpSegmentsRequest {
    Lang: string
    PageNumber: number
    PageSize: number
}

export interface DescribePdnsUdpIpSegmentsResponseBody {
    IpSegments: DescribePdnsUdpIpSegmentsResponseBodyIpSegments[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribePdnsUdpIpSegmentsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsUdpIpSegmentsResponseBody
}

export interface DescribePdnsUserInfoRequest {
    Lang: string
}

export interface DescribePdnsUserInfoResponseBody {
    RequestId: string
    UserInfo: DescribePdnsUserInfoResponseBodyUserInfo
}

export interface DescribePdnsUserInfoResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePdnsUserInfoResponseBody
}

export interface DescribeRecordLogsRequest {
    DomainName: string
    KeyWord: string
    Lang: string
    PageNumber: number
    PageSize: number
    StartDate: string
    UserClientIp: string
    EndDate: string
}

export interface DescribeRecordLogsResponseBody {
    PageNumber: number
    PageSize: number
    RecordLogs: DescribeRecordLogsResponseBodyRecordLogs
    RequestId: string
    TotalCount: number
}

export interface DescribeRecordLogsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeRecordLogsResponseBody
}

export interface DescribeRecordStatisticsRequest {
    DomainName: string
    DomainType: string
    EndDate: string
    Lang: string
    Rr: string
    StartDate: string
}

export interface DescribeRecordStatisticsResponseBody {
    RequestId: string
    Statistics: DescribeRecordStatisticsResponseBodyStatistics
}

export interface DescribeRecordStatisticsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeRecordStatisticsResponseBody
}

export interface DescribeRecordStatisticsSummaryRequest {
    DomainName: string
    DomainType: string
    EndDate: string
    Keyword: string
    Lang: string
    PageNumber: number
    PageSize: number
    SearchMode: string
    StartDate: string
    Threshold: number
}

export interface DescribeRecordStatisticsSummaryResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Statistics: DescribeRecordStatisticsSummaryResponseBodyStatistics
    TotalItems: number
    TotalPages: number
}

export interface DescribeRecordStatisticsSummaryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeRecordStatisticsSummaryResponseBody
}

export interface DescribeSubDomainRecordsRequest {
    DomainName: string
    Lang: string
    Line: string
    PageNumber: number
    PageSize: number
    SubDomain: string
    Type: string
    UserClientIp: string
}

export interface DescribeSubDomainRecordsResponseBody {
    DomainRecords: DescribeSubDomainRecordsResponseBodyDomainRecords
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeSubDomainRecordsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSubDomainRecordsResponseBody
}

export interface DescribeSupportLinesRequest {
    DomainName: string
    Lang: string
    UserClientIp: string
}

export interface DescribeSupportLinesResponseBody {
    RecordLines: DescribeSupportLinesResponseBodyRecordLines
    RequestId: string
}

export interface DescribeSupportLinesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSupportLinesResponseBody
}

export interface DescribeTagsRequest {
    Lang: string
    PageNumber: number
    PageSize: number
    ResourceType: string
}

export interface DescribeTagsResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Tags: DescribeTagsResponseBodyTags[]
    TotalCount: number
}

export interface DescribeTagsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeTagsResponseBody
}

export interface DescribeTransferDomainsRequest {
    DomainName: string
    FromUserId: number
    Lang: string
    PageNumber: number
    PageSize: number
    TargetUserId: number
    TransferType: string
}

export interface DescribeTransferDomainsResponseBody {
    DomainTransfers: DescribeTransferDomainsResponseBodyDomainTransfers
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeTransferDomainsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeTransferDomainsResponseBody
}

export interface ExecuteGtmRecoveryPlanRequest {
    Lang: string
    RecoveryPlanId: number
}

export interface ExecuteGtmRecoveryPlanResponseBody {
    RequestId: string
}

export interface ExecuteGtmRecoveryPlanResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ExecuteGtmRecoveryPlanResponseBody
}

export interface GetMainDomainNameRequest {
    InputString: string
    Lang: string
}

export interface GetMainDomainNameResponseBody {
    DomainLevel: number
    DomainName: string
    RR: string
    RequestId: string
}

export interface GetMainDomainNameResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: GetMainDomainNameResponseBody
}

export interface GetTxtRecordForVerifyRequest {
    DomainName: string
    Lang: string
    Type: string
}

export interface GetTxtRecordForVerifyResponseBody {
    DomainName: string
    RR: string
    RequestId: string
    Value: string
}

export interface GetTxtRecordForVerifyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: GetTxtRecordForVerifyResponseBody
}

export interface ListTagResourcesRequest {
    Lang: string
    NextToken: string
    ResourceId: string[]
    ResourceType: string
    Tag: ListTagResourcesRequestTag[]
}

export interface ListTagResourcesResponseBody {
    NextToken: string
    RequestId: string
    TagResources: ListTagResourcesResponseBodyTagResources[]
}

export interface ListTagResourcesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListTagResourcesResponseBody
}

export interface ModifyHichinaDomainDNSRequest {
    DomainName: string
    Lang: string
    UserClientIp: string
}

export interface ModifyHichinaDomainDNSResponseBody {
    NewDnsServers: ModifyHichinaDomainDNSResponseBodyNewDnsServers
    OriginalDnsServers: ModifyHichinaDomainDNSResponseBodyOriginalDnsServers
    RequestId: string
}

export interface ModifyHichinaDomainDNSResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyHichinaDomainDNSResponseBody
}

export interface MoveDomainResourceGroupRequest {
    Lang: string
    NewResourceGroupId: string
    ResourceId: string
}

export interface MoveDomainResourceGroupResponseBody {
    RequestId: string
}

export interface MoveDomainResourceGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: MoveDomainResourceGroupResponseBody
}

export interface MoveGtmResourceGroupRequest {
    Lang: string
    NewResourceGroupId: string
    ResourceId: string
}

export interface MoveGtmResourceGroupResponseBody {
    RequestId: string
}

export interface MoveGtmResourceGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: MoveGtmResourceGroupResponseBody
}

export interface OperateBatchDomainRequest {
    DomainRecordInfo: OperateBatchDomainRequestDomainRecordInfo[]
    Lang: string
    Type: string
}

export interface OperateBatchDomainResponseBody {
    RequestId: string
    TaskId: number
}

export interface OperateBatchDomainResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: OperateBatchDomainResponseBody
}

export interface PausePdnsServiceRequest {
    Lang: string
    ServiceType: string
}

export interface PausePdnsServiceResponseBody {
    RequestId: string
}

export interface PausePdnsServiceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: PausePdnsServiceResponseBody
}

export interface PreviewGtmRecoveryPlanRequest {
    Lang: string
    PageNumber: number
    PageSize: number
    RecoveryPlanId: number
}

export interface PreviewGtmRecoveryPlanResponseBody {
    PageNumber: number
    PageSize: number
    Previews: PreviewGtmRecoveryPlanResponseBodyPreviews
    RequestId: string
    TotalItems: number
    TotalPages: number
}

export interface PreviewGtmRecoveryPlanResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: PreviewGtmRecoveryPlanResponseBody
}

export interface RemovePdnsAppKeyRequest {
    AppKeyId: string
    Lang: string
}

export interface RemovePdnsAppKeyResponseBody {
    RequestId: string
}

export interface RemovePdnsAppKeyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RemovePdnsAppKeyResponseBody
}

export interface RemovePdnsUdpIpSegmentRequest {
    Ip: string
    Lang: string
}

export interface RemovePdnsUdpIpSegmentResponseBody {
    RequestId: string
}

export interface RemovePdnsUdpIpSegmentResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RemovePdnsUdpIpSegmentResponseBody
}

export interface ResumePdnsServiceRequest {
    Lang: string
    ServiceType: string
}

export interface ResumePdnsServiceResponseBody {
    RequestId: string
}

export interface ResumePdnsServiceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ResumePdnsServiceResponseBody
}

export interface RetrieveDomainRequest {
    DomainName: string
    Lang: string
}

export interface RetrieveDomainResponseBody {
    RequestId: string
}

export interface RetrieveDomainResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RetrieveDomainResponseBody
}

export interface RollbackGtmRecoveryPlanRequest {
    Lang: string
    RecoveryPlanId: number
}

export interface RollbackGtmRecoveryPlanResponseBody {
    RequestId: string
}

export interface RollbackGtmRecoveryPlanResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RollbackGtmRecoveryPlanResponseBody
}

export interface SetDNSSLBStatusRequest {
    DomainName: string
    Lang: string
    Line: string
    Open: boolean
    SubDomain: string
    Type: string
    UserClientIp: string
}

export interface SetDNSSLBStatusResponseBody {
    Open: boolean
    RecordCount: number
    RequestId: string
}

export interface SetDNSSLBStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SetDNSSLBStatusResponseBody
}

export interface SetDnsGtmAccessModeRequest {
    AccessMode: string
    Lang: string
    StrategyId: string
}

export interface SetDnsGtmAccessModeResponseBody {
    RequestId: string
}

export interface SetDnsGtmAccessModeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SetDnsGtmAccessModeResponseBody
}

export interface SetDnsGtmMonitorStatusRequest {
    Lang: string
    MonitorConfigId: string
    Status: string
}

export interface SetDnsGtmMonitorStatusResponseBody {
    RequestId: string
}

export interface SetDnsGtmMonitorStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SetDnsGtmMonitorStatusResponseBody
}

export interface SetDomainDnssecStatusRequest {
    DomainName: string
    Lang: string
    Status: string
}

export interface SetDomainDnssecStatusResponseBody {
    RequestId: string
}

export interface SetDomainDnssecStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SetDomainDnssecStatusResponseBody
}

export interface SetDomainRecordStatusRequest {
    Lang: string
    RecordId: string
    Status: string
    UserClientIp: string
}

export interface SetDomainRecordStatusResponseBody {
    RecordId: string
    RequestId: string
    Status: string
}

export interface SetDomainRecordStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SetDomainRecordStatusResponseBody
}

export interface SetGtmAccessModeRequest {
    AccessMode: string
    Lang: string
    StrategyId: string
}

export interface SetGtmAccessModeResponseBody {
    RequestId: string
}

export interface SetGtmAccessModeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SetGtmAccessModeResponseBody
}

export interface SetGtmMonitorStatusRequest {
    Lang: string
    MonitorConfigId: string
    Status: string
}

export interface SetGtmMonitorStatusResponseBody {
    RequestId: string
}

export interface SetGtmMonitorStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SetGtmMonitorStatusResponseBody
}

export interface SubmitIspFlushCacheTaskRequest {
    ClientToken: string
    DomainName: string
    Isp: string[]
    Lang: string
}

export interface SubmitIspFlushCacheTaskResponseBody {
    RequestId: string
}

export interface SubmitIspFlushCacheTaskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SubmitIspFlushCacheTaskResponseBody
}

export interface SwitchDnsGtmInstanceStrategyModeRequest {
    InstanceId: string
    Lang: string
    StrategyMode: string
}

export interface SwitchDnsGtmInstanceStrategyModeResponseBody {
    RequestId: string
}

export interface SwitchDnsGtmInstanceStrategyModeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SwitchDnsGtmInstanceStrategyModeResponseBody
}

export interface TagResourcesRequest {
    Lang: string
    ResourceId: string[]
    ResourceType: string
    Tag: TagResourcesRequestTag[]
}

export interface TagResourcesResponseBody {
    RequestId: string
}

export interface TagResourcesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: TagResourcesResponseBody
}

export interface TransferDomainRequest {
    DomainNames: string
    Lang: string
    Remark: string
    TargetUserId: number
}

export interface TransferDomainResponseBody {
    RequestId: string
    TaskId: number
}

export interface TransferDomainResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: TransferDomainResponseBody
}

export interface UnbindInstanceDomainsRequest {
    DomainNames: string
    InstanceId: string
    Lang: string
}

export interface UnbindInstanceDomainsResponseBody {
    FailedCount: number
    RequestId: string
    SuccessCount: number
}

export interface UnbindInstanceDomainsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UnbindInstanceDomainsResponseBody
}

export interface UntagResourcesRequest {
    All: boolean
    Lang: string
    ResourceId: string[]
    ResourceType: string
    TagKey: string[]
}

export interface UntagResourcesResponseBody {
    RequestId: string
}

export interface UntagResourcesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UntagResourcesResponseBody
}

export interface UpdateAppKeyStateRequest {
    AppKeyId: string
    Lang: string
    State: string
}

export interface UpdateAppKeyStateResponseBody {
    RequestId: string
}

export interface UpdateAppKeyStateResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateAppKeyStateResponseBody
}

export interface UpdateCustomLineRequest {
    IpSegment: UpdateCustomLineRequestIpSegment[]
    Lang: string
    LineId: number
    LineName: string
}

export interface UpdateCustomLineResponseBody {
    RequestId: string
}

export interface UpdateCustomLineResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateCustomLineResponseBody
}

export interface UpdateDNSSLBWeightRequest {
    Lang: string
    RecordId: string
    UserClientIp: string
    Weight: number
}

export interface UpdateDNSSLBWeightResponseBody {
    RecordId: string
    RequestId: string
    Weight: number
}

export interface UpdateDNSSLBWeightResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDNSSLBWeightResponseBody
}

export interface UpdateDnsCacheDomainRequest {
    CacheTtlMax: number
    CacheTtlMin: number
    DomainName: string
    InstanceId: string
    Lang: string
    SourceDnsServer: UpdateDnsCacheDomainRequestSourceDnsServer[]
    SourceEdns: string
    SourceProtocol: string
}

export interface UpdateDnsCacheDomainResponseBody {
    RequestId: string
}

export interface UpdateDnsCacheDomainResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDnsCacheDomainResponseBody
}

export interface UpdateDnsCacheDomainRemarkRequest {
    DomainName: string
    Lang: string
    Remark: string
}

export interface UpdateDnsCacheDomainRemarkResponseBody {
    RequestId: string
}

export interface UpdateDnsCacheDomainRemarkResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDnsCacheDomainRemarkResponseBody
}

export interface UpdateDnsGtmAccessStrategyRequest {
    AccessMode: string
    DefaultAddrPool: UpdateDnsGtmAccessStrategyRequestDefaultAddrPool[]
    DefaultAddrPoolType: string
    DefaultLatencyOptimization: string
    DefaultLbaStrategy: string
    DefaultMaxReturnAddrNum: number
    DefaultMinAvailableAddrNum: number
    FailoverAddrPool: UpdateDnsGtmAccessStrategyRequestFailoverAddrPool[]
    FailoverAddrPoolType: string
    FailoverLatencyOptimization: string
    FailoverLbaStrategy: string
    FailoverMaxReturnAddrNum: number
    FailoverMinAvailableAddrNum: number
    Lang: string
    Lines: string
    StrategyId: string
    StrategyName: string
}

export interface UpdateDnsGtmAccessStrategyResponseBody {
    RequestId: string
    StrategyId: string
}

export interface UpdateDnsGtmAccessStrategyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDnsGtmAccessStrategyResponseBody
}

export interface UpdateDnsGtmAddressPoolRequest {
    Addr: UpdateDnsGtmAddressPoolRequestAddr[]
    AddrPoolId: string
    Lang: string
    LbaStrategy: string
    Name: string
}

export interface UpdateDnsGtmAddressPoolResponseBody {
    RequestId: string
}

export interface UpdateDnsGtmAddressPoolResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDnsGtmAddressPoolResponseBody
}

export interface UpdateDnsGtmInstanceGlobalConfigRequest {
    AlertConfig: UpdateDnsGtmInstanceGlobalConfigRequestAlertConfig[]
    AlertGroup: string
    CnameType: string
    ForceUpdate: boolean
    InstanceId: string
    InstanceName: string
    Lang: string
    PublicCnameMode: string
    PublicRr: string
    PublicUserDomainName: string
    PublicZoneName: string
    Ttl: number
}

export interface UpdateDnsGtmInstanceGlobalConfigResponseBody {
    RequestId: string
}

export interface UpdateDnsGtmInstanceGlobalConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDnsGtmInstanceGlobalConfigResponseBody
}

export interface UpdateDnsGtmMonitorRequest {
    EvaluationCount: number
    Interval: number
    IspCityNode: UpdateDnsGtmMonitorRequestIspCityNode[]
    Lang: string
    MonitorConfigId: string
    MonitorExtendInfo: string
    ProtocolType: string
    Timeout: number
}

export interface UpdateDnsGtmMonitorResponseBody {
    RequestId: string
}

export interface UpdateDnsGtmMonitorResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDnsGtmMonitorResponseBody
}

export interface UpdateDomainGroupRequest {
    GroupId: string
    GroupName: string
    Lang: string
}

export interface UpdateDomainGroupResponseBody {
    GroupId: string
    GroupName: string
    RequestId: string
}

export interface UpdateDomainGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDomainGroupResponseBody
}

export interface UpdateDomainRecordRequest {
    Lang: string
    Line: string
    Priority: number
    RR: string
    RecordId: string
    TTL: number
    Type: string
    UserClientIp: string
    Value: string
}

export interface UpdateDomainRecordResponseBody {
    RecordId: string
    RequestId: string
}

export interface UpdateDomainRecordResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDomainRecordResponseBody
}

export interface UpdateDomainRecordRemarkRequest {
    Lang: string
    RecordId: string
    Remark: string
    UserClientIp: string
}

export interface UpdateDomainRecordRemarkResponseBody {
    RequestId: string
}

export interface UpdateDomainRecordRemarkResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDomainRecordRemarkResponseBody
}

export interface UpdateDomainRemarkRequest {
    DomainName: string
    Lang: string
    Remark: string
}

export interface UpdateDomainRemarkResponseBody {
    RequestId: string
}

export interface UpdateDomainRemarkResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateDomainRemarkResponseBody
}

export interface UpdateGtmAccessStrategyRequest {
    AccessLines: string
    DefaultAddrPoolId: string
    FailoverAddrPoolId: string
    Lang: string
    StrategyId: string
    StrategyName: string
}

export interface UpdateGtmAccessStrategyResponseBody {
    RequestId: string
}

export interface UpdateGtmAccessStrategyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateGtmAccessStrategyResponseBody
}

export interface UpdateGtmAddressPoolRequest {
    Addr: UpdateGtmAddressPoolRequestAddr[]
    AddrPoolId: string
    Lang: string
    MinAvailableAddrNum: number
    Name: string
    Type: string
}

export interface UpdateGtmAddressPoolResponseBody {
    RequestId: string
}

export interface UpdateGtmAddressPoolResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateGtmAddressPoolResponseBody
}

export interface UpdateGtmInstanceGlobalConfigRequest {
    AlertGroup: string
    CnameCustomDomainName: string
    CnameMode: string
    InstanceId: string
    InstanceName: string
    Lang: string
    LbaStrategy: string
    Ttl: number
    UserDomainName: string
}

export interface UpdateGtmInstanceGlobalConfigResponseBody {
    RequestId: string
}

export interface UpdateGtmInstanceGlobalConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateGtmInstanceGlobalConfigResponseBody
}

export interface UpdateGtmMonitorRequest {
    EvaluationCount: number
    Interval: number
    IspCityNode: UpdateGtmMonitorRequestIspCityNode[]
    Lang: string
    MonitorConfigId: string
    MonitorExtendInfo: string
    ProtocolType: string
    Timeout: number
}

export interface UpdateGtmMonitorResponseBody {
    RequestId: string
}

export interface UpdateGtmMonitorResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateGtmMonitorResponseBody
}

export interface UpdateGtmRecoveryPlanRequest {
    FaultAddrPool: string
    Lang: string
    Name: string
    RecoveryPlanId: number
    Remark: string
}

export interface UpdateGtmRecoveryPlanResponseBody {
    RequestId: string
}

export interface UpdateGtmRecoveryPlanResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateGtmRecoveryPlanResponseBody
}

export interface UpdateIspFlushCacheInstanceConfigRequest {
    InstanceId: string
    InstanceName: string
    Lang: string
}

export interface UpdateIspFlushCacheInstanceConfigResponseBody {
    RequestId: string
}

export interface UpdateIspFlushCacheInstanceConfigResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateIspFlushCacheInstanceConfigResponseBody
}

export interface ValidateDnsGtmCnameRrCanUseRequest {
    CnameMode: string
    CnameRr: string
    CnameType: string
    CnameZone: string
    InstanceId: string
    Lang: string
}

export interface ValidateDnsGtmCnameRrCanUseResponseBody {
    RequestId: string
}

export interface ValidateDnsGtmCnameRrCanUseResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ValidateDnsGtmCnameRrCanUseResponseBody
}

export interface ValidatePdnsUdpIpSegmentRequest {
    Ip: string
    Lang: string
}

export interface ValidatePdnsUdpIpSegmentResponseBody {
    RequestId: string
}

export interface ValidatePdnsUdpIpSegmentResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ValidatePdnsUdpIpSegmentResponseBody
}

export interface AddCustomLineRequestIpSegment {
    EndIp: string
    StartIp: string
}

export interface AddDnsCacheDomainRequestSourceDnsServer {
    Host: string
    Port: string
}

export interface AddDnsGtmAccessStrategyRequestDefaultAddrPool {
    Id: string
    LbaWeight: number
}

export interface AddDnsGtmAccessStrategyRequestFailoverAddrPool {
    Id: string
    LbaWeight: number
}

export interface AddDnsGtmAddressPoolRequestAddr {
    Addr: string
    AttributeInfo: string
    LbaWeight: number
    Mode: string
    Remark: string
}

export interface AddDnsGtmAddressPoolRequestIspCityNode {
    CityCode: string
    IspCode: string
}

export interface AddDnsGtmMonitorRequestIspCityNode {
    CityCode: string
    IspCode: string
}

export interface AddDomainResponseBodyDnsServers {
    DnsServer: string[]
}

export interface AddGtmAddressPoolRequestAddr {
    LbaWeight: number
    Mode: string
    Value: string
}

export interface AddGtmAddressPoolRequestIspCityNode {
    CityCode: string
    IspCode: string
}

export interface AddGtmMonitorRequestIspCityNode {
    CityCode: string
    IspCode: string
}

export interface DescribeBatchResultDetailResponseBodyBatchResultDetailsBatchResultDetail {
    BatchType: string
    Domain: string
    Line: string
    NewRr: string
    NewValue: string
    OperateDateStr: string
    Priority: string
    Reason: string
    RecordId: string
    Remark: string
    Rr: string
    RrStatus: string
    Status: boolean
    Ttl: string
    Type: string
    Value: string
}

export interface DescribeBatchResultDetailResponseBodyBatchResultDetails {
    BatchResultDetail: DescribeBatchResultDetailResponseBodyBatchResultDetailsBatchResultDetail[]
}

export interface DescribeCustomLineResponseBodyIpSegmentList {
    EndIp: string
    StartIp: string
}

export interface DescribeCustomLinesResponseBodyCustomLines {
    Code: string
    Id: number
    Name: string
}

export interface DescribeDNSSLBSubDomainsResponseBodySlbSubDomainsSlbSubDomainLineAlgorithmsLineAlgorithm {
    Line: string
    Open: boolean
}

export interface DescribeDNSSLBSubDomainsResponseBodySlbSubDomainsSlbSubDomainLineAlgorithms {
    LineAlgorithm: DescribeDNSSLBSubDomainsResponseBodySlbSubDomainsSlbSubDomainLineAlgorithmsLineAlgorithm[]
}

export interface DescribeDNSSLBSubDomainsResponseBodySlbSubDomainsSlbSubDomain {
    LineAlgorithms: DescribeDNSSLBSubDomainsResponseBodySlbSubDomainsSlbSubDomainLineAlgorithms
    Open: boolean
    RecordCount: number
    SubDomain: string
    Type: string
}

export interface DescribeDNSSLBSubDomainsResponseBodySlbSubDomains {
    SlbSubDomain: DescribeDNSSLBSubDomainsResponseBodySlbSubDomainsSlbSubDomain[]
}

export interface DescribeDnsCacheDomainsResponseBodyDomainsSourceDnsServers {
    Host: string
    Port: string
}

export interface DescribeDnsCacheDomainsResponseBodyDomains {
    CacheTtlMax: number
    CacheTtlMin: number
    CreateTime: string
    CreateTimestamp: number
    DomainId: string
    DomainName: string
    ExpireTime: string
    ExpireTimestamp: number
    InstanceId: string
    Remark: string
    SourceDnsServers: DescribeDnsCacheDomainsResponseBodyDomainsSourceDnsServers[]
    SourceEdns: string
    SourceProtocol: string
    UpdateTime: string
    UpdateTimestamp: number
    VersionCode: string
}

export interface DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategyEffectiveAddrPoolsEffectiveAddrPool {
    AddrCount: number
    Id: string
    LbaWeight: number
    Name: string
}

export interface DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategyEffectiveAddrPools {
    EffectiveAddrPool: DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategyEffectiveAddrPoolsEffectiveAddrPool[]
}

export interface DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategyLinesLine {
    GroupCode: string
    GroupName: string
    LineCode: string
    LineName: string
}

export interface DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategyLines {
    Line: DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategyLinesLine[]
}

export interface DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategy {
    CreateTime: string
    CreateTimestamp: number
    EffectiveAddrPoolGroupType: string
    EffectiveAddrPoolType: string
    EffectiveAddrPools: DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategyEffectiveAddrPools
    EffectiveLbaStrategy: string
    Lines: DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategyLines
    StrategyId: string
    StrategyName: string
}

export interface DescribeDnsGtmAccessStrategiesResponseBodyStrategies {
    Strategy: DescribeDnsGtmAccessStrategiesResponseBodyStrategiesStrategy[]
}

export interface DescribeDnsGtmAccessStrategyResponseBodyDefaultAddrPoolsDefaultAddrPool {
    AddrCount: number
    Id: string
    LbaWeight: number
    Name: string
}

export interface DescribeDnsGtmAccessStrategyResponseBodyDefaultAddrPools {
    DefaultAddrPool: DescribeDnsGtmAccessStrategyResponseBodyDefaultAddrPoolsDefaultAddrPool[]
}

export interface DescribeDnsGtmAccessStrategyResponseBodyFailoverAddrPoolsFailoverAddrPool {
    AddrCount: number
    Id: string
    LbaWeight: number
    Name: string
}

export interface DescribeDnsGtmAccessStrategyResponseBodyFailoverAddrPools {
    FailoverAddrPool: DescribeDnsGtmAccessStrategyResponseBodyFailoverAddrPoolsFailoverAddrPool[]
}

export interface DescribeDnsGtmAccessStrategyResponseBodyLinesLine {
    GroupCode: string
    GroupName: string
    LineCode: string
    LineName: string
}

export interface DescribeDnsGtmAccessStrategyResponseBodyLines {
    Line: DescribeDnsGtmAccessStrategyResponseBodyLinesLine[]
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyDomainAddrPoolsDomainAddrPool {
    AddrCount: number
    Id: string
    Name: string
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyDomainAddrPools {
    DomainAddrPool: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyDomainAddrPoolsDomainAddrPool[]
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyIpv4AddrPoolsIpv4AddrPool {
    AddrCount: number
    Id: string
    Name: string
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyIpv4AddrPools {
    Ipv4AddrPool: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyIpv4AddrPoolsIpv4AddrPool[]
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyIpv6AddrPoolsIpv6AddrPool {
    AddrCount: number
    Id: string
    Name: string
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyIpv6AddrPools {
    Ipv6AddrPool: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyIpv6AddrPoolsIpv6AddrPool[]
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyLinesLine {
    FatherCode: string
    GroupCode: string
    GroupName: string
    LineCode: string
    LineName: string
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyLines {
    Line: DescribeDnsGtmAccessStrategyAvailableConfigResponseBodyLinesLine[]
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodySelectedDomainLines {
    SelectedDomainLine: string[]
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodySelectedIpv4Lines {
    SelectedIpv4Line: string[]
}

export interface DescribeDnsGtmAccessStrategyAvailableConfigResponseBodySelectedIpv6Lines {
    SelectedIpv6Line: string[]
}

export interface DescribeDnsGtmAddrAttributeInfoResponseBodyAddrAddrAttributeInfo {
    FatherCode: string
    GroupCode: string
    GroupName: string
    LineCode: string
    LineName: string
}

export interface DescribeDnsGtmAddrAttributeInfoResponseBodyAddrAddr {
    Addr: string
    AttributeInfo: DescribeDnsGtmAddrAttributeInfoResponseBodyAddrAddrAttributeInfo
}

export interface DescribeDnsGtmAddrAttributeInfoResponseBodyAddr {
    Addr: DescribeDnsGtmAddrAttributeInfoResponseBodyAddrAddr[]
}

export interface DescribeDnsGtmAddressPoolAvailableConfigResponseBodyAttributeInfosAttributeInfo {
    FatherCode: string
    GroupCode: string
    GroupName: string
    LineCode: string
    LineName: string
}

export interface DescribeDnsGtmAddressPoolAvailableConfigResponseBodyAttributeInfos {
    AttributeInfo: DescribeDnsGtmAddressPoolAvailableConfigResponseBodyAttributeInfosAttributeInfo[]
}

export interface DescribeDnsGtmInstanceResponseBodyConfigAlertConfigAlertConfig {
    DingtalkNotice: boolean
    EmailNotice: boolean
    NoticeType: string
    SmsNotice: boolean
}

export interface DescribeDnsGtmInstanceResponseBodyConfigAlertConfig {
    AlertConfig: DescribeDnsGtmInstanceResponseBodyConfigAlertConfigAlertConfig[]
}

export interface DescribeDnsGtmInstanceResponseBodyConfig {
    AlertConfig: DescribeDnsGtmInstanceResponseBodyConfigAlertConfig
    AlertGroup: string
    CnameType: string
    InstanceName: string
    PubicZoneName: string
    PublicCnameMode: string
    PublicRr: string
    PublicUserDomainName: string
    StrategyMode: string
    Ttl: number
}

export interface DescribeDnsGtmInstanceResponseBodyUsedQuota {
    DingtalkUsedCount: number
    EmailUsedCount: number
    SmsUsedCount: number
    TaskUsedCount: number
}

export interface DescribeDnsGtmInstanceAddressPoolResponseBodyAddrsAddr {
    Addr: string
    AlertStatus: string
    AttributeInfo: string
    CreateTime: string
    CreateTimestamp: number
    LbaWeight: number
    Mode: string
    Remark: string
    UpdateTime: string
    UpdateTimestamp: number
}

export interface DescribeDnsGtmInstanceAddressPoolResponseBodyAddrs {
    Addr: DescribeDnsGtmInstanceAddressPoolResponseBodyAddrsAddr[]
}

export interface DescribeDnsGtmInstanceAddressPoolsResponseBodyAddrPoolsAddrPool {
    AddrCount: number
    AddrPoolId: string
    CreateTime: string
    CreateTimestamp: number
    LbaStrategy: string
    MonitorConfigId: string
    MonitorStatus: string
    Name: string
    Type: string
    UpdateTime: string
    UpdateTimestamp: number
}

export interface DescribeDnsGtmInstanceAddressPoolsResponseBodyAddrPools {
    AddrPool: DescribeDnsGtmInstanceAddressPoolsResponseBodyAddrPoolsAddrPool[]
}

export interface DescribeDnsGtmInstancesResponseBodyGtmInstancesConfigAlertConfig {
    DingtalkNotice: string
    EmailNotice: string
    NoticeType: string
    SmsNotice: string
}

export interface DescribeDnsGtmInstancesResponseBodyGtmInstancesConfig {
    AlertConfig: DescribeDnsGtmInstancesResponseBodyGtmInstancesConfigAlertConfig[]
    AlertGroup: string
    CnameType: string
    InstanceName: string
    PublicCnameMode: string
    PublicRr: string
    PublicUserDomainName: string
    PublicZoneName: string
    StrategyMode: string
    Ttl: number
}

export interface DescribeDnsGtmInstancesResponseBodyGtmInstancesUsedQuota {
    DingtalkUsedCount: number
    EmailUsedCount: number
    SmsUsedCount: number
    TaskUsedCount: number
}

export interface DescribeDnsGtmInstancesResponseBodyGtmInstances {
    Config: DescribeDnsGtmInstancesResponseBodyGtmInstancesConfig
    CreateTime: string
    CreateTimestamp: number
    ExpireTime: string
    ExpireTimestamp: number
    InstanceId: string
    PaymentType: string
    ResourceGroupId: string
    SmsQuota: number
    TaskQuota: number
    UsedQuota: DescribeDnsGtmInstancesResponseBodyGtmInstancesUsedQuota
    VersionCode: string
}

export interface DescribeDnsGtmLogsResponseBodyLogsLog {
    Content: string
    EntityId: string
    EntityName: string
    EntityType: string
    Id: number
    OperAction: string
    OperTime: string
    OperTimestamp: number
}

export interface DescribeDnsGtmLogsResponseBodyLogs {
    Log: DescribeDnsGtmLogsResponseBodyLogsLog[]
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv4IspCityNodesDomainIpv4IspCityNodeIps {
    Ip: string[]
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv4IspCityNodesDomainIpv4IspCityNode {
    CityCode: string
    CityName: string
    DefaultSelected: boolean
    GroupName: string
    GroupType: string
    Ips: DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv4IspCityNodesDomainIpv4IspCityNodeIps
    IspCode: string
    IspName: string
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv4IspCityNodes {
    DomainIpv4IspCityNode: DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv4IspCityNodesDomainIpv4IspCityNode[]
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv6IspCityNodesDomainIpv6IspCityNodeIps {
    Ip: string[]
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv6IspCityNodesDomainIpv6IspCityNode {
    CityCode: string
    CityName: string
    DefaultSelected: boolean
    GroupName: string
    GroupType: string
    Ips: DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv6IspCityNodesDomainIpv6IspCityNodeIps
    IspCode: string
    IspName: string
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv6IspCityNodes {
    DomainIpv6IspCityNode: DescribeDnsGtmMonitorAvailableConfigResponseBodyDomainIpv6IspCityNodesDomainIpv6IspCityNode[]
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv4IspCityNodesIpv4IspCityNodeIps {
    Ip: string[]
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv4IspCityNodesIpv4IspCityNode {
    CityCode: string
    CityName: string
    DefaultSelected: boolean
    GroupName: string
    GroupType: string
    Ips: DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv4IspCityNodesIpv4IspCityNodeIps
    IspCode: string
    IspName: string
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv4IspCityNodes {
    Ipv4IspCityNode: DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv4IspCityNodesIpv4IspCityNode[]
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv6IspCityNodesIpv6IspCityNodeIps {
    Ip: string[]
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv6IspCityNodesIpv6IspCityNode {
    CityCode: string
    CityName: string
    DefaultSelected: boolean
    GroupName: string
    GroupType: string
    Ips: DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv6IspCityNodesIpv6IspCityNodeIps
    IspCode: string
    IspName: string
}

export interface DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv6IspCityNodes {
    Ipv6IspCityNode: DescribeDnsGtmMonitorAvailableConfigResponseBodyIpv6IspCityNodesIpv6IspCityNode[]
}

export interface DescribeDnsGtmMonitorConfigResponseBodyIspCityNodesIspCityNode {
    CityCode: string
    CityName: string
    CountryCode: string
    CountryName: string
    IspCode: string
    IspName: string
}

export interface DescribeDnsGtmMonitorConfigResponseBodyIspCityNodes {
    IspCityNode: DescribeDnsGtmMonitorConfigResponseBodyIspCityNodesIspCityNode[]
}

export interface DescribeDnsProductInstanceResponseBodyDnsServers {
    DnsServer: string[]
}

export interface DescribeDnsProductInstancesResponseBodyDnsProductsDnsProduct {
    BindCount: number
    BindDomainCount: number
    BindDomainUsedCount: number
    BindUsedCount: number
    DDosDefendFlow: number
    DDosDefendQuery: number
    DnsSLBCount: number
    DnsSecurity: string
    Domain: string
    EndTime: string
    EndTimestamp: number
    Gslb: boolean
    ISPLines: string
    ISPRegionLines: string
    InBlackHole: boolean
    InClean: boolean
    InstanceId: string
    MonitorFrequency: number
    MonitorNodeCount: number
    MonitorTaskCount: number
    OverseaDDosDefendFlow: number
    OverseaLine: string
    PaymentType: string
    RegionLines: boolean
    SearchEngineLines: string
    StartTime: string
    StartTimestamp: number
    SubDomainLevel: number
    TTLMinValue: number
    URLForwardCount: number
    VersionCode: string
    VersionName: string
}

export interface DescribeDnsProductInstancesResponseBodyDnsProducts {
    DnsProduct: DescribeDnsProductInstancesResponseBodyDnsProductsDnsProduct[]
}

export interface DescribeDohAccountStatisticsResponseBodyStatistics {
    Timestamp: number
    TotalCount: number
    V4HttpCount: number
    V4HttpsCount: number
    V6HttpCount: number
    V6HttpsCount: number
}

export interface DescribeDohDomainStatisticsResponseBodyStatistics {
    Timestamp: number
    TotalCount: number
    V4HttpCount: number
    V4HttpsCount: number
    V6HttpCount: number
    V6HttpsCount: number
}

export interface DescribeDohDomainStatisticsSummaryResponseBodyStatistics {
    DomainName: string
    HttpCount: number
    HttpsCount: number
    IpCount: number
    TotalCount: number
    V4HttpCount: number
    V4HttpsCount: number
    V6HttpCount: number
    V6HttpsCount: number
}

export interface DescribeDohSubDomainStatisticsResponseBodyStatistics {
    Timestamp: number
    TotalCount: number
    V4HttpCount: number
    V4HttpsCount: number
    V6HttpCount: number
    V6HttpsCount: number
}

export interface DescribeDohSubDomainStatisticsSummaryResponseBodyStatistics {
    HttpCount: number
    HttpsCount: number
    IpCount: number
    SubDomain: string
    TotalCount: number
    V4HttpCount: number
    V4HttpsCount: number
    V6HttpCount: number
    V6HttpsCount: number
}

export interface DescribeDomainGroupsResponseBodyDomainGroupsDomainGroup {
    DomainCount: number
    GroupId: string
    GroupName: string
}

export interface DescribeDomainGroupsResponseBodyDomainGroups {
    DomainGroup: DescribeDomainGroupsResponseBodyDomainGroupsDomainGroup[]
}

export interface DescribeDomainInfoResponseBodyAvailableTtls {
    AvailableTtl: string[]
}

export interface DescribeDomainInfoResponseBodyDnsServers {
    DnsServer: string[]
}

export interface DescribeDomainInfoResponseBodyRecordLinesRecordLine {
    FatherCode: string
    LineCode: string
    LineDisplayName: string
    LineName: string
}

export interface DescribeDomainInfoResponseBodyRecordLines {
    RecordLine: DescribeDomainInfoResponseBodyRecordLinesRecordLine[]
}

export interface DescribeDomainLogsResponseBodyDomainLogsDomainLog {
    Action: string
    ActionTime: string
    ActionTimestamp: number
    ClientIp: string
    DomainName: string
    Message: string
    ZoneId: string
}

export interface DescribeDomainLogsResponseBodyDomainLogs {
    DomainLog: DescribeDomainLogsResponseBodyDomainLogsDomainLog[]
}

export interface DescribeDomainNsResponseBodyDnsServers {
    DnsServer: string[]
}

export interface DescribeDomainNsResponseBodyExpectDnsServers {
    ExpectDnsServer: string[]
}

export interface DescribeDomainRecordsResponseBodyDomainRecordsRecord {
    DomainName: string
    Line: string
    Locked: boolean
    Priority: number
    RR: string
    RecordId: string
    Remark: string
    Status: string
    TTL: number
    Type: string
    Value: string
    Weight: number
}

export interface DescribeDomainRecordsResponseBodyDomainRecords {
    Record: DescribeDomainRecordsResponseBodyDomainRecordsRecord[]
}

export interface DescribeDomainStatisticsResponseBodyStatisticsStatistic {
    Count: number
    Timestamp: number
}

export interface DescribeDomainStatisticsResponseBodyStatistics {
    Statistic: DescribeDomainStatisticsResponseBodyStatisticsStatistic[]
}

export interface DescribeDomainStatisticsSummaryResponseBodyStatisticsStatistic {
    Count: number
    DomainName: string
    DomainType: string
}

export interface DescribeDomainStatisticsSummaryResponseBodyStatistics {
    Statistic: DescribeDomainStatisticsSummaryResponseBodyStatisticsStatistic[]
}

export interface DescribeDomainsResponseBodyDomainsDomainDnsServers {
    DnsServer: string[]
}

export interface DescribeDomainsResponseBodyDomainsDomainTagsTag {
    Key: string
    Value: string
}

export interface DescribeDomainsResponseBodyDomainsDomainTags {
    Tag: DescribeDomainsResponseBodyDomainsDomainTagsTag[]
}

export interface DescribeDomainsResponseBodyDomainsDomain {
    AliDomain: boolean
    CreateTime: string
    CreateTimestamp: number
    DnsServers: DescribeDomainsResponseBodyDomainsDomainDnsServers
    DomainId: string
    DomainName: string
    GroupId: string
    GroupName: string
    InstanceEndTime: string
    InstanceExpired: boolean
    InstanceId: string
    PunyCode: string
    RecordCount: number
    RegistrantEmail: string
    Remark: string
    ResourceGroupId: string
    Starmark: boolean
    Tags: DescribeDomainsResponseBodyDomainsDomainTags
    VersionCode: string
    VersionName: string
}

export interface DescribeDomainsResponseBodyDomains {
    Domain: DescribeDomainsResponseBodyDomainsDomain[]
}

export interface DescribeGtmAccessStrategiesResponseBodyStrategiesStrategyLinesLine {
    GroupCode: string
    GroupName: string
    LineCode: string
    LineName: string
}

export interface DescribeGtmAccessStrategiesResponseBodyStrategiesStrategyLines {
    Line: DescribeGtmAccessStrategiesResponseBodyStrategiesStrategyLinesLine[]
}

export interface DescribeGtmAccessStrategiesResponseBodyStrategiesStrategy {
    AccessMode: string
    AccessStatus: string
    CreateTime: string
    CreateTimestamp: number
    DefaultAddrPoolId: string
    DefaultAddrPoolMonitorStatus: string
    DefaultAddrPoolName: string
    DefaultAddrPoolStatus: string
    FailoverAddrPoolId: string
    FailoverAddrPoolMonitorStatus: string
    FailoverAddrPoolName: string
    FailoverAddrPoolStatus: string
    InstanceId: string
    Lines: DescribeGtmAccessStrategiesResponseBodyStrategiesStrategyLines
    StrategyId: string
    StrategyMode: string
    StrategyName: string
}

export interface DescribeGtmAccessStrategiesResponseBodyStrategies {
    Strategy: DescribeGtmAccessStrategiesResponseBodyStrategiesStrategy[]
}

export interface DescribeGtmAccessStrategyResponseBodyLinesLine {
    GroupCode: string
    GroupName: string
    LineCode: string
    LineName: string
}

export interface DescribeGtmAccessStrategyResponseBodyLines {
    Line: DescribeGtmAccessStrategyResponseBodyLinesLine[]
}

export interface DescribeGtmAccessStrategyAvailableConfigResponseBodyAddrPoolsAddrPool {
    AddrPoolId: string
    AddrPoolName: string
}

export interface DescribeGtmAccessStrategyAvailableConfigResponseBodyAddrPools {
    AddrPool: DescribeGtmAccessStrategyAvailableConfigResponseBodyAddrPoolsAddrPool[]
}

export interface DescribeGtmAccessStrategyAvailableConfigResponseBodyLinesLine {
    FatherCode: string
    GroupCode: string
    GroupName: string
    LineCode: string
    LineName: string
    Status: string
}

export interface DescribeGtmAccessStrategyAvailableConfigResponseBodyLines {
    Line: DescribeGtmAccessStrategyAvailableConfigResponseBodyLinesLine[]
}

export interface DescribeGtmInstanceAddressPoolResponseBodyAddrsAddr {
    AddrId: number
    AlertStatus: string
    CreateTime: string
    CreateTimestamp: number
    LbaWeight: number
    Mode: string
    UpdateTime: string
    UpdateTimestamp: number
    Value: string
}

export interface DescribeGtmInstanceAddressPoolResponseBodyAddrs {
    Addr: DescribeGtmInstanceAddressPoolResponseBodyAddrsAddr[]
}

export interface DescribeGtmInstanceAddressPoolsResponseBodyAddrPoolsAddrPool {
    AddrCount: number
    AddrPoolId: string
    CreateTime: string
    CreateTimestamp: number
    MinAvailableAddrNum: number
    MonitorConfigId: string
    MonitorStatus: string
    Name: string
    Status: string
    Type: string
    UpdateTime: string
    UpdateTimestamp: number
}

export interface DescribeGtmInstanceAddressPoolsResponseBodyAddrPools {
    AddrPool: DescribeGtmInstanceAddressPoolsResponseBodyAddrPoolsAddrPool[]
}

export interface DescribeGtmInstancesResponseBodyGtmInstancesGtmInstance {
    AccessStrategyNum: number
    AddressPoolNum: number
    AlertGroup: string
    Cname: string
    CnameMode: string
    CreateTime: string
    CreateTimestamp: number
    ExpireTime: string
    ExpireTimestamp: number
    InstanceId: string
    InstanceName: string
    LbaStrategy: string
    ResourceGroupId: string
    Ttl: number
    UserDomainName: string
    VersionCode: string
}

export interface DescribeGtmInstancesResponseBodyGtmInstances {
    GtmInstance: DescribeGtmInstancesResponseBodyGtmInstancesGtmInstance[]
}

export interface DescribeGtmLogsResponseBodyLogsLog {
    Content: string
    EntityId: string
    EntityName: string
    EntityType: string
    Id: number
    OperAction: string
    OperIp: string
    OperTime: string
    OperTimestamp: number
}

export interface DescribeGtmLogsResponseBodyLogs {
    Log: DescribeGtmLogsResponseBodyLogsLog[]
}

export interface DescribeGtmMonitorAvailableConfigResponseBodyIspCityNodesIspCityNode {
    CityCode: string
    CityName: string
    DefaultSelected: boolean
    GroupName: string
    GroupType: string
    IspCode: string
    IspName: string
    Mainland: boolean
}

export interface DescribeGtmMonitorAvailableConfigResponseBodyIspCityNodes {
    IspCityNode: DescribeGtmMonitorAvailableConfigResponseBodyIspCityNodesIspCityNode[]
}

export interface DescribeGtmMonitorConfigResponseBodyIspCityNodesIspCityNode {
    CityCode: string
    CityName: string
    CountryCode: string
    CountryName: string
    IspCode: string
    IspName: string
}

export interface DescribeGtmMonitorConfigResponseBodyIspCityNodes {
    IspCityNode: DescribeGtmMonitorConfigResponseBodyIspCityNodesIspCityNode[]
}

export interface DescribeGtmRecoveryPlanResponseBodyFaultAddrPoolsFaultAddrPoolAddrsAddr {
    Id: number
    Mode: string
    Value: string
}

export interface DescribeGtmRecoveryPlanResponseBodyFaultAddrPoolsFaultAddrPoolAddrs {
    Addr: DescribeGtmRecoveryPlanResponseBodyFaultAddrPoolsFaultAddrPoolAddrsAddr[]
}

export interface DescribeGtmRecoveryPlanResponseBodyFaultAddrPoolsFaultAddrPool {
    AddrPoolId: string
    AddrPoolName: string
    Addrs: DescribeGtmRecoveryPlanResponseBodyFaultAddrPoolsFaultAddrPoolAddrs
    InstanceId: string
}

export interface DescribeGtmRecoveryPlanResponseBodyFaultAddrPools {
    FaultAddrPool: DescribeGtmRecoveryPlanResponseBodyFaultAddrPoolsFaultAddrPool[]
}

export interface DescribeGtmRecoveryPlanAvailableConfigResponseBodyInstancesInstanceAddrPoolsAddrPool {
    AddrPoolId: string
    Name: string
}

export interface DescribeGtmRecoveryPlanAvailableConfigResponseBodyInstancesInstanceAddrPools {
    AddrPool: DescribeGtmRecoveryPlanAvailableConfigResponseBodyInstancesInstanceAddrPoolsAddrPool[]
}

export interface DescribeGtmRecoveryPlanAvailableConfigResponseBodyInstancesInstance {
    AddrPools: DescribeGtmRecoveryPlanAvailableConfigResponseBodyInstancesInstanceAddrPools
    InstanceId: string
    InstanceName: string
}

export interface DescribeGtmRecoveryPlanAvailableConfigResponseBodyInstances {
    Instance: DescribeGtmRecoveryPlanAvailableConfigResponseBodyInstancesInstance[]
}

export interface DescribeGtmRecoveryPlansResponseBodyRecoveryPlansRecoveryPlan {
    CreateTime: string
    CreateTimestamp: number
    FaultAddrPoolNum: number
    LastExecuteTime: string
    LastExecuteTimestamp: number
    LastRollbackTime: string
    LastRollbackTimestamp: number
    Name: string
    RecoveryPlanId: number
    Remark: string
    Status: string
    UpdateTime: string
    UpdateTimestamp: number
}

export interface DescribeGtmRecoveryPlansResponseBodyRecoveryPlans {
    RecoveryPlan: DescribeGtmRecoveryPlansResponseBodyRecoveryPlansRecoveryPlan[]
}

export interface DescribeInstanceDomainsResponseBodyInstanceDomains {
    CreateTime: string
    CreateTimestamp: number
    DomainName: string
}

export interface DescribeIspFlushCacheInstancesResponseBodyIspFlushCacheInstancesQuotaInfo {
    InstanceQuota: number
    InstanceQuotaUsed: number
}

export interface DescribeIspFlushCacheInstancesResponseBodyIspFlushCacheInstances {
    ExpireTime: string
    ExpireTimestamp: number
    InstanceId: string
    InstanceName: string
    Isp: string
    QuotaInfo: DescribeIspFlushCacheInstancesResponseBodyIspFlushCacheInstancesQuotaInfo
    Status: string
    VersionCode: string
}

export interface DescribeIspFlushCacheTaskResponseBodyFlushCacheResultsDnsNodesAnswers {
    Name: string
    Record: string
    Ttl: number
    Type: string
}

export interface DescribeIspFlushCacheTaskResponseBodyFlushCacheResultsDnsNodes {
    Answers: DescribeIspFlushCacheTaskResponseBodyFlushCacheResultsDnsNodesAnswers[]
    NodeIp: string
    SpName: string
    Status: string
}

export interface DescribeIspFlushCacheTaskResponseBodyFlushCacheResults {
    DnsNodes: DescribeIspFlushCacheTaskResponseBodyFlushCacheResultsDnsNodes[]
    Province: string
}

export interface DescribeIspFlushCacheTasksResponseBodyIspFlushCacheTasks {
    CreateTime: string
    CreateTimestamp: number
    DomainName: string
    InstanceId: string
    InstanceName: string
    Isp: string
    TaskId: string
    TaskStatus: string
}

export interface DescribePdnsAccountSummaryResponseBodyData {
    DomainCount: number
    HttpCount: number
    HttpsCount: number
    SubDomainCount: number
    ThreatCount: number
    TotalCount: number
    UserId: number
}

export interface DescribePdnsAppKeyResponseBodyAppKey {
    AppKeyId: string
    AppKeySecret: string
    CreateDate: string
    State: string
}

export interface DescribePdnsAppKeysResponseBodyAppKeys {
    AppKeyId: string
    CreateDate: string
    State: string
}

export interface DescribePdnsOperateLogsResponseBodyLogs {
    Action: string
    OperateTime: string
    Type: string
    Content: string
}

export interface DescribePdnsRequestStatisticResponseBodyData {
    DohTotalCount: number
    HttpCount: number
    HttpsCount: number
    IpCount: number
    Timestamp: number
    TotalCount: number
    UdpTotalCount: number
    V4Count: number
    V4HttpCount: number
    V4HttpsCount: number
    V6Count: number
    V6HttpCount: number
    V6HttpsCount: number
}

export interface DescribePdnsRequestStatisticsResponseBodyDataThreatInfo {
    ThreatLevel: string
    ThreatType: string
}

export interface DescribePdnsRequestStatisticsResponseBodyData {
    DohTotalCount: number
    DomainName: string
    HttpCount: number
    HttpsCount: number
    IpCount: number
    MaxThreatLevel: string
    SubDomain: string
    ThreatCount: number
    ThreatInfo: DescribePdnsRequestStatisticsResponseBodyDataThreatInfo[]
    TotalCount: number
    UdpTotalCount: number
    V4Count: number
    V4HttpCount: number
    V4HttpsCount: number
    V6Count: number
    V6HttpCount: number
    V6HttpsCount: number
}

export interface DescribePdnsThreatLogsResponseBodyLogs {
    SourceIp: string
    SubDomain: string
    ThreatLevel: string
    ThreatTime: string
    ThreatType: string
}

export interface DescribePdnsThreatStatisticResponseBodyData {
    DohTotalCount: number
    ThreatLevel: string
    ThreatType: string
    Timestamp: number
    TotalCount: number
    UdpTotalCount: number
}

export interface DescribePdnsThreatStatisticsResponseBodyData {
    DohTotalCount: number
    DomainCount: number
    DomainName: string
    LatestThreatTime: number
    MaxThreatLevel: string
    SourceIp: string
    SubDomain: string
    ThreatLevel: string
    ThreatType: string
    TotalCount: number
    UdpTotalCount: number
}

export interface DescribePdnsUdpIpSegmentsResponseBodyIpSegments {
    CreateDate: string
    Ip: string
    Mask: number
    Name: string
    State: string
    UpdateDate: string
}

export interface DescribePdnsUserInfoResponseBodyUserInfo {
    AvailableService: string
    PdnsId: number
    ServiceType: string
    State: string
    StoppedService: string
}

export interface DescribeRecordLogsResponseBodyRecordLogsRecordLog {
    Action: string
    ActionTime: string
    ActionTimestamp: number
    ClientIp: string
    Message: string
}

export interface DescribeRecordLogsResponseBodyRecordLogs {
    RecordLog: DescribeRecordLogsResponseBodyRecordLogsRecordLog[]
}

export interface DescribeRecordStatisticsResponseBodyStatisticsStatistic {
    Count: number
    Timestamp: number
}

export interface DescribeRecordStatisticsResponseBodyStatistics {
    Statistic: DescribeRecordStatisticsResponseBodyStatisticsStatistic[]
}

export interface DescribeRecordStatisticsSummaryResponseBodyStatisticsStatistic {
    Count: number
    SubDomain: string
}

export interface DescribeRecordStatisticsSummaryResponseBodyStatistics {
    Statistic: DescribeRecordStatisticsSummaryResponseBodyStatisticsStatistic[]
}

export interface DescribeSubDomainRecordsResponseBodyDomainRecordsRecord {
    DomainName: string
    Line: string
    Locked: boolean
    Priority: number
    RR: string
    RecordId: string
    Remark: string
    Status: string
    TTL: number
    Type: string
    Value: string
    Weight: number
}

export interface DescribeSubDomainRecordsResponseBodyDomainRecords {
    Record: DescribeSubDomainRecordsResponseBodyDomainRecordsRecord[]
}

export interface DescribeSupportLinesResponseBodyRecordLinesRecordLine {
    FatherCode: string
    LineCode: string
    LineDisplayName: string
    LineName: string
}

export interface DescribeSupportLinesResponseBodyRecordLines {
    RecordLine: DescribeSupportLinesResponseBodyRecordLinesRecordLine[]
}

export interface DescribeTagsResponseBodyTags {
    Key: string
    Values: string[]
}

export interface DescribeTransferDomainsResponseBodyDomainTransfersDomainTransfer {
    CreateTime: string
    CreateTimestamp: number
    DomainName: string
    FromUserId: number
    Id: number
    TargetUserId: number
}

export interface DescribeTransferDomainsResponseBodyDomainTransfers {
    DomainTransfer: DescribeTransferDomainsResponseBodyDomainTransfersDomainTransfer[]
}

export interface ListTagResourcesRequestTag {
    Key: string
    Value: string
}

export interface ListTagResourcesResponseBodyTagResources {
    ResourceId: string
    ResourceType: string
    TagKey: string
    TagValue: string
}

export interface ModifyHichinaDomainDNSResponseBodyNewDnsServers {
    DnsServer: string[]
}

export interface ModifyHichinaDomainDNSResponseBodyOriginalDnsServers {
    DnsServer: string[]
}

export interface OperateBatchDomainRequestDomainRecordInfo {
    Domain: string
    Line: string
    NewRr: string
    NewType: string
    NewValue: string
    Priority: number
    Rr: string
    Ttl: number
    Type: string
    Value: string
}

export interface PreviewGtmRecoveryPlanResponseBodyPreviewsPreviewSwitchInfosSwitchInfo {
    Content: string
    StrategyName: string
}

export interface PreviewGtmRecoveryPlanResponseBodyPreviewsPreviewSwitchInfos {
    SwitchInfo: PreviewGtmRecoveryPlanResponseBodyPreviewsPreviewSwitchInfosSwitchInfo[]
}

export interface PreviewGtmRecoveryPlanResponseBodyPreviewsPreview {
    InstanceId: string
    Name: string
    SwitchInfos: PreviewGtmRecoveryPlanResponseBodyPreviewsPreviewSwitchInfos
    UserDomainName: string
}

export interface PreviewGtmRecoveryPlanResponseBodyPreviews {
    Preview: PreviewGtmRecoveryPlanResponseBodyPreviewsPreview[]
}

export interface TagResourcesRequestTag {
    Key: string
    Value: string
}

export interface UpdateCustomLineRequestIpSegment {
    EndIp: string
    StartIp: string
}

export interface UpdateDnsCacheDomainRequestSourceDnsServer {
    Host: string
    Port: string
}

export interface UpdateDnsGtmAccessStrategyRequestDefaultAddrPool {
    Id: string
    LbaWeight: number
}

export interface UpdateDnsGtmAccessStrategyRequestFailoverAddrPool {
    Id: string
    LbaWeight: number
}

export interface UpdateDnsGtmAddressPoolRequestAddr {
    Addr: string
    AttributeInfo: string
    LbaWeight: number
    Mode: string
    Remark: string
}

export interface UpdateDnsGtmInstanceGlobalConfigRequestAlertConfig {
    DingtalkNotice: boolean
    EmailNotice: boolean
    NoticeType: string
    SmsNotice: boolean
}

export interface UpdateDnsGtmMonitorRequestIspCityNode {
    CityCode: string
    IspCode: string
}

export interface UpdateGtmAddressPoolRequestAddr {
    LbaWeight: number
    Mode: string
    Value: string
}

export interface UpdateGtmMonitorRequestIspCityNode {
    CityCode: string
    IspCode: string
}
