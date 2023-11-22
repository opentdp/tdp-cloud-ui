/**
 * Convert from @alicloud/swas-open20200601
 */

export interface AllocatePublicConnectionRequest {
    ClientToken: string
    DatabaseInstanceId: string
    RegionId: string
}

export interface AllocatePublicConnectionResponseBody {
    PublicConnection: string
    RequestId: string
}

export interface AllocatePublicConnectionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AllocatePublicConnectionResponseBody
}

export interface CreateCustomImageRequest {
    ClientToken: string
    DataSnapshotId: string
    Description: string
    ImageName: string
    InstanceId: string
    RegionId: string
    SystemSnapshotId: string
}

export interface CreateCustomImageResponseBody {
    ImageId: string
    RequestId: string
}

export interface CreateCustomImageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateCustomImageResponseBody
}

export interface CreateFirewallRuleRequest {
    ClientToken: string
    InstanceId: string
    Port: string
    RegionId: string
    Remark: string
    RuleProtocol: string
}

export interface CreateFirewallRuleResponseBody {
    FirewallId: string
    RequestId: string
}

export interface CreateFirewallRuleResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateFirewallRuleResponseBody
}

export interface CreateInstancesRequest {
    Amount: number
    AutoRenew: boolean
    AutoRenewPeriod: number
    ChargeType: string
    ClientToken: string
    DataDiskSize: number
    ImageId: string
    Period: number
    PlanId: string
    RegionId: string
}

export interface CreateInstancesResponseBody {
    InstanceIds: string[]
    RequestId: string
}

export interface CreateInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateInstancesResponseBody
}

export interface CreateSnapshotRequest {
    ClientToken: string
    DiskId: string
    RegionId: string
    SnapshotName: string
}

export interface CreateSnapshotResponseBody {
    RequestId: string
    SnapshotId: string
}

export interface CreateSnapshotResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateSnapshotResponseBody
}

export interface DeleteCustomImageRequest {
    ClientToken: string
    ImageId: string
    RegionId: string
}

export interface DeleteCustomImageResponseBody {
    RequestId: string
}

export interface DeleteCustomImageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteCustomImageResponseBody
}

export interface DeleteFirewallRuleRequest {
    ClientToken: string
    InstanceId: string
    RegionId: string
    RuleId: string
}

export interface DeleteFirewallRuleResponseBody {
    RequestId: string
}

export interface DeleteFirewallRuleResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteFirewallRuleResponseBody
}

export interface DeleteSnapshotRequest {
    ClientToken: string
    RegionId: string
    SnapshotId: string
}

export interface DeleteSnapshotResponseBody {
    RequestId: string
}

export interface DeleteSnapshotResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteSnapshotResponseBody
}

export interface DescribeCloudAssistantStatusRequest {
    InstanceIds: string[]
    PageNumber: number
    PageSize: number
    RegionId: string
}

export interface DescribeCloudAssistantStatusShrinkRequest {
    InstanceIdsShrink: string
    PageNumber: number
    PageSize: number
    RegionId: string
}

export interface DescribeCloudAssistantStatusResponseBody {
    CloudAssistantStatus: DescribeCloudAssistantStatusResponseBodyCloudAssistantStatus[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeCloudAssistantStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeCloudAssistantStatusResponseBody
}

export interface DescribeDatabaseErrorLogsRequest {
    DatabaseInstanceId: string
    EndTime: string
    PageNumber: number
    PageSize: number
    RegionId: string
    StartTime: string
}

export interface DescribeDatabaseErrorLogsResponseBody {
    ErrorLogs: DescribeDatabaseErrorLogsResponseBodyErrorLogs[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDatabaseErrorLogsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDatabaseErrorLogsResponseBody
}

export interface DescribeDatabaseInstanceMetricDataRequest {
    DatabaseInstanceId: string
    EndTime: string
    MetricName: string
    RegionId: string
    StartTime: string
}

export interface DescribeDatabaseInstanceMetricDataResponseBody {
    DataFormat: string
    MetricData: string
    MetricName: string
    RequestId: string
    Unit: string
}

export interface DescribeDatabaseInstanceMetricDataResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDatabaseInstanceMetricDataResponseBody
}

export interface DescribeDatabaseInstanceParametersRequest {
    DatabaseInstanceId: string
    RegionId: string
}

export interface DescribeDatabaseInstanceParametersResponseBody {
    ConfigParameters: DescribeDatabaseInstanceParametersResponseBodyConfigParameters[]
    Engine: string
    EngineVersion: string
    RequestId: string
    RunningParameters: DescribeDatabaseInstanceParametersResponseBodyRunningParameters[]
}

export interface DescribeDatabaseInstanceParametersResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDatabaseInstanceParametersResponseBody
}

export interface DescribeDatabaseInstancesRequest {
    DatabaseInstanceIds: string
    PageNumber: number
    PageSize: number
    RegionId: string
}

export interface DescribeDatabaseInstancesResponseBody {
    DatabaseInstances: DescribeDatabaseInstancesResponseBodyDatabaseInstances[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDatabaseInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDatabaseInstancesResponseBody
}

export interface DescribeDatabaseSlowLogRecordsRequest {
    DatabaseInstanceId: string
    EndTime: string
    PageNumber: number
    PageSize: number
    RegionId: string
    StartTime: string
}

export interface DescribeDatabaseSlowLogRecordsResponseBody {
    Engine: string
    PageNumber: number
    PageSize: number
    PhysicalIORead: number
    RequestId: string
    SlowLogs: DescribeDatabaseSlowLogRecordsResponseBodySlowLogs[]
    TotalCount: number
}

export interface DescribeDatabaseSlowLogRecordsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDatabaseSlowLogRecordsResponseBody
}

export interface DescribeInvocationResultRequest {
    InstanceId: string
    InvokeId: string
    RegionId: string
}

export interface DescribeInvocationResultResponseBody {
    InvocationResult: DescribeInvocationResultResponseBodyInvocationResult
    RequestId: string
}

export interface DescribeInvocationResultResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInvocationResultResponseBody
}

export interface DescribeInvocationsRequest {
    InstanceId: string
    InvokeStatus: string
    PageNumber: number
    PageSize: number
    RegionId: string
}

export interface DescribeInvocationsResponseBody {
    Invocations: DescribeInvocationsResponseBodyInvocations[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeInvocationsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInvocationsResponseBody
}

export interface InstallCloudAssistantRequest {
    InstanceIds: string[]
    RegionId: string
}

export interface InstallCloudAssistantShrinkRequest {
    InstanceIdsShrink: string
    RegionId: string
}

export interface InstallCloudAssistantResponseBody {
    RequestId: string
}

export interface InstallCloudAssistantResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: InstallCloudAssistantResponseBody
}

export interface ListDisksRequest {
    DiskIds: string
    InstanceId: string
    PageNumber: number
    PageSize: number
    RegionId: string
}

export interface ListDisksResponseBody {
    Disks: ListDisksResponseBodyDisks[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface ListDisksResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListDisksResponseBody
}

export interface ListFirewallRulesRequest {
    InstanceId: string
    PageNumber: number
    PageSize: number
    RegionId: string
}

export interface ListFirewallRulesResponseBody {
    FirewallRules: ListFirewallRulesResponseBodyFirewallRules[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface ListFirewallRulesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListFirewallRulesResponseBody
}

export interface ListImagesRequest {
    ImageIds: string
    ImageType: string
    RegionId: string
}

export interface ListImagesResponseBody {
    Images: ListImagesResponseBodyImages[]
    RequestId: string
}

export interface ListImagesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListImagesResponseBody
}

export interface ListInstancePlansModificationRequest {
    InstanceId: string
    RegionId: string
}

export interface ListInstancePlansModificationResponseBody {
    Plans: ListInstancePlansModificationResponseBodyPlans[]
    RequestId: string
}

export interface ListInstancePlansModificationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListInstancePlansModificationResponseBody
}

export interface ListInstancesRequest {
    ChargeType: string
    InstanceIds: string
    PageNumber: number
    PageSize: number
    PublicIpAddresses: string
    RegionId: string
}

export interface ListInstancesResponseBody {
    Instances: ListInstancesResponseBodyInstances[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface ListInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListInstancesResponseBody
}

export interface ListInstancesTrafficPackagesRequest {
    InstanceIds: string
    RegionId: string
}

export interface ListInstancesTrafficPackagesResponseBody {
    InstanceTrafficPackageUsages: ListInstancesTrafficPackagesResponseBodyInstanceTrafficPackageUsages[]
    RequestId: string
}

export interface ListInstancesTrafficPackagesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListInstancesTrafficPackagesResponseBody
}

export interface ListPlansRequest {
    RegionId: string
}

export interface ListPlansResponseBody {
    Plans: ListPlansResponseBodyPlans[]
    RequestId: string
}

export interface ListPlansResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListPlansResponseBody
}

export interface ListRegionsResponseBody {
    Regions: ListRegionsResponseBodyRegions[]
    RequestId: string
}

export interface ListRegionsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListRegionsResponseBody
}

export interface ListSnapshotsRequest {
    DiskId: string
    InstanceId: string
    PageNumber: number
    PageSize: number
    RegionId: string
    SnapshotIds: string
}

export interface ListSnapshotsResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Snapshots: ListSnapshotsResponseBodySnapshots[]
    TotalCount: number
}

export interface ListSnapshotsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListSnapshotsResponseBody
}

export interface LoginInstanceRequest {
    InstanceId: string
    Password: string
    RegionId: string
    Username: string
}

export interface LoginInstanceResponseBody {
    RedirectUrl: string
    RequestId: string
}

export interface LoginInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: LoginInstanceResponseBody
}

export interface ModifyDatabaseInstanceDescriptionRequest {
    ClientToken: string
    DatabaseInstanceDescription: string
    DatabaseInstanceId: string
    RegionId: string
}

export interface ModifyDatabaseInstanceDescriptionResponseBody {
    RequestId: string
}

export interface ModifyDatabaseInstanceDescriptionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDatabaseInstanceDescriptionResponseBody
}

export interface ModifyDatabaseInstanceParameterRequest {
    ClientToken: string
    DatabaseInstanceId: string
    ForceRestart: boolean
    Parameters: string
    RegionId: string
}

export interface ModifyDatabaseInstanceParameterResponseBody {
    RequestId: string
}

export interface ModifyDatabaseInstanceParameterResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDatabaseInstanceParameterResponseBody
}

export interface ModifyImageShareStatusRequest {
    ClientToken: string
    ImageId: string
    Operation: string
    RegionId: string
}

export interface ModifyImageShareStatusResponseBody {
    RequestId: string
}

export interface ModifyImageShareStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyImageShareStatusResponseBody
}

export interface RebootInstanceRequest {
    ClientToken: string
    InstanceId: string
    RegionId: string
}

export interface RebootInstanceResponseBody {
    RequestId: string
}

export interface RebootInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RebootInstanceResponseBody
}

export interface ReleasePublicConnectionRequest {
    ClientToken: string
    DatabaseInstanceId: string
    RegionId: string
}

export interface ReleasePublicConnectionResponseBody {
    RequestId: string
}

export interface ReleasePublicConnectionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ReleasePublicConnectionResponseBody
}

export interface RenewInstanceRequest {
    ClientToken: string
    InstanceId: string
    Period: number
    RegionId: string
}

export interface RenewInstanceResponseBody {
    RequestId: string
}

export interface RenewInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RenewInstanceResponseBody
}

export interface ResetDatabaseAccountPasswordRequest {
    AccountPassword: string
    ClientToken: string
    DatabaseInstanceId: string
    RegionId: string
}

export interface ResetDatabaseAccountPasswordResponseBody {
    RequestId: string
}

export interface ResetDatabaseAccountPasswordResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ResetDatabaseAccountPasswordResponseBody
}

export interface ResetDiskRequest {
    ClientToken: string
    DiskId: string
    RegionId: string
    SnapshotId: string
}

export interface ResetDiskResponseBody {
    RequestId: string
}

export interface ResetDiskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ResetDiskResponseBody
}

export interface ResetSystemRequest {
    ClientToken: string
    ImageId: string
    InstanceId: string
    RegionId: string
}

export interface ResetSystemResponseBody {
    RequestId: string
}

export interface ResetSystemResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ResetSystemResponseBody
}

export interface RestartDatabaseInstanceRequest {
    ClientToken: string
    DatabaseInstanceId: string
    RegionId: string
}

export interface RestartDatabaseInstanceResponseBody {
    RequestId: string
}

export interface RestartDatabaseInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RestartDatabaseInstanceResponseBody
}

export interface RunCommandRequest {
    CommandContent: string
    EnableParameter: boolean
    InstanceId: string
    Name: string
    Parameters: {
        [key: string]: unknown
    }
    RegionId: string
    Timeout: number
    Type: string
    WindowsPasswordName: string
    WorkingDir: string
    WorkingUser: string
}

export interface RunCommandShrinkRequest {
    CommandContent: string
    EnableParameter: boolean
    InstanceId: string
    Name: string
    ParametersShrink: string
    RegionId: string
    Timeout: number
    Type: string
    WindowsPasswordName: string
    WorkingDir: string
    WorkingUser: string
}

export interface RunCommandResponseBody {
    InvokeId: string
    RequestId: string
}

export interface RunCommandResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RunCommandResponseBody
}

export interface StartDatabaseInstanceRequest {
    ClientToken: string
    DatabaseInstanceId: string
    RegionId: string
}

export interface StartDatabaseInstanceResponseBody {
    RequestId: string
}

export interface StartDatabaseInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StartDatabaseInstanceResponseBody
}

export interface StartInstanceRequest {
    ClientToken: string
    InstanceId: string
    RegionId: string
}

export interface StartInstanceResponseBody {
    RequestId: string
}

export interface StartInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StartInstanceResponseBody
}

export interface StopDatabaseInstanceRequest {
    ClientToken: string
    DatabaseInstanceId: string
    RegionId: string
}

export interface StopDatabaseInstanceResponseBody {
    RequestId: string
}

export interface StopDatabaseInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StopDatabaseInstanceResponseBody
}

export interface StopInstanceRequest {
    ClientToken: string
    InstanceId: string
    RegionId: string
}

export interface StopInstanceResponseBody {
    RequestId: string
}

export interface StopInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StopInstanceResponseBody
}

export interface UpdateInstanceAttributeRequest {
    ClientToken: string
    InstanceId: string
    InstanceName: string
    Password: string
    RegionId: string
}

export interface UpdateInstanceAttributeResponseBody {
    RequestId: string
}

export interface UpdateInstanceAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpdateInstanceAttributeResponseBody
}

export interface UpgradeInstanceRequest {
    ClientToken: string
    InstanceId: string
    PlanId: string
    RegionId: string
}

export interface UpgradeInstanceResponseBody {
    RequestId: string
}

export interface UpgradeInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UpgradeInstanceResponseBody
}

export interface DescribeCloudAssistantStatusResponseBodyCloudAssistantStatus {
    InstanceId: string
    Status: boolean
}

export interface DescribeDatabaseErrorLogsResponseBodyErrorLogs {
    CreateTime: string
    ErrorInfo: string
}

export interface DescribeDatabaseInstanceParametersResponseBodyConfigParameters {
    CheckingCode: string
    ForceModify: string
    ForceRestart: string
    ParameterDescription: string
    ParameterName: string
    ParameterValue: string
}

export interface DescribeDatabaseInstanceParametersResponseBodyRunningParameters {
    CheckingCode: string
    ForceModify: string
    ForceRestart: string
    ParameterDescription: string
    ParameterName: string
    ParameterValue: string
}

export interface DescribeDatabaseInstancesResponseBodyDatabaseInstances {
    BusinessStatus: string
    ChargeType: string
    Cpu: string
    CreationTime: string
    DatabaseInstanceEdition: string
    DatabaseInstanceId: string
    DatabaseInstanceName: string
    DatabaseInstanceStatus: string
    DatabaseVersion: string
    ExpiredTime: string
    Memory: string
    PrivateConnection: string
    PublicConnection: string
    RegionId: string
    Storage: number
    SuperAccountName: string
}

export interface DescribeDatabaseSlowLogRecordsResponseBodySlowLogs {
    DBName: string
    ExecutionStartTime: string
    HostAddress: string
    LockTimes: number
    ParseRowCounts: number
    QueryTimeMS: number
    QueryTimes: number
    ReturnRowCounts: number
    SQLText: string
}

export interface DescribeInvocationResultResponseBodyInvocationResult {
    ErrorCode: string
    ErrorInfo: string
    ExitCode: number
    FinishedTime: string
    InstanceId: string
    InvocationStatus: string
    InvokeId: string
    InvokeRecordStatus: string
    InvokeUser: string
    Output: string
    StartTime: string
}

export interface DescribeInvocationsResponseBodyInvocations {
    CommandContent: string
    CommandName: string
    CommandType: string
    CreationTime: string
    InvocationStatus: string
    InvokeId: string
    InvokeStatus: string
    Parameters: {
        [key: string]: unknown
    }
}

export interface ListDisksResponseBodyDisks {
    Category: string
    CreationTime: string
    Device: string
    DiskChargeType: string
    DiskId: string
    DiskName: string
    DiskType: string
    InstanceId: string
    RegionId: string
    Size: number
    Status: string
}

export interface ListFirewallRulesResponseBodyFirewallRules {
    Port: string
    Remark: string
    RuleId: string
    RuleProtocol: string
}

export interface ListImagesResponseBodyImages {
    Description: string
    ImageId: string
    ImageName: string
    ImageType: string
    Platform: string
}

export interface ListInstancePlansModificationResponseBodyPlans {
    Bandwidth: number
    Core: number
    Currency: string
    DiskSize: number
    DiskType: string
    Flow: number
    Memory: number
    OriginPrice: number
    PlanId: string
    SupportPlatform: string
}

export interface ListInstancesResponseBodyInstances {
    BusinessStatus: string
    ChargeType: string
    CreationTime: string
    DdosStatus: string
    ExpiredTime: string
    ImageId: string
    InnerIpAddress: string
    InstanceId: string
    InstanceName: string
    PlanId: string
    PublicIpAddress: string
    RegionId: string
    Status: string
}

export interface ListInstancesTrafficPackagesResponseBodyInstanceTrafficPackageUsages {
    InstanceId: string
    TrafficOverflow: number
    TrafficPackageRemaining: number
    TrafficPackageTotal: number
    TrafficUsed: number
}

export interface ListPlansResponseBodyPlans {
    Bandwidth: number
    Core: number
    Currency: string
    DiskSize: number
    DiskType: string
    Flow: number
    Memory: number
    OriginPrice: number
    PlanId: string
    SupportPlatform: string
}

export interface ListRegionsResponseBodyRegions {
    LocalName: string
    RegionEndpoint: string
    RegionId: string
}

export interface ListSnapshotsResponseBodySnapshots {
    CreationTime: string
    Progress: string
    RegionId: string
    Remark: string
    SnapshotId: string
    SnapshotName: string
    SourceDiskId: string
    SourceDiskType: string
    Status: string
}
