/**
 * Convert from @alicloud/ecs20140526
 */

export interface AcceptInquiredSystemEventRequest {
    Choice: string
    EventId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface AcceptInquiredSystemEventResponseBody {
    RequestId: string
}

export interface AcceptInquiredSystemEventResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AcceptInquiredSystemEventResponseBody
}

export interface ActivateRouterInterfaceRequest {
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RouterInterfaceId: string
}

export interface ActivateRouterInterfaceResponseBody {
    RequestId: string
}

export interface ActivateRouterInterfaceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ActivateRouterInterfaceResponseBody
}

export interface AddBandwidthPackageIpsRequest {
    BandwidthPackageId: string
    ClientToken: string
    IpCount: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface AddBandwidthPackageIpsResponseBody {
    RequestId: string
}

export interface AddBandwidthPackageIpsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddBandwidthPackageIpsResponseBody
}

export interface AddTagsRequest {
    OwnerId: number
    RegionId: string
    ResourceId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
    Tag: AddTagsRequestTag[]
}

export interface AddTagsResponseBody {
    RequestId: string
}

export interface AddTagsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AddTagsResponseBody
}

export interface AllocateDedicatedHostsRequest {
    NetworkAttributes: AllocateDedicatedHostsRequestNetworkAttributes
    ActionOnMaintenance: string
    AutoPlacement: string
    AutoReleaseTime: string
    AutoRenew: boolean
    AutoRenewPeriod: number
    ChargeType: string
    ClientToken: string
    CpuOverCommitRatio: number
    DedicatedHostClusterId: string
    DedicatedHostName: string
    DedicatedHostType: string
    Description: string
    MinQuantity: number
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    Quantity: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: AllocateDedicatedHostsRequestTag[]
    ZoneId: string
}

export interface AllocateDedicatedHostsResponseBody {
    DedicatedHostIdSets: AllocateDedicatedHostsResponseBodyDedicatedHostIdSets
    RequestId: string
}

export interface AllocateDedicatedHostsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AllocateDedicatedHostsResponseBody
}

export interface AllocateEipAddressRequest {
    ActivityId: number
    Bandwidth: string
    ClientToken: string
    ISP: string
    InternetChargeType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface AllocateEipAddressResponseBody {
    AllocationId: string
    EipAddress: string
    RequestId: string
}

export interface AllocateEipAddressResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AllocateEipAddressResponseBody
}

export interface AllocatePublicIpAddressRequest {
    InstanceId: string
    IpAddress: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VlanId: string
}

export interface AllocatePublicIpAddressResponseBody {
    IpAddress: string
    RequestId: string
}

export interface AllocatePublicIpAddressResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AllocatePublicIpAddressResponseBody
}

export interface ApplyAutoSnapshotPolicyRequest {
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    AutoSnapshotPolicyId: string
    DiskIds: string
    RegionId: string
}

export interface ApplyAutoSnapshotPolicyResponseBody {
    RequestId: string
}

export interface ApplyAutoSnapshotPolicyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ApplyAutoSnapshotPolicyResponseBody
}

export interface AssignIpv6AddressesRequest {
    Ipv6Address: string[]
    Ipv6AddressCount: number
    Ipv6Prefix: string[]
    Ipv6PrefixCount: number
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface AssignIpv6AddressesResponseBody {
    Ipv6PrefixSets: AssignIpv6AddressesResponseBodyIpv6PrefixSets
    Ipv6Sets: AssignIpv6AddressesResponseBodyIpv6Sets
    NetworkInterfaceId: string
    RequestId: string
}

export interface AssignIpv6AddressesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AssignIpv6AddressesResponseBody
}

export interface AssignPrivateIpAddressesRequest {
    ClientToken: string
    Ipv4Prefix: string[]
    Ipv4PrefixCount: number
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    PrivateIpAddress: string[]
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecondaryPrivateIpAddressCount: number
}

export interface AssignPrivateIpAddressesResponseBody {
    AssignedPrivateIpAddressesSet: AssignPrivateIpAddressesResponseBodyAssignedPrivateIpAddressesSet
    RequestId: string
}

export interface AssignPrivateIpAddressesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AssignPrivateIpAddressesResponseBody
}

export interface AssociateEipAddressRequest {
    AllocationId: string
    InstanceId: string
    InstanceType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface AssociateEipAddressResponseBody {
    RequestId: string
}

export interface AssociateEipAddressResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AssociateEipAddressResponseBody
}

export interface AssociateHaVipRequest {
    ClientToken: string
    HaVipId: string
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface AssociateHaVipResponseBody {
    RequestId: string
}

export interface AssociateHaVipResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AssociateHaVipResponseBody
}

export interface AttachClassicLinkVpcRequest {
    InstanceId: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VpcId: string
}

export interface AttachClassicLinkVpcResponseBody {
    RequestId: string
}

export interface AttachClassicLinkVpcResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AttachClassicLinkVpcResponseBody
}

export interface AttachDiskRequest {
    Bootable: boolean
    DeleteWithInstance: boolean
    Device: string
    DiskId: string
    InstanceId: string
    KeyPairName: string
    OwnerAccount: string
    OwnerId: number
    Password: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface AttachDiskResponseBody {
    RequestId: string
}

export interface AttachDiskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AttachDiskResponseBody
}

export interface AttachInstanceRamRoleRequest {
    InstanceIds: string
    OwnerId: number
    Policy: string
    RamRoleName: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface AttachInstanceRamRoleResponseBody {
    AttachInstanceRamRoleResults: AttachInstanceRamRoleResponseBodyAttachInstanceRamRoleResults
    FailCount: number
    RamRoleName: string
    RequestId: string
    TotalCount: number
}

export interface AttachInstanceRamRoleResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AttachInstanceRamRoleResponseBody
}

export interface AttachKeyPairRequest {
    InstanceIds: string
    KeyPairName: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface AttachKeyPairResponseBody {
    FailCount: string
    KeyPairName: string
    RequestId: string
    Results: AttachKeyPairResponseBodyResults
    TotalCount: string
}

export interface AttachKeyPairResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AttachKeyPairResponseBody
}

export interface AttachNetworkInterfaceRequest {
    InstanceId: string
    NetworkCardIndex: number
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TrunkNetworkInstanceId: string
    WaitForNetworkConfigurationReady: boolean
}

export interface AttachNetworkInterfaceResponseBody {
    RequestId: string
}

export interface AttachNetworkInterfaceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AttachNetworkInterfaceResponseBody
}

export interface AuthorizeSecurityGroupRequest {
    ClientToken: string
    Description: string
    DestCidrIp: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    OwnerAccount: string
    OwnerId: number
    Permissions: AuthorizeSecurityGroupRequestPermissions[]
    Policy: string
    PortRange: string
    Priority: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    SourceCidrIp: string
    SourceGroupId: string
    SourceGroupOwnerAccount: string
    SourceGroupOwnerId: number
    SourcePortRange: string
    SourcePrefixListId: string
}

export interface AuthorizeSecurityGroupResponseBody {
    RequestId: string
}

export interface AuthorizeSecurityGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AuthorizeSecurityGroupResponseBody
}

export interface AuthorizeSecurityGroupEgressRequest {
    ClientToken: string
    Description: string
    DestCidrIp: string
    DestGroupId: string
    DestGroupOwnerAccount: string
    DestGroupOwnerId: number
    DestPrefixListId: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    OwnerAccount: string
    OwnerId: number
    Permissions: AuthorizeSecurityGroupEgressRequestPermissions[]
    Policy: string
    PortRange: string
    Priority: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    SourceCidrIp: string
    SourcePortRange: string
}

export interface AuthorizeSecurityGroupEgressResponseBody {
    RequestId: string
}

export interface AuthorizeSecurityGroupEgressResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: AuthorizeSecurityGroupEgressResponseBody
}

export interface CancelAutoSnapshotPolicyRequest {
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    DiskIds: string
    RegionId: string
}

export interface CancelAutoSnapshotPolicyResponseBody {
    RequestId: string
}

export interface CancelAutoSnapshotPolicyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CancelAutoSnapshotPolicyResponseBody
}

export interface CancelCopyImageRequest {
    ImageId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface CancelCopyImageResponseBody {
    RequestId: string
}

export interface CancelCopyImageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CancelCopyImageResponseBody
}

export interface CancelImagePipelineExecutionRequest {
    ExecutionId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TemplateTag: CancelImagePipelineExecutionRequestTemplateTag[]
}

export interface CancelImagePipelineExecutionResponseBody {
    RequestId: string
}

export interface CancelImagePipelineExecutionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CancelImagePipelineExecutionResponseBody
}

export interface CancelPhysicalConnectionRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    PhysicalConnectionId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
}

export interface CancelPhysicalConnectionResponseBody {
    RequestId: string
}

export interface CancelPhysicalConnectionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CancelPhysicalConnectionResponseBody
}

export interface CancelSimulatedSystemEventsRequest {
    EventId: string[]
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface CancelSimulatedSystemEventsResponseBody {
    RequestId: string
}

export interface CancelSimulatedSystemEventsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CancelSimulatedSystemEventsResponseBody
}

export interface CancelTaskRequest {
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TaskId: string
}

export interface CancelTaskResponseBody {
    RequestId: string
}

export interface CancelTaskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CancelTaskResponseBody
}

export interface ConnectRouterInterfaceRequest {
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RouterInterfaceId: string
}

export interface ConnectRouterInterfaceResponseBody {
    RequestId: string
}

export interface ConnectRouterInterfaceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ConnectRouterInterfaceResponseBody
}

export interface ConvertNatPublicIpToEipRequest {
    InstanceId: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ConvertNatPublicIpToEipResponseBody {
    RequestId: string
}

export interface ConvertNatPublicIpToEipResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ConvertNatPublicIpToEipResponseBody
}

export interface CopyImageRequest {
    DestinationDescription: string
    DestinationImageName: string
    DestinationRegionId: string
    EncryptAlgorithm: string
    Encrypted: boolean
    ImageId: string
    KMSKeyId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: CopyImageRequestTag[]
}

export interface CopyImageResponseBody {
    ImageId: string
    RequestId: string
}

export interface CopyImageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CopyImageResponseBody
}

export interface CopySnapshotRequest {
    Arn: CopySnapshotRequestArn[]
    DestinationRegionId: string
    DestinationSnapshotDescription: string
    DestinationSnapshotName: string
    Encrypted: boolean
    KMSKeyId: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RetentionDays: number
    SnapshotId: string
    Tag: CopySnapshotRequestTag[]
}

export interface CopySnapshotResponseBody {
    RequestId: string
    SnapshotId: string
}

export interface CopySnapshotResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CopySnapshotResponseBody
}

export interface CreateActivationRequest {
    Description: string
    InstanceCount: number
    InstanceName: string
    IpAddressRange: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: CreateActivationRequestTag[]
    TimeToLiveInHours: number
}

export interface CreateActivationResponseBody {
    ActivationCode: string
    ActivationId: string
    RequestId: string
}

export interface CreateActivationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateActivationResponseBody
}

export interface CreateAutoProvisioningGroupRequest {
    LaunchConfiguration: CreateAutoProvisioningGroupRequestLaunchConfiguration
    AutoProvisioningGroupName: string
    AutoProvisioningGroupType: string
    ClientToken: string
    DataDiskConfig: CreateAutoProvisioningGroupRequestDataDiskConfig[]
    DefaultTargetCapacityType: string
    Description: string
    ExcessCapacityTerminationPolicy: string
    HibernationOptionsConfigured: boolean
    LaunchTemplateConfig: CreateAutoProvisioningGroupRequestLaunchTemplateConfig[]
    LaunchTemplateId: string
    LaunchTemplateVersion: string
    MaxSpotPrice: number
    MinTargetCapacity: string
    OwnerAccount: string
    OwnerId: number
    PayAsYouGoAllocationStrategy: string
    PayAsYouGoTargetCapacity: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SpotAllocationStrategy: string
    SpotInstanceInterruptionBehavior: string
    SpotInstancePoolsToUseCount: number
    SpotTargetCapacity: string
    SystemDiskConfig: CreateAutoProvisioningGroupRequestSystemDiskConfig[]
    TerminateInstances: boolean
    TerminateInstancesWithExpiration: boolean
    TotalTargetCapacity: string
    ValidFrom: string
    ValidUntil: string
}

export interface CreateAutoProvisioningGroupResponseBody {
    AutoProvisioningGroupId: string
    LaunchResults: CreateAutoProvisioningGroupResponseBodyLaunchResults
    RequestId: string
}

export interface CreateAutoProvisioningGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateAutoProvisioningGroupResponseBody
}

export interface CreateAutoSnapshotPolicyRequest {
    CopiedSnapshotsRetentionDays: number
    EnableCrossRegionCopy: boolean
    OwnerId: number
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StorageLocationArn: string
    Tag: CreateAutoSnapshotPolicyRequestTag[]
    TargetCopyRegions: string
    AutoSnapshotPolicyName: string
    RegionId: string
    RepeatWeekdays: string
    RetentionDays: number
    TimePoints: string
}

export interface CreateAutoSnapshotPolicyResponseBody {
    AutoSnapshotPolicyId: string
    RequestId: string
}

export interface CreateAutoSnapshotPolicyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateAutoSnapshotPolicyResponseBody
}

export interface CreateCapacityReservationRequest {
    PrivatePoolOptions: CreateCapacityReservationRequestPrivatePoolOptions
    ClientToken: string
    Description: string
    EndTime: string
    EndTimeType: string
    InstanceAmount: number
    InstanceType: string
    OwnerAccount: string
    OwnerId: number
    Platform: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
    Tag: CreateCapacityReservationRequestTag[]
    ZoneId: string[]
}

export interface CreateCapacityReservationResponseBody {
    PrivatePoolOptionsId: string
    RequestId: string
}

export interface CreateCapacityReservationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateCapacityReservationResponseBody
}

export interface CreateCommandRequest {
    CommandContent: string
    ContentEncoding: string
    Description: string
    EnableParameter: boolean
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: CreateCommandRequestTag[]
    Timeout: number
    Type: string
    WorkingDir: string
}

export interface CreateCommandResponseBody {
    CommandId: string
    RequestId: string
}

export interface CreateCommandResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateCommandResponseBody
}

export interface CreateDedicatedHostClusterRequest {
    DedicatedHostClusterName: string
    Description: string
    DryRun: boolean
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: CreateDedicatedHostClusterRequestTag[]
    ZoneId: string
}

export interface CreateDedicatedHostClusterResponseBody {
    DedicatedHostClusterId: string
    RequestId: string
}

export interface CreateDedicatedHostClusterResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateDedicatedHostClusterResponseBody
}

export interface CreateDemandRequest {
    Amount: number
    ClientToken: string
    DemandDescription: string
    DemandName: string
    EndTime: string
    InstanceChargeType: string
    InstanceType: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
    ZoneId: string
}

export interface CreateDemandResponseBody {
    DemandId: string
    RequestId: string
}

export interface CreateDemandResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateDemandResponseBody
}

export interface CreateDeploymentSetRequest {
    ClientToken: string
    DeploymentSetName: string
    Description: string
    Domain: string
    Granularity: string
    GroupCount: number
    OnUnableToRedeployFailedInstance: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Strategy: string
}

export interface CreateDeploymentSetResponseBody {
    DeploymentSetId: string
    RequestId: string
}

export interface CreateDeploymentSetResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateDeploymentSetResponseBody
}

export interface CreateDiagnosticMetricSetRequest {
    Description: string
    MetricIds: string[]
    MetricSetName: string
    RegionId: string
    ResourceType: string
}

export interface CreateDiagnosticMetricSetResponseBody {
    MetricSetId: string
    RequestId: string
}

export interface CreateDiagnosticMetricSetResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateDiagnosticMetricSetResponseBody
}

export interface CreateDiagnosticReportRequest {
    EndTime: string
    MetricSetId: string
    RegionId: string
    ResourceId: string
    StartTime: string
}

export interface CreateDiagnosticReportResponseBody {
    ReportId: string
    RequestId: string
}

export interface CreateDiagnosticReportResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateDiagnosticReportResponseBody
}

export interface CreateDiskRequest {
    AdvancedFeatures: string
    Arn: CreateDiskRequestArn[]
    BurstingEnabled: boolean
    ClientToken: string
    Description: string
    DiskCategory: string
    DiskName: string
    EncryptAlgorithm: string
    Encrypted: boolean
    InstanceId: string
    KMSKeyId: string
    MultiAttach: string
    OwnerAccount: string
    OwnerId: number
    PerformanceLevel: string
    ProvisionedIops: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Size: number
    SnapshotId: string
    StorageClusterId: string
    StorageSetId: string
    StorageSetPartitionNumber: number
    Tag: CreateDiskRequestTag[]
    ZoneId: string
}

export interface CreateDiskResponseBody {
    DiskId: string
    OrderId: string
    RequestId: string
}

export interface CreateDiskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateDiskResponseBody
}

export interface CreateElasticityAssuranceRequest {
    PrivatePoolOptions: CreateElasticityAssuranceRequestPrivatePoolOptions
    AssuranceTimes: string
    ClientToken: string
    Description: string
    InstanceAmount: number
    InstanceCpuCoreCount: number
    InstanceType: string[]
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
    Tag: CreateElasticityAssuranceRequestTag[]
    ZoneId: string[]
}

export interface CreateElasticityAssuranceResponseBody {
    OrderId: string
    PrivatePoolOptionsId: string
    RequestId: string
}

export interface CreateElasticityAssuranceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateElasticityAssuranceResponseBody
}

export interface CreateForwardEntryRequest {
    ExternalIp: string
    ExternalPort: string
    ForwardTableId: string
    InternalIp: string
    InternalPort: string
    IpProtocol: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface CreateForwardEntryResponseBody {
    ForwardEntryId: string
    RequestId: string
}

export interface CreateForwardEntryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateForwardEntryResponseBody
}

export interface CreateHaVipRequest {
    ClientToken: string
    Description: string
    IpAddress: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VSwitchId: string
}

export interface CreateHaVipResponseBody {
    HaVipId: string
    RequestId: string
}

export interface CreateHaVipResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateHaVipResponseBody
}

export interface CreateHpcClusterRequest {
    ClientToken: string
    Description: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface CreateHpcClusterResponseBody {
    HpcClusterId: string
    RequestId: string
}

export interface CreateHpcClusterResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateHpcClusterResponseBody
}

export interface CreateImageRequest {
    Architecture: string
    BootMode: string
    ClientToken: string
    Description: string
    DetectionStrategy: string
    DiskDeviceMapping: CreateImageRequestDiskDeviceMapping[]
    ImageFamily: string
    ImageName: string
    ImageVersion: string
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    Platform: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SnapshotId: string
    Tag: CreateImageRequestTag[]
}

export interface CreateImageResponseBody {
    ImageId: string
    RequestId: string
}

export interface CreateImageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateImageResponseBody
}

export interface CreateImageComponentRequest {
    ClientToken: string
    ComponentType: string
    Content: string
    Description: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SystemType: string
    Tag: CreateImageComponentRequestTag[]
}

export interface CreateImageComponentResponseBody {
    ImageComponentId: string
    RequestId: string
}

export interface CreateImageComponentResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateImageComponentResponseBody
}

export interface CreateImagePipelineRequest {
    AddAccount: number[]
    BaseImage: string
    BaseImageType: string
    BuildContent: string
    ClientToken: string
    DeleteInstanceOnFailure: boolean
    Description: string
    ImageName: string
    InstanceType: string
    InternetMaxBandwidthOut: number
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SystemDiskSize: number
    Tag: CreateImagePipelineRequestTag[]
    ToRegionId: string[]
    VSwitchId: string
}

export interface CreateImagePipelineResponseBody {
    ImagePipelineId: string
    RequestId: string
}

export interface CreateImagePipelineResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateImagePipelineResponseBody
}

export interface CreateInstanceRequest {
    HibernationOptions: CreateInstanceRequestHibernationOptions
    PrivatePoolOptions: CreateInstanceRequestPrivatePoolOptions
    SystemDisk: CreateInstanceRequestSystemDisk
    Affinity: string
    Arn: CreateInstanceRequestArn[]
    AutoRenew: boolean
    AutoRenewPeriod: number
    ClientToken: string
    ClusterId: string
    CreditSpecification: string
    DataDisk: CreateInstanceRequestDataDisk[]
    DedicatedHostId: string
    DeletionProtection: boolean
    DeploymentSetGroupNo: number
    DeploymentSetId: string
    Description: string
    DryRun: boolean
    HostName: string
    HpcClusterId: string
    HttpEndpoint: string
    HttpPutResponseHopLimit: number
    HttpTokens: string
    ImageFamily: string
    ImageId: string
    InnerIpAddress: string
    InstanceChargeType: string
    InstanceName: string
    InstanceType: string
    InternetChargeType: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    IoOptimized: string
    KeyPairName: string
    NodeControllerId: string
    OwnerAccount: string
    OwnerId: number
    Password: string
    PasswordInherit: boolean
    Period: number
    PeriodUnit: string
    PrivateIpAddress: string
    RamRoleName: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityEnhancementStrategy: string
    SecurityGroupId: string
    SpotDuration: number
    SpotInterruptionBehavior: string
    SpotPriceLimit: number
    SpotStrategy: string
    StorageSetId: string
    StorageSetPartitionNumber: number
    Tag: CreateInstanceRequestTag[]
    Tenancy: string
    UseAdditionalService: boolean
    UserData: string
    VSwitchId: string
    VlanId: string
    ZoneId: string
}

export interface CreateInstanceResponseBody {
    InstanceId: string
    OrderId: string
    RequestId: string
    TradePrice: number
}

export interface CreateInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateInstanceResponseBody
}

export interface CreateKeyPairRequest {
    KeyPairName: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: CreateKeyPairRequestTag[]
}

export interface CreateKeyPairResponseBody {
    KeyPairFingerPrint: string
    KeyPairId: string
    KeyPairName: string
    PrivateKeyBody: string
    RequestId: string
}

export interface CreateKeyPairResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateKeyPairResponseBody
}

export interface CreateLaunchTemplateRequest {
    SystemDisk: CreateLaunchTemplateRequestSystemDisk
    AutoReleaseTime: string
    DataDisk: CreateLaunchTemplateRequestDataDisk[]
    DeploymentSetId: string
    Description: string
    EnableVmOsConfig: boolean
    HostName: string
    ImageId: string
    ImageOwnerAlias: string
    InstanceChargeType: string
    InstanceName: string
    InstanceType: string
    InternetChargeType: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    IoOptimized: string
    Ipv6AddressCount: number
    KeyPairName: string
    LaunchTemplateName: string
    NetworkInterface: CreateLaunchTemplateRequestNetworkInterface[]
    NetworkType: string
    OwnerAccount: string
    OwnerId: number
    PasswordInherit: boolean
    Period: number
    PrivateIpAddress: string
    RamRoleName: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityEnhancementStrategy: string
    SecurityGroupId: string
    SecurityGroupIds: string[]
    SpotDuration: number
    SpotPriceLimit: number
    SpotStrategy: string
    Tag: CreateLaunchTemplateRequestTag[]
    TemplateResourceGroupId: string
    TemplateTag: CreateLaunchTemplateRequestTemplateTag[]
    UserData: string
    VSwitchId: string
    VersionDescription: string
    VpcId: string
    ZoneId: string
}

export interface CreateLaunchTemplateResponseBody {
    LaunchTemplateId: string
    RequestId: string
}

export interface CreateLaunchTemplateResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateLaunchTemplateResponseBody
}

export interface CreateLaunchTemplateVersionRequest {
    SystemDisk: CreateLaunchTemplateVersionRequestSystemDisk
    AutoReleaseTime: string
    DataDisk: CreateLaunchTemplateVersionRequestDataDisk[]
    DeploymentSetId: string
    Description: string
    EnableVmOsConfig: boolean
    HostName: string
    ImageId: string
    ImageOwnerAlias: string
    InstanceChargeType: string
    InstanceName: string
    InstanceType: string
    InternetChargeType: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    IoOptimized: string
    Ipv6AddressCount: number
    KeyPairName: string
    LaunchTemplateId: string
    LaunchTemplateName: string
    NetworkInterface: CreateLaunchTemplateVersionRequestNetworkInterface[]
    NetworkType: string
    OwnerAccount: string
    OwnerId: number
    PasswordInherit: boolean
    Period: number
    PrivateIpAddress: string
    RamRoleName: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityEnhancementStrategy: string
    SecurityGroupId: string
    SecurityGroupIds: string[]
    SpotDuration: number
    SpotPriceLimit: number
    SpotStrategy: string
    Tag: CreateLaunchTemplateVersionRequestTag[]
    UserData: string
    VSwitchId: string
    VersionDescription: string
    VpcId: string
    ZoneId: string
}

export interface CreateLaunchTemplateVersionResponseBody {
    LaunchTemplateVersionNumber: number
    RequestId: string
}

export interface CreateLaunchTemplateVersionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateLaunchTemplateVersionResponseBody
}

export interface CreateNatGatewayRequest {
    BandwidthPackage: CreateNatGatewayRequestBandwidthPackage[]
    ClientToken: string
    Description: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VpcId: string
}

export interface CreateNatGatewayResponseBody {
    BandwidthPackageIds: CreateNatGatewayResponseBodyBandwidthPackageIds
    ForwardTableIds: CreateNatGatewayResponseBodyForwardTableIds
    NatGatewayId: string
    RequestId: string
}

export interface CreateNatGatewayResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateNatGatewayResponseBody
}

export interface CreateNetworkInterfaceRequest {
    BusinessType: string
    ClientToken: string
    Description: string
    InstanceType: string
    Ipv4Prefix: string[]
    Ipv4PrefixCount: number
    Ipv6Address: string[]
    Ipv6AddressCount: number
    Ipv6Prefix: string[]
    Ipv6PrefixCount: number
    NetworkInterfaceName: string
    NetworkInterfaceTrafficMode: string
    OwnerAccount: string
    OwnerId: number
    PrimaryIpAddress: string
    PrivateIpAddress: string[]
    QueueNumber: number
    QueuePairNumber: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecondaryPrivateIpAddressCount: number
    SecurityGroupId: string
    SecurityGroupIds: string[]
    Tag: CreateNetworkInterfaceRequestTag[]
    VSwitchId: string
    Visible: boolean
}

export interface CreateNetworkInterfaceResponseBody {
    Description: string
    Ipv4PrefixSets: CreateNetworkInterfaceResponseBodyIpv4PrefixSets
    Ipv6PrefixSets: CreateNetworkInterfaceResponseBodyIpv6PrefixSets
    Ipv6Sets: CreateNetworkInterfaceResponseBodyIpv6Sets
    MacAddress: string
    NetworkInterfaceId: string
    NetworkInterfaceName: string
    OwnerId: string
    PrivateIpAddress: string
    PrivateIpSets: CreateNetworkInterfaceResponseBodyPrivateIpSets
    RequestId: string
    ResourceGroupId: string
    SecurityGroupIds: CreateNetworkInterfaceResponseBodySecurityGroupIds
    ServiceID: number
    ServiceManaged: boolean
    Status: string
    Tags: CreateNetworkInterfaceResponseBodyTags
    Type: string
    VSwitchId: string
    VpcId: string
    ZoneId: string
}

export interface CreateNetworkInterfaceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateNetworkInterfaceResponseBody
}

export interface CreateNetworkInterfacePermissionRequest {
    AccountId: number
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    Permission: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface CreateNetworkInterfacePermissionResponseBody {
    NetworkInterfacePermission: CreateNetworkInterfacePermissionResponseBodyNetworkInterfacePermission
    RequestId: string
}

export interface CreateNetworkInterfacePermissionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateNetworkInterfacePermissionResponseBody
}

export interface CreatePhysicalConnectionRequest {
    AccessPointId: string
    CircuitCode: string
    ClientToken: string
    Description: string
    LineOperator: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    PeerLocation: string
    PortType: string
    RedundantPhysicalConnectionId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Type: string
    UserCidr: string
    Bandwidth: number
}

export interface CreatePhysicalConnectionResponseBody {
    PhysicalConnectionId: string
    RequestId: string
}

export interface CreatePhysicalConnectionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreatePhysicalConnectionResponseBody
}

export interface CreatePrefixListRequest {
    AddressFamily: string
    ClientToken: string
    Description: string
    Entry: CreatePrefixListRequestEntry[]
    MaxEntries: number
    OwnerAccount: string
    OwnerId: number
    PrefixListName: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface CreatePrefixListResponseBody {
    PrefixListId: string
    RequestId: string
}

export interface CreatePrefixListResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreatePrefixListResponseBody
}

export interface CreateRouteEntryRequest {
    ClientToken: string
    DestinationCidrBlock: string
    NextHopId: string
    NextHopList: CreateRouteEntryRequestNextHopList[]
    NextHopType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RouteTableId: string
}

export interface CreateRouteEntryResponseBody {
    RequestId: string
}

export interface CreateRouteEntryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateRouteEntryResponseBody
}

export interface CreateRouterInterfaceRequest {
    AccessPointId: string
    AutoPay: boolean
    ClientToken: string
    Description: string
    HealthCheckSourceIp: string
    HealthCheckTargetIp: string
    InstanceChargeType: string
    Name: string
    OppositeAccessPointId: string
    OppositeInterfaceId: string
    OppositeInterfaceOwnerId: string
    OppositeRegionId: string
    OppositeRouterId: string
    OppositeRouterType: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    PricingCycle: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Role: string
    RouterId: string
    RouterType: string
    Spec: string
    UserCidr: string
}

export interface CreateRouterInterfaceResponseBody {
    OrderId: number
    RequestId: string
    RouterInterfaceId: string
}

export interface CreateRouterInterfaceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateRouterInterfaceResponseBody
}

export interface CreateSecurityGroupRequest {
    ClientToken: string
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupName: string
    SecurityGroupType: string
    ServiceManaged: boolean
    Tag: CreateSecurityGroupRequestTag[]
    VpcId: string
}

export interface CreateSecurityGroupResponseBody {
    RequestId: string
    SecurityGroupId: string
}

export interface CreateSecurityGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateSecurityGroupResponseBody
}

export interface CreateSimulatedSystemEventsRequest {
    EventType: string
    InstanceId: string[]
    NotBefore: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface CreateSimulatedSystemEventsResponseBody {
    EventIdSet: CreateSimulatedSystemEventsResponseBodyEventIdSet
    RequestId: string
}

export interface CreateSimulatedSystemEventsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateSimulatedSystemEventsResponseBody
}

export interface CreateSnapshotRequest {
    Category: string
    ClientToken: string
    Description: string
    DiskId: string
    InstantAccess: boolean
    InstantAccessRetentionDays: number
    OwnerAccount: string
    OwnerId: number
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RetentionDays: number
    SnapshotName: string
    StorageLocationArn: string
    Tag: CreateSnapshotRequestTag[]
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

export interface CreateSnapshotGroupRequest {
    Description: string
    DiskId: string[]
    ExcludeDiskId: string[]
    InstanceId: string
    InstantAccess: boolean
    InstantAccessRetentionDays: number
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StorageLocationArn: string
    Tag: CreateSnapshotGroupRequestTag[]
}

export interface CreateSnapshotGroupResponseBody {
    RequestId: string
    SnapshotGroupId: string
}

export interface CreateSnapshotGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateSnapshotGroupResponseBody
}

export interface CreateStorageSetRequest {
    ClientToken: string
    Description: string
    MaxPartitionNumber: number
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StorageSetName: string
    ZoneId: string
}

export interface CreateStorageSetResponseBody {
    RequestId: string
    StorageSetId: string
}

export interface CreateStorageSetResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateStorageSetResponseBody
}

export interface CreateVSwitchRequest {
    CidrBlock: string
    ClientToken: string
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VSwitchName: string
    VpcId: string
    ZoneId: string
}

export interface CreateVSwitchResponseBody {
    RequestId: string
    VSwitchId: string
}

export interface CreateVSwitchResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateVSwitchResponseBody
}

export interface CreateVirtualBorderRouterRequest {
    CircuitCode: string
    ClientToken: string
    Description: string
    LocalGatewayIp: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    PeerGatewayIp: string
    PeeringSubnetMask: string
    PhysicalConnectionId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    VbrOwnerId: number
    VlanId: number
}

export interface CreateVirtualBorderRouterResponseBody {
    RequestId: string
    VbrId: string
}

export interface CreateVirtualBorderRouterResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateVirtualBorderRouterResponseBody
}

export interface CreateVpcRequest {
    CidrBlock: string
    ClientToken: string
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    VpcName: string
}

export interface CreateVpcResponseBody {
    RequestId: string
    RouteTableId: string
    VRouterId: string
    VpcId: string
}

export interface CreateVpcResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: CreateVpcResponseBody
}

export interface DeactivateRouterInterfaceRequest {
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RouterInterfaceId: string
}

export interface DeactivateRouterInterfaceResponseBody {
    RequestId: string
}

export interface DeactivateRouterInterfaceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeactivateRouterInterfaceResponseBody
}

export interface DeleteActivationRequest {
    ActivationId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteActivationResponseBody {
    Activation: DeleteActivationResponseBodyActivation
    RequestId: string
}

export interface DeleteActivationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteActivationResponseBody
}

export interface DeleteAutoProvisioningGroupRequest {
    AutoProvisioningGroupId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TerminateInstances: boolean
}

export interface DeleteAutoProvisioningGroupResponseBody {
    RequestId: string
}

export interface DeleteAutoProvisioningGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteAutoProvisioningGroupResponseBody
}

export interface DeleteAutoSnapshotPolicyRequest {
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    AutoSnapshotPolicyId: string
    RegionId: string
}

export interface DeleteAutoSnapshotPolicyResponseBody {
    RequestId: string
}

export interface DeleteAutoSnapshotPolicyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteAutoSnapshotPolicyResponseBody
}

export interface DeleteBandwidthPackageRequest {
    BandwidthPackageId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteBandwidthPackageResponseBody {
    RequestId: string
}

export interface DeleteBandwidthPackageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteBandwidthPackageResponseBody
}

export interface DeleteCommandRequest {
    CommandId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteCommandResponseBody {
    RequestId: string
}

export interface DeleteCommandResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteCommandResponseBody
}

export interface DeleteDedicatedHostClusterRequest {
    DedicatedHostClusterId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteDedicatedHostClusterResponseBody {
    RequestId: string
}

export interface DeleteDedicatedHostClusterResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDedicatedHostClusterResponseBody
}

export interface DeleteDemandRequest {
    ClientToken: string
    DemandId: string
    OwnerAccount: string
    OwnerId: number
    Reason: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteDemandResponseBody {
    RequestId: string
}

export interface DeleteDemandResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDemandResponseBody
}

export interface DeleteDeploymentSetRequest {
    DeploymentSetId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteDeploymentSetResponseBody {
    RequestId: string
}

export interface DeleteDeploymentSetResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDeploymentSetResponseBody
}

export interface DeleteDiagnosticMetricSetsRequest {
    MetricSetIds: string[]
    RegionId: string
}

export interface DeleteDiagnosticMetricSetsResponseBody {
    RequestId: string
}

export interface DeleteDiagnosticMetricSetsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDiagnosticMetricSetsResponseBody
}

export interface DeleteDiagnosticReportsRequest {
    RegionId: string
    ReportIds: string[]
}

export interface DeleteDiagnosticReportsResponseBody {
    RequestId: string
}

export interface DeleteDiagnosticReportsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDiagnosticReportsResponseBody
}

export interface DeleteDiskRequest {
    DiskId: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteDiskResponseBody {
    RequestId: string
}

export interface DeleteDiskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteDiskResponseBody
}

export interface DeleteForwardEntryRequest {
    ForwardEntryId: string
    ForwardTableId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteForwardEntryResponseBody {
    RequestId: string
}

export interface DeleteForwardEntryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteForwardEntryResponseBody
}

export interface DeleteHaVipRequest {
    ClientToken: string
    HaVipId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteHaVipResponseBody {
    RequestId: string
}

export interface DeleteHaVipResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteHaVipResponseBody
}

export interface DeleteHpcClusterRequest {
    ClientToken: string
    HpcClusterId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteHpcClusterResponseBody {
    RequestId: string
}

export interface DeleteHpcClusterResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteHpcClusterResponseBody
}

export interface DeleteImageRequest {
    Force: boolean
    ImageId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteImageResponseBody {
    RequestId: string
}

export interface DeleteImageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteImageResponseBody
}

export interface DeleteImageComponentRequest {
    ImageComponentId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteImageComponentResponseBody {
    RequestId: string
}

export interface DeleteImageComponentResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteImageComponentResponseBody
}

export interface DeleteImagePipelineRequest {
    ImagePipelineId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteImagePipelineResponseBody {
    RequestId: string
}

export interface DeleteImagePipelineResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteImagePipelineResponseBody
}

export interface DeleteInstanceRequest {
    Force: boolean
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TerminateSubscription: boolean
}

export interface DeleteInstanceResponseBody {
    RequestId: string
}

export interface DeleteInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteInstanceResponseBody
}

export interface DeleteInstancesRequest {
    ClientToken: string
    DryRun: boolean
    Force: boolean
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TerminateSubscription: boolean
}

export interface DeleteInstancesResponseBody {
    RequestId: string
}

export interface DeleteInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteInstancesResponseBody
}

export interface DeleteKeyPairsRequest {
    KeyPairNames: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteKeyPairsResponseBody {
    RequestId: string
}

export interface DeleteKeyPairsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteKeyPairsResponseBody
}

export interface DeleteLaunchTemplateRequest {
    LaunchTemplateId: string
    LaunchTemplateName: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteLaunchTemplateResponseBody {
    RequestId: string
}

export interface DeleteLaunchTemplateResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteLaunchTemplateResponseBody
}

export interface DeleteLaunchTemplateVersionRequest {
    DeleteVersion: number[]
    LaunchTemplateId: string
    LaunchTemplateName: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteLaunchTemplateVersionResponseBody {
    RequestId: string
}

export interface DeleteLaunchTemplateVersionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteLaunchTemplateVersionResponseBody
}

export interface DeleteNatGatewayRequest {
    NatGatewayId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteNatGatewayResponseBody {
    RequestId: string
}

export interface DeleteNatGatewayResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteNatGatewayResponseBody
}

export interface DeleteNetworkInterfaceRequest {
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteNetworkInterfaceResponseBody {
    RequestId: string
}

export interface DeleteNetworkInterfaceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteNetworkInterfaceResponseBody
}

export interface DeleteNetworkInterfacePermissionRequest {
    Force: boolean
    NetworkInterfacePermissionId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeleteNetworkInterfacePermissionResponseBody {
    RequestId: string
}

export interface DeleteNetworkInterfacePermissionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteNetworkInterfacePermissionResponseBody
}

export interface DeletePhysicalConnectionRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    PhysicalConnectionId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeletePhysicalConnectionResponseBody {
    RequestId: string
}

export interface DeletePhysicalConnectionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeletePhysicalConnectionResponseBody
}

export interface DeletePrefixListRequest {
    OwnerAccount: string
    OwnerId: number
    PrefixListId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeletePrefixListResponseBody {
    RequestId: string
}

export interface DeletePrefixListResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeletePrefixListResponseBody
}

export interface DeleteRouteEntryRequest {
    DestinationCidrBlock: string
    NextHopId: string
    NextHopList: DeleteRouteEntryRequestNextHopList[]
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RouteTableId: string
}

export interface DeleteRouteEntryResponseBody {
    RequestId: string
}

export interface DeleteRouteEntryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteRouteEntryResponseBody
}

export interface DeleteRouterInterfaceRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RouterInterfaceId: string
    UserCidr: string
}

export interface DeleteRouterInterfaceResponseBody {
    RequestId: string
}

export interface DeleteRouterInterfaceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteRouterInterfaceResponseBody
}

export interface DeleteSecurityGroupRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
}

export interface DeleteSecurityGroupResponseBody {
    RequestId: string
}

export interface DeleteSecurityGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteSecurityGroupResponseBody
}

export interface DeleteSnapshotRequest {
    Force: boolean
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
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

export interface DeleteSnapshotGroupRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SnapshotGroupId: string
}

export interface DeleteSnapshotGroupResponseBody {
    OperationProgressSet: DeleteSnapshotGroupResponseBodyOperationProgressSet
    RequestId: string
}

export interface DeleteSnapshotGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteSnapshotGroupResponseBody
}

export interface DeleteStorageSetRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StorageSetId: string
}

export interface DeleteStorageSetResponseBody {
    RequestId: string
}

export interface DeleteStorageSetResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteStorageSetResponseBody
}

export interface DeleteVSwitchRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VSwitchId: string
}

export interface DeleteVSwitchResponseBody {
    RequestId: string
}

export interface DeleteVSwitchResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteVSwitchResponseBody
}

export interface DeleteVirtualBorderRouterRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    VbrId: string
}

export interface DeleteVirtualBorderRouterResponseBody {
    RequestId: string
}

export interface DeleteVirtualBorderRouterResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteVirtualBorderRouterResponseBody
}

export interface DeleteVpcRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VpcId: string
}

export interface DeleteVpcResponseBody {
    RequestId: string
}

export interface DeleteVpcResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeleteVpcResponseBody
}

export interface DeregisterManagedInstanceRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DeregisterManagedInstanceResponseBody {
    Instance: DeregisterManagedInstanceResponseBodyInstance
    RequestId: string
}

export interface DeregisterManagedInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DeregisterManagedInstanceResponseBody
}

export interface DescribeAccessPointsRequest {
    Filter: DescribeAccessPointsRequestFilter[]
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Type: string
}

export interface DescribeAccessPointsResponseBody {
    AccessPointSet: DescribeAccessPointsResponseBodyAccessPointSet
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeAccessPointsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeAccessPointsResponseBody
}

export interface DescribeAccountAttributesRequest {
    AttributeName: string[]
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ZoneId: string
}

export interface DescribeAccountAttributesResponseBody {
    AccountAttributeItems: DescribeAccountAttributesResponseBodyAccountAttributeItems
    RequestId: string
}

export interface DescribeAccountAttributesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeAccountAttributesResponseBody
}

export interface DescribeActivationsRequest {
    ActivationId: string
    InstanceName: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeActivationsRequestTag[]
}

export interface DescribeActivationsResponseBody {
    ActivationList: DescribeActivationsResponseBodyActivationList[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeActivationsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeActivationsResponseBody
}

export interface DescribeAutoProvisioningGroupHistoryRequest {
    AutoProvisioningGroupId: string
    EndTime: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface DescribeAutoProvisioningGroupHistoryResponseBody {
    AutoProvisioningGroupHistories: DescribeAutoProvisioningGroupHistoryResponseBodyAutoProvisioningGroupHistories
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeAutoProvisioningGroupHistoryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeAutoProvisioningGroupHistoryResponseBody
}

export interface DescribeAutoProvisioningGroupInstancesRequest {
    AutoProvisioningGroupId: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeAutoProvisioningGroupInstancesResponseBody {
    Instances: DescribeAutoProvisioningGroupInstancesResponseBodyInstances
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeAutoProvisioningGroupInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeAutoProvisioningGroupInstancesResponseBody
}

export interface DescribeAutoProvisioningGroupsRequest {
    AutoProvisioningGroupId: string[]
    AutoProvisioningGroupName: string
    AutoProvisioningGroupStatus: string[]
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeAutoProvisioningGroupsResponseBody {
    AutoProvisioningGroups: DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroups
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeAutoProvisioningGroupsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeAutoProvisioningGroupsResponseBody
}

export interface DescribeAutoSnapshotPolicyExRequest {
    AutoSnapshotPolicyId: string
    AutoSnapshotPolicyName: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeAutoSnapshotPolicyExRequestTag[]
}

export interface DescribeAutoSnapshotPolicyExResponseBody {
    AutoSnapshotPolicies: DescribeAutoSnapshotPolicyExResponseBodyAutoSnapshotPolicies
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeAutoSnapshotPolicyExResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeAutoSnapshotPolicyExResponseBody
}

export interface DescribeAvailableResourceRequest {
    Cores: number
    DataDiskCategory: string
    DedicatedHostId: string
    DestinationResource: string
    InstanceChargeType: string
    InstanceType: string
    IoOptimized: string
    Memory: number
    NetworkCategory: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
    Scope: string
    SpotDuration: number
    SpotStrategy: string
    SystemDiskCategory: string
    ZoneId: string
}

export interface DescribeAvailableResourceResponseBody {
    AvailableZones: DescribeAvailableResourceResponseBodyAvailableZones
    RequestId: string
}

export interface DescribeAvailableResourceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeAvailableResourceResponseBody
}

export interface DescribeBandwidthLimitationRequest {
    InstanceChargeType: string
    InstanceType: string
    OperationType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SpotStrategy: string
}

export interface DescribeBandwidthLimitationResponseBody {
    Bandwidths: DescribeBandwidthLimitationResponseBodyBandwidths
    RequestId: string
}

export interface DescribeBandwidthLimitationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeBandwidthLimitationResponseBody
}

export interface DescribeBandwidthPackagesRequest {
    BandwidthPackageId: string
    NatGatewayId: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeBandwidthPackagesResponseBody {
    BandwidthPackages: DescribeBandwidthPackagesResponseBodyBandwidthPackages
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeBandwidthPackagesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeBandwidthPackagesResponseBody
}

export interface DescribeCapacityReservationInstancesRequest {
    PrivatePoolOptions: DescribeCapacityReservationInstancesRequestPrivatePoolOptions
    MaxResults: number
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeCapacityReservationInstancesResponseBody {
    CapacityReservationItem: DescribeCapacityReservationInstancesResponseBodyCapacityReservationItem
    MaxResults: number
    NextToken: string
    RequestId: string
    TotalCount: number
}

export interface DescribeCapacityReservationInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeCapacityReservationInstancesResponseBody
}

export interface DescribeCapacityReservationsRequest {
    PrivatePoolOptions: DescribeCapacityReservationsRequestPrivatePoolOptions
    InstanceChargeType: string
    InstanceType: string
    MaxResults: number
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    Platform: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Status: string
    Tag: DescribeCapacityReservationsRequestTag[]
    ZoneId: string
}

export interface DescribeCapacityReservationsResponseBody {
    CapacityReservationSet: DescribeCapacityReservationsResponseBodyCapacityReservationSet
    MaxResults: number
    NextToken: string
    RequestId: string
    TotalCount: number
}

export interface DescribeCapacityReservationsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeCapacityReservationsResponseBody
}

export interface DescribeClassicLinkInstancesRequest {
    InstanceId: string
    OwnerId: number
    PageNumber: string
    PageSize: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VpcId: string
}

export interface DescribeClassicLinkInstancesResponseBody {
    Links: DescribeClassicLinkInstancesResponseBodyLinks
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeClassicLinkInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeClassicLinkInstancesResponseBody
}

export interface DescribeCloudAssistantStatusRequest {
    InstanceId: string[]
    OSType: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeCloudAssistantStatusResponseBody {
    InstanceCloudAssistantStatusSet: DescribeCloudAssistantStatusResponseBodyInstanceCloudAssistantStatusSet
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

export interface DescribeClustersRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeClustersResponseBody {
    Clusters: DescribeClustersResponseBodyClusters
    RequestId: string
}

export interface DescribeClustersResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeClustersResponseBody
}

export interface DescribeCommandsRequest {
    CommandId: string
    ContentEncoding: string
    Description: string
    Latest: boolean
    Name: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    Provider: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeCommandsRequestTag[]
    Type: string
}

export interface DescribeCommandsResponseBody {
    Commands: DescribeCommandsResponseBodyCommands
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeCommandsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeCommandsResponseBody
}

export interface DescribeDedicatedHostAutoRenewRequest {
    DedicatedHostIds: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeDedicatedHostAutoRenewResponseBody {
    DedicatedHostRenewAttributes: DescribeDedicatedHostAutoRenewResponseBodyDedicatedHostRenewAttributes
    RequestId: string
}

export interface DescribeDedicatedHostAutoRenewResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDedicatedHostAutoRenewResponseBody
}

export interface DescribeDedicatedHostClustersRequest {
    DedicatedHostClusterIds: string
    DedicatedHostClusterName: string
    LockReason: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Status: string
    Tag: DescribeDedicatedHostClustersRequestTag[]
    ZoneId: string
}

export interface DescribeDedicatedHostClustersResponseBody {
    DedicatedHostClusters: DescribeDedicatedHostClustersResponseBodyDedicatedHostClusters
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDedicatedHostClustersResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDedicatedHostClustersResponseBody
}

export interface DescribeDedicatedHostTypesRequest {
    DedicatedHostType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SupportedInstanceTypeFamily: string
}

export interface DescribeDedicatedHostTypesResponseBody {
    DedicatedHostTypes: DescribeDedicatedHostTypesResponseBodyDedicatedHostTypes
    RequestId: string
}

export interface DescribeDedicatedHostTypesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDedicatedHostTypesResponseBody
}

export interface DescribeDedicatedHostsRequest {
    DedicatedHostClusterId: string
    DedicatedHostIds: string
    DedicatedHostName: string
    DedicatedHostType: string
    LockReason: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SocketDetails: string
    Status: string
    Tag: DescribeDedicatedHostsRequestTag[]
    ZoneId: string
}

export interface DescribeDedicatedHostsResponseBody {
    DedicatedHosts: DescribeDedicatedHostsResponseBodyDedicatedHosts
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDedicatedHostsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDedicatedHostsResponseBody
}

export interface DescribeDemandsRequest {
    DemandId: string
    DemandStatus: string[]
    DemandType: string
    DryRun: boolean
    InstanceChargeType: string
    InstanceType: string
    InstanceTypeFamily: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeDemandsRequestTag[]
    ZoneId: string
}

export interface DescribeDemandsResponseBody {
    Demands: DescribeDemandsResponseBodyDemands
    PageNumber: number
    PageSize: number
    RegionId: string
    RequestId: string
    TotalCount: number
}

export interface DescribeDemandsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDemandsResponseBody
}

export interface DescribeDeploymentSetSupportedInstanceTypeFamilyRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeDeploymentSetSupportedInstanceTypeFamilyResponseBody {
    InstanceTypeFamilies: string
    RequestId: string
}

export interface DescribeDeploymentSetSupportedInstanceTypeFamilyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDeploymentSetSupportedInstanceTypeFamilyResponseBody
}

export interface DescribeDeploymentSetsRequest {
    DeploymentSetIds: string
    DeploymentSetName: string
    Domain: string
    Granularity: string
    NetworkType: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Strategy: string
}

export interface DescribeDeploymentSetsResponseBody {
    DeploymentSets: DescribeDeploymentSetsResponseBodyDeploymentSets
    PageNumber: number
    PageSize: number
    RegionId: string
    RequestId: string
    TotalCount: number
}

export interface DescribeDeploymentSetsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDeploymentSetsResponseBody
}

export interface DescribeDiagnosticMetricSetsRequest {
    MaxResults: number
    MetricSetIds: string[]
    NextToken: string
    RegionId: string
    ResourceType: string
    Type: string
}

export interface DescribeDiagnosticMetricSetsResponseBody {
    MetricSets: DescribeDiagnosticMetricSetsResponseBodyMetricSets[]
    NextToken: string
    RequestId: string
}

export interface DescribeDiagnosticMetricSetsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDiagnosticMetricSetsResponseBody
}

export interface DescribeDiagnosticMetricsRequest {
    MaxResults: number
    MetricIds: string[]
    NextToken: string
    RegionId: string
    ResourceType: string
}

export interface DescribeDiagnosticMetricsResponseBody {
    Metrics: DescribeDiagnosticMetricsResponseBodyMetrics[]
    NextToken: string
    RequestId: string
}

export interface DescribeDiagnosticMetricsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDiagnosticMetricsResponseBody
}

export interface DescribeDiagnosticReportAttributesRequest {
    RegionId: string
    ReportId: string
}

export interface DescribeDiagnosticReportAttributesResponseBody {
    Attributes: string
    CreationTime: string
    EndTime: string
    FinishedTime: string
    MetricResults: DescribeDiagnosticReportAttributesResponseBodyMetricResults
    MetricSetId: string
    ReportId: string
    RequestId: string
    ResourceId: string
    ResourceType: string
    Severity: string
    StartTime: string
    Status: string
}

export interface DescribeDiagnosticReportAttributesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDiagnosticReportAttributesResponseBody
}

export interface DescribeDiagnosticReportsRequest {
    MaxResults: number
    NextToken: string
    RegionId: string
    ReportIds: string[]
    ResourceIds: string[]
    Severity: string
    Status: string
}

export interface DescribeDiagnosticReportsResponseBody {
    NextToken: string
    Reports: DescribeDiagnosticReportsResponseBodyReports
    RequestId: string
}

export interface DescribeDiagnosticReportsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDiagnosticReportsResponseBody
}

export interface DescribeDiskMonitorDataRequest {
    DiskId: string
    EndTime: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface DescribeDiskMonitorDataResponseBody {
    MonitorData: DescribeDiskMonitorDataResponseBodyMonitorData
    RequestId: string
    TotalCount: number
}

export interface DescribeDiskMonitorDataResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDiskMonitorDataResponseBody
}

export interface DescribeDisksRequest {
    Filter: DescribeDisksRequestFilter[]
    AdditionalAttributes: string[]
    AutoSnapshotPolicyId: string
    Category: string
    DeleteAutoSnapshot: boolean
    DeleteWithInstance: boolean
    DiskChargeType: string
    DiskIds: string
    DiskName: string
    DiskType: string
    DryRun: boolean
    EnableAutoSnapshot: boolean
    EnableAutomatedSnapshotPolicy: boolean
    EnableShared: boolean
    Encrypted: boolean
    InstanceId: string
    KMSKeyId: string
    LockReason: string
    MaxResults: number
    MultiAttach: string
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    Portable: boolean
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SnapshotId: string
    Status: string
    Tag: DescribeDisksRequestTag[]
    ZoneId: string
}

export interface DescribeDisksResponseBody {
    Disks: DescribeDisksResponseBodyDisks
    NextToken: string
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDisksResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDisksResponseBody
}

export interface DescribeDisksFullStatusRequest {
    EventTime: DescribeDisksFullStatusRequestEventTime
    DiskId: string[]
    EventId: string[]
    EventType: string
    HealthStatus: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Status: string
    Tag: DescribeDisksFullStatusRequestTag[]
}

export interface DescribeDisksFullStatusResponseBody {
    DiskFullStatusSet: DescribeDisksFullStatusResponseBodyDiskFullStatusSet
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeDisksFullStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeDisksFullStatusResponseBody
}

export interface DescribeEipAddressesRequest {
    Filter: DescribeEipAddressesRequestFilter[]
    AllocationId: string
    AssociatedInstanceId: string
    AssociatedInstanceType: string
    ChargeType: string
    EipAddress: string
    ISP: string
    LockReason: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Status: string
}

export interface DescribeEipAddressesResponseBody {
    EipAddresses: DescribeEipAddressesResponseBodyEipAddresses
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeEipAddressesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeEipAddressesResponseBody
}

export interface DescribeEipMonitorDataRequest {
    AllocationId: string
    EndTime: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface DescribeEipMonitorDataResponseBody {
    EipMonitorDatas: DescribeEipMonitorDataResponseBodyEipMonitorDatas
    RequestId: string
}

export interface DescribeEipMonitorDataResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeEipMonitorDataResponseBody
}

export interface DescribeElasticityAssuranceInstancesRequest {
    PrivatePoolOptions: DescribeElasticityAssuranceInstancesRequestPrivatePoolOptions
    MaxResults: number
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeElasticityAssuranceInstancesResponseBody {
    ElasticityAssuranceItem: DescribeElasticityAssuranceInstancesResponseBodyElasticityAssuranceItem
    MaxResults: number
    NextToken: string
    RequestId: string
    TotalCount: number
}

export interface DescribeElasticityAssuranceInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeElasticityAssuranceInstancesResponseBody
}

export interface DescribeElasticityAssurancesRequest {
    PrivatePoolOptions: DescribeElasticityAssurancesRequestPrivatePoolOptions
    InstanceChargeType: string
    InstanceType: string
    MaxResults: number
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    Platform: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Status: string
    Tag: DescribeElasticityAssurancesRequestTag[]
    ZoneId: string
}

export interface DescribeElasticityAssurancesResponseBody {
    ElasticityAssuranceSet: DescribeElasticityAssurancesResponseBodyElasticityAssuranceSet
    MaxResults: number
    NextToken: string
    RequestId: string
    TotalCount: number
}

export interface DescribeElasticityAssurancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeElasticityAssurancesResponseBody
}

export interface DescribeEniMonitorDataRequest {
    EndTime: string
    EniId: string
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface DescribeEniMonitorDataResponseBody {
    MonitorData: DescribeEniMonitorDataResponseBodyMonitorData
    RequestId: string
    TotalCount: number
}

export interface DescribeEniMonitorDataResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeEniMonitorDataResponseBody
}

export interface DescribeForwardTableEntriesRequest {
    ForwardEntryId: string
    ForwardTableId: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeForwardTableEntriesResponseBody {
    ForwardTableEntries: DescribeForwardTableEntriesResponseBodyForwardTableEntries
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeForwardTableEntriesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeForwardTableEntriesResponseBody
}

export interface DescribeHaVipsRequest {
    Filter: DescribeHaVipsRequestFilter[]
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeHaVipsResponseBody {
    HaVips: DescribeHaVipsResponseBodyHaVips
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeHaVipsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeHaVipsResponseBody
}

export interface DescribeHpcClustersRequest {
    ClientToken: string
    HpcClusterIds: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeHpcClustersResponseBody {
    HpcClusters: DescribeHpcClustersResponseBodyHpcClusters
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeHpcClustersResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeHpcClustersResponseBody
}

export interface DescribeImageComponentsRequest {
    ImageComponentId: string[]
    MaxResults: number
    Name: string
    NextToken: string
    Owner: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeImageComponentsRequestTag[]
}

export interface DescribeImageComponentsResponseBody {
    ImageComponent: DescribeImageComponentsResponseBodyImageComponent
    MaxResults: number
    NextToken: string
    RequestId: string
    TotalCount: number
}

export interface DescribeImageComponentsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeImageComponentsResponseBody
}

export interface DescribeImageFromFamilyRequest {
    ImageFamily: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeImageFromFamilyResponseBody {
    Image: DescribeImageFromFamilyResponseBodyImage
    RequestId: string
}

export interface DescribeImageFromFamilyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeImageFromFamilyResponseBody
}

export interface DescribeImagePipelineExecutionsRequest {
    ExecutionId: string
    ImagePipelineId: string
    MaxResults: number
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Status: string
    Tag: DescribeImagePipelineExecutionsRequestTag[]
}

export interface DescribeImagePipelineExecutionsResponseBody {
    ImagePipelineExecution: DescribeImagePipelineExecutionsResponseBodyImagePipelineExecution
    MaxResults: number
    NextToken: string
    RequestId: string
    TotalCount: number
}

export interface DescribeImagePipelineExecutionsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeImagePipelineExecutionsResponseBody
}

export interface DescribeImagePipelinesRequest {
    ImagePipelineId: string[]
    MaxResults: number
    Name: string
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeImagePipelinesRequestTag[]
}

export interface DescribeImagePipelinesResponseBody {
    ImagePipeline: DescribeImagePipelinesResponseBodyImagePipeline
    MaxResults: number
    NextToken: string
    RequestId: string
    TotalCount: number
}

export interface DescribeImagePipelinesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeImagePipelinesResponseBody
}

export interface DescribeImageSharePermissionRequest {
    ImageId: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeImageSharePermissionResponseBody {
    Accounts: DescribeImageSharePermissionResponseBodyAccounts
    ImageId: string
    PageNumber: number
    PageSize: number
    RegionId: string
    RequestId: string
    ShareGroups: DescribeImageSharePermissionResponseBodyShareGroups
    TotalCount: number
}

export interface DescribeImageSharePermissionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeImageSharePermissionResponseBody
}

export interface DescribeImageSupportInstanceTypesRequest {
    ActionType: string
    Filter: DescribeImageSupportInstanceTypesRequestFilter[]
    ImageId: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeImageSupportInstanceTypesResponseBody {
    ImageId: string
    InstanceTypes: DescribeImageSupportInstanceTypesResponseBodyInstanceTypes
    RegionId: string
    RequestId: string
}

export interface DescribeImageSupportInstanceTypesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeImageSupportInstanceTypesResponseBody
}

export interface DescribeImagesRequest {
    ActionType: string
    Architecture: string
    DryRun: boolean
    Filter: DescribeImagesRequestFilter[]
    ImageFamily: string
    ImageId: string
    ImageName: string
    ImageOwnerAlias: string
    ImageOwnerId: number
    InstanceType: string
    IsPublic: boolean
    IsSupportCloudinit: boolean
    IsSupportIoOptimized: boolean
    OSType: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ShowExpired: boolean
    SnapshotId: string
    Status: string
    Tag: DescribeImagesRequestTag[]
    Usage: string
}

export interface DescribeImagesResponseBody {
    Images: DescribeImagesResponseBodyImages
    PageNumber: number
    PageSize: number
    RegionId: string
    RequestId: string
    TotalCount: number
}

export interface DescribeImagesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeImagesResponseBody
}

export interface DescribeInstanceAttachmentAttributesRequest {
    InstanceIds: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceAttachmentAttributesResponseBody {
    Instances: DescribeInstanceAttachmentAttributesResponseBodyInstances
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeInstanceAttachmentAttributesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceAttachmentAttributesResponseBody
}

export interface DescribeInstanceAttributeRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceAttributeResponseBody {
    ClusterId: string
    Cpu: number
    CreationTime: string
    CreditSpecification: string
    DedicatedHostAttribute: DescribeInstanceAttributeResponseBodyDedicatedHostAttribute
    Description: string
    EipAddress: DescribeInstanceAttributeResponseBodyEipAddress
    ExpiredTime: string
    HostName: string
    ImageId: string
    InnerIpAddress: DescribeInstanceAttributeResponseBodyInnerIpAddress
    InstanceChargeType: string
    InstanceId: string
    InstanceName: string
    InstanceNetworkType: string
    InstanceType: string
    InternetChargeType: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    IoOptimized: string
    Memory: number
    OperationLocks: DescribeInstanceAttributeResponseBodyOperationLocks
    PublicIpAddress: DescribeInstanceAttributeResponseBodyPublicIpAddress
    RegionId: string
    RequestId: string
    SecurityGroupIds: DescribeInstanceAttributeResponseBodySecurityGroupIds
    SerialNumber: string
    Status: string
    StoppedMode: string
    VlanId: string
    VpcAttributes: DescribeInstanceAttributeResponseBodyVpcAttributes
    ZoneId: string
}

export interface DescribeInstanceAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceAttributeResponseBody
}

export interface DescribeInstanceAutoRenewAttributeRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: string
    PageSize: string
    RegionId: string
    RenewalStatus: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceAutoRenewAttributeResponseBody {
    InstanceRenewAttributes: DescribeInstanceAutoRenewAttributeResponseBodyInstanceRenewAttributes
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeInstanceAutoRenewAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceAutoRenewAttributeResponseBody
}

export interface DescribeInstanceHistoryEventsRequest {
    EventPublishTime: DescribeInstanceHistoryEventsRequestEventPublishTime
    NotBefore: DescribeInstanceHistoryEventsRequestNotBefore
    EventCycleStatus: string
    EventId: string[]
    EventType: string
    ImpactLevel: string
    InstanceEventCycleStatus: string[]
    InstanceEventType: string[]
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceId: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
    Tag: DescribeInstanceHistoryEventsRequestTag[]
}

export interface DescribeInstanceHistoryEventsResponseBody {
    InstanceSystemEventSet: DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSet
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeInstanceHistoryEventsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceHistoryEventsResponseBody
}

export interface DescribeInstanceMaintenanceAttributesRequest {
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceMaintenanceAttributesResponseBody {
    MaintenanceAttributes: DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributes
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeInstanceMaintenanceAttributesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceMaintenanceAttributesResponseBody
}

export interface DescribeInstanceModificationPriceRequest {
    SystemDisk: DescribeInstanceModificationPriceRequestSystemDisk
    DataDisk: DescribeInstanceModificationPriceRequestDataDisk[]
    InstanceId: string
    InstanceType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceModificationPriceResponseBody {
    PriceInfo: DescribeInstanceModificationPriceResponseBodyPriceInfo
    RequestId: string
}

export interface DescribeInstanceModificationPriceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceModificationPriceResponseBody
}

export interface DescribeInstanceMonitorDataRequest {
    EndTime: string
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface DescribeInstanceMonitorDataResponseBody {
    MonitorData: DescribeInstanceMonitorDataResponseBodyMonitorData
    RequestId: string
}

export interface DescribeInstanceMonitorDataResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceMonitorDataResponseBody
}

export interface DescribeInstanceRamRoleRequest {
    InstanceIds: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RamRoleName: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceRamRoleResponseBody {
    InstanceRamRoleSets: DescribeInstanceRamRoleResponseBodyInstanceRamRoleSets
    RegionId: string
    RequestId: string
    TotalCount: number
}

export interface DescribeInstanceRamRoleResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceRamRoleResponseBody
}

export interface DescribeInstanceStatusRequest {
    ClusterId: string
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ZoneId: string
}

export interface DescribeInstanceStatusResponseBody {
    InstanceStatuses: DescribeInstanceStatusResponseBodyInstanceStatuses
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeInstanceStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceStatusResponseBody
}

export interface DescribeInstanceTopologyRequest {
    InstanceIds: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceTopologyResponseBody {
    RequestId: string
    Topologys: DescribeInstanceTopologyResponseBodyTopologys
}

export interface DescribeInstanceTopologyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceTopologyResponseBody
}

export interface DescribeInstanceTypeFamiliesRequest {
    Generation: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceTypeFamiliesResponseBody {
    InstanceTypeFamilies: DescribeInstanceTypeFamiliesResponseBodyInstanceTypeFamilies
    RequestId: string
}

export interface DescribeInstanceTypeFamiliesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceTypeFamiliesResponseBody
}

export interface DescribeInstanceTypesRequest {
    CpuArchitecture: string
    GPUSpec: string
    InstanceCategory: string
    InstanceFamilyLevel: string
    InstanceTypeFamily: string
    InstanceTypes: string[]
    LocalStorageCategory: string
    MaxResults: number
    MaximumCpuCoreCount: number
    MaximumCpuSpeedFrequency: number
    MaximumCpuTurboFrequency: number
    MaximumGPUAmount: number
    MaximumMemorySize: number
    MinimumBaselineCredit: number
    MinimumCpuCoreCount: number
    MinimumCpuSpeedFrequency: number
    MinimumCpuTurboFrequency: number
    MinimumDiskQuantity: number
    MinimumEniIpv6AddressQuantity: number
    MinimumEniPrivateIpAddressQuantity: number
    MinimumEniQuantity: number
    MinimumEriQuantity: number
    MinimumGPUAmount: number
    MinimumInitialCredit: number
    MinimumInstanceBandwidthRx: number
    MinimumInstanceBandwidthTx: number
    MinimumInstancePpsRx: number
    MinimumInstancePpsTx: number
    MinimumLocalStorageAmount: number
    MinimumLocalStorageCapacity: number
    MinimumMemorySize: number
    MinimumPrimaryEniQueueNumber: number
    MinimumQueuePairNumber: number
    MinimumSecondaryEniQueueNumber: number
    NextToken: string
    NvmeSupport: string
    OwnerAccount: string
    OwnerId: number
    PhysicalProcessorModel: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceTypesResponseBody {
    InstanceTypes: DescribeInstanceTypesResponseBodyInstanceTypes
    NextToken: string
    RequestId: string
}

export interface DescribeInstanceTypesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceTypesResponseBody
}

export interface DescribeInstanceVncPasswdRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceVncPasswdResponseBody {
    RequestId: string
    VncPasswd: string
}

export interface DescribeInstanceVncPasswdResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceVncPasswdResponseBody
}

export interface DescribeInstanceVncUrlRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeInstanceVncUrlResponseBody {
    RequestId: string
    VncUrl: string
}

export interface DescribeInstanceVncUrlResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstanceVncUrlResponseBody
}

export interface DescribeInstancesRequest {
    Filter: DescribeInstancesRequestFilter[]
    AdditionalAttributes: string[]
    DeviceAvailable: boolean
    DryRun: boolean
    EipAddresses: string
    HpcClusterId: string
    HttpEndpoint: string
    HttpPutResponseHopLimit: number
    HttpTokens: string
    ImageId: string
    InnerIpAddresses: string
    InstanceChargeType: string
    InstanceIds: string
    InstanceName: string
    InstanceNetworkType: string
    InstanceType: string
    InstanceTypeFamily: string
    InternetChargeType: string
    IoOptimized: boolean
    Ipv6Address: string[]
    KeyPairName: string
    LockReason: string
    MaxResults: number
    NeedSaleCycle: boolean
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    PrivateIpAddresses: string
    PublicIpAddresses: string
    RdmaIpAddresses: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    Status: string
    Tag: DescribeInstancesRequestTag[]
    VSwitchId: string
    VpcId: string
    ZoneId: string
}

export interface DescribeInstancesResponseBody {
    Instances: DescribeInstancesResponseBodyInstances
    NextToken: string
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstancesResponseBody
}

export interface DescribeInstancesFullStatusRequest {
    EventPublishTime: DescribeInstancesFullStatusRequestEventPublishTime
    NotBefore: DescribeInstancesFullStatusRequestNotBefore
    EventId: string[]
    EventType: string
    HealthStatus: string
    InstanceEventType: string[]
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Status: string
}

export interface DescribeInstancesFullStatusResponseBody {
    InstanceFullStatusSet: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSet
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeInstancesFullStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInstancesFullStatusResponseBody
}

export interface DescribeInvocationResultsRequest {
    CommandId: string
    ContentEncoding: string
    IncludeHistory: boolean
    InstanceId: string
    InvokeId: string
    InvokeRecordStatus: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeInvocationResultsRequestTag[]
}

export interface DescribeInvocationResultsResponseBody {
    Invocation: DescribeInvocationResultsResponseBodyInvocation
    RequestId: string
}

export interface DescribeInvocationResultsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeInvocationResultsResponseBody
}

export interface DescribeInvocationsRequest {
    CommandId: string
    CommandName: string
    CommandType: string
    ContentEncoding: string
    IncludeOutput: boolean
    InstanceId: string
    InvokeId: string
    InvokeStatus: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    RepeatMode: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeInvocationsRequestTag[]
    Timed: boolean
}

export interface DescribeInvocationsResponseBody {
    Invocations: DescribeInvocationsResponseBodyInvocations
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

export interface DescribeKeyPairsRequest {
    KeyPairFingerPrint: string
    KeyPairName: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeKeyPairsRequestTag[]
}

export interface DescribeKeyPairsResponseBody {
    KeyPairs: DescribeKeyPairsResponseBodyKeyPairs
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeKeyPairsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeKeyPairsResponseBody
}

export interface DescribeLaunchTemplateVersionsRequest {
    DefaultVersion: boolean
    DetailFlag: boolean
    LaunchTemplateId: string
    LaunchTemplateName: string
    LaunchTemplateVersion: number[]
    MaxVersion: number
    MinVersion: number
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeLaunchTemplateVersionsResponseBody {
    LaunchTemplateVersionSets: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSets
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeLaunchTemplateVersionsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeLaunchTemplateVersionsResponseBody
}

export interface DescribeLaunchTemplatesRequest {
    LaunchTemplateId: string[]
    LaunchTemplateName: string[]
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TemplateResourceGroupId: string
    TemplateTag: DescribeLaunchTemplatesRequestTemplateTag[]
}

export interface DescribeLaunchTemplatesResponseBody {
    LaunchTemplateSets: DescribeLaunchTemplatesResponseBodyLaunchTemplateSets
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeLaunchTemplatesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeLaunchTemplatesResponseBody
}

export interface DescribeLimitationRequest {
    Limitation: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeLimitationResponseBody {
    Limitation: string
    RequestId: string
    Value: string
}

export interface DescribeLimitationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeLimitationResponseBody
}

export interface DescribeManagedInstancesRequest {
    ActivationId: string
    InstanceId: string[]
    InstanceIp: string
    InstanceName: string
    OsType: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeManagedInstancesRequestTag[]
}

export interface DescribeManagedInstancesResponseBody {
    Instances: DescribeManagedInstancesResponseBodyInstances[]
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeManagedInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeManagedInstancesResponseBody
}

export interface DescribeNatGatewaysRequest {
    NatGatewayId: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VpcId: string
}

export interface DescribeNatGatewaysResponseBody {
    NatGateways: DescribeNatGatewaysResponseBodyNatGateways
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeNatGatewaysResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeNatGatewaysResponseBody
}

export interface DescribeNetworkInterfaceAttributeRequest {
    Attribute: string
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeNetworkInterfaceAttributeRequestTag[]
}

export interface DescribeNetworkInterfaceAttributeResponseBody {
    AssociatedPublicIp: DescribeNetworkInterfaceAttributeResponseBodyAssociatedPublicIp
    Attachment: DescribeNetworkInterfaceAttributeResponseBodyAttachment
    BondInterfaceSpecification: DescribeNetworkInterfaceAttributeResponseBodyBondInterfaceSpecification
    CreationTime: string
    Description: string
    InstanceId: string
    Ipv4PrefixSets: DescribeNetworkInterfaceAttributeResponseBodyIpv4PrefixSets
    Ipv6PrefixSets: DescribeNetworkInterfaceAttributeResponseBodyIpv6PrefixSets
    Ipv6Sets: DescribeNetworkInterfaceAttributeResponseBodyIpv6Sets
    MacAddress: string
    NetworkInterfaceId: string
    NetworkInterfaceName: string
    NetworkInterfaceTrafficMode: string
    OwnerId: string
    PrivateIpAddress: string
    PrivateIpSets: DescribeNetworkInterfaceAttributeResponseBodyPrivateIpSets
    QueueNumber: number
    QueuePairNumber: number
    RequestId: string
    ResourceGroupId: string
    SecurityGroupIds: DescribeNetworkInterfaceAttributeResponseBodySecurityGroupIds
    ServiceID: number
    ServiceManaged: boolean
    SlaveInterfaceSpecification: DescribeNetworkInterfaceAttributeResponseBodySlaveInterfaceSpecification
    Status: string
    Tags: DescribeNetworkInterfaceAttributeResponseBodyTags
    Type: string
    VSwitchId: string
    VpcId: string
    ZoneId: string
}

export interface DescribeNetworkInterfaceAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeNetworkInterfaceAttributeResponseBody
}

export interface DescribeNetworkInterfacePermissionsRequest {
    NetworkInterfaceId: string
    NetworkInterfacePermissionId: string[]
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeNetworkInterfacePermissionsResponseBody {
    NetworkInterfacePermissions: DescribeNetworkInterfacePermissionsResponseBodyNetworkInterfacePermissions
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeNetworkInterfacePermissionsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeNetworkInterfacePermissionsResponseBody
}

export interface DescribeNetworkInterfacesRequest {
    InstanceId: string
    Ipv6Address: string[]
    MaxResults: number
    NetworkInterfaceId: string[]
    NetworkInterfaceName: string
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    PrimaryIpAddress: string
    PrivateIpAddress: string[]
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    ServiceManaged: boolean
    Status: string
    Tag: DescribeNetworkInterfacesRequestTag[]
    Type: string
    VSwitchId: string
    VpcId: string
}

export interface DescribeNetworkInterfacesResponseBody {
    NetworkInterfaceSets: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSets
    NextToken: string
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeNetworkInterfacesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeNetworkInterfacesResponseBody
}

export interface DescribeNewProjectEipMonitorDataRequest {
    AllocationId: string
    EndTime: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface DescribeNewProjectEipMonitorDataResponseBody {
    EipMonitorDatas: DescribeNewProjectEipMonitorDataResponseBodyEipMonitorDatas
    RequestId: string
}

export interface DescribeNewProjectEipMonitorDataResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeNewProjectEipMonitorDataResponseBody
}

export interface DescribePhysicalConnectionsRequest {
    ClientToken: string
    Filter: DescribePhysicalConnectionsRequestFilter[]
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
}

export interface DescribePhysicalConnectionsResponseBody {
    PageNumber: number
    PageSize: number
    PhysicalConnectionSet: DescribePhysicalConnectionsResponseBodyPhysicalConnectionSet
    RequestId: string
    TotalCount: number
}

export interface DescribePhysicalConnectionsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePhysicalConnectionsResponseBody
}

export interface DescribePrefixListAssociationsRequest {
    MaxResults: number
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    PrefixListId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribePrefixListAssociationsResponseBody {
    NextToken: string
    PrefixListAssociations: DescribePrefixListAssociationsResponseBodyPrefixListAssociations
    RequestId: string
}

export interface DescribePrefixListAssociationsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePrefixListAssociationsResponseBody
}

export interface DescribePrefixListAttributesRequest {
    OwnerAccount: string
    OwnerId: number
    PrefixListId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribePrefixListAttributesResponseBody {
    AddressFamily: string
    CreationTime: string
    Description: string
    Entries: DescribePrefixListAttributesResponseBodyEntries
    MaxEntries: number
    PrefixListId: string
    PrefixListName: string
    RequestId: string
}

export interface DescribePrefixListAttributesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePrefixListAttributesResponseBody
}

export interface DescribePrefixListsRequest {
    AddressFamily: string
    MaxResults: number
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    PrefixListId: string[]
    PrefixListName: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribePrefixListsResponseBody {
    NextToken: string
    PrefixLists: DescribePrefixListsResponseBodyPrefixLists
    RequestId: string
}

export interface DescribePrefixListsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePrefixListsResponseBody
}

export interface DescribePriceRequest {
    DataDisk: DescribePriceRequestDataDisk[]
    SchedulerOptions: DescribePriceRequestSchedulerOptions
    SystemDisk: DescribePriceRequestSystemDisk
    Amount: number
    AssuranceTimes: string
    Capacity: number
    DedicatedHostType: string
    ImageId: string
    InstanceAmount: number
    InstanceCpuCoreCount: number
    InstanceNetworkType: string
    InstanceType: string
    InstanceTypeList: string[]
    InternetChargeType: string
    InternetMaxBandwidthOut: number
    IoOptimized: string
    Isp: string
    OfferingType: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    Platform: string
    PriceUnit: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
    Scope: string
    SpotDuration: number
    SpotStrategy: string
    ZoneId: string
}

export interface DescribePriceResponseBody {
    PriceInfo: DescribePriceResponseBodyPriceInfo
    RequestId: string
}

export interface DescribePriceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribePriceResponseBody
}

export interface DescribeRecommendInstanceTypeRequest {
    Cores: number
    InstanceChargeType: string
    InstanceFamilyLevel: string
    InstanceType: string
    InstanceTypeFamily: string[]
    IoOptimized: string
    MaxPrice: number
    Memory: number
    NetworkType: string
    OwnerAccount: string
    OwnerId: number
    PriorityStrategy: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Scene: string
    SpotStrategy: string
    SystemDiskCategory: string
    ZoneId: string
    ZoneMatchMode: string
}

export interface DescribeRecommendInstanceTypeResponseBody {
    Data: DescribeRecommendInstanceTypeResponseBodyData
    RequestId: string
}

export interface DescribeRecommendInstanceTypeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeRecommendInstanceTypeResponseBody
}

export interface DescribeRegionsRequest {
    AcceptLanguage: string
    InstanceChargeType: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
}

export interface DescribeRegionsResponseBody {
    Regions: DescribeRegionsResponseBodyRegions
    RequestId: string
}

export interface DescribeRegionsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeRegionsResponseBody
}

export interface DescribeRenewalPriceRequest {
    ExpectedRenewDay: number
    OwnerAccount: string
    OwnerId: number
    Period: number
    PriceUnit: string
    RegionId: string
    ResourceId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
}

export interface DescribeRenewalPriceResponseBody {
    PriceInfo: DescribeRenewalPriceResponseBodyPriceInfo
    RequestId: string
}

export interface DescribeRenewalPriceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeRenewalPriceResponseBody
}

export interface DescribeReservedInstanceAutoRenewAttributeRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ReservedInstanceId: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeReservedInstanceAutoRenewAttributeResponseBody {
    RequestId: string
    ReservedInstanceRenewAttributes: DescribeReservedInstanceAutoRenewAttributeResponseBodyReservedInstanceRenewAttributes
}

export interface DescribeReservedInstanceAutoRenewAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeReservedInstanceAutoRenewAttributeResponseBody
}

export interface DescribeReservedInstancesRequest {
    AllocationType: string
    InstanceType: string
    InstanceTypeFamily: string
    LockReason: string
    OfferingType: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ReservedInstanceId: string[]
    ReservedInstanceName: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Scope: string
    Status: string[]
    Tag: DescribeReservedInstancesRequestTag[]
    ZoneId: string
}

export interface DescribeReservedInstancesResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    ReservedInstances: DescribeReservedInstancesResponseBodyReservedInstances
    TotalCount: number
}

export interface DescribeReservedInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeReservedInstancesResponseBody
}

export interface DescribeResourceByTagsRequest {
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
    Tag: DescribeResourceByTagsRequestTag[]
}

export interface DescribeResourceByTagsResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Resources: DescribeResourceByTagsResponseBodyResources
    TotalCount: number
}

export interface DescribeResourceByTagsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeResourceByTagsResponseBody
}

export interface DescribeResourcesModificationRequest {
    Cores: number
    DestinationResource: string
    InstanceType: string
    Memory: number
    MigrateAcrossZone: boolean
    OperationType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ZoneId: string
}

export interface DescribeResourcesModificationResponseBody {
    AvailableZones: DescribeResourcesModificationResponseBodyAvailableZones
    RequestId: string
}

export interface DescribeResourcesModificationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeResourcesModificationResponseBody
}

export interface DescribeRouteTablesRequest {
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RouteTableId: string
    RouteTableName: string
    RouterId: string
    RouterType: string
    VRouterId: string
}

export interface DescribeRouteTablesResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    RouteTables: DescribeRouteTablesResponseBodyRouteTables
    TotalCount: number
}

export interface DescribeRouteTablesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeRouteTablesResponseBody
}

export interface DescribeRouterInterfacesRequest {
    Filter: DescribeRouterInterfacesRequestFilter[]
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeRouterInterfacesResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    RouterInterfaceSet: DescribeRouterInterfacesResponseBodyRouterInterfaceSet
    TotalCount: number
}

export interface DescribeRouterInterfacesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeRouterInterfacesResponseBody
}

export interface DescribeSecurityGroupAttributeRequest {
    Direction: string
    NicType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
}

export interface DescribeSecurityGroupAttributeResponseBody {
    Description: string
    InnerAccessPolicy: string
    Permissions: DescribeSecurityGroupAttributeResponseBodyPermissions
    RegionId: string
    RequestId: string
    SecurityGroupId: string
    SecurityGroupName: string
    VpcId: string
}

export interface DescribeSecurityGroupAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSecurityGroupAttributeResponseBody
}

export interface DescribeSecurityGroupReferencesRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string[]
}

export interface DescribeSecurityGroupReferencesResponseBody {
    RequestId: string
    SecurityGroupReferences: DescribeSecurityGroupReferencesResponseBodySecurityGroupReferences
}

export interface DescribeSecurityGroupReferencesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSecurityGroupReferencesResponseBody
}

export interface DescribeSecurityGroupsRequest {
    DryRun: boolean
    FuzzyQuery: boolean
    IsQueryEcsCount: boolean
    MaxResults: number
    NetworkType: string
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    SecurityGroupIds: string
    SecurityGroupName: string
    SecurityGroupType: string
    Tag: DescribeSecurityGroupsRequestTag[]
    VpcId: string
}

export interface DescribeSecurityGroupsResponseBody {
    NextToken: string
    PageNumber: number
    PageSize: number
    RegionId: string
    RequestId: string
    SecurityGroups: DescribeSecurityGroupsResponseBodySecurityGroups
    TotalCount: number
}

export interface DescribeSecurityGroupsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSecurityGroupsResponseBody
}

export interface DescribeSendFileResultsRequest {
    InstanceId: string
    InvokeId: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: DescribeSendFileResultsRequestTag[]
}

export interface DescribeSendFileResultsResponseBody {
    Invocations: DescribeSendFileResultsResponseBodyInvocations
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeSendFileResultsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSendFileResultsResponseBody
}

export interface DescribeSnapshotGroupsRequest {
    AdditionalAttributes: string[]
    InstanceId: string
    MaxResults: number
    Name: string
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SnapshotGroupId: string[]
    Status: string[]
    Tag: DescribeSnapshotGroupsRequestTag[]
}

export interface DescribeSnapshotGroupsResponseBody {
    NextToken: string
    RequestId: string
    SnapshotGroups: DescribeSnapshotGroupsResponseBodySnapshotGroups
}

export interface DescribeSnapshotGroupsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSnapshotGroupsResponseBody
}

export interface DescribeSnapshotLinksRequest {
    DiskIds: string
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SnapshotLinkIds: string
}

export interface DescribeSnapshotLinksResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    SnapshotLinks: DescribeSnapshotLinksResponseBodySnapshotLinks
    TotalCount: number
}

export interface DescribeSnapshotLinksResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSnapshotLinksResponseBody
}

export interface DescribeSnapshotMonitorDataRequest {
    Category: string
    EndTime: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface DescribeSnapshotMonitorDataResponseBody {
    MonitorData: DescribeSnapshotMonitorDataResponseBodyMonitorData
    RequestId: string
}

export interface DescribeSnapshotMonitorDataResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSnapshotMonitorDataResponseBody
}

export interface DescribeSnapshotPackageRequest {
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeSnapshotPackageResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    SnapshotPackages: DescribeSnapshotPackageResponseBodySnapshotPackages
    TotalCount: number
}

export interface DescribeSnapshotPackageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSnapshotPackageResponseBody
}

export interface DescribeSnapshotsRequest {
    Filter: DescribeSnapshotsRequestFilter[]
    Category: string
    DiskId: string
    DryRun: boolean
    Encrypted: boolean
    InstanceId: string
    KMSKeyId: string
    MaxResults: number
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SnapshotIds: string
    SnapshotLinkId: string
    SnapshotName: string
    SnapshotType: string
    SourceDiskType: string
    Status: string
    Tag: DescribeSnapshotsRequestTag[]
    Usage: string
}

export interface DescribeSnapshotsResponseBody {
    NextToken: string
    PageNumber: number
    PageSize: number
    RequestId: string
    Snapshots: DescribeSnapshotsResponseBodySnapshots
    TotalCount: number
}

export interface DescribeSnapshotsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSnapshotsResponseBody
}

export interface DescribeSnapshotsUsageRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeSnapshotsUsageResponseBody {
    RequestId: string
    SnapshotCount: number
    SnapshotSize: number
}

export interface DescribeSnapshotsUsageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSnapshotsUsageResponseBody
}

export interface DescribeSpotAdviceRequest {
    Cores: number
    GpuAmount: number
    GpuSpec: string
    InstanceFamilyLevel: string
    InstanceTypeFamily: string
    InstanceTypes: string[]
    Memory: number
    MinCores: number
    MinMemory: number
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ZoneId: string
}

export interface DescribeSpotAdviceResponseBody {
    AvailableSpotZones: DescribeSpotAdviceResponseBodyAvailableSpotZones
    RegionId: string
    RequestId: string
}

export interface DescribeSpotAdviceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSpotAdviceResponseBody
}

export interface DescribeSpotPriceHistoryRequest {
    EndTime: string
    InstanceType: string
    IoOptimized: string
    NetworkType: string
    OSType: string
    Offset: number
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SpotDuration: number
    StartTime: string
    ZoneId: string
}

export interface DescribeSpotPriceHistoryResponseBody {
    Currency: string
    NextOffset: number
    RequestId: string
    SpotPrices: DescribeSpotPriceHistoryResponseBodySpotPrices
}

export interface DescribeSpotPriceHistoryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeSpotPriceHistoryResponseBody
}

export interface DescribeStorageCapacityUnitsRequest {
    AllocationType: string
    Capacity: number
    Name: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Status: string[]
    StorageCapacityUnitId: string[]
    Tag: DescribeStorageCapacityUnitsRequestTag[]
}

export interface DescribeStorageCapacityUnitsResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    StorageCapacityUnits: DescribeStorageCapacityUnitsResponseBodyStorageCapacityUnits
    TotalCount: number
}

export interface DescribeStorageCapacityUnitsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeStorageCapacityUnitsResponseBody
}

export interface DescribeStorageSetDetailsRequest {
    ClientToken: string
    DiskIds: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StorageSetId: string
    StorageSetPartitionNumber: number
}

export interface DescribeStorageSetDetailsResponseBody {
    Disks: DescribeStorageSetDetailsResponseBodyDisks
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface DescribeStorageSetDetailsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeStorageSetDetailsResponseBody
}

export interface DescribeStorageSetsRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StorageSetIds: string
    StorageSetName: string
    ZoneId: string
}

export interface DescribeStorageSetsResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    StorageSets: DescribeStorageSetsResponseBodyStorageSets
    TotalCount: number
}

export interface DescribeStorageSetsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeStorageSetsResponseBody
}

export interface DescribeTagsRequest {
    Category: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
    Tag: DescribeTagsRequestTag[]
}

export interface DescribeTagsResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    Tags: DescribeTagsResponseBodyTags
    TotalCount: number
}

export interface DescribeTagsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeTagsResponseBody
}

export interface DescribeTaskAttributeRequest {
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TaskId: string
}

export interface DescribeTaskAttributeResponseBody {
    CreationTime: string
    FailedCount: number
    FinishedTime: string
    OperationProgressSet: DescribeTaskAttributeResponseBodyOperationProgressSet
    RegionId: string
    RequestId: string
    SuccessCount: number
    SupportCancel: string
    TaskAction: string
    TaskId: string
    TaskProcess: string
    TaskStatus: string
    TotalCount: number
}

export interface DescribeTaskAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeTaskAttributeResponseBody
}

export interface DescribeTasksRequest {
    EndTime: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceIds: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
    TaskAction: string
    TaskIds: string
    TaskStatus: string
}

export interface DescribeTasksResponseBody {
    PageNumber: number
    PageSize: number
    RegionId: string
    RequestId: string
    TaskSet: DescribeTasksResponseBodyTaskSet
    TotalCount: number
}

export interface DescribeTasksResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeTasksResponseBody
}

export interface DescribeUserBusinessBehaviorRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StatusKey: string
}

export interface DescribeUserBusinessBehaviorResponseBody {
    RequestId: string
    StatusValue: string
}

export interface DescribeUserBusinessBehaviorResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeUserBusinessBehaviorResponseBody
}

export interface DescribeUserDataRequest {
    InstanceId: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeUserDataResponseBody {
    InstanceId: string
    RegionId: string
    RequestId: string
    UserData: string
}

export interface DescribeUserDataResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeUserDataResponseBody
}

export interface DescribeVRoutersRequest {
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VRouterId: string
}

export interface DescribeVRoutersResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
    VRouters: DescribeVRoutersResponseBodyVRouters
}

export interface DescribeVRoutersResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeVRoutersResponseBody
}

export interface DescribeVSwitchesRequest {
    IsDefault: boolean
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VSwitchId: string
    VpcId: string
    ZoneId: string
}

export interface DescribeVSwitchesResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
    VSwitches: DescribeVSwitchesResponseBodyVSwitches
}

export interface DescribeVSwitchesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeVSwitchesResponseBody
}

export interface DescribeVirtualBorderRoutersRequest {
    Filter: DescribeVirtualBorderRoutersRequestFilter[]
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeVirtualBorderRoutersResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
    VirtualBorderRouterSet: DescribeVirtualBorderRoutersResponseBodyVirtualBorderRouterSet
}

export interface DescribeVirtualBorderRoutersResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeVirtualBorderRoutersResponseBody
}

export interface DescribeVirtualBorderRoutersForPhysicalConnectionRequest {
    Filter: DescribeVirtualBorderRoutersForPhysicalConnectionRequestFilter[]
    OwnerId: number
    PageNumber: number
    PageSize: number
    PhysicalConnectionId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DescribeVirtualBorderRoutersForPhysicalConnectionResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
    VirtualBorderRouterForPhysicalConnectionSet: DescribeVirtualBorderRoutersForPhysicalConnectionResponseBodyVirtualBorderRouterForPhysicalConnectionSet
}

export interface DescribeVirtualBorderRoutersForPhysicalConnectionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeVirtualBorderRoutersForPhysicalConnectionResponseBody
}

export interface DescribeVpcsRequest {
    IsDefault: boolean
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VpcId: string
}

export interface DescribeVpcsResponseBody {
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
    Vpcs: DescribeVpcsResponseBodyVpcs
}

export interface DescribeVpcsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeVpcsResponseBody
}

export interface DescribeZonesRequest {
    AcceptLanguage: string
    InstanceChargeType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SpotStrategy: string
    Verbose: boolean
}

export interface DescribeZonesResponseBody {
    RequestId: string
    Zones: DescribeZonesResponseBodyZones
}

export interface DescribeZonesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DescribeZonesResponseBody
}

export interface DetachClassicLinkVpcRequest {
    InstanceId: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VpcId: string
}

export interface DetachClassicLinkVpcResponseBody {
    RequestId: string
}

export interface DetachClassicLinkVpcResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DetachClassicLinkVpcResponseBody
}

export interface DetachDiskRequest {
    DeleteWithInstance: boolean
    DiskId: string
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DetachDiskResponseBody {
    RequestId: string
}

export interface DetachDiskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DetachDiskResponseBody
}

export interface DetachInstanceRamRoleRequest {
    InstanceIds: string
    OwnerId: number
    RamRoleName: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DetachInstanceRamRoleResponseBody {
    DetachInstanceRamRoleResults: DetachInstanceRamRoleResponseBodyDetachInstanceRamRoleResults
    FailCount: number
    RamRoleName: string
    RequestId: string
    TotalCount: number
}

export interface DetachInstanceRamRoleResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DetachInstanceRamRoleResponseBody
}

export interface DetachKeyPairRequest {
    InstanceIds: string
    KeyPairName: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DetachKeyPairResponseBody {
    FailCount: string
    KeyPairName: string
    RequestId: string
    Results: DetachKeyPairResponseBodyResults
    TotalCount: string
}

export interface DetachKeyPairResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DetachKeyPairResponseBody
}

export interface DetachNetworkInterfaceRequest {
    InstanceId: string
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TrunkNetworkInstanceId: string
}

export interface DetachNetworkInterfaceResponseBody {
    RequestId: string
}

export interface DetachNetworkInterfaceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DetachNetworkInterfaceResponseBody
}

export interface DisableActivationRequest {
    ActivationId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface DisableActivationResponseBody {
    Activation: DisableActivationResponseBodyActivation
    RequestId: string
}

export interface DisableActivationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: DisableActivationResponseBody
}

export interface EipFillParamsRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    Data: string
}

export interface EipFillParamsResponseBody {
    Code: string
    Data: string
    Message: string
    RequestId: string
    Success: boolean
}

export interface EipFillParamsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: EipFillParamsResponseBody
}

export interface EipFillProductRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    Data: string
}

export interface EipFillProductResponseBody {
    Code: string
    Data: string
    Message: string
    RequestId: string
    Success: boolean
}

export interface EipFillProductResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: EipFillProductResponseBody
}

export interface EipNotifyPaidRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    Data: string
}

export interface EipNotifyPaidResponseBody {
    Code: string
    Data: string
    Message: string
    RequestId: string
    Success: boolean
}

export interface EipNotifyPaidResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: EipNotifyPaidResponseBody
}

export interface EnablePhysicalConnectionRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    PhysicalConnectionId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
}

export interface EnablePhysicalConnectionResponseBody {
    RequestId: string
}

export interface EnablePhysicalConnectionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: EnablePhysicalConnectionResponseBody
}

export declare class
ExportImageRequest {
    ImageFormat: string
    ImageId: string
    OSSBucket: string
    OSSPrefix: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RoleName: string
}

export declare class
ExportImageResponseBody {
    RegionId: string
    RequestId: string
    TaskId: string
}

export declare class
ExportImageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body:
    ExportImageResponseBody
}

export declare class
ExportSnapshotRequest {
    OssBucket: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RoleName: string
    SnapshotId: string
}

export declare class
ExportSnapshotResponseBody {
    RequestId: string
    TaskId: string
}

export declare class
ExportSnapshotResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body:
    ExportSnapshotResponseBody
}

export interface GetInstanceConsoleOutputRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    RemoveSymbols: boolean
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface GetInstanceConsoleOutputResponseBody {
    ConsoleOutput: string
    InstanceId: string
    LastUpdateTime: string
    RequestId: string
}

export interface GetInstanceConsoleOutputResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: GetInstanceConsoleOutputResponseBody
}

export interface GetInstanceScreenshotRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    WakeUp: boolean
}

export interface GetInstanceScreenshotResponseBody {
    InstanceId: string
    RequestId: string
    Screenshot: string
}

export interface GetInstanceScreenshotResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: GetInstanceScreenshotResponseBody
}

export interface ImportImageRequest {
    Architecture: string
    BootMode: string
    Description: string
    DetectionStrategy: string
    DiskDeviceMapping: ImportImageRequestDiskDeviceMapping[]
    ImageName: string
    LicenseType: string
    OSType: string
    OwnerId: number
    Platform: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RoleName: string
    Tag: ImportImageRequestTag[]
}

export interface ImportImageResponseBody {
    ImageId: string
    RegionId: string
    RequestId: string
    TaskId: string
}

export interface ImportImageResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ImportImageResponseBody
}

export interface ImportKeyPairRequest {
    KeyPairName: string
    OwnerId: number
    PublicKeyBody: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: ImportKeyPairRequestTag[]
}

export interface ImportKeyPairResponseBody {
    KeyPairFingerPrint: string
    KeyPairName: string
    RequestId: string
}

export interface ImportKeyPairResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ImportKeyPairResponseBody
}

export interface ImportSnapshotRequest {
    OssBucket: string
    OssObject: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RoleName: string
    SnapshotName: string
}

export interface ImportSnapshotResponseBody {
    RequestId: string
    SnapshotId: string
    TaskId: string
}

export interface ImportSnapshotResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ImportSnapshotResponseBody
}

export interface InstallCloudAssistantRequest {
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
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

export interface InvokeCommandRequest {
    CommandId: string
    ContainerId: string
    ContainerName: string
    Frequency: string
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    Parameters: {
        [key: string]: any
    }
    RegionId: string
    RepeatMode: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: InvokeCommandRequestTag[]
    Timed: boolean
    Timeout: number
    Username: string
    WindowsPasswordName: string
}

export interface InvokeCommandShrinkRequest {
    CommandId: string
    ContainerId: string
    ContainerName: string
    Frequency: string
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    ParametersShrink: string
    RegionId: string
    RepeatMode: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: InvokeCommandShrinkRequestTag[]
    Timed: boolean
    Timeout: number
    Username: string
    WindowsPasswordName: string
}

export interface InvokeCommandResponseBody {
    InvokeId: string
    RequestId: string
}

export interface InvokeCommandResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: InvokeCommandResponseBody
}

export interface JoinResourceGroupRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
}

export interface JoinResourceGroupResponseBody {
    RequestId: string
}

export interface JoinResourceGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: JoinResourceGroupResponseBody
}

export interface JoinSecurityGroupRequest {
    InstanceId: string
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
}

export interface JoinSecurityGroupResponseBody {
    RequestId: string
}

export interface JoinSecurityGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: JoinSecurityGroupResponseBody
}

export interface LeaveSecurityGroupRequest {
    InstanceId: string
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
}

export interface LeaveSecurityGroupResponseBody {
    RequestId: string
}

export interface LeaveSecurityGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: LeaveSecurityGroupResponseBody
}

export interface ListPluginStatusRequest {
    InstanceId: string[]
    Name: string
    OwnerAccount: string
    OwnerId: number
    PageNumber: number
    PageSize: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ListPluginStatusResponseBody {
    InstancePluginStatusSet: ListPluginStatusResponseBodyInstancePluginStatusSet
    PageNumber: number
    PageSize: number
    RequestId: string
    TotalCount: number
}

export interface ListPluginStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListPluginStatusResponseBody
}

export interface ListTagResourcesRequest {
    NextToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceId: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
    Tag: ListTagResourcesRequestTag[]
    TagFilter: ListTagResourcesRequestTagFilter[]
}

export interface ListTagResourcesResponseBody {
    NextToken: string
    RequestId: string
    TagResources: ListTagResourcesResponseBodyTagResources
}

export interface ListTagResourcesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ListTagResourcesResponseBody
}

export interface ModifyAutoProvisioningGroupRequest {
    AutoProvisioningGroupId: string
    AutoProvisioningGroupName: string
    DefaultTargetCapacityType: string
    ExcessCapacityTerminationPolicy: string
    LaunchTemplateConfig: ModifyAutoProvisioningGroupRequestLaunchTemplateConfig[]
    MaxSpotPrice: number
    OwnerAccount: string
    OwnerId: number
    PayAsYouGoTargetCapacity: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SpotTargetCapacity: string
    TerminateInstancesWithExpiration: boolean
    TotalTargetCapacity: string
}

export interface ModifyAutoProvisioningGroupResponseBody {
    RequestId: string
}

export interface ModifyAutoProvisioningGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyAutoProvisioningGroupResponseBody
}

export interface ModifyAutoSnapshotPolicyRequest {
    DataDiskPolicyEnabled: boolean
    DataDiskPolicyRetentionDays: number
    DataDiskPolicyRetentionLastWeek: boolean
    DataDiskPolicyTimePeriod: number
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SystemDiskPolicyEnabled: boolean
    SystemDiskPolicyRetentionDays: number
    SystemDiskPolicyRetentionLastWeek: boolean
    SystemDiskPolicyTimePeriod: number
}

export interface ModifyAutoSnapshotPolicyResponseBody {
    RequestId: string
}

export interface ModifyAutoSnapshotPolicyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyAutoSnapshotPolicyResponseBody
}

export interface ModifyAutoSnapshotPolicyExRequest {
    CopiedSnapshotsRetentionDays: number
    EnableCrossRegionCopy: boolean
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TargetCopyRegions: string
    AutoSnapshotPolicyId: string
    AutoSnapshotPolicyName: string
    RegionId: string
    RepeatWeekdays: string
    RetentionDays: number
    TimePoints: string
}

export interface ModifyAutoSnapshotPolicyExResponseBody {
    RequestId: string
}

export interface ModifyAutoSnapshotPolicyExResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyAutoSnapshotPolicyExResponseBody
}

export interface ModifyBandwidthPackageSpecRequest {
    Bandwidth: string
    BandwidthPackageId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyBandwidthPackageSpecResponseBody {
    RequestId: string
}

export interface ModifyBandwidthPackageSpecResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyBandwidthPackageSpecResponseBody
}

export interface ModifyCapacityReservationRequest {
    PrivatePoolOptions: ModifyCapacityReservationRequestPrivatePoolOptions
    Description: string
    EndTime: string
    EndTimeType: string
    InstanceAmount: number
    OwnerAccount: string
    OwnerId: number
    Platform: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface ModifyCapacityReservationResponseBody {
    RequestId: string
}

export interface ModifyCapacityReservationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyCapacityReservationResponseBody
}

export interface ModifyCommandRequest {
    CommandContent: string
    CommandId: string
    Description: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Timeout: number
    WorkingDir: string
}

export interface ModifyCommandResponseBody {
    RequestId: string
}

export interface ModifyCommandResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyCommandResponseBody
}

export interface ModifyDedicatedHostAttributeRequest {
    NetworkAttributes: ModifyDedicatedHostAttributeRequestNetworkAttributes
    ActionOnMaintenance: string
    AutoPlacement: string
    CpuOverCommitRatio: number
    DedicatedHostClusterId: string
    DedicatedHostId: string
    DedicatedHostName: string
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyDedicatedHostAttributeResponseBody {
    RequestId: string
}

export interface ModifyDedicatedHostAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDedicatedHostAttributeResponseBody
}

export interface ModifyDedicatedHostAutoReleaseTimeRequest {
    AutoReleaseTime: string
    DedicatedHostId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyDedicatedHostAutoReleaseTimeResponseBody {
    RequestId: string
}

export interface ModifyDedicatedHostAutoReleaseTimeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDedicatedHostAutoReleaseTimeResponseBody
}

export interface ModifyDedicatedHostAutoRenewAttributeRequest {
    AutoRenew: boolean
    AutoRenewWithEcs: string
    DedicatedHostIds: string
    Duration: number
    OwnerAccount: string
    OwnerId: number
    PeriodUnit: string
    RegionId: string
    RenewalStatus: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyDedicatedHostAutoRenewAttributeResponseBody {
    RequestId: string
}

export interface ModifyDedicatedHostAutoRenewAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDedicatedHostAutoRenewAttributeResponseBody
}

export interface ModifyDedicatedHostClusterAttributeRequest {
    DedicatedHostClusterId: string
    DedicatedHostClusterName: string
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyDedicatedHostClusterAttributeResponseBody {
    RequestId: string
}

export interface ModifyDedicatedHostClusterAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDedicatedHostClusterAttributeResponseBody
}

export interface ModifyDedicatedHostsChargeTypeRequest {
    AutoPay: boolean
    ClientToken: string
    DedicatedHostChargeType: string
    DedicatedHostIds: string
    DetailFee: boolean
    DryRun: boolean
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyDedicatedHostsChargeTypeResponseBody {
    FeeOfInstances: ModifyDedicatedHostsChargeTypeResponseBodyFeeOfInstances
    OrderId: string
    RequestId: string
}

export interface ModifyDedicatedHostsChargeTypeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDedicatedHostsChargeTypeResponseBody
}

export interface ModifyDemandRequest {
    Amount: number
    ClientToken: string
    DemandDescription: string
    DemandId: string
    DemandName: string
    EndTime: string
    InstanceChargeType: string
    InstanceType: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
    ZoneId: string
}

export interface ModifyDemandResponseBody {
    RequestId: string
}

export interface ModifyDemandResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDemandResponseBody
}

export interface ModifyDeploymentSetAttributeRequest {
    DeploymentSetId: string
    DeploymentSetName: string
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyDeploymentSetAttributeResponseBody {
    RequestId: string
}

export interface ModifyDeploymentSetAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDeploymentSetAttributeResponseBody
}

export interface ModifyDiagnosticMetricSetRequest {
    Description: string
    MetricIds: string[]
    MetricSetId: string
    MetricSetName: string
    RegionId: string
    ResourceType: string
}

export interface ModifyDiagnosticMetricSetResponseBody {
    RequestId: string
}

export interface ModifyDiagnosticMetricSetResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDiagnosticMetricSetResponseBody
}

export interface ModifyDiskAttributeRequest {
    BurstingEnabled: boolean
    DeleteAutoSnapshot: boolean
    DeleteWithInstance: boolean
    Description: string
    DiskId: string
    DiskIds: string[]
    DiskName: string
    EnableAutoSnapshot: boolean
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyDiskAttributeResponseBody {
    RequestId: string
}

export interface ModifyDiskAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDiskAttributeResponseBody
}

export interface ModifyDiskChargeTypeRequest {
    AutoPay: boolean
    ClientToken: string
    DiskChargeType: string
    DiskIds: string
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyDiskChargeTypeResponseBody {
    OrderId: string
    RequestId: string
}

export interface ModifyDiskChargeTypeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDiskChargeTypeResponseBody
}

export interface ModifyDiskSpecRequest {
    DiskCategory: string
    DiskId: string
    DryRun: boolean
    OwnerAccount: string
    OwnerId: number
    PerformanceLevel: string
    ProvisionedIops: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyDiskSpecResponseBody {
    OrderId: string
    RequestId: string
    TaskId: string
}

export interface ModifyDiskSpecResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyDiskSpecResponseBody
}

export interface ModifyEipAddressAttributeRequest {
    AllocationId: string
    Bandwidth: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyEipAddressAttributeResponseBody {
    RequestId: string
}

export interface ModifyEipAddressAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyEipAddressAttributeResponseBody
}

export interface ModifyElasticityAssuranceRequest {
    PrivatePoolOptions: ModifyElasticityAssuranceRequestPrivatePoolOptions
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyElasticityAssuranceResponseBody {
    RequestId: string
}

export interface ModifyElasticityAssuranceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyElasticityAssuranceResponseBody
}

export interface ModifyForwardEntryRequest {
    ExternalIp: string
    ExternalPort: string
    ForwardEntryId: string
    ForwardTableId: string
    InternalIp: string
    InternalPort: string
    IpProtocol: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyForwardEntryResponseBody {
    RequestId: string
}

export interface ModifyForwardEntryResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyForwardEntryResponseBody
}

export interface ModifyHaVipAttributeRequest {
    ClientToken: string
    Description: string
    HaVipId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyHaVipAttributeResponseBody {
    RequestId: string
}

export interface ModifyHaVipAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyHaVipAttributeResponseBody
}

export interface ModifyHpcClusterAttributeRequest {
    ClientToken: string
    Description: string
    HpcClusterId: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyHpcClusterAttributeResponseBody {
    RequestId: string
}

export interface ModifyHpcClusterAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyHpcClusterAttributeResponseBody
}

export interface ModifyImageAttributeRequest {
    BootMode: string
    Description: string
    Features: ModifyImageAttributeRequestFeatures
    ImageFamily: string
    ImageId: string
    ImageName: string
    LicenseType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Status: string
}

export interface ModifyImageAttributeResponseBody {
    RequestId: string
}

export interface ModifyImageAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyImageAttributeResponseBody
}

export interface ModifyImageShareGroupPermissionRequest {
    AddGroup: string[]
    RemoveGroup: string[]
    ImageId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyImageShareGroupPermissionResponseBody {
    RequestId: string
}

export interface ModifyImageShareGroupPermissionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyImageShareGroupPermissionResponseBody
}

export interface ModifyImageSharePermissionRequest {
    AddAccount: string[]
    ImageId: string
    IsPublic: boolean
    LaunchPermission: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    RemoveAccount: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyImageSharePermissionResponseBody {
    RequestId: string
}

export interface ModifyImageSharePermissionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyImageSharePermissionResponseBody
}

export interface ModifyInstanceAttachmentAttributesRequest {
    PrivatePoolOptions: ModifyInstanceAttachmentAttributesRequestPrivatePoolOptions
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyInstanceAttachmentAttributesResponseBody {
    RequestId: string
}

export interface ModifyInstanceAttachmentAttributesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceAttachmentAttributesResponseBody
}

export interface ModifyInstanceAttributeRequest {
    CreditSpecification: string
    DeletionProtection: boolean
    Description: string
    HostName: string
    InstanceId: string
    InstanceName: string
    NetworkInterfaceQueueNumber: number
    OwnerAccount: string
    OwnerId: number
    Password: string
    Recyclable: boolean
    RemoteConnectionOptions: ModifyInstanceAttributeRequestRemoteConnectionOptions
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupIds: string[]
    UserData: string
}

export interface ModifyInstanceAttributeResponseBody {
    RequestId: string
}

export interface ModifyInstanceAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceAttributeResponseBody
}

export interface ModifyInstanceAutoReleaseTimeRequest {
    AutoReleaseTime: string
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyInstanceAutoReleaseTimeResponseBody {
    RequestId: string
}

export interface ModifyInstanceAutoReleaseTimeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceAutoReleaseTimeResponseBody
}

export interface ModifyInstanceAutoRenewAttributeRequest {
    AutoRenew: boolean
    Duration: number
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    PeriodUnit: string
    RegionId: string
    RenewalStatus: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyInstanceAutoRenewAttributeResponseBody {
    RequestId: string
}

export interface ModifyInstanceAutoRenewAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceAutoRenewAttributeResponseBody
}

export interface ModifyInstanceChargeTypeRequest {
    AutoPay: boolean
    ClientToken: string
    DryRun: boolean
    IncludeDataDisks: boolean
    InstanceChargeType: string
    InstanceIds: string
    IsDetailFee: boolean
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyInstanceChargeTypeResponseBody {
    FeeOfInstances: ModifyInstanceChargeTypeResponseBodyFeeOfInstances
    OrderId: string
    RequestId: string
}

export interface ModifyInstanceChargeTypeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceChargeTypeResponseBody
}

export interface ModifyInstanceDeploymentRequest {
    Affinity: string
    DedicatedHostClusterId: string
    DedicatedHostId: string
    DeploymentSetGroupNo: number
    DeploymentSetId: string
    Force: boolean
    InstanceId: string
    InstanceType: string
    MigrationType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    RemoveFromDeploymentSet: boolean
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tenancy: string
}

export interface ModifyInstanceDeploymentResponseBody {
    RequestId: string
}

export interface ModifyInstanceDeploymentResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceDeploymentResponseBody
}

export interface ModifyInstanceMaintenanceAttributesRequest {
    ActionOnMaintenance: string
    InstanceId: string[]
    MaintenanceWindow: ModifyInstanceMaintenanceAttributesRequestMaintenanceWindow[]
    NotifyOnMaintenance: boolean
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyInstanceMaintenanceAttributesResponseBody {
    RequestId: string
}

export interface ModifyInstanceMaintenanceAttributesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceMaintenanceAttributesResponseBody
}

export interface ModifyInstanceMetadataOptionsRequest {
    HttpEndpoint: string
    HttpPutResponseHopLimit: number
    HttpTokens: string
    InstanceId: string
    InstanceMetadataTags: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyInstanceMetadataOptionsResponseBody {
    RequestId: string
}

export interface ModifyInstanceMetadataOptionsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceMetadataOptionsResponseBody
}

export interface ModifyInstanceNetworkSpecRequest {
    AllocatePublicIp: boolean
    AutoPay: boolean
    ClientToken: string
    EndTime: string
    ISP: string
    InstanceId: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    NetworkChargeType: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface ModifyInstanceNetworkSpecResponseBody {
    OrderId: string
    RequestId: string
}

export interface ModifyInstanceNetworkSpecResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceNetworkSpecResponseBody
}

export interface ModifyInstanceSpecRequest {
    SystemDisk: ModifyInstanceSpecRequestSystemDisk
    Temporary: ModifyInstanceSpecRequestTemporary
    AllowMigrateAcrossZone: boolean
    Async: boolean
    ClientToken: string
    InstanceId: string
    InstanceType: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyInstanceSpecResponseBody {
    RequestId: string
}

export interface ModifyInstanceSpecResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceSpecResponseBody
}

export interface ModifyInstanceVncPasswdRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VncPassword: string
}

export interface ModifyInstanceVncPasswdResponseBody {
    RequestId: string
}

export interface ModifyInstanceVncPasswdResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceVncPasswdResponseBody
}

export interface ModifyInstanceVpcAttributeRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    PrivateIpAddress: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string[]
    VSwitchId: string
    VpcId: string
}

export interface ModifyInstanceVpcAttributeResponseBody {
    RequestId: string
}

export interface ModifyInstanceVpcAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyInstanceVpcAttributeResponseBody
}

export interface ModifyLaunchTemplateDefaultVersionRequest {
    DefaultVersionNumber: number
    LaunchTemplateId: string
    LaunchTemplateName: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyLaunchTemplateDefaultVersionResponseBody {
    RequestId: string
}

export interface ModifyLaunchTemplateDefaultVersionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyLaunchTemplateDefaultVersionResponseBody
}

export interface ModifyManagedInstanceRequest {
    InstanceId: string
    InstanceName: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyManagedInstanceResponseBody {
    Instance: ModifyManagedInstanceResponseBodyInstance
    RequestId: string
}

export interface ModifyManagedInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyManagedInstanceResponseBody
}

export interface ModifyNetworkInterfaceAttributeRequest {
    Description: string
    NetworkInterfaceId: string
    NetworkInterfaceName: string
    OwnerAccount: string
    OwnerId: number
    QueueNumber: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string[]
}

export interface ModifyNetworkInterfaceAttributeResponseBody {
    RequestId: string
}

export interface ModifyNetworkInterfaceAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyNetworkInterfaceAttributeResponseBody
}

export interface ModifyPhysicalConnectionAttributeRequest {
    CircuitCode: string
    ClientToken: string
    Description: string
    LineOperator: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    PeerLocation: string
    PhysicalConnectionId: string
    PortType: string
    RedundantPhysicalConnectionId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    Bandwidth: number
}

export interface ModifyPhysicalConnectionAttributeResponseBody {
    RequestId: string
}

export interface ModifyPhysicalConnectionAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyPhysicalConnectionAttributeResponseBody
}

export interface ModifyPrefixListRequest {
    AddEntry: ModifyPrefixListRequestAddEntry[]
    Description: string
    OwnerAccount: string
    OwnerId: number
    PrefixListId: string
    PrefixListName: string
    RegionId: string
    RemoveEntry: ModifyPrefixListRequestRemoveEntry[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyPrefixListResponseBody {
    RequestId: string
}

export interface ModifyPrefixListResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyPrefixListResponseBody
}

export interface ModifyPrepayInstanceSpecRequest {
    SystemDisk: ModifyPrepayInstanceSpecRequestSystemDisk
    AutoPay: boolean
    ClientToken: string
    EndTime: string
    InstanceId: string
    InstanceType: string
    MigrateAcrossZone: boolean
    OperatorType: string
    OwnerAccount: string
    OwnerId: number
    RebootTime: string
    RebootWhenFinished: boolean
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyPrepayInstanceSpecResponseBody {
    OrderId: string
    RequestId: string
}

export interface ModifyPrepayInstanceSpecResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyPrepayInstanceSpecResponseBody
}

export interface ModifyReservedInstanceAttributeRequest {
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ReservedInstanceId: string
    ReservedInstanceName: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyReservedInstanceAttributeResponseBody {
    Code: string
    HttpStatusCode: number
    Message: string
    RequestId: string
}

export interface ModifyReservedInstanceAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyReservedInstanceAttributeResponseBody
}

export interface ModifyReservedInstanceAutoRenewAttributeRequest {
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    RegionId: string
    RenewalStatus: string
    ReservedInstanceId: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyReservedInstanceAutoRenewAttributeResponseBody {
    RequestId: string
}

export interface ModifyReservedInstanceAutoRenewAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyReservedInstanceAutoRenewAttributeResponseBody
}

export interface ModifyReservedInstancesRequest {
    Configuration: ModifyReservedInstancesRequestConfiguration[]
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ReservedInstanceId: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ModifyReservedInstancesResponseBody {
    RequestId: string
    ReservedInstanceIdSets: ModifyReservedInstancesResponseBodyReservedInstanceIdSets
}

export interface ModifyReservedInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyReservedInstancesResponseBody
}

export interface ModifyRouterInterfaceAttributeRequest {
    Description: string
    HealthCheckSourceIp: string
    HealthCheckTargetIp: string
    Name: string
    OppositeInterfaceId: string
    OppositeInterfaceOwnerId: number
    OppositeRouterId: string
    OppositeRouterType: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RouterInterfaceId: string
}

export interface ModifyRouterInterfaceAttributeResponseBody {
    RequestId: string
}

export interface ModifyRouterInterfaceAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyRouterInterfaceAttributeResponseBody
}

export interface ModifyRouterInterfaceSpecRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    RouterInterfaceId: string
    Spec: string
    UserCidr: string
}

export interface ModifyRouterInterfaceSpecResponseBody {
    RequestId: string
    Spec: string
}

export interface ModifyRouterInterfaceSpecResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyRouterInterfaceSpecResponseBody
}

export interface ModifySecurityGroupAttributeRequest {
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    SecurityGroupName: string
}

export interface ModifySecurityGroupAttributeResponseBody {
    RequestId: string
}

export interface ModifySecurityGroupAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifySecurityGroupAttributeResponseBody
}

export interface ModifySecurityGroupEgressRuleRequest {
    ClientToken: string
    Description: string
    DestCidrIp: string
    DestGroupId: string
    DestGroupOwnerAccount: string
    DestGroupOwnerId: number
    DestPrefixListId: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    OwnerAccount: string
    OwnerId: number
    Policy: string
    PortRange: string
    Priority: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    SecurityGroupRuleId: string
    SourceCidrIp: string
    SourcePortRange: string
}

export interface ModifySecurityGroupEgressRuleResponseBody {
    RequestId: string
}

export interface ModifySecurityGroupEgressRuleResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifySecurityGroupEgressRuleResponseBody
}

export interface ModifySecurityGroupPolicyRequest {
    ClientToken: string
    InnerAccessPolicy: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
}

export interface ModifySecurityGroupPolicyResponseBody {
    RequestId: string
}

export interface ModifySecurityGroupPolicyResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifySecurityGroupPolicyResponseBody
}

export interface ModifySecurityGroupRuleRequest {
    ClientToken: string
    Description: string
    DestCidrIp: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    OwnerAccount: string
    OwnerId: number
    Policy: string
    PortRange: string
    Priority: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    SecurityGroupRuleId: string
    SourceCidrIp: string
    SourceGroupId: string
    SourceGroupOwnerAccount: string
    SourceGroupOwnerId: number
    SourcePortRange: string
    SourcePrefixListId: string
}

export interface ModifySecurityGroupRuleResponseBody {
    RequestId: string
}

export interface ModifySecurityGroupRuleResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifySecurityGroupRuleResponseBody
}

export interface ModifySnapshotAttributeRequest {
    Description: string
    DisableInstantAccess: boolean
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SnapshotId: string
    SnapshotName: string
}

export interface ModifySnapshotAttributeResponseBody {
    RequestId: string
}

export interface ModifySnapshotAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifySnapshotAttributeResponseBody
}

export interface ModifySnapshotGroupRequest {
    Description: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SnapshotGroupId: string
}

export interface ModifySnapshotGroupResponseBody {
    RequestId: string
}

export interface ModifySnapshotGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifySnapshotGroupResponseBody
}

export interface ModifyStorageCapacityUnitAttributeRequest {
    Description: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StorageCapacityUnitId: string
}

export interface ModifyStorageCapacityUnitAttributeResponseBody {
    RequestId: string
}

export interface ModifyStorageCapacityUnitAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyStorageCapacityUnitAttributeResponseBody
}

export interface ModifyStorageSetAttributeRequest {
    ClientToken: string
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StorageSetId: string
    StorageSetName: string
}

export interface ModifyStorageSetAttributeResponseBody {
    RequestId: string
}

export interface ModifyStorageSetAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyStorageSetAttributeResponseBody
}

export interface ModifyUserBusinessBehaviorRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StatusKey: string
    StatusValue: string
}

export interface ModifyUserBusinessBehaviorResponseBody {
    RequestId: string
}

export interface ModifyUserBusinessBehaviorResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyUserBusinessBehaviorResponseBody
}

export interface ModifyVRouterAttributeRequest {
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VRouterId: string
    VRouterName: string
}

export interface ModifyVRouterAttributeResponseBody {
    RequestId: string
}

export interface ModifyVRouterAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyVRouterAttributeResponseBody
}

export interface ModifyVSwitchAttributeRequest {
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    VSwitchId: string
    VSwitchName: string
}

export interface ModifyVSwitchAttributeResponseBody {
    RequestId: string
}

export interface ModifyVSwitchAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyVSwitchAttributeResponseBody
}

export interface ModifyVirtualBorderRouterAttributeRequest {
    CircuitCode: string
    ClientToken: string
    Description: string
    LocalGatewayIp: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    PeerGatewayIp: string
    PeeringSubnetMask: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    VbrId: string
    VlanId: number
}

export interface ModifyVirtualBorderRouterAttributeResponseBody {
    RequestId: string
}

export interface ModifyVirtualBorderRouterAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyVirtualBorderRouterAttributeResponseBody
}

export interface ModifyVpcAttributeRequest {
    CidrBlock: string
    Description: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    VpcId: string
    VpcName: string
}

export interface ModifyVpcAttributeResponseBody {
    RequestId: string
}

export interface ModifyVpcAttributeResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ModifyVpcAttributeResponseBody
}

export interface PurchaseReservedInstancesOfferingRequest {
    AutoRenew: boolean
    AutoRenewPeriod: number
    ClientToken: string
    Description: string
    InstanceAmount: number
    InstanceType: string
    OfferingType: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    Platform: string
    RegionId: string
    ReservedInstanceName: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Scope: string
    Tag: PurchaseReservedInstancesOfferingRequestTag[]
    ZoneId: string
}

export interface PurchaseReservedInstancesOfferingResponseBody {
    RequestId: string
    ReservedInstanceIdSets: PurchaseReservedInstancesOfferingResponseBodyReservedInstanceIdSets
}

export interface PurchaseReservedInstancesOfferingResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: PurchaseReservedInstancesOfferingResponseBody
}

export interface PurchaseStorageCapacityUnitRequest {
    Amount: number
    Capacity: number
    ClientToken: string
    Description: string
    FromApp: string
    Name: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
    Tag: PurchaseStorageCapacityUnitRequestTag[]
}

export interface PurchaseStorageCapacityUnitResponseBody {
    OrderId: string
    RequestId: string
    StorageCapacityUnitIds: PurchaseStorageCapacityUnitResponseBodyStorageCapacityUnitIds
}

export interface PurchaseStorageCapacityUnitResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: PurchaseStorageCapacityUnitResponseBody
}

export interface ReActivateInstancesRequest {
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ReActivateInstancesResponseBody {
    RequestId: string
}

export interface ReActivateInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ReActivateInstancesResponseBody
}

export interface ReInitDiskRequest {
    AutoStartInstance: boolean
    DiskId: string
    KeyPairName: string
    OwnerAccount: string
    OwnerId: number
    Password: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityEnhancementStrategy: string
}

export interface ReInitDiskResponseBody {
    RequestId: string
}

export interface ReInitDiskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ReInitDiskResponseBody
}

export interface RebootInstanceRequest {
    DryRun: boolean
    ForceStop: boolean
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
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

export interface RebootInstancesRequest {
    BatchOptimization: string
    DryRun: boolean
    ForceReboot: boolean
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface RebootInstancesResponseBody {
    InstanceResponses: RebootInstancesResponseBodyInstanceResponses
    RequestId: string
}

export interface RebootInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RebootInstancesResponseBody
}

export interface RecoverVirtualBorderRouterRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    VbrId: string
}

export interface RecoverVirtualBorderRouterResponseBody {
    RequestId: string
}

export interface RecoverVirtualBorderRouterResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RecoverVirtualBorderRouterResponseBody
}

export interface RedeployDedicatedHostRequest {
    DedicatedHostId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface RedeployDedicatedHostResponseBody {
    RequestId: string
}

export interface RedeployDedicatedHostResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RedeployDedicatedHostResponseBody
}

export interface RedeployInstanceRequest {
    ForceStop: boolean
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface RedeployInstanceResponseBody {
    RequestId: string
    TaskId: string
}

export interface RedeployInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RedeployInstanceResponseBody
}

export interface ReleaseCapacityReservationRequest {
    PrivatePoolOptions: ReleaseCapacityReservationRequestPrivatePoolOptions
    DryRun: boolean
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ReleaseCapacityReservationResponseBody {
    RequestId: string
}

export interface ReleaseCapacityReservationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ReleaseCapacityReservationResponseBody
}

export interface ReleaseDedicatedHostRequest {
    DedicatedHostId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ReleaseDedicatedHostResponseBody {
    RequestId: string
}

export interface ReleaseDedicatedHostResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ReleaseDedicatedHostResponseBody
}

export interface ReleaseEipAddressRequest {
    AllocationId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ReleaseEipAddressResponseBody {
    RequestId: string
}

export interface ReleaseEipAddressResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ReleaseEipAddressResponseBody
}

export interface ReleasePublicIpAddressRequest {
    DryRun: boolean
    InstanceId: string
    PublicIpAddress: string
    RegionId: string
}

export interface ReleasePublicIpAddressResponseBody {
    RemainTimes: string
    RequestId: string
}

export interface ReleasePublicIpAddressResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ReleasePublicIpAddressResponseBody
}

export interface RemoveBandwidthPackageIpsRequest {
    BandwidthPackageId: string
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    RemovedIpAddresses: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface RemoveBandwidthPackageIpsResponseBody {
    RequestId: string
}

export interface RemoveBandwidthPackageIpsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RemoveBandwidthPackageIpsResponseBody
}

export interface RemoveTagsRequest {
    OwnerId: number
    RegionId: string
    ResourceId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    ResourceType: string
    Tag: RemoveTagsRequestTag[]
}

export interface RemoveTagsResponseBody {
    RequestId: string
}

export interface RemoveTagsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RemoveTagsResponseBody
}

export interface RenewDedicatedHostsRequest {
    ClientToken: string
    DedicatedHostIds: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface RenewDedicatedHostsResponseBody {
    RequestId: string
}

export interface RenewDedicatedHostsResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RenewDedicatedHostsResponseBody
}

export interface RenewInstanceRequest {
    ClientToken: string
    ExpectedRenewDay: number
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface RenewInstanceResponseBody {
    OrderId: string
    RequestId: string
}

export interface RenewInstanceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RenewInstanceResponseBody
}

export interface RenewReservedInstancesRequest {
    AutoRenew: boolean
    AutoRenewPeriod: number
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    Period: number
    PeriodUnit: string
    RegionId: string
    ReservedInstanceId: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface RenewReservedInstancesResponseBody {
    OrderId: string
    RequestId: string
    ReservedInstanceIdSets: RenewReservedInstancesResponseBodyReservedInstanceIdSets
}

export interface RenewReservedInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RenewReservedInstancesResponseBody
}

export interface ReplaceSystemDiskRequest {
    SystemDisk: ReplaceSystemDiskRequestSystemDisk
    Architecture: string
    Arn: ReplaceSystemDiskRequestArn[]
    ClientToken: string
    DiskId: string
    EncryptAlgorithm: string
    Encrypted: boolean
    ImageId: string
    InstanceId: string
    KMSKeyId: string
    KeyPairName: string
    OwnerAccount: string
    OwnerId: number
    Password: string
    PasswordInherit: boolean
    Platform: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityEnhancementStrategy: string
    UseAdditionalService: boolean
}

export interface ReplaceSystemDiskResponseBody {
    DiskId: string
    RequestId: string
}

export interface ReplaceSystemDiskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ReplaceSystemDiskResponseBody
}

export interface ReportInstancesStatusRequest {
    Description: string
    Device: string[]
    DiskId: string[]
    EndTime: string
    InstanceId: string[]
    IssueCategory: string
    OwnerAccount: string
    OwnerId: number
    Reason: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StartTime: string
}

export interface ReportInstancesStatusResponseBody {
    RequestId: string
}

export interface ReportInstancesStatusResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ReportInstancesStatusResponseBody
}

export interface ResetDiskRequest {
    DiskId: string
    DryRun: boolean
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
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

export interface ResetDisksRequest {
    Disk: ResetDisksRequestDisk[]
    DryRun: boolean
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface ResetDisksResponseBody {
    OperationProgressSet: ResetDisksResponseBodyOperationProgressSet
    RequestId: string
}

export interface ResetDisksResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ResetDisksResponseBody
}

export interface ResizeDiskRequest {
    ClientToken: string
    DiskId: string
    NewSize: number
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Type: string
}

export interface ResizeDiskResponseBody {
    OrderId: string
    RequestId: string
}

export interface ResizeDiskResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: ResizeDiskResponseBody
}

export interface RevokeSecurityGroupRequest {
    ClientToken: string
    Description: string
    DestCidrIp: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    OwnerAccount: string
    OwnerId: number
    Permissions: RevokeSecurityGroupRequestPermissions[]
    Policy: string
    PortRange: string
    Priority: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    SecurityGroupRuleId: string[]
    SourceCidrIp: string
    SourceGroupId: string
    SourceGroupOwnerAccount: string
    SourceGroupOwnerId: number
    SourcePortRange: string
    SourcePrefixListId: string
}

export interface RevokeSecurityGroupResponseBody {
    RequestId: string
}

export interface RevokeSecurityGroupResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RevokeSecurityGroupResponseBody
}

export interface RevokeSecurityGroupEgressRequest {
    ClientToken: string
    Description: string
    DestCidrIp: string
    DestGroupId: string
    DestGroupOwnerAccount: string
    DestGroupOwnerId: number
    DestPrefixListId: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    OwnerAccount: string
    OwnerId: number
    Permissions: RevokeSecurityGroupEgressRequestPermissions[]
    Policy: string
    PortRange: string
    Priority: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityGroupId: string
    SecurityGroupRuleId: string[]
    SourceCidrIp: string
    SourcePortRange: string
}

export interface RevokeSecurityGroupEgressResponseBody {
    RequestId: string
}

export interface RevokeSecurityGroupEgressResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RevokeSecurityGroupEgressResponseBody
}

export interface RunCommandRequest {
    CommandContent: string
    ContainerId: string
    ContainerName: string
    ContentEncoding: string
    Description: string
    EnableParameter: boolean
    Frequency: string
    InstanceId: string[]
    KeepCommand: boolean
    Name: string
    OwnerAccount: string
    OwnerId: number
    Parameters: {
        [key: string]: any
    }
    RegionId: string
    RepeatMode: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: RunCommandRequestTag[]
    Timed: boolean
    Timeout: number
    Type: string
    Username: string
    WindowsPasswordName: string
    WorkingDir: string
}

export interface RunCommandShrinkRequest {
    CommandContent: string
    ContainerId: string
    ContainerName: string
    ContentEncoding: string
    Description: string
    EnableParameter: boolean
    Frequency: string
    InstanceId: string[]
    KeepCommand: boolean
    Name: string
    OwnerAccount: string
    OwnerId: number
    ParametersShrink: string
    RegionId: string
    RepeatMode: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: RunCommandShrinkRequestTag[]
    Timed: boolean
    Timeout: number
    Type: string
    Username: string
    WindowsPasswordName: string
    WorkingDir: string
}

export interface RunCommandResponseBody {
    CommandId: string
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

export interface RunInstancesRequest {
    CpuOptions: RunInstancesRequestCpuOptions
    HibernationOptions: RunInstancesRequestHibernationOptions
    PrivatePoolOptions: RunInstancesRequestPrivatePoolOptions
    SchedulerOptions: RunInstancesRequestSchedulerOptions
    SecurityOptions: RunInstancesRequestSecurityOptions
    SystemDisk: RunInstancesRequestSystemDisk
    Affinity: string
    Amount: number
    Arn: RunInstancesRequestArn[]
    AutoReleaseTime: string
    AutoRenew: boolean
    AutoRenewPeriod: number
    ClientToken: string
    CreditSpecification: string
    DataDisk: RunInstancesRequestDataDisk[]
    DedicatedHostId: string
    DeletionProtection: boolean
    DeploymentSetGroupNo: number
    DeploymentSetId: string
    Description: string
    DryRun: boolean
    HostName: string
    HostNames: string[]
    HpcClusterId: string
    HttpEndpoint: string
    HttpPutResponseHopLimit: number
    HttpTokens: string
    ImageFamily: string
    ImageId: string
    InstanceChargeType: string
    InstanceName: string
    InstanceType: string
    InternetChargeType: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    IoOptimized: string
    Ipv6Address: string[]
    Ipv6AddressCount: number
    Isp: string
    KeyPairName: string
    LaunchTemplateId: string
    LaunchTemplateName: string
    LaunchTemplateVersion: number
    MinAmount: number
    NetworkInterface: RunInstancesRequestNetworkInterface[]
    NetworkInterfaceQueueNumber: number
    OwnerAccount: string
    OwnerId: number
    Password: string
    PasswordInherit: boolean
    Period: number
    PeriodUnit: string
    PrivateIpAddress: string
    RamRoleName: string
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SecurityEnhancementStrategy: string
    SecurityGroupId: string
    SecurityGroupIds: string[]
    SpotDuration: number
    SpotInterruptionBehavior: string
    SpotPriceLimit: number
    SpotStrategy: string
    StorageSetId: string
    StorageSetPartitionNumber: number
    Tag: RunInstancesRequestTag[]
    Tenancy: string
    UniqueSuffix: boolean
    UserData: string
    VSwitchId: string
    ZoneId: string
}

export interface RunInstancesResponseBody {
    InstanceIdSets: RunInstancesResponseBodyInstanceIdSets
    OrderId: string
    RequestId: string
    TradePrice: number
}

export interface RunInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: RunInstancesResponseBody
}

export interface SendFileRequest {
    Content: string
    ContentType: string
    Description: string
    FileGroup: string
    FileMode: string
    FileOwner: string
    InstanceId: string[]
    Name: string
    Overwrite: boolean
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceGroupId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    Tag: SendFileRequestTag[]
    TargetDir: string
    Timeout: number
}

export interface SendFileResponseBody {
    InvokeId: string
    RequestId: string
}

export interface SendFileResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: SendFileResponseBody
}

export interface StartElasticityAssuranceRequest {
    PrivatePoolOptions: StartElasticityAssuranceRequestPrivatePoolOptions
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface StartElasticityAssuranceResponseBody {
    RequestId: string
}

export interface StartElasticityAssuranceResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StartElasticityAssuranceResponseBody
}

export interface StartImagePipelineExecutionRequest {
    ClientToken: string
    ImagePipelineId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    TemplateTag: StartImagePipelineExecutionRequestTemplateTag[]
}

export interface StartImagePipelineExecutionResponseBody {
    ExecutionId: string
    RequestId: string
}

export interface StartImagePipelineExecutionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StartImagePipelineExecutionResponseBody
}

export interface StartInstanceRequest {
    DryRun: boolean
    InitLocalDisk: boolean
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    SourceRegionId: string
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

export interface StartInstancesRequest {
    BatchOptimization: string
    DryRun: boolean
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface StartInstancesResponseBody {
    InstanceResponses: StartInstancesResponseBodyInstanceResponses
    RequestId: string
}

export interface StartInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StartInstancesResponseBody
}

export interface StartTerminalSessionRequest {
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    PortNumber: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface StartTerminalSessionResponseBody {
    RequestId: string
    SecurityToken: string
    SessionId: string
    WebSocketUrl: string
}

export interface StartTerminalSessionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StartTerminalSessionResponseBody
}

export interface StopInstanceRequest {
    ConfirmStop: boolean
    DryRun: boolean
    ForceStop: boolean
    Hibernate: boolean
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StoppedMode: string
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

export interface StopInstancesRequest {
    BatchOptimization: string
    DryRun: boolean
    ForceStop: boolean
    InstanceId: string[]
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    StoppedMode: string
}

export interface StopInstancesResponseBody {
    InstanceResponses: StopInstancesResponseBodyInstanceResponses
    RequestId: string
}

export interface StopInstancesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StopInstancesResponseBody
}

export interface StopInvocationRequest {
    InstanceId: string[]
    InvokeId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface StopInvocationResponseBody {
    RequestId: string
}

export interface StopInvocationResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: StopInvocationResponseBody
}

export interface TagResourcesRequest {
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceId: string[]
    ResourceOwnerAccount: string
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

export interface TerminatePhysicalConnectionRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    PhysicalConnectionId: string
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
}

export interface TerminatePhysicalConnectionResponseBody {
    RequestId: string
}

export interface TerminatePhysicalConnectionResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: TerminatePhysicalConnectionResponseBody
}

export interface TerminateVirtualBorderRouterRequest {
    ClientToken: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
    UserCidr: string
    VbrId: string
}

export interface TerminateVirtualBorderRouterResponseBody {
    RequestId: string
}

export interface TerminateVirtualBorderRouterResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: TerminateVirtualBorderRouterResponseBody
}

export interface UnassignIpv6AddressesRequest {
    Ipv6Address: string[]
    Ipv6Prefix: string[]
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface UnassignIpv6AddressesResponseBody {
    RequestId: string
}

export interface UnassignIpv6AddressesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UnassignIpv6AddressesResponseBody
}

export interface UnassignPrivateIpAddressesRequest {
    Ipv4Prefix: string[]
    NetworkInterfaceId: string
    OwnerAccount: string
    OwnerId: number
    PrivateIpAddress: string[]
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface UnassignPrivateIpAddressesResponseBody {
    RequestId: string
}

export interface UnassignPrivateIpAddressesResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UnassignPrivateIpAddressesResponseBody
}

export interface UnassociateEipAddressRequest {
    AllocationId: string
    InstanceId: string
    InstanceType: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface UnassociateEipAddressResponseBody {
    RequestId: string
}

export interface UnassociateEipAddressResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UnassociateEipAddressResponseBody
}

export interface UnassociateHaVipRequest {
    ClientToken: string
    Force: string
    HaVipId: string
    InstanceId: string
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceOwnerAccount: string
    ResourceOwnerId: number
}

export interface UnassociateHaVipResponseBody {
    RequestId: string
}

export interface UnassociateHaVipResponse {
    Headers: {
        [key: string]: string
    }
    StatusCode: number
    Body: UnassociateHaVipResponseBody
}

export interface UntagResourcesRequest {
    All: boolean
    OwnerAccount: string
    OwnerId: number
    RegionId: string
    ResourceId: string[]
    ResourceOwnerAccount: string
    ResourceOwnerId: number
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

export interface AddTagsRequestTag {
    Key: string
    Value: string
}

export interface AllocateDedicatedHostsRequestNetworkAttributes {
    SlbUdpTimeout: number
    UdpTimeout: number
}

export interface AllocateDedicatedHostsRequestTag {
    Key: string
    Value: string
}

export interface AllocateDedicatedHostsResponseBodyDedicatedHostIdSets {
    DedicatedHostId: string[]
}

export interface AssignIpv6AddressesResponseBodyIpv6PrefixSets {
    Ipv6Prefix: string[]
}

export interface AssignIpv6AddressesResponseBodyIpv6Sets {
    Ipv6Address: string[]
}

export interface AssignPrivateIpAddressesResponseBodyAssignedPrivateIpAddressesSetIpv4PrefixSet {
    Ipv4Prefixes: string[]
}

export interface AssignPrivateIpAddressesResponseBodyAssignedPrivateIpAddressesSetPrivateIpSet {
    PrivateIpAddress: string[]
}

export interface AssignPrivateIpAddressesResponseBodyAssignedPrivateIpAddressesSet {
    Ipv4PrefixSet: AssignPrivateIpAddressesResponseBodyAssignedPrivateIpAddressesSetIpv4PrefixSet
    NetworkInterfaceId: string
    PrivateIpSet: AssignPrivateIpAddressesResponseBodyAssignedPrivateIpAddressesSetPrivateIpSet
}

export interface AttachInstanceRamRoleResponseBodyAttachInstanceRamRoleResultsAttachInstanceRamRoleResult {
    Code: string
    InstanceId: string
    Message: string
    Success: boolean
}

export interface AttachInstanceRamRoleResponseBodyAttachInstanceRamRoleResults {
    AttachInstanceRamRoleResult: AttachInstanceRamRoleResponseBodyAttachInstanceRamRoleResultsAttachInstanceRamRoleResult[]
}

export interface AttachKeyPairResponseBodyResultsResult {
    Code: string
    InstanceId: string
    Message: string
    Success: string
}

export interface AttachKeyPairResponseBodyResults {
    Result: AttachKeyPairResponseBodyResultsResult[]
}

export interface AuthorizeSecurityGroupRequestPermissions {
    Description: string
    DestCidrIp: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    Policy: string
    PortRange: string
    Priority: string
    SourceCidrIp: string
    SourceGroupId: string
    SourceGroupOwnerAccount: string
    SourceGroupOwnerId: number
    SourcePortRange: string
    SourcePrefixListId: string
}

export interface AuthorizeSecurityGroupEgressRequestPermissions {
    Description: string
    DestCidrIp: string
    DestGroupId: string
    DestGroupOwnerAccount: string
    DestGroupOwnerId: number
    DestPrefixListId: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    Policy: string
    PortRange: string
    Priority: string
    SourceCidrIp: string
    SourcePortRange: string
}

export interface CancelImagePipelineExecutionRequestTemplateTag {
    Key: string
    Value: string
}

export interface CopyImageRequestTag {
    Key: string
    Value: string
}

export interface CopySnapshotRequestArn {
    AssumeRoleFor: number
    RoleType: string
    Rolearn: string
}

export interface CopySnapshotRequestTag {
    Key: string
    Value: string
}

export interface CreateActivationRequestTag {
    Key: string
    Value: string
}

export interface CreateAutoProvisioningGroupRequestLaunchConfigurationArn {
    AssumeRoleFor: number
    RoleType: string
    Rolearn: string
}

export interface CreateAutoProvisioningGroupRequestLaunchConfigurationDataDisk {
    Category: string
    DeleteWithInstance: boolean
    Description: string
    Device: string
    DiskName: string
    Encrypted: boolean
    KmsKeyId: string
    PerformanceLevel: string
    Size: number
    SnapshotId: string
}

export interface CreateAutoProvisioningGroupRequestLaunchConfigurationSystemDisk {
    EncryptAlgorithm: string
    Encrypted: string
    KMSKeyId: string
}

export interface CreateAutoProvisioningGroupRequestLaunchConfigurationTag {
    Key: string
    Value: string
}

export interface CreateAutoProvisioningGroupRequestLaunchConfiguration {
    Arn: CreateAutoProvisioningGroupRequestLaunchConfigurationArn[]
    CreditSpecification: string
    DataDisk: CreateAutoProvisioningGroupRequestLaunchConfigurationDataDisk[]
    DeploymentSetId: string
    HostName: string
    HostNames: string[]
    ImageId: string
    InstanceDescription: string
    InstanceName: string
    InternetChargeType: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    IoOptimized: string
    KeyPairName: string
    Password: string
    PasswordInherit: boolean
    RamRoleName: string
    ResourceGroupId: string
    SecurityEnhancementStrategy: string
    SecurityGroupId: string
    SecurityGroupIds: string[]
    SystemDisk: CreateAutoProvisioningGroupRequestLaunchConfigurationSystemDisk
    SystemDiskCategory: string
    SystemDiskDescription: string
    SystemDiskName: string
    SystemDiskPerformanceLevel: string
    SystemDiskSize: number
    Tag: CreateAutoProvisioningGroupRequestLaunchConfigurationTag[]
    UserData: string
}

export interface CreateAutoProvisioningGroupRequestDataDiskConfig {
    DiskCategory: string
}

export interface CreateAutoProvisioningGroupRequestLaunchTemplateConfig {
    Architectures: string[]
    BurstablePerformance: string
    Cores: number[]
    ExcludedInstanceTypes: string[]
    InstanceFamilyLevel: string
    InstanceType: string
    MaxPrice: number
    MaxQuantity: number
    Memories: number[]
    Priority: number
    VSwitchId: string
    WeightedCapacity: number
}

export interface CreateAutoProvisioningGroupRequestSystemDiskConfig {
    DiskCategory: string
}

export interface CreateAutoProvisioningGroupResponseBodyLaunchResultsLaunchResultInstanceIds {
    InstanceId: string[]
}

export interface CreateAutoProvisioningGroupResponseBodyLaunchResultsLaunchResult {
    ErrorCode: string
    ErrorMsg: string
    InstanceIds: CreateAutoProvisioningGroupResponseBodyLaunchResultsLaunchResultInstanceIds
    InstanceType: string
    SpotStrategy: string
    ZoneId: string
}

export interface CreateAutoProvisioningGroupResponseBodyLaunchResults {
    LaunchResult: CreateAutoProvisioningGroupResponseBodyLaunchResultsLaunchResult[]
}

export interface CreateAutoSnapshotPolicyRequestTag {
    Key: string
    Value: string
}

export interface CreateCapacityReservationRequestPrivatePoolOptions {
    MatchCriteria: string
    Name: string
}

export interface CreateCapacityReservationRequestTag {
    Key: string
    Value: string
}

export interface CreateCommandRequestTag {
    Key: string
    Value: string
}

export interface CreateDedicatedHostClusterRequestTag {
    Key: string
    Value: string
}

export interface CreateDiskRequestArn {
    AssumeRoleFor: number
    RoleType: string
    Rolearn: string
}

export interface CreateDiskRequestTag {
    Key: string
    Value: string
}

export interface CreateElasticityAssuranceRequestPrivatePoolOptions {
    MatchCriteria: string
    Name: string
}

export interface CreateElasticityAssuranceRequestTag {
    Key: string
    Value: string
}

export interface CreateImageRequestDiskDeviceMapping {
    Device: string
    DiskType: string
    Size: number
    SnapshotId: string
}

export interface CreateImageRequestTag {
    Key: string
    Value: string
}

export interface CreateImageComponentRequestTag {
    Key: string
    Value: string
}

export interface CreateImagePipelineRequestTag {
    Key: string
    Value: string
}

export interface CreateInstanceRequestHibernationOptions {
    Configured: boolean
}

export interface CreateInstanceRequestPrivatePoolOptions {
    Id: string
    MatchCriteria: string
}

export interface CreateInstanceRequestSystemDisk {
    Category: string
    Description: string
    DiskName: string
    PerformanceLevel: string
    Size: number
    StorageClusterId: string
}

export interface CreateInstanceRequestArn {
    AssumeRoleFor: number
    RoleType: string
    Rolearn: string
}

export interface CreateInstanceRequestDataDisk {
    Category: string
    DeleteWithInstance: boolean
    Description: string
    Device: string
    DiskName: string
    EncryptAlgorithm: string
    Encrypted: boolean
    KMSKeyId: string
    PerformanceLevel: string
    Size: number
    SnapshotId: string
    StorageClusterId: string
}

export interface CreateInstanceRequestTag {
    Key: string
    Value: string
}

export interface CreateKeyPairRequestTag {
    Key: string
    Value: string
}

export interface CreateLaunchTemplateRequestSystemDisk {
    AutoSnapshotPolicyId: string
    BurstingEnabled: boolean
    Category: string
    DeleteWithInstance: boolean
    Description: string
    DiskName: string
    Encrypted: string
    Iops: number
    PerformanceLevel: string
    ProvisionedIops: number
    Size: number
}

export interface CreateLaunchTemplateRequestDataDisk {
    AutoSnapshotPolicyId: string
    BurstingEnabled: boolean
    Category: string
    DeleteWithInstance: boolean
    Description: string
    Device: string
    DiskName: string
    Encrypted: string
    PerformanceLevel: string
    ProvisionedIops: number
    Size: number
    SnapshotId: string
}

export interface CreateLaunchTemplateRequestNetworkInterface {
    Description: string
    InstanceType: string
    NetworkInterfaceName: string
    NetworkInterfaceTrafficMode: string
    PrimaryIpAddress: string
    SecurityGroupId: string
    SecurityGroupIds: string[]
    VSwitchId: string
}

export interface CreateLaunchTemplateRequestTag {
    Key: string
    Value: string
}

export interface CreateLaunchTemplateRequestTemplateTag {
    Key: string
    Value: string
}

export interface CreateLaunchTemplateVersionRequestSystemDisk {
    AutoSnapshotPolicyId: string
    BurstingEnabled: boolean
    Category: string
    DeleteWithInstance: boolean
    Description: string
    DiskName: string
    Encrypted: string
    Iops: number
    PerformanceLevel: string
    ProvisionedIops: number
    Size: number
}

export interface CreateLaunchTemplateVersionRequestDataDisk {
    AutoSnapshotPolicyId: string
    BurstingEnabled: boolean
    Category: string
    DeleteWithInstance: boolean
    Description: string
    Device: string
    DiskName: string
    Encrypted: string
    PerformanceLevel: string
    ProvisionedIops: number
    Size: number
    SnapshotId: string
}

export interface CreateLaunchTemplateVersionRequestNetworkInterface {
    Description: string
    InstanceType: string
    NetworkInterfaceName: string
    NetworkInterfaceTrafficMode: string
    PrimaryIpAddress: string
    SecurityGroupId: string
    SecurityGroupIds: string[]
    VSwitchId: string
}

export interface CreateLaunchTemplateVersionRequestTag {
    Key: string
    Value: string
}

export interface CreateNatGatewayRequestBandwidthPackage {
    Bandwidth: number
    IpCount: number
    Zone: string
}

export interface CreateNatGatewayResponseBodyBandwidthPackageIds {
    BandwidthPackageId: string[]
}

export interface CreateNatGatewayResponseBodyForwardTableIds {
    ForwardTableId: string[]
}

export interface CreateNetworkInterfaceRequestTag {
    Key: string
    Value: string
}

export interface CreateNetworkInterfaceResponseBodyIpv4PrefixSetsIpv4PrefixSet {
    Ipv4Prefix: string
}

export interface CreateNetworkInterfaceResponseBodyIpv4PrefixSets {
    Ipv4PrefixSet: CreateNetworkInterfaceResponseBodyIpv4PrefixSetsIpv4PrefixSet[]
}

export interface CreateNetworkInterfaceResponseBodyIpv6PrefixSetsIpv6PrefixSet {
    Ipv6Prefix: string
}

export interface CreateNetworkInterfaceResponseBodyIpv6PrefixSets {
    Ipv6PrefixSet: CreateNetworkInterfaceResponseBodyIpv6PrefixSetsIpv6PrefixSet[]
}

export interface CreateNetworkInterfaceResponseBodyIpv6SetsIpv6Set {
    Ipv6Address: string
}

export interface CreateNetworkInterfaceResponseBodyIpv6Sets {
    Ipv6Set: CreateNetworkInterfaceResponseBodyIpv6SetsIpv6Set[]
}

export interface CreateNetworkInterfaceResponseBodyPrivateIpSetsPrivateIpSet {
    Primary: boolean
    PrivateIpAddress: string
}

export interface CreateNetworkInterfaceResponseBodyPrivateIpSets {
    PrivateIpSet: CreateNetworkInterfaceResponseBodyPrivateIpSetsPrivateIpSet[]
}

export interface CreateNetworkInterfaceResponseBodySecurityGroupIds {
    SecurityGroupId: string[]
}

export interface CreateNetworkInterfaceResponseBodyTagsTag {
    TagKey: string
    TagValue: string
}

export interface CreateNetworkInterfaceResponseBodyTags {
    Tag: CreateNetworkInterfaceResponseBodyTagsTag[]
}

export interface CreateNetworkInterfacePermissionResponseBodyNetworkInterfacePermission {
    AccountId: number
    NetworkInterfaceId: string
    NetworkInterfacePermissionId: string
    Permission: string
    PermissionState: string
    ServiceName: string
}

export interface CreatePrefixListRequestEntry {
    Cidr: string
    Description: string
}

export interface CreateRouteEntryRequestNextHopList {
    NextHopId: string
    NextHopType: string
}

export interface CreateSecurityGroupRequestTag {
    Key: string
    Value: string
}

export interface CreateSimulatedSystemEventsResponseBodyEventIdSet {
    EventId: string[]
}

export interface CreateSnapshotRequestTag {
    Key: string
    Value: string
}

export interface CreateSnapshotGroupRequestTag {
    Key: string
    Value: string
}

export interface DeleteActivationResponseBodyActivation {
    ActivationId: string
    CreationTime: string
    DeregisteredCount: number
    Description: string
    InstanceCount: number
    InstanceName: string
    IpAddressRange: string
    RegisteredCount: number
    TimeToLiveInHours: number
}

export interface DeleteRouteEntryRequestNextHopList {
    NextHopId: string
    NextHopType: string
}

export interface DeleteSnapshotGroupResponseBodyOperationProgressSetOperationProgressRelatedItemSetRelatedItem {
    Name: string
    Value: string
}

export interface DeleteSnapshotGroupResponseBodyOperationProgressSetOperationProgressRelatedItemSet {
    RelatedItem: DeleteSnapshotGroupResponseBodyOperationProgressSetOperationProgressRelatedItemSetRelatedItem[]
}

export interface DeleteSnapshotGroupResponseBodyOperationProgressSetOperationProgress {
    ErrorCode: string
    ErrorMsg: string
    OperationStatus: string
    RelatedItemSet: DeleteSnapshotGroupResponseBodyOperationProgressSetOperationProgressRelatedItemSet
}

export interface DeleteSnapshotGroupResponseBodyOperationProgressSet {
    OperationProgress: DeleteSnapshotGroupResponseBodyOperationProgressSetOperationProgress[]
}

export interface DeregisterManagedInstanceResponseBodyInstance {
    ActivationId: string
    AgentVersion: string
    Hostname: string
    InstanceId: string
    InstanceName: string
    InternetIp: string
    IntranetIp: string
    InvocationCount: number
    LastInvokedTime: string
    MachineId: string
    OsType: string
    OsVersion: string
    RegistrationTime: string
}

export interface DescribeAccessPointsRequestFilter {
    Key: string
    Value: string[]
}

export interface DescribeAccessPointsResponseBodyAccessPointSetAccessPointType {
    AccessPointId: string
    AttachedRegionNo: string
    Description: string
    HostOperator: string
    Location: string
    Name: string
    Status: string
    Type: string
}

export interface DescribeAccessPointsResponseBodyAccessPointSet {
    AccessPointType: DescribeAccessPointsResponseBodyAccessPointSetAccessPointType[]
}

export interface DescribeAccountAttributesResponseBodyAccountAttributeItemsAccountAttributeItemAttributeValuesValueItem {
    Count: number
    DiskCategory: string
    ExpiredTime: string
    InstanceChargeType: string
    InstanceType: string
    Value: string
    ZoneId: string
}

export interface DescribeAccountAttributesResponseBodyAccountAttributeItemsAccountAttributeItemAttributeValues {
    ValueItem: DescribeAccountAttributesResponseBodyAccountAttributeItemsAccountAttributeItemAttributeValuesValueItem[]
}

export interface DescribeAccountAttributesResponseBodyAccountAttributeItemsAccountAttributeItem {
    AttributeName: string
    AttributeValues: DescribeAccountAttributesResponseBodyAccountAttributeItemsAccountAttributeItemAttributeValues
}

export interface DescribeAccountAttributesResponseBodyAccountAttributeItems {
    AccountAttributeItem: DescribeAccountAttributesResponseBodyAccountAttributeItemsAccountAttributeItem[]
}

export interface DescribeActivationsRequestTag {
    Key: string
    Value: string
}

export interface DescribeActivationsResponseBodyActivationListTags {
    TagKey: string
    TagValue: string
}

export interface DescribeActivationsResponseBodyActivationList {
    ActivationId: string
    CreationTime: string
    DeregisteredCount: number
    Description: string
    Disabled: boolean
    InstanceCount: number
    InstanceName: string
    IpAddressRange: string
    RegisteredCount: number
    Tags: DescribeActivationsResponseBodyActivationListTags[]
    TimeToLiveInHours: number
}

export interface DescribeAutoProvisioningGroupHistoryResponseBodyAutoProvisioningGroupHistoriesAutoProvisioningGroupHistoryActivityDetailsActivityDetail {
    Detail: string
    Status: string
}

export interface DescribeAutoProvisioningGroupHistoryResponseBodyAutoProvisioningGroupHistoriesAutoProvisioningGroupHistoryActivityDetails {
    ActivityDetail: DescribeAutoProvisioningGroupHistoryResponseBodyAutoProvisioningGroupHistoriesAutoProvisioningGroupHistoryActivityDetailsActivityDetail[]
}

export interface DescribeAutoProvisioningGroupHistoryResponseBodyAutoProvisioningGroupHistoriesAutoProvisioningGroupHistory {
    ActivityDetails: DescribeAutoProvisioningGroupHistoryResponseBodyAutoProvisioningGroupHistoriesAutoProvisioningGroupHistoryActivityDetails
    LastEventTime: string
    StartTime: string
    Status: string
    TaskId: string
}

export interface DescribeAutoProvisioningGroupHistoryResponseBodyAutoProvisioningGroupHistories {
    AutoProvisioningGroupHistory: DescribeAutoProvisioningGroupHistoryResponseBodyAutoProvisioningGroupHistoriesAutoProvisioningGroupHistory[]
}

export interface DescribeAutoProvisioningGroupInstancesResponseBodyInstancesInstance {
    CPU: number
    CreationTime: string
    InstanceId: string
    InstanceType: string
    IoOptimized: boolean
    IsSpot: boolean
    Memory: number
    NetworkType: string
    OsType: string
    RegionId: string
    Status: string
    ZoneId: string
}

export interface DescribeAutoProvisioningGroupInstancesResponseBodyInstances {
    Instance: DescribeAutoProvisioningGroupInstancesResponseBodyInstancesInstance[]
}

export interface DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupLaunchTemplateConfigsLaunchTemplateConfig {
    InstanceType: string
    MaxPrice: number
    Priority: number
    VSwitchId: string
    WeightedCapacity: number
}

export interface DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupLaunchTemplateConfigs {
    LaunchTemplateConfig: DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupLaunchTemplateConfigsLaunchTemplateConfig[]
}

export interface DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupPayAsYouGoOptions {
    AllocationStrategy: string
}

export interface DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupSpotOptions {
    AllocationStrategy: string
    InstanceInterruptionBehavior: string
    InstancePoolsToUseCount: number
}

export interface DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupTargetCapacitySpecification {
    DefaultTargetCapacityType: string
    PayAsYouGoTargetCapacity: number
    SpotTargetCapacity: number
    TotalTargetCapacity: number
}

export interface DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroup {
    AutoProvisioningGroupId: string
    AutoProvisioningGroupName: string
    AutoProvisioningGroupType: string
    CreationTime: string
    ExcessCapacityTerminationPolicy: string
    LaunchTemplateConfigs: DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupLaunchTemplateConfigs
    LaunchTemplateId: string
    LaunchTemplateVersion: string
    MaxSpotPrice: number
    PayAsYouGoOptions: DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupPayAsYouGoOptions
    RegionId: string
    SpotOptions: DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupSpotOptions
    State: string
    Status: string
    TargetCapacitySpecification: DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroupTargetCapacitySpecification
    TerminateInstances: boolean
    TerminateInstancesWithExpiration: boolean
    ValidFrom: string
    ValidUntil: string
}

export interface DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroups {
    AutoProvisioningGroup: DescribeAutoProvisioningGroupsResponseBodyAutoProvisioningGroupsAutoProvisioningGroup[]
}

export interface DescribeAutoSnapshotPolicyExRequestTag {
    Key: string
    Value: string
}

export interface DescribeAutoSnapshotPolicyExResponseBodyAutoSnapshotPoliciesAutoSnapshotPolicyTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeAutoSnapshotPolicyExResponseBodyAutoSnapshotPoliciesAutoSnapshotPolicyTags {
    Tag: DescribeAutoSnapshotPolicyExResponseBodyAutoSnapshotPoliciesAutoSnapshotPolicyTagsTag[]
}

export interface DescribeAutoSnapshotPolicyExResponseBodyAutoSnapshotPoliciesAutoSnapshotPolicy {
    AutoSnapshotPolicyId: string
    AutoSnapshotPolicyName: string
    CopiedSnapshotsRetentionDays: number
    CreationTime: string
    DiskNums: number
    EnableCrossRegionCopy: boolean
    RegionId: string
    RepeatWeekdays: string
    ResourceGroupId: string
    RetentionDays: number
    Status: string
    Tags: DescribeAutoSnapshotPolicyExResponseBodyAutoSnapshotPoliciesAutoSnapshotPolicyTags
    TargetCopyRegions: string
    TimePoints: string
    VolumeNums: number
}

export interface DescribeAutoSnapshotPolicyExResponseBodyAutoSnapshotPolicies {
    AutoSnapshotPolicy: DescribeAutoSnapshotPolicyExResponseBodyAutoSnapshotPoliciesAutoSnapshotPolicy[]
}

export interface DescribeAvailableResourceResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResourceSupportedResourcesSupportedResource {
    Max: number
    Min: number
    Status: string
    StatusCategory: string
    Unit: string
    Value: string
}

export interface DescribeAvailableResourceResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResourceSupportedResources {
    SupportedResource: DescribeAvailableResourceResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResourceSupportedResourcesSupportedResource[]
}

export interface DescribeAvailableResourceResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResource {
    SupportedResources: DescribeAvailableResourceResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResourceSupportedResources
    Type: string
}

export interface DescribeAvailableResourceResponseBodyAvailableZonesAvailableZoneAvailableResources {
    AvailableResource: DescribeAvailableResourceResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResource[]
}

export interface DescribeAvailableResourceResponseBodyAvailableZonesAvailableZone {
    AvailableResources: DescribeAvailableResourceResponseBodyAvailableZonesAvailableZoneAvailableResources
    RegionId: string
    Status: string
    StatusCategory: string
    ZoneId: string
}

export interface DescribeAvailableResourceResponseBodyAvailableZones {
    AvailableZone: DescribeAvailableResourceResponseBodyAvailableZonesAvailableZone[]
}

export interface DescribeBandwidthLimitationResponseBodyBandwidthsBandwidth {
    InternetChargeType: string
    Max: number
    Min: number
    Unit: string
}

export interface DescribeBandwidthLimitationResponseBodyBandwidths {
    Bandwidth: DescribeBandwidthLimitationResponseBodyBandwidthsBandwidth[]
}

export interface DescribeBandwidthPackagesResponseBodyBandwidthPackagesBandwidthPackagePublicIpAddressesPublicIpAddresse {
    AllocationId: string
    IpAddress: string
}

export interface DescribeBandwidthPackagesResponseBodyBandwidthPackagesBandwidthPackagePublicIpAddresses {
    PublicIpAddresse: DescribeBandwidthPackagesResponseBodyBandwidthPackagesBandwidthPackagePublicIpAddressesPublicIpAddresse[]
}

export interface DescribeBandwidthPackagesResponseBodyBandwidthPackagesBandwidthPackage {
    Bandwidth: string
    BandwidthPackageId: string
    BusinessStatus: string
    CreationTime: string
    Description: string
    ISP: string
    InstanceChargeType: string
    InternetChargeType: string
    IpCount: string
    Name: string
    NatGatewayId: string
    PublicIpAddresses: DescribeBandwidthPackagesResponseBodyBandwidthPackagesBandwidthPackagePublicIpAddresses
    RegionId: string
    Status: string
    ZoneId: string
}

export interface DescribeBandwidthPackagesResponseBodyBandwidthPackages {
    BandwidthPackage: DescribeBandwidthPackagesResponseBodyBandwidthPackagesBandwidthPackage[]
}

export interface DescribeCapacityReservationInstancesRequestPrivatePoolOptions {
    Id: string
}

export interface DescribeCapacityReservationInstancesResponseBodyCapacityReservationItemInstanceIdSet {
    InstanceId: string
}

export interface DescribeCapacityReservationInstancesResponseBodyCapacityReservationItem {
    InstanceIdSet: DescribeCapacityReservationInstancesResponseBodyCapacityReservationItemInstanceIdSet[]
}

export interface DescribeCapacityReservationsRequestPrivatePoolOptions {
    Ids: string
}

export interface DescribeCapacityReservationsRequestTag {
    Key: string
    Value: string
}

export interface DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItemAllocatedResourcesAllocatedResource {
    InstanceType: string
    TotalAmount: number
    UsedAmount: number
    ZoneId: string
}

export interface DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItemAllocatedResources {
    AllocatedResource: DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItemAllocatedResourcesAllocatedResource[]
}

export interface DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItemTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItemTags {
    Tag: DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItemTagsTag[]
}

export interface DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItem {
    AllocatedResources: DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItemAllocatedResources
    Description: string
    EndTime: string
    EndTimeType: string
    InstanceChargeType: string
    Platform: string
    PrivatePoolOptionsId: string
    PrivatePoolOptionsMatchCriteria: string
    PrivatePoolOptionsName: string
    RegionId: string
    ReservedInstanceId: string
    ResourceGroupId: string
    SavingPlanId: string
    StartTime: string
    StartTimeType: string
    Status: string
    Tags: DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItemTags
    TimeSlot: string
}

export interface DescribeCapacityReservationsResponseBodyCapacityReservationSet {
    CapacityReservationItem: DescribeCapacityReservationsResponseBodyCapacityReservationSetCapacityReservationItem[]
}

export interface DescribeClassicLinkInstancesResponseBodyLinksLink {
    InstanceId: string
    VpcId: string
}

export interface DescribeClassicLinkInstancesResponseBodyLinks {
    Link: DescribeClassicLinkInstancesResponseBodyLinksLink[]
}

export interface DescribeCloudAssistantStatusResponseBodyInstanceCloudAssistantStatusSetInstanceCloudAssistantStatus {
    ActiveTaskCount: number
    CloudAssistantStatus: string
    CloudAssistantVersion: string
    InstanceId: string
    InvocationCount: number
    LastHeartbeatTime: string
    LastInvokedTime: string
    OSType: string
    SupportSessionManager: boolean
}

export interface DescribeCloudAssistantStatusResponseBodyInstanceCloudAssistantStatusSet {
    InstanceCloudAssistantStatus: DescribeCloudAssistantStatusResponseBodyInstanceCloudAssistantStatusSetInstanceCloudAssistantStatus[]
}

export interface DescribeClustersResponseBodyClustersCluster {
    ClusterId: string
}

export interface DescribeClustersResponseBodyClusters {
    Cluster: DescribeClustersResponseBodyClustersCluster[]
}

export interface DescribeCommandsRequestTag {
    Key: string
    Value: string
}

export interface DescribeCommandsResponseBodyCommandsCommandParameterDefinitionsParameterDefinitionPossibleValues {
    PossibleValue: string[]
}

export interface DescribeCommandsResponseBodyCommandsCommandParameterDefinitionsParameterDefinition {
    DefaultValue: string
    Description: string
    ParameterName: string
    PossibleValues: DescribeCommandsResponseBodyCommandsCommandParameterDefinitionsParameterDefinitionPossibleValues
    Required: boolean
}

export interface DescribeCommandsResponseBodyCommandsCommandParameterDefinitions {
    ParameterDefinition: DescribeCommandsResponseBodyCommandsCommandParameterDefinitionsParameterDefinition[]
}

export interface DescribeCommandsResponseBodyCommandsCommandParameterNames {
    ParameterName: string[]
}

export interface DescribeCommandsResponseBodyCommandsCommandTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeCommandsResponseBodyCommandsCommandTags {
    Tag: DescribeCommandsResponseBodyCommandsCommandTagsTag[]
}

export interface DescribeCommandsResponseBodyCommandsCommand {
    Category: string
    CommandContent: string
    CommandId: string
    CreationTime: string
    Description: string
    EnableParameter: boolean
    InvokeTimes: number
    Latest: boolean
    Name: string
    ParameterDefinitions: DescribeCommandsResponseBodyCommandsCommandParameterDefinitions
    ParameterNames: DescribeCommandsResponseBodyCommandsCommandParameterNames
    Provider: string
    Tags: DescribeCommandsResponseBodyCommandsCommandTags
    Timeout: number
    Type: string
    Version: number
    WorkingDir: string
}

export interface DescribeCommandsResponseBodyCommands {
    Command: DescribeCommandsResponseBodyCommandsCommand[]
}

export interface DescribeDedicatedHostAutoRenewResponseBodyDedicatedHostRenewAttributesDedicatedHostRenewAttribute {
    AutoRenewEnabled: boolean
    AutoRenewWithEcs: string
    DedicatedHostId: string
    Duration: number
    PeriodUnit: string
    RenewalStatus: string
}

export interface DescribeDedicatedHostAutoRenewResponseBodyDedicatedHostRenewAttributes {
    DedicatedHostRenewAttribute: DescribeDedicatedHostAutoRenewResponseBodyDedicatedHostRenewAttributesDedicatedHostRenewAttribute[]
}

export interface DescribeDedicatedHostClustersRequestTag {
    Key: string
    Value: string
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacityAvailableInstanceTypesAvailableInstanceType {
    AvailableInstanceCapacity: number
    InstanceType: string
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacityAvailableInstanceTypes {
    AvailableInstanceType: DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacityAvailableInstanceTypesAvailableInstanceType[]
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacityLocalStorageCapacitiesLocalStorageCapacity {
    AvailableDisk: number
    DataDiskCategory: string
    TotalDisk: number
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacityLocalStorageCapacities {
    LocalStorageCapacity: DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacityLocalStorageCapacitiesLocalStorageCapacity[]
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacity {
    AvailableInstanceTypes: DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacityAvailableInstanceTypes
    AvailableMemory: number
    AvailableVcpus: number
    LocalStorageCapacities: DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacityLocalStorageCapacities
    TotalMemory: number
    TotalVcpus: number
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostIds {
    DedicatedHostId: string[]
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterTags {
    Tag: DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterTagsTag[]
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostCluster {
    DedicatedHostClusterCapacity: DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostClusterCapacity
    DedicatedHostClusterId: string
    DedicatedHostClusterName: string
    DedicatedHostIds: DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterDedicatedHostIds
    Description: string
    RegionId: string
    ResourceGroupId: string
    Tags: DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostClusterTags
    ZoneId: string
}

export interface DescribeDedicatedHostClustersResponseBodyDedicatedHostClusters {
    DedicatedHostCluster: DescribeDedicatedHostClustersResponseBodyDedicatedHostClustersDedicatedHostCluster[]
}

export interface DescribeDedicatedHostTypesResponseBodyDedicatedHostTypesDedicatedHostTypeSupportedInstanceTypeFamilies {
    SupportedInstanceTypeFamily: string[]
}

export interface DescribeDedicatedHostTypesResponseBodyDedicatedHostTypesDedicatedHostTypeSupportedInstanceTypesList {
    SupportedInstanceTypesList: string[]
}

export interface DescribeDedicatedHostTypesResponseBodyDedicatedHostTypesDedicatedHostType {
    Cores: number
    CpuOverCommitRatioRange: string
    DedicatedHostType: string
    GPUSpec: string
    LocalStorageAmount: number
    LocalStorageCapacity: number
    LocalStorageCategory: string
    MemorySize: number
    PhysicalGpus: number
    Sockets: number
    SupportCpuOverCommitRatio: boolean
    SupportedInstanceTypeFamilies: DescribeDedicatedHostTypesResponseBodyDedicatedHostTypesDedicatedHostTypeSupportedInstanceTypeFamilies
    SupportedInstanceTypesList: DescribeDedicatedHostTypesResponseBodyDedicatedHostTypesDedicatedHostTypeSupportedInstanceTypesList
    TotalVcpus: number
    TotalVgpus: number
}

export interface DescribeDedicatedHostTypesResponseBodyDedicatedHostTypes {
    DedicatedHostType: DescribeDedicatedHostTypesResponseBodyDedicatedHostTypesDedicatedHostType[]
}

export interface DescribeDedicatedHostsRequestTag {
    Key: string
    Value: string
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostSchedulerOptions {
    ManagedPrivateSpaceId: string
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostCapacitySocketCapacitiesSocketCapacity {
    AvailableMemory: number
    AvailableVcpu: number
    SocketId: number
    TotalMemory: number
    TotalVcpu: number
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostCapacitySocketCapacities {
    SocketCapacity: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostCapacitySocketCapacitiesSocketCapacity[]
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostCapacity {
    AvailableLocalStorage: number
    AvailableMemory: number
    AvailableVcpus: number
    AvailableVgpus: number
    LocalStorageCategory: string
    SocketCapacities: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostCapacitySocketCapacities
    TotalLocalStorage: number
    TotalMemory: number
    TotalVcpus: number
    TotalVgpus: number
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostHostDetailInfo {
    SerialNumber: string
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostInstancesInstance {
    InstanceId: string
    InstanceType: string
    SocketId: string
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostInstances {
    Instance: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostInstancesInstance[]
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostNetworkAttributes {
    SlbUdpTimeout: number
    UdpTimeout: number
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostOperationLocksOperationLock {
    LockReason: string
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostOperationLocks {
    OperationLock: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostOperationLocksOperationLock[]
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostSupportedCustomInstanceTypeFamilies {
    SupportedCustomInstanceTypeFamily: string[]
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostSupportedInstanceTypeFamilies {
    SupportedInstanceTypeFamily: string[]
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostSupportedInstanceTypesList {
    SupportedInstanceTypesList: string[]
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostTags {
    Tag: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostTagsTag[]
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHost {
    SchedulerOptions: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostSchedulerOptions
    ActionOnMaintenance: string
    AutoPlacement: string
    AutoReleaseTime: string
    Capacity: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostCapacity
    ChargeType: string
    Cores: number
    CpuOverCommitRatio: number
    CreationTime: string
    DedicatedHostClusterId: string
    DedicatedHostId: string
    DedicatedHostName: string
    DedicatedHostType: string
    Description: string
    ExpiredTime: string
    GPUSpec: string
    HostDetailInfo: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostHostDetailInfo
    Instances: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostInstances
    MachineId: string
    NetworkAttributes: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostNetworkAttributes
    OperationLocks: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostOperationLocks
    PhysicalGpus: number
    RegionId: string
    ResourceGroupId: string
    SaleCycle: string
    Sockets: number
    Status: string
    SupportedCustomInstanceTypeFamilies: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostSupportedCustomInstanceTypeFamilies
    SupportedInstanceTypeFamilies: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostSupportedInstanceTypeFamilies
    SupportedInstanceTypesList: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostSupportedInstanceTypesList
    Tags: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHostTags
    ZoneId: string
}

export interface DescribeDedicatedHostsResponseBodyDedicatedHosts {
    DedicatedHost: DescribeDedicatedHostsResponseBodyDedicatedHostsDedicatedHost[]
}

export interface DescribeDemandsRequestTag {
    Key: string
    Value: string
}

export interface DescribeDemandsResponseBodyDemandsDemandSupplyInfosSupplyInfo {
    Amount: number
    SupplyEndTime: string
    SupplyStartTime: string
    SupplyStatus: string
}

export interface DescribeDemandsResponseBodyDemandsDemandSupplyInfos {
    SupplyInfo: DescribeDemandsResponseBodyDemandsDemandSupplyInfosSupplyInfo[]
}

export interface DescribeDemandsResponseBodyDemandsDemand {
    AvailableAmount: number
    Comment: string
    DeliveringAmount: number
    DemandDescription: string
    DemandId: string
    DemandName: string
    DemandStatus: string
    DemandTime: string
    EndTime: string
    InstanceChargeType: string
    InstanceType: string
    InstanceTypeFamily: string
    Period: number
    PeriodUnit: string
    StartTime: string
    SupplyInfos: DescribeDemandsResponseBodyDemandsDemandSupplyInfos
    TotalAmount: number
    UsedAmount: number
    ZoneId: string
}

export interface DescribeDemandsResponseBodyDemands {
    Demand: DescribeDemandsResponseBodyDemandsDemand[]
}

export interface DescribeDeploymentSetsResponseBodyDeploymentSetsDeploymentSetCapacitiesCapacity {
    AvailableAmount: number
    UsedAmount: number
    ZoneId: string
}

export interface DescribeDeploymentSetsResponseBodyDeploymentSetsDeploymentSetCapacities {
    Capacity: DescribeDeploymentSetsResponseBodyDeploymentSetsDeploymentSetCapacitiesCapacity[]
}

export interface DescribeDeploymentSetsResponseBodyDeploymentSetsDeploymentSetInstanceIds {
    InstanceId: string[]
}

export interface DescribeDeploymentSetsResponseBodyDeploymentSetsDeploymentSet {
    Capacities: DescribeDeploymentSetsResponseBodyDeploymentSetsDeploymentSetCapacities
    CreationTime: string
    DeploymentSetDescription: string
    DeploymentSetId: string
    DeploymentSetName: string
    DeploymentStrategy: string
    Domain: string
    Granularity: string
    GroupCount: number
    InstanceAmount: number
    InstanceIds: DescribeDeploymentSetsResponseBodyDeploymentSetsDeploymentSetInstanceIds
    Strategy: string
}

export interface DescribeDeploymentSetsResponseBodyDeploymentSets {
    DeploymentSet: DescribeDeploymentSetsResponseBodyDeploymentSetsDeploymentSet[]
}

export interface DescribeDiagnosticMetricSetsResponseBodyMetricSets {
    Description: string
    MetricIds: string[]
    MetricSetId: string
    MetricSetName: string
    ResourceType: string
    Type: string
}

export interface DescribeDiagnosticMetricsResponseBodyMetrics {
    Description: string
    GuestMetric: boolean
    MetricCategory: string
    MetricId: string
    MetricName: string
    ResourceType: string
    SupportedOperatingSystem: string
}

export interface DescribeDiagnosticReportAttributesResponseBodyMetricResultsMetricResultIssuesIssue {
    Additional: string
    IssueId: string
    OccurrenceTime: string
    Severity: string
}

export interface DescribeDiagnosticReportAttributesResponseBodyMetricResultsMetricResultIssues {
    Issue: DescribeDiagnosticReportAttributesResponseBodyMetricResultsMetricResultIssuesIssue[]
}

export interface DescribeDiagnosticReportAttributesResponseBodyMetricResultsMetricResult {
    Issues: DescribeDiagnosticReportAttributesResponseBodyMetricResultsMetricResultIssues
    MetricCategory: string
    MetricId: string
    Severity: string
    Status: string
}

export interface DescribeDiagnosticReportAttributesResponseBodyMetricResults {
    MetricResult: DescribeDiagnosticReportAttributesResponseBodyMetricResultsMetricResult[]
}

export interface DescribeDiagnosticReportsResponseBodyReportsReportIssuesIssue {
    IssueId: string
    MetricCategory: string
    MetricId: string
    Severity: string
}

export interface DescribeDiagnosticReportsResponseBodyReportsReportIssues {
    Issue: DescribeDiagnosticReportsResponseBodyReportsReportIssuesIssue[]
}

export interface DescribeDiagnosticReportsResponseBodyReportsReport {
    CreationTime: string
    EndTime: string
    FinishedTime: string
    Issues: DescribeDiagnosticReportsResponseBodyReportsReportIssues
    MetricSetId: string
    ReportId: string
    ResourceId: string
    ResourceType: string
    Severity: string
    StartTime: string
    Status: string
}

export interface DescribeDiagnosticReportsResponseBodyReports {
    Report: DescribeDiagnosticReportsResponseBodyReportsReport[]
}

export interface DescribeDiskMonitorDataResponseBodyMonitorDataDiskMonitorData {
    BPSRead: number
    BPSTotal: number
    BPSWrite: number
    DiskId: string
    IOPSRead: number
    IOPSTotal: number
    IOPSWrite: number
    LatencyRead: number
    LatencyWrite: number
    TimeStamp: string
}

export interface DescribeDiskMonitorDataResponseBodyMonitorData {
    DiskMonitorData: DescribeDiskMonitorDataResponseBodyMonitorDataDiskMonitorData[]
}

export interface DescribeDisksRequestFilter {
    Key: string
    Value: string
}

export interface DescribeDisksRequestTag {
    Key: string
    Value: string
}

export interface DescribeDisksResponseBodyDisksDiskAttachmentsAttachment {
    AttachedTime: string
    Device: string
    InstanceId: string
}

export interface DescribeDisksResponseBodyDisksDiskAttachments {
    Attachment: DescribeDisksResponseBodyDisksDiskAttachmentsAttachment[]
}

export interface DescribeDisksResponseBodyDisksDiskMountInstancesMountInstance {
    AttachedTime: string
    Device: string
    InstanceId: string
}

export interface DescribeDisksResponseBodyDisksDiskMountInstances {
    MountInstance: DescribeDisksResponseBodyDisksDiskMountInstancesMountInstance[]
}

export interface DescribeDisksResponseBodyDisksDiskOperationLocksOperationLock {
    LockReason: string
}

export interface DescribeDisksResponseBodyDisksDiskOperationLocks {
    OperationLock: DescribeDisksResponseBodyDisksDiskOperationLocksOperationLock[]
}

export interface DescribeDisksResponseBodyDisksDiskTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeDisksResponseBodyDisksDiskTags {
    Tag: DescribeDisksResponseBodyDisksDiskTagsTag[]
}

export interface DescribeDisksResponseBodyDisksDisk {
    AttachedTime: string
    Attachments: DescribeDisksResponseBodyDisksDiskAttachments
    AutoSnapshotPolicyId: string
    BdfId: string
    BurstingEnabled: boolean
    Category: string
    CreationTime: string
    DeleteAutoSnapshot: boolean
    DeleteWithInstance: boolean
    Description: string
    DetachedTime: string
    Device: string
    DiskChargeType: string
    DiskId: string
    DiskName: string
    EnableAutoSnapshot: boolean
    EnableAutomatedSnapshotPolicy: boolean
    Encrypted: boolean
    ExpiredTime: string
    IOPS: number
    IOPSRead: number
    IOPSWrite: number
    ImageId: string
    InstanceId: string
    KMSKeyId: string
    MountInstanceNum: number
    MountInstances: DescribeDisksResponseBodyDisksDiskMountInstances
    MultiAttach: string
    OperationLocks: DescribeDisksResponseBodyDisksDiskOperationLocks
    PerformanceLevel: string
    Portable: boolean
    ProductCode: string
    ProvisionedIops: number
    RegionId: string
    ResourceGroupId: string
    SerialNumber: string
    Size: number
    SourceSnapshotId: string
    Status: string
    StorageClusterId: string
    StorageSetId: string
    StorageSetPartitionNumber: number
    Tags: DescribeDisksResponseBodyDisksDiskTags
    Throughput: number
    Type: string
    ZoneId: string
}

export interface DescribeDisksResponseBodyDisks {
    Disk: DescribeDisksResponseBodyDisksDisk[]
}

export interface DescribeDisksFullStatusRequestEventTime {
    End: string
    Start: string
}

export interface DescribeDisksFullStatusRequestTag {
    Key: string
    Value: string
}

export interface DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeDiskEventSetDiskEventTypeEventType {
    Code: number
    Name: string
}

export interface DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeDiskEventSetDiskEventType {
    EventEndTime: string
    EventId: string
    EventTime: string
    EventType: DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeDiskEventSetDiskEventTypeEventType
    ImpactLevel: string
}

export interface DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeDiskEventSet {
    DiskEventType: DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeDiskEventSetDiskEventType[]
}

export interface DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeHealthStatus {
    Code: number
    Name: string
}

export interface DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeStatus {
    Code: number
    Name: string
}

export interface DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusType {
    Device: string
    DiskEventSet: DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeDiskEventSet
    DiskId: string
    HealthStatus: DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeHealthStatus
    InstanceId: string
    Status: DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusTypeStatus
}

export interface DescribeDisksFullStatusResponseBodyDiskFullStatusSet {
    DiskFullStatusType: DescribeDisksFullStatusResponseBodyDiskFullStatusSetDiskFullStatusType[]
}

export interface DescribeEipAddressesRequestFilter {
    Key: string
    Value: string
}

export interface DescribeEipAddressesResponseBodyEipAddressesEipAddressOperationLocksLockReason {
    LockReason: string
}

export interface DescribeEipAddressesResponseBodyEipAddressesEipAddressOperationLocks {
    LockReason: DescribeEipAddressesResponseBodyEipAddressesEipAddressOperationLocksLockReason[]
}

export interface DescribeEipAddressesResponseBodyEipAddressesEipAddress {
    AllocationId: string
    AllocationTime: string
    Bandwidth: string
    ChargeType: string
    EipBandwidth: string
    ExpiredTime: string
    InstanceId: string
    InstanceType: string
    InternetChargeType: string
    IpAddress: string
    OperationLocks: DescribeEipAddressesResponseBodyEipAddressesEipAddressOperationLocks
    RegionId: string
    Status: string
}

export interface DescribeEipAddressesResponseBodyEipAddresses {
    EipAddress: DescribeEipAddressesResponseBodyEipAddressesEipAddress[]
}

export interface DescribeEipMonitorDataResponseBodyEipMonitorDatasEipMonitorData {
    EipBandwidth: number
    EipFlow: number
    EipPackets: number
    EipRX: number
    EipTX: number
    TimeStamp: string
}

export interface DescribeEipMonitorDataResponseBodyEipMonitorDatas {
    EipMonitorData: DescribeEipMonitorDataResponseBodyEipMonitorDatasEipMonitorData[]
}

export interface DescribeElasticityAssuranceInstancesRequestPrivatePoolOptions {
    Id: string
}

export interface DescribeElasticityAssuranceInstancesResponseBodyElasticityAssuranceItemInstanceIdSet {
    InstanceId: string
}

export interface DescribeElasticityAssuranceInstancesResponseBodyElasticityAssuranceItem {
    InstanceIdSet: DescribeElasticityAssuranceInstancesResponseBodyElasticityAssuranceItemInstanceIdSet[]
}

export interface DescribeElasticityAssurancesRequestPrivatePoolOptions {
    Ids: string
}

export interface DescribeElasticityAssurancesRequestTag {
    Key: string
    Value: string
}

export interface DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItemAllocatedResourcesAllocatedResource {
    InstanceType: string
    TotalAmount: number
    UsedAmount: number
    ZoneId: string
}

export interface DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItemAllocatedResources {
    AllocatedResource: DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItemAllocatedResourcesAllocatedResource[]
}

export interface DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItemTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItemTags {
    Tag: DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItemTagsTag[]
}

export interface DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItem {
    AllocatedResources: DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItemAllocatedResources
    Description: string
    EndTime: string
    InstanceChargeType: string
    LatestStartTime: string
    PrivatePoolOptionsId: string
    PrivatePoolOptionsMatchCriteria: string
    PrivatePoolOptionsName: string
    RegionId: string
    ResourceGroupId: string
    StartTime: string
    StartTimeType: string
    Status: string
    Tags: DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItemTags
    TotalAssuranceTimes: string
    UsedAssuranceTimes: number
}

export interface DescribeElasticityAssurancesResponseBodyElasticityAssuranceSet {
    ElasticityAssuranceItem: DescribeElasticityAssurancesResponseBodyElasticityAssuranceSetElasticityAssuranceItem[]
}

export interface DescribeEniMonitorDataResponseBodyMonitorDataEniMonitorData {
    DropPacketRx: string
    DropPacketTx: string
    EniId: string
    IntranetRx: string
    IntranetTx: string
    PacketRx: string
    PacketTx: string
    TimeStamp: string
}

export interface DescribeEniMonitorDataResponseBodyMonitorData {
    EniMonitorData: DescribeEniMonitorDataResponseBodyMonitorDataEniMonitorData[]
}

export interface DescribeForwardTableEntriesResponseBodyForwardTableEntriesForwardTableEntry {
    ExternalIp: string
    ExternalPort: string
    ForwardEntryId: string
    ForwardTableId: string
    InternalIp: string
    InternalPort: string
    IpProtocol: string
    Status: string
}

export interface DescribeForwardTableEntriesResponseBodyForwardTableEntries {
    ForwardTableEntry: DescribeForwardTableEntriesResponseBodyForwardTableEntriesForwardTableEntry[]
}

export interface DescribeHaVipsRequestFilter {
    Key: string
    Value: string[]
}

export interface DescribeHaVipsResponseBodyHaVipsHaVipAssociatedEipAddresses {
    AssociatedEipAddresse: string[]
}

export interface DescribeHaVipsResponseBodyHaVipsHaVipAssociatedInstances {
    AssociatedInstance: string[]
}

export interface DescribeHaVipsResponseBodyHaVipsHaVip {
    AssociatedEipAddresses: DescribeHaVipsResponseBodyHaVipsHaVipAssociatedEipAddresses
    AssociatedInstances: DescribeHaVipsResponseBodyHaVipsHaVipAssociatedInstances
    CreateTime: string
    Description: string
    HaVipId: string
    IpAddress: string
    MasterInstanceId: string
    RegionId: string
    Status: string
    VSwitchId: string
    VpcId: string
}

export interface DescribeHaVipsResponseBodyHaVips {
    HaVip: DescribeHaVipsResponseBodyHaVipsHaVip[]
}

export interface DescribeHpcClustersResponseBodyHpcClustersHpcCluster {
    Description: string
    HpcClusterId: string
    Name: string
}

export interface DescribeHpcClustersResponseBodyHpcClusters {
    HpcCluster: DescribeHpcClustersResponseBodyHpcClustersHpcCluster[]
}

export interface DescribeImageComponentsRequestTag {
    Key: string
    Value: string
}

export interface DescribeImageComponentsResponseBodyImageComponentImageComponentSetTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeImageComponentsResponseBodyImageComponentImageComponentSetTags {
    Tag: DescribeImageComponentsResponseBodyImageComponentImageComponentSetTagsTag[]
}

export interface DescribeImageComponentsResponseBodyImageComponentImageComponentSet {
    ComponentType: string
    Content: string
    CreationTime: string
    Description: string
    ImageComponentId: string
    Name: string
    Owner: string
    ResourceGroupId: string
    SystemType: string
    Tags: DescribeImageComponentsResponseBodyImageComponentImageComponentSetTags
}

export interface DescribeImageComponentsResponseBodyImageComponent {
    ImageComponentSet: DescribeImageComponentsResponseBodyImageComponentImageComponentSet[]
}

export interface DescribeImageFromFamilyResponseBodyImageDiskDeviceMappingsDiskDeviceMapping {
    Device: string
    Format: string
    ImportOSSBucket: string
    ImportOSSObject: string
    Size: string
    SnapshotId: string
    Type: string
}

export interface DescribeImageFromFamilyResponseBodyImageDiskDeviceMappings {
    DiskDeviceMapping: DescribeImageFromFamilyResponseBodyImageDiskDeviceMappingsDiskDeviceMapping[]
}

export interface DescribeImageFromFamilyResponseBodyImageTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeImageFromFamilyResponseBodyImageTags {
    Tag: DescribeImageFromFamilyResponseBodyImageTagsTag[]
}

export interface DescribeImageFromFamilyResponseBodyImage {
    Architecture: string
    CreationTime: string
    Description: string
    DiskDeviceMappings: DescribeImageFromFamilyResponseBodyImageDiskDeviceMappings
    ImageFamily: string
    ImageId: string
    ImageName: string
    ImageOwnerAlias: string
    ImageVersion: string
    IsCopied: boolean
    IsSelfShared: string
    IsSubscribed: boolean
    IsSupportCloudinit: boolean
    IsSupportIoOptimized: boolean
    OSName: string
    OSType: string
    Platform: string
    ProductCode: string
    Progress: string
    Size: number
    Status: string
    Tags: DescribeImageFromFamilyResponseBodyImageTags
    Usage: string
}

export interface DescribeImagePipelineExecutionsRequestTag {
    Key: string
    Value: string
}

export interface DescribeImagePipelineExecutionsResponseBodyImagePipelineExecutionImagePipelineExecutionSetTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeImagePipelineExecutionsResponseBodyImagePipelineExecutionImagePipelineExecutionSetTags {
    Tag: DescribeImagePipelineExecutionsResponseBodyImagePipelineExecutionImagePipelineExecutionSetTagsTag[]
}

export interface DescribeImagePipelineExecutionsResponseBodyImagePipelineExecutionImagePipelineExecutionSet {
    CreationTime: string
    ExecutionId: string
    ImageId: string
    ImagePipelineId: string
    Message: string
    ModifiedTime: string
    ResourceGroupId: string
    Status: string
    Tags: DescribeImagePipelineExecutionsResponseBodyImagePipelineExecutionImagePipelineExecutionSetTags
}

export interface DescribeImagePipelineExecutionsResponseBodyImagePipelineExecution {
    ImagePipelineExecutionSet: DescribeImagePipelineExecutionsResponseBodyImagePipelineExecutionImagePipelineExecutionSet[]
}

export interface DescribeImagePipelinesRequestTag {
    Key: string
    Value: string
}

export interface DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSetAddAccounts {
    AddAccount: string[]
}

export interface DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSetTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSetTags {
    Tag: DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSetTagsTag[]
}

export interface DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSetToRegionIds {
    ToRegionId: string[]
}

export interface DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSet {
    AddAccounts: DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSetAddAccounts
    BaseImage: string
    BaseImageType: string
    BuildContent: string
    CreationTime: string
    DeleteInstanceOnFailure: boolean
    Description: string
    ImageName: string
    ImagePipelineId: string
    InstanceType: string
    InternetMaxBandwidthOut: number
    Name: string
    ResourceGroupId: string
    SystemDiskSize: number
    Tags: DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSetTags
    ToRegionIds: DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSetToRegionIds
    VSwitchId: string
}

export interface DescribeImagePipelinesResponseBodyImagePipeline {
    ImagePipelineSet: DescribeImagePipelinesResponseBodyImagePipelineImagePipelineSet[]
}

export interface DescribeImageSharePermissionResponseBodyAccountsAccount {
    AliyunId: string
}

export interface DescribeImageSharePermissionResponseBodyAccounts {
    Account: DescribeImageSharePermissionResponseBodyAccountsAccount[]
}

export interface DescribeImageSharePermissionResponseBodyShareGroupsShareGroup {
    Group: string
}

export interface DescribeImageSharePermissionResponseBodyShareGroups {
    ShareGroup: DescribeImageSharePermissionResponseBodyShareGroupsShareGroup[]
}

export interface DescribeImageSupportInstanceTypesRequestFilter {
    Key: string
    Value: string
}

export interface DescribeImageSupportInstanceTypesResponseBodyInstanceTypesInstanceType {
    CpuCoreCount: number
    InstanceTypeFamily: string
    InstanceTypeId: string
    MemorySize: number
}

export interface DescribeImageSupportInstanceTypesResponseBodyInstanceTypes {
    InstanceType: DescribeImageSupportInstanceTypesResponseBodyInstanceTypesInstanceType[]
}

export interface DescribeImagesRequestFilter {
    Key: string
    Value: string
}

export interface DescribeImagesRequestTag {
    Key: string
    Value: string
}

export interface DescribeImagesResponseBodyImagesImageDetectionOptionsItemsItem {
    Name: string
    RiskCode: string
    RiskLevel: string
    Value: string
}

export interface DescribeImagesResponseBodyImagesImageDetectionOptionsItems {
    Item: DescribeImagesResponseBodyImagesImageDetectionOptionsItemsItem[]
}

export interface DescribeImagesResponseBodyImagesImageDetectionOptions {
    Items: DescribeImagesResponseBodyImagesImageDetectionOptionsItems
    Status: string
}

export interface DescribeImagesResponseBodyImagesImageDiskDeviceMappingsDiskDeviceMapping {
    Device: string
    Format: string
    ImportOSSBucket: string
    ImportOSSObject: string
    Progress: string
    RemainTime: number
    Size: string
    SnapshotId: string
    Type: string
}

export interface DescribeImagesResponseBodyImagesImageDiskDeviceMappings {
    DiskDeviceMapping: DescribeImagesResponseBodyImagesImageDiskDeviceMappingsDiskDeviceMapping[]
}

export interface DescribeImagesResponseBodyImagesImageFeatures {
    NvmeSupport: string
}

export interface DescribeImagesResponseBodyImagesImageTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeImagesResponseBodyImagesImageTags {
    Tag: DescribeImagesResponseBodyImagesImageTagsTag[]
}

export interface DescribeImagesResponseBodyImagesImage {
    Architecture: string
    BootMode: string
    CreationTime: string
    Description: string
    DetectionOptions: DescribeImagesResponseBodyImagesImageDetectionOptions
    DiskDeviceMappings: DescribeImagesResponseBodyImagesImageDiskDeviceMappings
    Features: DescribeImagesResponseBodyImagesImageFeatures
    ImageFamily: string
    ImageId: string
    ImageName: string
    ImageOwnerAlias: string
    ImageOwnerId: number
    ImageVersion: string
    IsCopied: boolean
    IsPublic: boolean
    IsSelfShared: string
    IsSubscribed: boolean
    IsSupportCloudinit: boolean
    IsSupportIoOptimized: boolean
    LoginAsNonRootSupported: boolean
    OSName: string
    OSNameEn: string
    OSType: string
    Platform: string
    ProductCode: string
    Progress: string
    ResourceGroupId: string
    Size: number
    Status: string
    SupplierName: string
    Tags: DescribeImagesResponseBodyImagesImageTags
    Usage: string
}

export interface DescribeImagesResponseBodyImages {
    Image: DescribeImagesResponseBodyImagesImage[]
}

export interface DescribeInstanceAttachmentAttributesResponseBodyInstancesInstance {
    InstanceId: string
    PrivatePoolOptionsId: string
    PrivatePoolOptionsMatchCriteria: string
}

export interface DescribeInstanceAttachmentAttributesResponseBodyInstances {
    Instance: DescribeInstanceAttachmentAttributesResponseBodyInstancesInstance[]
}

export interface DescribeInstanceAttributeResponseBodyDedicatedHostAttribute {
    DedicatedHostId: string
    DedicatedHostName: string
}

export interface DescribeInstanceAttributeResponseBodyEipAddress {
    AllocationId: string
    Bandwidth: number
    InternetChargeType: string
    IpAddress: string
}

export interface DescribeInstanceAttributeResponseBodyInnerIpAddress {
    IpAddress: string[]
}

export interface DescribeInstanceAttributeResponseBodyOperationLocksLockReason {
    LockReason: string
}

export interface DescribeInstanceAttributeResponseBodyOperationLocks {
    LockReason: DescribeInstanceAttributeResponseBodyOperationLocksLockReason[]
}

export interface DescribeInstanceAttributeResponseBodyPublicIpAddress {
    IpAddress: string[]
}

export interface DescribeInstanceAttributeResponseBodySecurityGroupIds {
    SecurityGroupId: string[]
}

export interface DescribeInstanceAttributeResponseBodyVpcAttributesPrivateIpAddress {
    IpAddress: string[]
}

export interface DescribeInstanceAttributeResponseBodyVpcAttributes {
    NatIpAddress: string
    PrivateIpAddress: DescribeInstanceAttributeResponseBodyVpcAttributesPrivateIpAddress
    VSwitchId: string
    VpcId: string
}

export interface DescribeInstanceAutoRenewAttributeResponseBodyInstanceRenewAttributesInstanceRenewAttribute {
    AutoRenewEnabled: boolean
    Duration: number
    InstanceId: string
    PeriodUnit: string
    RenewalStatus: string
}

export interface DescribeInstanceAutoRenewAttributeResponseBodyInstanceRenewAttributes {
    InstanceRenewAttribute: DescribeInstanceAutoRenewAttributeResponseBodyInstanceRenewAttributesInstanceRenewAttribute[]
}

export interface DescribeInstanceHistoryEventsRequestEventPublishTime {
    End: string
    Start: string
}

export interface DescribeInstanceHistoryEventsRequestNotBefore {
    End: string
    Start: string
}

export interface DescribeInstanceHistoryEventsRequestTag {
    Key: string
    Value: string
}

export interface DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeEventCycleStatus {
    Code: number
    Name: string
}

export interface DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeEventType {
    Code: number
    Name: string
}

export interface DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeExtendedAttributeInactiveDisksInactiveDisk {
    CreationTime: string
    DeviceCategory: string
    DeviceSize: string
    DeviceType: string
    ReleaseTime: string
}

export interface DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeExtendedAttributeInactiveDisks {
    InactiveDisk: DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeExtendedAttributeInactiveDisksInactiveDisk[]
}

export interface DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeExtendedAttributeMigrationOptions {
    MigrationOption: string[]
}

export interface DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeExtendedAttribute {
    Device: string
    DiskId: string
    HostId: string
    HostType: string
    InactiveDisks: DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeExtendedAttributeInactiveDisks
    MigrationOptions: DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeExtendedAttributeMigrationOptions
    OnlineRepairPolicy: string
    Rack: string
}

export interface DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventType {
    EventCycleStatus: DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeEventCycleStatus
    EventFinishTime: string
    EventId: string
    EventPublishTime: string
    EventType: DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeEventType
    ExtendedAttribute: DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventTypeExtendedAttribute
    ImpactLevel: string
    InstanceId: string
    NotBefore: string
    Reason: string
    ResourceType: string
}

export interface DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSet {
    InstanceSystemEventType: DescribeInstanceHistoryEventsResponseBodyInstanceSystemEventSetInstanceSystemEventType[]
}

export interface DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttributeActionOnMaintenanceSupportedValues {
    SupportedValue: string[]
}

export interface DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttributeActionOnMaintenance {
    DefaultValue: string
    SupportedValues: DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttributeActionOnMaintenanceSupportedValues
    Value: string
}

export interface DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttributeMaintenanceWindowsMaintenanceWindow {
    EndTime: string
    StartTime: string
}

export interface DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttributeMaintenanceWindows {
    MaintenanceWindow: DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttributeMaintenanceWindowsMaintenanceWindow[]
}

export interface DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttribute {
    ActionOnMaintenance: DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttributeActionOnMaintenance
    InstanceId: string
    MaintenanceWindows: DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttributeMaintenanceWindows
    NotifyOnMaintenance: boolean
}

export interface DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributes {
    MaintenanceAttribute: DescribeInstanceMaintenanceAttributesResponseBodyMaintenanceAttributesMaintenanceAttribute[]
}

export interface DescribeInstanceModificationPriceRequestSystemDisk {
    Category: string
}

export interface DescribeInstanceModificationPriceRequestDataDisk {
    Category: string
    PerformanceLevel: string
    Size: number
}

export interface DescribeInstanceModificationPriceResponseBodyPriceInfoPrice {
    Currency: string
    DiscountPrice: number
    OriginalPrice: number
    TradePrice: number
}

export interface DescribeInstanceModificationPriceResponseBodyPriceInfoRulesRule {
    Description: string
    RuleId: number
}

export interface DescribeInstanceModificationPriceResponseBodyPriceInfoRules {
    Rule: DescribeInstanceModificationPriceResponseBodyPriceInfoRulesRule[]
}

export interface DescribeInstanceModificationPriceResponseBodyPriceInfo {
    Price: DescribeInstanceModificationPriceResponseBodyPriceInfoPrice
    Rules: DescribeInstanceModificationPriceResponseBodyPriceInfoRules
}

export interface DescribeInstanceMonitorDataResponseBodyMonitorDataInstanceMonitorData {
    BPSRead: number
    BPSWrite: number
    CPU: number
    CPUAdvanceCreditBalance: number
    CPUCreditBalance: number
    CPUCreditUsage: number
    CPUNotpaidSurplusCreditUsage: number
    IOPSRead: number
    IOPSWrite: number
    InstanceId: string
    InternetBandwidth: number
    InternetRX: number
    InternetTX: number
    IntranetBandwidth: number
    IntranetRX: number
    IntranetTX: number
    TimeStamp: string
}

export interface DescribeInstanceMonitorDataResponseBodyMonitorData {
    InstanceMonitorData: DescribeInstanceMonitorDataResponseBodyMonitorDataInstanceMonitorData[]
}

export interface DescribeInstanceRamRoleResponseBodyInstanceRamRoleSetsInstanceRamRoleSet {
    InstanceId: string
    RamRoleName: string
}

export interface DescribeInstanceRamRoleResponseBodyInstanceRamRoleSets {
    InstanceRamRoleSet: DescribeInstanceRamRoleResponseBodyInstanceRamRoleSetsInstanceRamRoleSet[]
}

export interface DescribeInstanceStatusResponseBodyInstanceStatusesInstanceStatus {
    InstanceId: string
    Status: string
}

export interface DescribeInstanceStatusResponseBodyInstanceStatuses {
    InstanceStatus: DescribeInstanceStatusResponseBodyInstanceStatusesInstanceStatus[]
}

export interface DescribeInstanceTopologyResponseBodyTopologysTopology {
    HostId: string
    InstanceId: string
}

export interface DescribeInstanceTopologyResponseBodyTopologys {
    Topology: DescribeInstanceTopologyResponseBodyTopologysTopology[]
}

export interface DescribeInstanceTypeFamiliesResponseBodyInstanceTypeFamiliesInstanceTypeFamily {
    Generation: string
    InstanceTypeFamilyId: string
}

export interface DescribeInstanceTypeFamiliesResponseBodyInstanceTypeFamilies {
    InstanceTypeFamily: DescribeInstanceTypeFamiliesResponseBodyInstanceTypeFamiliesInstanceTypeFamily[]
}

export interface DescribeInstanceTypesResponseBodyInstanceTypesInstanceTypeNetworkCardsNetworkCardInfo {
    NetworkCardIndex: number
}

export interface DescribeInstanceTypesResponseBodyInstanceTypesInstanceTypeNetworkCards {
    NetworkCardInfo: DescribeInstanceTypesResponseBodyInstanceTypesInstanceTypeNetworkCardsNetworkCardInfo[]
}

export interface DescribeInstanceTypesResponseBodyInstanceTypesInstanceType {
    BaselineCredit: number
    CpuArchitecture: string
    CpuCoreCount: number
    CpuSpeedFrequency: number
    CpuTurboFrequency: number
    DiskQuantity: number
    EniIpv6AddressQuantity: number
    EniPrivateIpAddressQuantity: number
    EniQuantity: number
    EniTotalQuantity: number
    EniTrunkSupported: boolean
    EriQuantity: number
    GPUAmount: number
    GPUMemorySize: number
    GPUSpec: string
    InitialCredit: number
    InstanceBandwidthRx: number
    InstanceBandwidthTx: number
    InstanceCategory: string
    InstanceFamilyLevel: string
    InstancePpsRx: number
    InstancePpsTx: number
    InstanceTypeFamily: string
    InstanceTypeId: string
    LocalStorageAmount: number
    LocalStorageCapacity: number
    LocalStorageCategory: string
    MaximumQueueNumberPerEni: number
    MemorySize: number
    NetworkCardQuantity: number
    NetworkCards: DescribeInstanceTypesResponseBodyInstanceTypesInstanceTypeNetworkCards
    NetworkEncryptionSupport: boolean
    NvmeSupport: string
    PhysicalProcessorModel: string
    PrimaryEniQueueNumber: number
    QueuePairNumber: number
    SecondaryEniQueueNumber: number
    TotalEniQueueQuantity: number
}

export interface DescribeInstanceTypesResponseBodyInstanceTypes {
    InstanceType: DescribeInstanceTypesResponseBodyInstanceTypesInstanceType[]
}

export interface DescribeInstancesRequestFilter {
    Key: string
    Value: string
}

export interface DescribeInstancesRequestTag {
    Key: string
    Value: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceCpuOptions {
    CoreCount: number
    Numa: string
    ThreadsPerCore: number
}

export interface DescribeInstancesResponseBodyInstancesInstanceDedicatedHostAttribute {
    DedicatedHostClusterId: string
    DedicatedHostId: string
    DedicatedHostName: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceDedicatedInstanceAttribute {
    Affinity: string
    Tenancy: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceEcsCapacityReservationAttr {
    CapacityReservationId: string
    CapacityReservationPreference: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceEipAddress {
    AllocationId: string
    Bandwidth: number
    InternetChargeType: string
    IpAddress: string
    IsSupportUnassociate: boolean
}

export interface DescribeInstancesResponseBodyInstancesInstanceHibernationOptions {
    Configured: boolean
}

export interface DescribeInstancesResponseBodyInstancesInstanceImageOptions {
    LoginAsNonRoot: boolean
}

export interface DescribeInstancesResponseBodyInstancesInstanceInnerIpAddress {
    IpAddress: string[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceMetadataOptions {
    HttpEndpoint: string
    HttpPutResponseHopLimit: number
    HttpTokens: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv4PrefixSetsIpv4PrefixSet {
    Ipv4Prefix: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv4PrefixSets {
    Ipv4PrefixSet: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv4PrefixSetsIpv4PrefixSet[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv6PrefixSetsIpv6PrefixSet {
    Ipv6Prefix: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv6PrefixSets {
    Ipv6PrefixSet: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv6PrefixSetsIpv6PrefixSet[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv6SetsIpv6Set {
    Ipv6Address: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv6Sets {
    Ipv6Set: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv6SetsIpv6Set[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfacePrivateIpSetsPrivateIpSet {
    Primary: boolean
    PrivateIpAddress: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfacePrivateIpSets {
    PrivateIpSet: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfacePrivateIpSetsPrivateIpSet[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterface {
    Ipv4PrefixSets: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv4PrefixSets
    Ipv6PrefixSets: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv6PrefixSets
    Ipv6Sets: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfaceIpv6Sets
    MacAddress: string
    NetworkInterfaceId: string
    PrimaryIpAddress: string
    PrivateIpSets: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterfacePrivateIpSets
    Type: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceNetworkInterfaces {
    NetworkInterface: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfacesNetworkInterface[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceOperationLocksLockReason {
    LockMsg: string
    LockReason: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceOperationLocks {
    LockReason: DescribeInstancesResponseBodyInstancesInstanceOperationLocksLockReason[]
}

export interface DescribeInstancesResponseBodyInstancesInstancePublicIpAddress {
    IpAddress: string[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceRdmaIpAddress {
    IpAddress: string[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceSecurityGroupIds {
    SecurityGroupId: string[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeInstancesResponseBodyInstancesInstanceTags {
    Tag: DescribeInstancesResponseBodyInstancesInstanceTagsTag[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceVpcAttributesPrivateIpAddress {
    IpAddress: string[]
}

export interface DescribeInstancesResponseBodyInstancesInstanceVpcAttributes {
    NatIpAddress: string
    PrivateIpAddress: DescribeInstancesResponseBodyInstancesInstanceVpcAttributesPrivateIpAddress
    VSwitchId: string
    VpcId: string
}

export interface DescribeInstancesResponseBodyInstancesInstance {
    AutoReleaseTime: string
    ClusterId: string
    Cpu: number
    CpuOptions: DescribeInstancesResponseBodyInstancesInstanceCpuOptions
    CreationTime: string
    CreditSpecification: string
    DedicatedHostAttribute: DescribeInstancesResponseBodyInstancesInstanceDedicatedHostAttribute
    DedicatedInstanceAttribute: DescribeInstancesResponseBodyInstancesInstanceDedicatedInstanceAttribute
    DeletionProtection: boolean
    DeploymentSetGroupNo: number
    DeploymentSetId: string
    Description: string
    DeviceAvailable: boolean
    EcsCapacityReservationAttr: DescribeInstancesResponseBodyInstancesInstanceEcsCapacityReservationAttr
    EipAddress: DescribeInstancesResponseBodyInstancesInstanceEipAddress
    ExpiredTime: string
    GPUAmount: number
    GPUSpec: string
    HibernationOptions: DescribeInstancesResponseBodyInstancesInstanceHibernationOptions
    HostName: string
    HpcClusterId: string
    ISP: string
    ImageId: string
    ImageOptions: DescribeInstancesResponseBodyInstancesInstanceImageOptions
    InnerIpAddress: DescribeInstancesResponseBodyInstancesInstanceInnerIpAddress
    InstanceChargeType: string
    InstanceId: string
    InstanceName: string
    InstanceNetworkType: string
    InstanceType: string
    InstanceTypeFamily: string
    InternetChargeType: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    IoOptimized: boolean
    KeyPairName: string
    LocalStorageAmount: number
    LocalStorageCapacity: number
    Memory: number
    MetadataOptions: DescribeInstancesResponseBodyInstancesInstanceMetadataOptions
    NetworkInterfaces: DescribeInstancesResponseBodyInstancesInstanceNetworkInterfaces
    OSName: string
    OSNameEn: string
    OSType: string
    OperationLocks: DescribeInstancesResponseBodyInstancesInstanceOperationLocks
    PublicIpAddress: DescribeInstancesResponseBodyInstancesInstancePublicIpAddress
    RdmaIpAddress: DescribeInstancesResponseBodyInstancesInstanceRdmaIpAddress
    Recyclable: boolean
    RegionId: string
    ResourceGroupId: string
    SaleCycle: string
    SecurityGroupIds: DescribeInstancesResponseBodyInstancesInstanceSecurityGroupIds
    SerialNumber: string
    SpotDuration: number
    SpotPriceLimit: number
    SpotStrategy: string
    StartTime: string
    Status: string
    StoppedMode: string
    Tags: DescribeInstancesResponseBodyInstancesInstanceTags
    VlanId: string
    VpcAttributes: DescribeInstancesResponseBodyInstancesInstanceVpcAttributes
    ZoneId: string
}

export interface DescribeInstancesResponseBodyInstances {
    Instance: DescribeInstancesResponseBodyInstancesInstance[]
}

export interface DescribeInstancesFullStatusRequestEventPublishTime {
    End: string
    Start: string
}

export interface DescribeInstancesFullStatusRequestNotBefore {
    End: string
    Start: string
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeHealthStatus {
    Code: number
    Name: string
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeEventCycleStatus {
    Code: number
    Name: string
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeEventType {
    Code: number
    Name: string
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeExtendedAttributeInactiveDisksInactiveDisk {
    CreationTime: string
    DeviceCategory: string
    DeviceSize: string
    DeviceType: string
    ReleaseTime: string
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeExtendedAttributeInactiveDisks {
    InactiveDisk: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeExtendedAttributeInactiveDisksInactiveDisk[]
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeExtendedAttribute {
    Device: string
    DiskId: string
    InactiveDisks: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeExtendedAttributeInactiveDisks
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventType {
    EventCycleStatus: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeEventCycleStatus
    EventId: string
    EventPublishTime: string
    EventType: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeEventType
    ExtendedAttribute: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventTypeExtendedAttribute
    ImpactLevel: string
    NotBefore: string
    Reason: string
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSet {
    ScheduledSystemEventType: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSetScheduledSystemEventType[]
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeStatus {
    Code: number
    Name: string
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusType {
    HealthStatus: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeHealthStatus
    InstanceId: string
    ScheduledSystemEventSet: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeScheduledSystemEventSet
    Status: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusTypeStatus
}

export interface DescribeInstancesFullStatusResponseBodyInstanceFullStatusSet {
    InstanceFullStatusType: DescribeInstancesFullStatusResponseBodyInstanceFullStatusSetInstanceFullStatusType[]
}

export interface DescribeInvocationResultsRequestTag {
    Key: string
    Value: string
}

export interface DescribeInvocationResultsResponseBodyInvocationInvocationResultsInvocationResultTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeInvocationResultsResponseBodyInvocationInvocationResultsInvocationResultTags {
    Tag: DescribeInvocationResultsResponseBodyInvocationInvocationResultsInvocationResultTagsTag[]
}

export interface DescribeInvocationResultsResponseBodyInvocationInvocationResultsInvocationResult {
    CommandId: string
    ContainerId: string
    ContainerName: string
    Dropped: number
    ErrorCode: string
    ErrorInfo: string
    ExitCode: number
    FinishedTime: string
    InstanceId: string
    InvocationStatus: string
    InvokeId: string
    InvokeRecordStatus: string
    Output: string
    Repeats: number
    StartTime: string
    StopTime: string
    Tags: DescribeInvocationResultsResponseBodyInvocationInvocationResultsInvocationResultTags
    Username: string
}

export interface DescribeInvocationResultsResponseBodyInvocationInvocationResults {
    InvocationResult: DescribeInvocationResultsResponseBodyInvocationInvocationResultsInvocationResult[]
}

export interface DescribeInvocationResultsResponseBodyInvocation {
    InvocationResults: DescribeInvocationResultsResponseBodyInvocationInvocationResults
    PageNumber: number
    PageSize: number
    TotalCount: number
}

export interface DescribeInvocationsRequestTag {
    Key: string
    Value: string
}

export interface DescribeInvocationsResponseBodyInvocationsInvocationInvokeInstancesInvokeInstance {
    CreationTime: string
    Dropped: number
    ErrorCode: string
    ErrorInfo: string
    ExitCode: number
    FinishTime: string
    InstanceId: string
    InstanceInvokeStatus: string
    InvocationStatus: string
    Output: string
    Repeats: number
    StartTime: string
    StopTime: string
    Timed: boolean
    UpdateTime: string
}

export interface DescribeInvocationsResponseBodyInvocationsInvocationInvokeInstances {
    InvokeInstance: DescribeInvocationsResponseBodyInvocationsInvocationInvokeInstancesInvokeInstance[]
}

export interface DescribeInvocationsResponseBodyInvocationsInvocationTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeInvocationsResponseBodyInvocationsInvocationTags {
    Tag: DescribeInvocationsResponseBodyInvocationsInvocationTagsTag[]
}

export interface DescribeInvocationsResponseBodyInvocationsInvocation {
    CommandContent: string
    CommandDescription: string
    CommandId: string
    CommandName: string
    CommandType: string
    ContainerId: string
    ContainerName: string
    CreationTime: string
    Frequency: string
    InvocationStatus: string
    InvokeId: string
    InvokeInstances: DescribeInvocationsResponseBodyInvocationsInvocationInvokeInstances
    InvokeStatus: string
    Parameters: string
    RepeatMode: string
    Tags: DescribeInvocationsResponseBodyInvocationsInvocationTags
    Timed: boolean
    Timeout: number
    Username: string
    WorkingDir: string
}

export interface DescribeInvocationsResponseBodyInvocations {
    Invocation: DescribeInvocationsResponseBodyInvocationsInvocation[]
}

export interface DescribeKeyPairsRequestTag {
    Key: string
    Value: string
}

export interface DescribeKeyPairsResponseBodyKeyPairsKeyPairTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeKeyPairsResponseBodyKeyPairsKeyPairTags {
    Tag: DescribeKeyPairsResponseBodyKeyPairsKeyPairTagsTag[]
}

export interface DescribeKeyPairsResponseBodyKeyPairsKeyPair {
    CreationTime: string
    KeyPairFingerPrint: string
    KeyPairName: string
    ResourceGroupId: string
    Tags: DescribeKeyPairsResponseBodyKeyPairsKeyPairTags
}

export interface DescribeKeyPairsResponseBodyKeyPairs {
    KeyPair: DescribeKeyPairsResponseBodyKeyPairsKeyPair[]
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataSystemDisk {
    AutoSnapshotPolicyId: string
    BurstingEnabled: boolean
    Category: string
    DeleteWithInstance: boolean
    Description: string
    DiskName: string
    Encrypted: string
    Iops: number
    PerformanceLevel: string
    ProvisionedIops: number
    Size: number
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataDataDisksDataDisk {
    AutoSnapshotPolicyId: string
    BurstingEnabled: boolean
    Category: string
    DeleteWithInstance: boolean
    Description: string
    Device: string
    DiskName: string
    Encrypted: string
    PerformanceLevel: string
    ProvisionedIops: number
    Size: number
    SnapshotId: string
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataDataDisks {
    DataDisk: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataDataDisksDataDisk[]
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataNetworkInterfacesNetworkInterfaceSecurityGroupIds {
    SecurityGroupId: string[]
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataNetworkInterfacesNetworkInterface {
    Description: string
    InstanceType: string
    NetworkInterfaceName: string
    NetworkInterfaceTrafficMode: string
    PrimaryIpAddress: string
    SecurityGroupId: string
    SecurityGroupIds: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataNetworkInterfacesNetworkInterfaceSecurityGroupIds
    VSwitchId: string
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataNetworkInterfaces {
    NetworkInterface: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataNetworkInterfacesNetworkInterface[]
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataSecurityGroupIds {
    SecurityGroupId: string[]
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataTagsInstanceTag {
    Key: string
    Value: string
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataTags {
    InstanceTag: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataTagsInstanceTag[]
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateData {
    SystemDisk: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataSystemDisk
    AutoReleaseTime: string
    DataDisks: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataDataDisks
    DeploymentSetId: string
    Description: string
    EnableVmOsConfig: boolean
    HostName: string
    ImageId: string
    ImageOwnerAlias: string
    InstanceChargeType: string
    InstanceName: string
    InstanceType: string
    InternetChargeType: string
    InternetMaxBandwidthIn: number
    InternetMaxBandwidthOut: number
    IoOptimized: string
    Ipv6AddressCount: number
    KeyPairName: string
    NetworkInterfaces: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataNetworkInterfaces
    NetworkType: string
    PasswordInherit: boolean
    Period: number
    PrivateIpAddress: string
    RamRoleName: string
    ResourceGroupId: string
    SecurityEnhancementStrategy: string
    SecurityGroupId: string
    SecurityGroupIds: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataSecurityGroupIds
    SpotDuration: number
    SpotPriceLimit: number
    SpotStrategy: string
    Tags: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateDataTags
    UserData: string
    VSwitchId: string
    VpcId: string
    ZoneId: string
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSet {
    CreateTime: string
    CreatedBy: string
    DefaultVersion: boolean
    LaunchTemplateData: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSetLaunchTemplateData
    LaunchTemplateId: string
    LaunchTemplateName: string
    ModifiedTime: string
    VersionDescription: string
    VersionNumber: number
}

export interface DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSets {
    LaunchTemplateVersionSet: DescribeLaunchTemplateVersionsResponseBodyLaunchTemplateVersionSetsLaunchTemplateVersionSet[]
}

export interface DescribeLaunchTemplatesRequestTemplateTag {
    Key: string
    Value: string
}

export interface DescribeLaunchTemplatesResponseBodyLaunchTemplateSetsLaunchTemplateSetTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeLaunchTemplatesResponseBodyLaunchTemplateSetsLaunchTemplateSetTags {
    Tag: DescribeLaunchTemplatesResponseBodyLaunchTemplateSetsLaunchTemplateSetTagsTag[]
}

export interface DescribeLaunchTemplatesResponseBodyLaunchTemplateSetsLaunchTemplateSet {
    CreateTime: string
    CreatedBy: string
    DefaultVersionNumber: number
    LatestVersionNumber: number
    LaunchTemplateId: string
    LaunchTemplateName: string
    ModifiedTime: string
    ResourceGroupId: string
    Tags: DescribeLaunchTemplatesResponseBodyLaunchTemplateSetsLaunchTemplateSetTags
}

export interface DescribeLaunchTemplatesResponseBodyLaunchTemplateSets {
    LaunchTemplateSet: DescribeLaunchTemplatesResponseBodyLaunchTemplateSetsLaunchTemplateSet[]
}

export interface DescribeManagedInstancesRequestTag {
    Key: string
    Value: string
}

export interface DescribeManagedInstancesResponseBodyInstancesTags {
    TagKey: string
    TagValue: string
}

export interface DescribeManagedInstancesResponseBodyInstances {
    ActivationId: string
    AgentVersion: string
    Connected: boolean
    Hostname: string
    InstanceId: string
    InstanceName: string
    InternetIp: string
    IntranetIp: string
    InvocationCount: number
    LastInvokedTime: string
    MachineId: string
    OsType: string
    OsVersion: string
    RegistrationTime: string
    Tags: DescribeManagedInstancesResponseBodyInstancesTags[]
}

export interface DescribeNatGatewaysResponseBodyNatGatewaysNatGatewayBandwidthPackageIds {
    BandwidthPackageId: string[]
}

export interface DescribeNatGatewaysResponseBodyNatGatewaysNatGatewayForwardTableIds {
    ForwardTableId: string[]
}

export interface DescribeNatGatewaysResponseBodyNatGatewaysNatGateway {
    BandwidthPackageIds: DescribeNatGatewaysResponseBodyNatGatewaysNatGatewayBandwidthPackageIds
    BusinessStatus: string
    CreationTime: string
    Description: string
    ForwardTableIds: DescribeNatGatewaysResponseBodyNatGatewaysNatGatewayForwardTableIds
    InstanceChargeType: string
    Name: string
    NatGatewayId: string
    RegionId: string
    Spec: string
    Status: string
    VpcId: string
}

export interface DescribeNatGatewaysResponseBodyNatGateways {
    NatGateway: DescribeNatGatewaysResponseBodyNatGatewaysNatGateway[]
}

export interface DescribeNetworkInterfaceAttributeRequestTag {
    Key: string
    Value: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyAssociatedPublicIp {
    AllocationId: string
    PublicIpAddress: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyAttachmentMemberNetworkInterfaceIds {
    MemberNetworkInterfaceId: string[]
}

export interface DescribeNetworkInterfaceAttributeResponseBodyAttachment {
    DeviceIndex: number
    InstanceId: string
    MemberNetworkInterfaceIds: DescribeNetworkInterfaceAttributeResponseBodyAttachmentMemberNetworkInterfaceIds
    NetworkCardIndex: number
    TrunkNetworkInterfaceId: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyBondInterfaceSpecificationSlaveInterfaceSpecificationSlaveInterfaceSpecificationSet {
    BondNetworkInterfaceId: string
    SlaveNetworkInterfaceId: string
    WorkState: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyBondInterfaceSpecificationSlaveInterfaceSpecification {
    SlaveInterfaceSpecificationSet: DescribeNetworkInterfaceAttributeResponseBodyBondInterfaceSpecificationSlaveInterfaceSpecificationSlaveInterfaceSpecificationSet[]
}

export interface DescribeNetworkInterfaceAttributeResponseBodyBondInterfaceSpecification {
    BondMode: string
    SlaveInterfaceSpecification: DescribeNetworkInterfaceAttributeResponseBodyBondInterfaceSpecificationSlaveInterfaceSpecification
}

export interface DescribeNetworkInterfaceAttributeResponseBodyIpv4PrefixSetsIpv4PrefixSet {
    Ipv4Prefix: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyIpv4PrefixSets {
    Ipv4PrefixSet: DescribeNetworkInterfaceAttributeResponseBodyIpv4PrefixSetsIpv4PrefixSet[]
}

export interface DescribeNetworkInterfaceAttributeResponseBodyIpv6PrefixSetsIpv6PrefixSet {
    Ipv6Prefix: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyIpv6PrefixSets {
    Ipv6PrefixSet: DescribeNetworkInterfaceAttributeResponseBodyIpv6PrefixSetsIpv6PrefixSet[]
}

export interface DescribeNetworkInterfaceAttributeResponseBodyIpv6SetsIpv6Set {
    Ipv6Address: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyIpv6Sets {
    Ipv6Set: DescribeNetworkInterfaceAttributeResponseBodyIpv6SetsIpv6Set[]
}

export interface DescribeNetworkInterfaceAttributeResponseBodyPrivateIpSetsPrivateIpSetAssociatedPublicIp {
    AllocationId: string
    PublicIpAddress: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyPrivateIpSetsPrivateIpSet {
    AssociatedPublicIp: DescribeNetworkInterfaceAttributeResponseBodyPrivateIpSetsPrivateIpSetAssociatedPublicIp
    Primary: boolean
    PrivateIpAddress: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyPrivateIpSets {
    PrivateIpSet: DescribeNetworkInterfaceAttributeResponseBodyPrivateIpSetsPrivateIpSet[]
}

export interface DescribeNetworkInterfaceAttributeResponseBodySecurityGroupIds {
    SecurityGroupId: string[]
}

export interface DescribeNetworkInterfaceAttributeResponseBodySlaveInterfaceSpecification {
    BondNetworkInterfaceId: string
    SlaveNetworkInterfaceId: string
    WorkState: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeNetworkInterfaceAttributeResponseBodyTags {
    Tag: DescribeNetworkInterfaceAttributeResponseBodyTagsTag[]
}

export interface DescribeNetworkInterfacePermissionsResponseBodyNetworkInterfacePermissionsNetworkInterfacePermission {
    AccountId: number
    NetworkInterfaceId: string
    NetworkInterfacePermissionId: string
    Permission: string
    PermissionState: string
    ServiceName: string
}

export interface DescribeNetworkInterfacePermissionsResponseBodyNetworkInterfacePermissions {
    NetworkInterfacePermission: DescribeNetworkInterfacePermissionsResponseBodyNetworkInterfacePermissionsNetworkInterfacePermission[]
}

export interface DescribeNetworkInterfacesRequestTag {
    Key: string
    Value: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetAssociatedPublicIp {
    AllocationId: string
    PublicIpAddress: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetAttachment {
    DeviceIndex: number
    InstanceId: string
    NetworkCardIndex: number
    TrunkNetworkInterfaceId: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv4PrefixSetsIpv4PrefixSet {
    Ipv4Prefix: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv4PrefixSets {
    Ipv4PrefixSet: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv4PrefixSetsIpv4PrefixSet[]
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv6PrefixSetsIpv6PrefixSet {
    Ipv6Prefix: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv6PrefixSets {
    Ipv6PrefixSet: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv6PrefixSetsIpv6PrefixSet[]
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv6SetsIpv6Set {
    Ipv6Address: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv6Sets {
    Ipv6Set: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv6SetsIpv6Set[]
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetPrivateIpSetsPrivateIpSetAssociatedPublicIp {
    AllocationId: string
    PublicIpAddress: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetPrivateIpSetsPrivateIpSet {
    AssociatedPublicIp: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetPrivateIpSetsPrivateIpSetAssociatedPublicIp
    Primary: boolean
    PrivateIpAddress: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetPrivateIpSets {
    PrivateIpSet: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetPrivateIpSetsPrivateIpSet[]
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetSecurityGroupIds {
    SecurityGroupId: string[]
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetTags {
    Tag: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetTagsTag[]
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSet {
    AssociatedPublicIp: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetAssociatedPublicIp
    Attachment: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetAttachment
    CreationTime: string
    Description: string
    InstanceId: string
    Ipv4PrefixSets: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv4PrefixSets
    Ipv6PrefixSets: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv6PrefixSets
    Ipv6Sets: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetIpv6Sets
    MacAddress: string
    NetworkInterfaceId: string
    NetworkInterfaceName: string
    NetworkInterfaceTrafficMode: string
    OwnerId: string
    PrivateIpAddress: string
    PrivateIpSets: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetPrivateIpSets
    QueueNumber: number
    QueuePairNumber: number
    ResourceGroupId: string
    SecurityGroupIds: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetSecurityGroupIds
    ServiceID: number
    ServiceManaged: boolean
    Status: string
    Tags: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSetTags
    Type: string
    VSwitchId: string
    VpcId: string
    ZoneId: string
}

export interface DescribeNetworkInterfacesResponseBodyNetworkInterfaceSets {
    NetworkInterfaceSet: DescribeNetworkInterfacesResponseBodyNetworkInterfaceSetsNetworkInterfaceSet[]
}

export interface DescribeNewProjectEipMonitorDataResponseBodyEipMonitorDatasEipMonitorData {
    EipBandwidth: number
    EipFlow: number
    EipPackets: number
    EipRX: number
    EipTX: number
    TimeStamp: string
}

export interface DescribeNewProjectEipMonitorDataResponseBodyEipMonitorDatas {
    EipMonitorData: DescribeNewProjectEipMonitorDataResponseBodyEipMonitorDatasEipMonitorData[]
}

export interface DescribePhysicalConnectionsRequestFilter {
    Key: string
    Value: string[]
}

export interface DescribePhysicalConnectionsResponseBodyPhysicalConnectionSetPhysicalConnectionType {
    AccessPointId: string
    AdLocation: string
    Bandwidth: number
    BusinessStatus: string
    CircuitCode: string
    CreationTime: string
    Description: string
    EnabledTime: string
    LineOperator: string
    Name: string
    PeerLocation: string
    PhysicalConnectionId: string
    PortNumber: string
    PortType: string
    RedundantPhysicalConnectionId: string
    Spec: string
    Status: string
    Type: string
}

export interface DescribePhysicalConnectionsResponseBodyPhysicalConnectionSet {
    PhysicalConnectionType: DescribePhysicalConnectionsResponseBodyPhysicalConnectionSetPhysicalConnectionType[]
}

export interface DescribePrefixListAssociationsResponseBodyPrefixListAssociationsPrefixListAssociation {
    ResourceId: string
    ResourceType: string
}

export interface DescribePrefixListAssociationsResponseBodyPrefixListAssociations {
    PrefixListAssociation: DescribePrefixListAssociationsResponseBodyPrefixListAssociationsPrefixListAssociation[]
}

export interface DescribePrefixListAttributesResponseBodyEntriesEntry {
    Cidr: string
    Description: string
}

export interface DescribePrefixListAttributesResponseBodyEntries {
    Entry: DescribePrefixListAttributesResponseBodyEntriesEntry[]
}

export interface DescribePrefixListsResponseBodyPrefixListsPrefixList {
    AddressFamily: string
    AssociationCount: number
    CreationTime: string
    Description: string
    MaxEntries: number
    PrefixListId: string
    PrefixListName: string
}

export interface DescribePrefixListsResponseBodyPrefixLists {
    PrefixList: DescribePrefixListsResponseBodyPrefixListsPrefixList[]
}

export interface DescribePriceRequestDataDisk {
    Category: string
    PerformanceLevel: string
    Size: number
}

export interface DescribePriceRequestSchedulerOptions {
    DedicatedHostId: string
}

export interface DescribePriceRequestSystemDisk {
    Category: string
    PerformanceLevel: string
    Size: number
}

export interface DescribePriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModelSubRulesRule {
    Description: string
    RuleId: number
}

export interface DescribePriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModelSubRules {
    Rule: DescribePriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModelSubRulesRule[]
}

export interface DescribePriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModel {
    DiscountPrice: number
    OriginalPrice: number
    Resource: string
    SubRules: DescribePriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModelSubRules
    TradePrice: number
}

export interface DescribePriceResponseBodyPriceInfoPriceDetailInfos {
    ResourcePriceModel: DescribePriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModel[]
}

export interface DescribePriceResponseBodyPriceInfoPrice {
    Currency: string
    DetailInfos: DescribePriceResponseBodyPriceInfoPriceDetailInfos
    DiscountPrice: number
    OriginalPrice: number
    ReservedInstanceHourPrice: number
    TradePrice: number
}

export interface DescribePriceResponseBodyPriceInfoRulesRule {
    Description: string
    RuleId: number
}

export interface DescribePriceResponseBodyPriceInfoRules {
    Rule: DescribePriceResponseBodyPriceInfoRulesRule[]
}

export interface DescribePriceResponseBodyPriceInfo {
    Price: DescribePriceResponseBodyPriceInfoPrice
    Rules: DescribePriceResponseBodyPriceInfoRules
}

export interface DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceTypeInstanceType {
    Cores: number
    Generation: string
    InstanceType: string
    InstanceTypeFamily: string
    Memory: number
    SupportIoOptimized: string
}

export interface DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceTypeZonesZoneNetworkTypes {
    NetworkType: string[]
}

export interface DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceTypeZonesZone {
    NetworkTypes: DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceTypeZonesZoneNetworkTypes
    ZoneNo: string
}

export interface DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceTypeZones {
    Zone: DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceTypeZonesZone[]
}

export interface DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceType {
    CommodityCode: string
    InstanceChargeType: string
    InstanceType: DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceTypeInstanceType
    NetworkType: string
    Priority: number
    RegionId: string
    Scene: string
    SpotStrategy: string
    ZoneId: string
    Zones: DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceTypeZones
}

export interface DescribeRecommendInstanceTypeResponseBodyData {
    RecommendInstanceType: DescribeRecommendInstanceTypeResponseBodyDataRecommendInstanceType[]
}

export interface DescribeRegionsResponseBodyRegionsRegion {
    LocalName: string
    RegionEndpoint: string
    RegionId: string
    Status: string
}

export interface DescribeRegionsResponseBodyRegions {
    Region: DescribeRegionsResponseBodyRegionsRegion[]
}

export interface DescribeRenewalPriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModelSubRulesRule {
    Description: string
    RuleId: number
}

export interface DescribeRenewalPriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModelSubRules {
    Rule: DescribeRenewalPriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModelSubRulesRule[]
}

export interface DescribeRenewalPriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModel {
    DiscountPrice: number
    OriginalPrice: number
    Resource: string
    SubRules: DescribeRenewalPriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModelSubRules
    TradePrice: number
}

export interface DescribeRenewalPriceResponseBodyPriceInfoPriceDetailInfos {
    ResourcePriceModel: DescribeRenewalPriceResponseBodyPriceInfoPriceDetailInfosResourcePriceModel[]
}

export interface DescribeRenewalPriceResponseBodyPriceInfoPrice {
    Currency: string
    DetailInfos: DescribeRenewalPriceResponseBodyPriceInfoPriceDetailInfos
    DiscountPrice: number
    OriginalPrice: number
    TradePrice: number
}

export interface DescribeRenewalPriceResponseBodyPriceInfoRulesRule {
    Description: string
    RuleId: number
}

export interface DescribeRenewalPriceResponseBodyPriceInfoRules {
    Rule: DescribeRenewalPriceResponseBodyPriceInfoRulesRule[]
}

export interface DescribeRenewalPriceResponseBodyPriceInfo {
    Price: DescribeRenewalPriceResponseBodyPriceInfoPrice
    Rules: DescribeRenewalPriceResponseBodyPriceInfoRules
}

export interface DescribeReservedInstanceAutoRenewAttributeResponseBodyReservedInstanceRenewAttributesReservedInstanceRenewAttribute {
    Duration: number
    PeriodUnit: string
    RenewalStatus: string
    ReservedInstanceId: string
}

export interface DescribeReservedInstanceAutoRenewAttributeResponseBodyReservedInstanceRenewAttributes {
    ReservedInstanceRenewAttribute: DescribeReservedInstanceAutoRenewAttributeResponseBodyReservedInstanceRenewAttributesReservedInstanceRenewAttribute[]
}

export interface DescribeReservedInstancesRequestTag {
    Key: string
    Value: string
}

export interface DescribeReservedInstancesResponseBodyReservedInstancesReservedInstanceOperationLocksOperationLock {
    LockReason: string
}

export interface DescribeReservedInstancesResponseBodyReservedInstancesReservedInstanceOperationLocks {
    OperationLock: DescribeReservedInstancesResponseBodyReservedInstancesReservedInstanceOperationLocksOperationLock[]
}

export interface DescribeReservedInstancesResponseBodyReservedInstancesReservedInstanceTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeReservedInstancesResponseBodyReservedInstancesReservedInstanceTags {
    Tag: DescribeReservedInstancesResponseBodyReservedInstancesReservedInstanceTagsTag[]
}

export interface DescribeReservedInstancesResponseBodyReservedInstancesReservedInstance {
    AllocationStatus: string
    CreationTime: string
    Description: string
    ExpiredTime: string
    InstanceAmount: number
    InstanceType: string
    OfferingType: string
    OperationLocks: DescribeReservedInstancesResponseBodyReservedInstancesReservedInstanceOperationLocks
    Platform: string
    RegionId: string
    ReservedInstanceId: string
    ReservedInstanceName: string
    ResourceGroupId: string
    Scope: string
    StartTime: string
    Status: string
    Tags: DescribeReservedInstancesResponseBodyReservedInstancesReservedInstanceTags
    ZoneId: string
}

export interface DescribeReservedInstancesResponseBodyReservedInstances {
    ReservedInstance: DescribeReservedInstancesResponseBodyReservedInstancesReservedInstance[]
}

export interface DescribeResourceByTagsRequestTag {
    Key: string
    Value: string
}

export interface DescribeResourceByTagsResponseBodyResourcesResource {
    RegionId: string
    ResourceId: string
    ResourceType: string
}

export interface DescribeResourceByTagsResponseBodyResources {
    Resource: DescribeResourceByTagsResponseBodyResourcesResource[]
}

export interface DescribeResourcesModificationResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResourceSupportedResourcesSupportedResource {
    Max: number
    Min: number
    Status: string
    StatusCategory: string
    Unit: string
    Value: string
}

export interface DescribeResourcesModificationResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResourceSupportedResources {
    SupportedResource: DescribeResourcesModificationResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResourceSupportedResourcesSupportedResource[]
}

export interface DescribeResourcesModificationResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResource {
    SupportedResources: DescribeResourcesModificationResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResourceSupportedResources
    Type: string
}

export interface DescribeResourcesModificationResponseBodyAvailableZonesAvailableZoneAvailableResources {
    AvailableResource: DescribeResourcesModificationResponseBodyAvailableZonesAvailableZoneAvailableResourcesAvailableResource[]
}

export interface DescribeResourcesModificationResponseBodyAvailableZonesAvailableZone {
    AvailableResources: DescribeResourcesModificationResponseBodyAvailableZonesAvailableZoneAvailableResources
    RegionId: string
    Status: string
    StatusCategory: string
    ZoneId: string
}

export interface DescribeResourcesModificationResponseBodyAvailableZones {
    AvailableZone: DescribeResourcesModificationResponseBodyAvailableZonesAvailableZone[]
}

export interface DescribeRouteTablesResponseBodyRouteTablesRouteTableRouteEntrysRouteEntryNextHopsNextHop {
    Enabled: number
    NextHopId: string
    NextHopType: string
    Weight: number
}

export interface DescribeRouteTablesResponseBodyRouteTablesRouteTableRouteEntrysRouteEntryNextHops {
    NextHop: DescribeRouteTablesResponseBodyRouteTablesRouteTableRouteEntrysRouteEntryNextHopsNextHop[]
}

export interface DescribeRouteTablesResponseBodyRouteTablesRouteTableRouteEntrysRouteEntry {
    DestinationCidrBlock: string
    InstanceId: string
    NextHopType: string
    NextHops: DescribeRouteTablesResponseBodyRouteTablesRouteTableRouteEntrysRouteEntryNextHops
    RouteTableId: string
    Status: string
    Type: string
}

export interface DescribeRouteTablesResponseBodyRouteTablesRouteTableRouteEntrys {
    RouteEntry: DescribeRouteTablesResponseBodyRouteTablesRouteTableRouteEntrysRouteEntry[]
}

export interface DescribeRouteTablesResponseBodyRouteTablesRouteTable {
    CreationTime: string
    ResourceGroupId: string
    RouteEntrys: DescribeRouteTablesResponseBodyRouteTablesRouteTableRouteEntrys
    RouteTableId: string
    RouteTableType: string
    VRouterId: string
}

export interface DescribeRouteTablesResponseBodyRouteTables {
    RouteTable: DescribeRouteTablesResponseBodyRouteTablesRouteTable[]
}

export interface DescribeRouterInterfacesRequestFilter {
    Key: string
    Value: string[]
}

export interface DescribeRouterInterfacesResponseBodyRouterInterfaceSetRouterInterfaceType {
    AccessPointId: string
    BusinessStatus: string
    ChargeType: string
    ConnectedTime: string
    CreationTime: string
    Description: string
    EndTime: string
    HealthCheckSourceIp: string
    HealthCheckTargetIp: string
    Name: string
    OppositeAccessPointId: string
    OppositeInterfaceBusinessStatus: string
    OppositeInterfaceId: string
    OppositeInterfaceOwnerId: string
    OppositeInterfaceSpec: string
    OppositeInterfaceStatus: string
    OppositeRegionId: string
    OppositeRouterId: string
    OppositeRouterType: string
    Role: string
    RouterId: string
    RouterInterfaceId: string
    RouterType: string
    Spec: string
    Status: string
}

export interface DescribeRouterInterfacesResponseBodyRouterInterfaceSet {
    RouterInterfaceType: DescribeRouterInterfacesResponseBodyRouterInterfaceSetRouterInterfaceType[]
}

export interface DescribeSecurityGroupAttributeResponseBodyPermissionsPermission {
    CreateTime: string
    Description: string
    DestCidrIp: string
    DestGroupId: string
    DestGroupName: string
    DestGroupOwnerAccount: string
    DestPrefixListId: string
    DestPrefixListName: string
    Direction: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    Policy: string
    PortRange: string
    Priority: string
    SecurityGroupRuleId: string
    SourceCidrIp: string
    SourceGroupId: string
    SourceGroupName: string
    SourceGroupOwnerAccount: string
    SourcePortRange: string
    SourcePrefixListId: string
    SourcePrefixListName: string
}

export interface DescribeSecurityGroupAttributeResponseBodyPermissions {
    Permission: DescribeSecurityGroupAttributeResponseBodyPermissionsPermission[]
}

export interface DescribeSecurityGroupReferencesResponseBodySecurityGroupReferencesSecurityGroupReferenceReferencingSecurityGroupsReferencingSecurityGroup {
    AliUid: string
    SecurityGroupId: string
}

export interface DescribeSecurityGroupReferencesResponseBodySecurityGroupReferencesSecurityGroupReferenceReferencingSecurityGroups {
    ReferencingSecurityGroup: DescribeSecurityGroupReferencesResponseBodySecurityGroupReferencesSecurityGroupReferenceReferencingSecurityGroupsReferencingSecurityGroup[]
}

export interface DescribeSecurityGroupReferencesResponseBodySecurityGroupReferencesSecurityGroupReference {
    ReferencingSecurityGroups: DescribeSecurityGroupReferencesResponseBodySecurityGroupReferencesSecurityGroupReferenceReferencingSecurityGroups
    SecurityGroupId: string
}

export interface DescribeSecurityGroupReferencesResponseBodySecurityGroupReferences {
    SecurityGroupReference: DescribeSecurityGroupReferencesResponseBodySecurityGroupReferencesSecurityGroupReference[]
}

export interface DescribeSecurityGroupsRequestTag {
    Key: string
    Value: string
}

export interface DescribeSecurityGroupsResponseBodySecurityGroupsSecurityGroupTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeSecurityGroupsResponseBodySecurityGroupsSecurityGroupTags {
    Tag: DescribeSecurityGroupsResponseBodySecurityGroupsSecurityGroupTagsTag[]
}

export interface DescribeSecurityGroupsResponseBodySecurityGroupsSecurityGroup {
    AvailableInstanceAmount: number
    CreationTime: string
    Description: string
    EcsCount: number
    ResourceGroupId: string
    SecurityGroupId: string
    SecurityGroupName: string
    SecurityGroupType: string
    ServiceID: number
    ServiceManaged: boolean
    Tags: DescribeSecurityGroupsResponseBodySecurityGroupsSecurityGroupTags
    VpcId: string
}

export interface DescribeSecurityGroupsResponseBodySecurityGroups {
    SecurityGroup: DescribeSecurityGroupsResponseBodySecurityGroupsSecurityGroup[]
}

export interface DescribeSendFileResultsRequestTag {
    Key: string
    Value: string
}

export interface DescribeSendFileResultsResponseBodyInvocationsInvocationInvokeInstancesInvokeInstance {
    CreationTime: string
    ErrorCode: string
    ErrorInfo: string
    FinishTime: string
    InstanceId: string
    InvocationStatus: string
    StartTime: string
    UpdateTime: string
}

export interface DescribeSendFileResultsResponseBodyInvocationsInvocationInvokeInstances {
    InvokeInstance: DescribeSendFileResultsResponseBodyInvocationsInvocationInvokeInstancesInvokeInstance[]
}

export interface DescribeSendFileResultsResponseBodyInvocationsInvocationTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeSendFileResultsResponseBodyInvocationsInvocationTags {
    Tag: DescribeSendFileResultsResponseBodyInvocationsInvocationTagsTag[]
}

export interface DescribeSendFileResultsResponseBodyInvocationsInvocation {
    Content: string
    ContentType: string
    CreationTime: string
    Description: string
    FileGroup: string
    FileMode: string
    FileOwner: string
    InvocationStatus: string
    InvokeId: string
    InvokeInstances: DescribeSendFileResultsResponseBodyInvocationsInvocationInvokeInstances
    Name: string
    Overwrite: string
    Tags: DescribeSendFileResultsResponseBodyInvocationsInvocationTags
    TargetDir: string
    VmCount: number
}

export interface DescribeSendFileResultsResponseBodyInvocations {
    Invocation: DescribeSendFileResultsResponseBodyInvocationsInvocation[]
}

export interface DescribeSnapshotGroupsRequestTag {
    Key: string
    Value: string
}

export interface DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupSnapshotsSnapshotTagsTag {
    Key: string
    Value: string
}

export interface DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupSnapshotsSnapshotTags {
    Tag: DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupSnapshotsSnapshotTagsTag[]
}

export interface DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupSnapshotsSnapshot {
    InstantAccess: boolean
    InstantAccessRetentionDays: number
    Progress: string
    SnapshotId: string
    SourceDiskId: string
    SourceDiskType: string
    Tags: DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupSnapshotsSnapshotTags
}

export interface DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupSnapshots {
    Snapshot: DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupSnapshotsSnapshot[]
}

export interface DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupTagsTag {
    Key: string
    Value: string
}

export interface DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupTags {
    Tag: DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupTagsTag[]
}

export interface DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroup {
    CreationTime: string
    Description: string
    InstanceId: string
    Name: string
    ProgressStatus: string
    ResourceGroupId: string
    SnapshotGroupId: string
    Snapshots: DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupSnapshots
    Status: string
    Tags: DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroupTags
}

export interface DescribeSnapshotGroupsResponseBodySnapshotGroups {
    SnapshotGroup: DescribeSnapshotGroupsResponseBodySnapshotGroupsSnapshotGroup[]
}

export interface DescribeSnapshotLinksResponseBodySnapshotLinksSnapshotLink {
    Category: string
    InstanceId: string
    InstanceName: string
    InstantAccess: boolean
    RegionId: string
    SnapshotLinkId: string
    SourceDiskId: string
    SourceDiskName: string
    SourceDiskSize: number
    SourceDiskType: string
    TotalCount: number
    TotalSize: number
}

export interface DescribeSnapshotLinksResponseBodySnapshotLinks {
    SnapshotLink: DescribeSnapshotLinksResponseBodySnapshotLinksSnapshotLink[]
}

export interface DescribeSnapshotMonitorDataResponseBodyMonitorDataDataPoint {
    Size: number
    TimeStamp: string
}

export interface DescribeSnapshotMonitorDataResponseBodyMonitorData {
    DataPoint: DescribeSnapshotMonitorDataResponseBodyMonitorDataDataPoint[]
}

export interface DescribeSnapshotPackageResponseBodySnapshotPackagesSnapshotPackage {
    DisplayName: string
    EndTime: string
    InitCapacity: number
    StartTime: string
}

export interface DescribeSnapshotPackageResponseBodySnapshotPackages {
    SnapshotPackage: DescribeSnapshotPackageResponseBodySnapshotPackagesSnapshotPackage[]
}

export interface DescribeSnapshotsRequestFilter {
    Key: string
    Value: string
}

export interface DescribeSnapshotsRequestTag {
    Key: string
    Value: string
}

export interface DescribeSnapshotsResponseBodySnapshotsSnapshotTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeSnapshotsResponseBodySnapshotsSnapshotTags {
    Tag: DescribeSnapshotsResponseBodySnapshotsSnapshotTagsTag[]
}

export interface DescribeSnapshotsResponseBodySnapshotsSnapshot {
    Category: string
    CreationTime: string
    Description: string
    Encrypted: boolean
    InstantAccess: boolean
    InstantAccessRetentionDays: number
    KMSKeyId: string
    LastModifiedTime: string
    ProductCode: string
    Progress: string
    RemainTime: number
    ResourceGroupId: string
    RetentionDays: number
    SnapshotId: string
    SnapshotName: string
    SnapshotSN: string
    SnapshotType: string
    SourceDiskId: string
    SourceDiskSize: string
    SourceDiskType: string
    SourceRegionId: string
    SourceSnapshotId: string
    SourceStorageType: string
    Status: string
    Tags: DescribeSnapshotsResponseBodySnapshotsSnapshotTags
    Usage: string
}

export interface DescribeSnapshotsResponseBodySnapshots {
    Snapshot: DescribeSnapshotsResponseBodySnapshotsSnapshot[]
}

export interface DescribeSpotAdviceResponseBodyAvailableSpotZonesAvailableSpotZoneAvailableSpotResourcesAvailableSpotResource {
    AverageSpotDiscount: number
    InstanceType: string
    InterruptRateDesc: string
    InterruptionRate: number
}

export interface DescribeSpotAdviceResponseBodyAvailableSpotZonesAvailableSpotZoneAvailableSpotResources {
    AvailableSpotResource: DescribeSpotAdviceResponseBodyAvailableSpotZonesAvailableSpotZoneAvailableSpotResourcesAvailableSpotResource[]
}

export interface DescribeSpotAdviceResponseBodyAvailableSpotZonesAvailableSpotZone {
    AvailableSpotResources: DescribeSpotAdviceResponseBodyAvailableSpotZonesAvailableSpotZoneAvailableSpotResources
    ZoneId: string
}

export interface DescribeSpotAdviceResponseBodyAvailableSpotZones {
    AvailableSpotZone: DescribeSpotAdviceResponseBodyAvailableSpotZonesAvailableSpotZone[]
}

export interface DescribeSpotPriceHistoryResponseBodySpotPricesSpotPriceType {
    InstanceType: string
    IoOptimized: string
    NetworkType: string
    OriginPrice: number
    SpotPrice: number
    Timestamp: string
    ZoneId: string
}

export interface DescribeSpotPriceHistoryResponseBodySpotPrices {
    SpotPriceType: DescribeSpotPriceHistoryResponseBodySpotPricesSpotPriceType[]
}

export interface DescribeStorageCapacityUnitsRequestTag {
    Key: string
    Value: string
}

export interface DescribeStorageCapacityUnitsResponseBodyStorageCapacityUnitsStorageCapacityUnitTagsTag {
    TagKey: string
    TagValue: string
}

export interface DescribeStorageCapacityUnitsResponseBodyStorageCapacityUnitsStorageCapacityUnitTags {
    Tag: DescribeStorageCapacityUnitsResponseBodyStorageCapacityUnitsStorageCapacityUnitTagsTag[]
}

export interface DescribeStorageCapacityUnitsResponseBodyStorageCapacityUnitsStorageCapacityUnit {
    AllocationStatus: string
    Capacity: number
    CreationTime: string
    Description: string
    ExpiredTime: string
    Name: string
    RegionId: string
    StartTime: string
    Status: string
    StorageCapacityUnitId: string
    Tags: DescribeStorageCapacityUnitsResponseBodyStorageCapacityUnitsStorageCapacityUnitTags
}

export interface DescribeStorageCapacityUnitsResponseBodyStorageCapacityUnits {
    StorageCapacityUnit: DescribeStorageCapacityUnitsResponseBodyStorageCapacityUnitsStorageCapacityUnit[]
}

export interface DescribeStorageSetDetailsResponseBodyDisksDisk {
    Category: string
    CreationTime: string
    DiskId: string
    DiskName: string
    RegionId: string
    StorageSetId: string
    StorageSetPartitionNumber: number
    ZoneId: string
}

export interface DescribeStorageSetDetailsResponseBodyDisks {
    Disk: DescribeStorageSetDetailsResponseBodyDisksDisk[]
}

export interface DescribeStorageSetsResponseBodyStorageSetsStorageSet {
    CreationTime: string
    Description: string
    RegionId: string
    StorageSetId: string
    StorageSetName: string
    StorageSetPartitionNumber: number
    ZoneId: string
}

export interface DescribeStorageSetsResponseBodyStorageSets {
    StorageSet: DescribeStorageSetsResponseBodyStorageSetsStorageSet[]
}

export interface DescribeTagsRequestTag {
    Key: string
    Value: string
}

export interface DescribeTagsResponseBodyTagsTagResourceTypeCount {
    Ddh: number
    Disk: number
    Eni: number
    Image: number
    Instance: number
    KeyPair: number
    LaunchTemplate: number
    ReservedInstance: number
    Securitygroup: number
    Snapshot: number
    SnapshotPolicy: number
    Volume: number
}

export interface DescribeTagsResponseBodyTagsTag {
    ResourceTypeCount: DescribeTagsResponseBodyTagsTagResourceTypeCount
    TagKey: string
    TagValue: string
}

export interface DescribeTagsResponseBodyTags {
    Tag: DescribeTagsResponseBodyTagsTag[]
}

export interface DescribeTaskAttributeResponseBodyOperationProgressSetOperationProgressRelatedItemSetRelatedItem {
    Name: string
    Value: string
}

export interface DescribeTaskAttributeResponseBodyOperationProgressSetOperationProgressRelatedItemSet {
    RelatedItem: DescribeTaskAttributeResponseBodyOperationProgressSetOperationProgressRelatedItemSetRelatedItem[]
}

export interface DescribeTaskAttributeResponseBodyOperationProgressSetOperationProgress {
    ErrorCode: string
    ErrorMsg: string
    OperationStatus: string
    RelatedItemSet: DescribeTaskAttributeResponseBodyOperationProgressSetOperationProgressRelatedItemSet
}

export interface DescribeTaskAttributeResponseBodyOperationProgressSet {
    OperationProgress: DescribeTaskAttributeResponseBodyOperationProgressSetOperationProgress[]
}

export interface DescribeTasksResponseBodyTaskSetTask {
    CreationTime: string
    FinishedTime: string
    ResourceId: string
    SupportCancel: string
    TaskAction: string
    TaskId: string
    TaskStatus: string
}

export interface DescribeTasksResponseBodyTaskSet {
    Task: DescribeTasksResponseBodyTaskSetTask[]
}

export interface DescribeVRoutersResponseBodyVRoutersVRouterRouteTableIds {
    RouteTableId: string[]
}

export interface DescribeVRoutersResponseBodyVRoutersVRouter {
    CreationTime: string
    Description: string
    RegionId: string
    RouteTableIds: DescribeVRoutersResponseBodyVRoutersVRouterRouteTableIds
    VRouterId: string
    VRouterName: string
    VpcId: string
}

export interface DescribeVRoutersResponseBodyVRouters {
    VRouter: DescribeVRoutersResponseBodyVRoutersVRouter[]
}

export interface DescribeVSwitchesResponseBodyVSwitchesVSwitch {
    AvailableIpAddressCount: number
    CidrBlock: string
    CreationTime: string
    Description: string
    IsDefault: boolean
    ResourceGroupId: string
    Status: string
    VSwitchId: string
    VSwitchName: string
    VpcId: string
    ZoneId: string
}

export interface DescribeVSwitchesResponseBodyVSwitches {
    VSwitch: DescribeVSwitchesResponseBodyVSwitchesVSwitch[]
}

export interface DescribeVirtualBorderRoutersRequestFilter {
    Key: string
    Value: string[]
}

export interface DescribeVirtualBorderRoutersResponseBodyVirtualBorderRouterSetVirtualBorderRouterType {
    AccessPointId: string
    ActivationTime: string
    CircuitCode: string
    CreationTime: string
    Description: string
    LocalGatewayIp: string
    Name: string
    PeerGatewayIp: string
    PeeringSubnetMask: string
    PhysicalConnectionBusinessStatus: string
    PhysicalConnectionId: string
    PhysicalConnectionOwnerUid: string
    PhysicalConnectionStatus: string
    RecoveryTime: string
    RouteTableId: string
    Status: string
    TerminationTime: string
    VbrId: string
    VlanId: number
    VlanInterfaceId: string
}

export interface DescribeVirtualBorderRoutersResponseBodyVirtualBorderRouterSet {
    VirtualBorderRouterType: DescribeVirtualBorderRoutersResponseBodyVirtualBorderRouterSetVirtualBorderRouterType[]
}

export interface DescribeVirtualBorderRoutersForPhysicalConnectionRequestFilter {
    Key: string
    Value: string[]
}

export interface DescribeVirtualBorderRoutersForPhysicalConnectionResponseBodyVirtualBorderRouterForPhysicalConnectionSetVirtualBorderRouterForPhysicalConnectionType {
    ActivationTime: string
    CircuitCode: string
    CreationTime: string
    RecoveryTime: string
    TerminationTime: string
    VbrId: string
    VbrOwnerUid: number
    VlanId: number
}

export interface DescribeVirtualBorderRoutersForPhysicalConnectionResponseBodyVirtualBorderRouterForPhysicalConnectionSet {
    VirtualBorderRouterForPhysicalConnectionType: DescribeVirtualBorderRoutersForPhysicalConnectionResponseBodyVirtualBorderRouterForPhysicalConnectionSetVirtualBorderRouterForPhysicalConnectionType[]
}

export interface DescribeVpcsResponseBodyVpcsVpcUserCidrs {
    UserCidr: string[]
}

export interface DescribeVpcsResponseBodyVpcsVpcVSwitchIds {
    VSwitchId: string[]
}

export interface DescribeVpcsResponseBodyVpcsVpc {
    CidrBlock: string
    CreationTime: string
    Description: string
    IsDefault: boolean
    RegionId: string
    Status: string
    UserCidrs: DescribeVpcsResponseBodyVpcsVpcUserCidrs
    VRouterId: string
    VSwitchIds: DescribeVpcsResponseBodyVpcsVpcVSwitchIds
    VpcId: string
    VpcName: string
}

export interface DescribeVpcsResponseBodyVpcs {
    Vpc: DescribeVpcsResponseBodyVpcsVpc[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableDedicatedHostTypes {
    DedicatedHostType: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableDiskCategories {
    DiskCategories: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableInstanceTypes {
    InstanceTypes: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableResourceCreation {
    ResourceTypes: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoDataDiskCategories {
    SupportedDataDiskCategory: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoInstanceGenerations {
    SupportedInstanceGeneration: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoInstanceTypeFamilies {
    SupportedInstanceTypeFamily: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoInstanceTypes {
    SupportedInstanceType: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoNetworkTypes {
    SupportedNetworkCategory: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoSystemDiskCategories {
    SupportedSystemDiskCategory: string[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfo {
    DataDiskCategories: DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoDataDiskCategories
    InstanceGenerations: DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoInstanceGenerations
    InstanceTypeFamilies: DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoInstanceTypeFamilies
    InstanceTypes: DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoInstanceTypes
    IoOptimized: boolean
    NetworkTypes: DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoNetworkTypes
    SystemDiskCategories: DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfoSystemDiskCategories
}

export interface DescribeZonesResponseBodyZonesZoneAvailableResources {
    ResourcesInfo: DescribeZonesResponseBodyZonesZoneAvailableResourcesResourcesInfo[]
}

export interface DescribeZonesResponseBodyZonesZoneAvailableVolumeCategories {
    VolumeCategories: string[]
}

export interface DescribeZonesResponseBodyZonesZoneDedicatedHostGenerations {
    DedicatedHostGeneration: string[]
}

export interface DescribeZonesResponseBodyZonesZone {
    AvailableDedicatedHostTypes: DescribeZonesResponseBodyZonesZoneAvailableDedicatedHostTypes
    AvailableDiskCategories: DescribeZonesResponseBodyZonesZoneAvailableDiskCategories
    AvailableInstanceTypes: DescribeZonesResponseBodyZonesZoneAvailableInstanceTypes
    AvailableResourceCreation: DescribeZonesResponseBodyZonesZoneAvailableResourceCreation
    AvailableResources: DescribeZonesResponseBodyZonesZoneAvailableResources
    AvailableVolumeCategories: DescribeZonesResponseBodyZonesZoneAvailableVolumeCategories
    DedicatedHostGenerations: DescribeZonesResponseBodyZonesZoneDedicatedHostGenerations
    LocalName: string
    ZoneId: string
    ZoneType: string
}

export interface DescribeZonesResponseBodyZones {
    Zone: DescribeZonesResponseBodyZonesZone[]
}

export interface DetachInstanceRamRoleResponseBodyDetachInstanceRamRoleResultsDetachInstanceRamRoleResultInstanceRamRoleSetsInstanceRamRoleSet {
    InstanceId: string
    RamRoleName: string
}

export interface DetachInstanceRamRoleResponseBodyDetachInstanceRamRoleResultsDetachInstanceRamRoleResultInstanceRamRoleSets {
    InstanceRamRoleSet: DetachInstanceRamRoleResponseBodyDetachInstanceRamRoleResultsDetachInstanceRamRoleResultInstanceRamRoleSetsInstanceRamRoleSet[]
}

export interface DetachInstanceRamRoleResponseBodyDetachInstanceRamRoleResultsDetachInstanceRamRoleResult {
    Code: string
    InstanceId: string
    InstanceRamRoleSets: DetachInstanceRamRoleResponseBodyDetachInstanceRamRoleResultsDetachInstanceRamRoleResultInstanceRamRoleSets
    Message: string
    Success: boolean
}

export interface DetachInstanceRamRoleResponseBodyDetachInstanceRamRoleResults {
    DetachInstanceRamRoleResult: DetachInstanceRamRoleResponseBodyDetachInstanceRamRoleResultsDetachInstanceRamRoleResult[]
}

export interface DetachKeyPairResponseBodyResultsResult {
    Code: string
    InstanceId: string
    Message: string
    Success: string
}

export interface DetachKeyPairResponseBodyResults {
    Result: DetachKeyPairResponseBodyResultsResult[]
}

export interface DisableActivationResponseBodyActivation {
    ActivationId: string
    CreationTime: string
    DeregisteredCount: number
    Description: string
    Disabled: boolean
    InstanceCount: number
    InstanceName: string
    IpAddressRange: string
    RegisteredCount: number
    TimeToLiveInHours: number
}

export interface ImportImageRequestDiskDeviceMapping {
    Device: string
    DiskImSize: number
    DiskImageSize: number
    Format: string
    OSSBucket: string
    OSSObject: string
}

export interface ImportImageRequestTag {
    Key: string
    Value: string
}

export interface ImportKeyPairRequestTag {
    Key: string
    Value: string
}

export interface InvokeCommandRequestTag {
    Key: string
    Value: string
}

export interface InvokeCommandShrinkRequestTag {
    Key: string
    Value: string
}

export interface ListPluginStatusResponseBodyInstancePluginStatusSetInstancePluginStatusPluginStatusSetPluginStatus {
    FirstHeartbeatTime: string
    LastHeartbeatTime: string
    PluginName: string
    PluginStatus: string
    PluginVersion: string
}

export interface ListPluginStatusResponseBodyInstancePluginStatusSetInstancePluginStatusPluginStatusSet {
    PluginStatus: ListPluginStatusResponseBodyInstancePluginStatusSetInstancePluginStatusPluginStatusSetPluginStatus[]
}

export interface ListPluginStatusResponseBodyInstancePluginStatusSetInstancePluginStatus {
    InstanceId: string
    PluginStatusSet: ListPluginStatusResponseBodyInstancePluginStatusSetInstancePluginStatusPluginStatusSet
}

export interface ListPluginStatusResponseBodyInstancePluginStatusSet {
    InstancePluginStatus: ListPluginStatusResponseBodyInstancePluginStatusSetInstancePluginStatus[]
}

export interface ListTagResourcesRequestTag {
    Key: string
    Value: string
}

export interface ListTagResourcesRequestTagFilter {
    TagKey: string
    TagValues: string[]
}

export interface ListTagResourcesResponseBodyTagResourcesTagResource {
    ResourceId: string
    ResourceType: string
    TagKey: string
    TagValue: string
}

export interface ListTagResourcesResponseBodyTagResources {
    TagResource: ListTagResourcesResponseBodyTagResourcesTagResource[]
}

export interface ModifyAutoProvisioningGroupRequestLaunchTemplateConfig {
    InstanceType: string
    MaxPrice: number
    Priority: number
    VSwitchId: string
    WeightedCapacity: number
}

export interface ModifyCapacityReservationRequestPrivatePoolOptions {
    Id: string
    Name: string
}

export interface ModifyDedicatedHostAttributeRequestNetworkAttributes {
    SlbUdpTimeout: number
    UdpTimeout: number
}

export interface ModifyDedicatedHostsChargeTypeResponseBodyFeeOfInstancesFeeOfInstance {
    Currency: string
    Fee: string
    InstanceId: string
}

export interface ModifyDedicatedHostsChargeTypeResponseBodyFeeOfInstances {
    FeeOfInstance: ModifyDedicatedHostsChargeTypeResponseBodyFeeOfInstancesFeeOfInstance[]
}

export interface ModifyElasticityAssuranceRequestPrivatePoolOptions {
    Id: string
    Name: string
}

export interface ModifyImageAttributeRequestFeatures {
    NvmeSupport: string
}

export interface ModifyInstanceAttachmentAttributesRequestPrivatePoolOptions {
    Id: string
    MatchCriteria: string
}

export interface ModifyInstanceAttributeRequestRemoteConnectionOptions {
    Password: string
    Type: string
}

export interface ModifyInstanceChargeTypeResponseBodyFeeOfInstancesFeeOfInstance {
    Currency: string
    Fee: string
    InstanceId: string
}

export interface ModifyInstanceChargeTypeResponseBodyFeeOfInstances {
    FeeOfInstance: ModifyInstanceChargeTypeResponseBodyFeeOfInstancesFeeOfInstance[]
}

export interface ModifyInstanceMaintenanceAttributesRequestMaintenanceWindow {
    EndTime: string
    StartTime: string
}

export interface ModifyInstanceSpecRequestSystemDisk {
    Category: string
}

export interface ModifyInstanceSpecRequestTemporary {
    EndTime: string
    InternetMaxBandwidthOut: number
    StartTime: string
}

export interface ModifyManagedInstanceResponseBodyInstance {
    InstanceId: string
    InstanceName: string
}

export interface ModifyPrefixListRequestAddEntry {
    Cidr: string
    Description: string
}

export interface ModifyPrefixListRequestRemoveEntry {
    Cidr: string
}

export interface ModifyPrepayInstanceSpecRequestSystemDisk {
    Category: string
}

export interface ModifyReservedInstancesRequestConfiguration {
    InstanceAmount: number
    InstanceType: string
    ReservedInstanceName: string
    Scope: string
    ZoneId: string
}

export interface ModifyReservedInstancesResponseBodyReservedInstanceIdSets {
    ReservedInstanceId: string[]
}

export interface PurchaseReservedInstancesOfferingRequestTag {
    Key: string
    Value: string
}

export interface PurchaseReservedInstancesOfferingResponseBodyReservedInstanceIdSets {
    ReservedInstanceId: string[]
}

export interface PurchaseStorageCapacityUnitRequestTag {
    Key: string
    Value: string
}

export interface PurchaseStorageCapacityUnitResponseBodyStorageCapacityUnitIds {
    StorageCapacityUnitId: string[]
}

export interface RebootInstancesResponseBodyInstanceResponsesInstanceResponse {
    Code: string
    CurrentStatus: string
    InstanceId: string
    Message: string
    PreviousStatus: string
}

export interface RebootInstancesResponseBodyInstanceResponses {
    InstanceResponse: RebootInstancesResponseBodyInstanceResponsesInstanceResponse[]
}

export interface ReleaseCapacityReservationRequestPrivatePoolOptions {
    Id: string
}

export interface RemoveTagsRequestTag {
    Key: string
    Value: string
}

export interface RenewReservedInstancesResponseBodyReservedInstanceIdSets {
    ReservedInstanceId: string[]
}

export interface ReplaceSystemDiskRequestSystemDisk {
    Size: number
}

export interface ReplaceSystemDiskRequestArn {
    AssumeRoleFor: number
    RoleType: string
    Rolearn: string
}

export interface ResetDisksRequestDisk {
    DiskId: string
    SnapshotId: string
}

export interface ResetDisksResponseBodyOperationProgressSetOperationProgressRelatedItemSetRelatedItem {
    Name: string
    Value: string
}

export interface ResetDisksResponseBodyOperationProgressSetOperationProgressRelatedItemSet {
    RelatedItem: ResetDisksResponseBodyOperationProgressSetOperationProgressRelatedItemSetRelatedItem[]
}

export interface ResetDisksResponseBodyOperationProgressSetOperationProgress {
    ErrorCode: string
    ErrorMsg: string
    OperationStatus: string
    RelatedItemSet: ResetDisksResponseBodyOperationProgressSetOperationProgressRelatedItemSet
}

export interface ResetDisksResponseBodyOperationProgressSet {
    OperationProgress: ResetDisksResponseBodyOperationProgressSetOperationProgress[]
}

export interface RevokeSecurityGroupRequestPermissions {
    Description: string
    DestCidrIp: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    Policy: string
    PortRange: string
    Priority: string
    SourceCidrIp: string
    SourceGroupId: string
    SourceGroupOwnerAccount: string
    SourceGroupOwnerId: number
    SourcePortRange: string
    SourcePrefixListId: string
}

export interface RevokeSecurityGroupEgressRequestPermissions {
    Description: string
    DestCidrIp: string
    DestGroupId: string
    DestGroupOwnerAccount: string
    DestGroupOwnerId: string
    DestPrefixListId: string
    IpProtocol: string
    Ipv6DestCidrIp: string
    Ipv6SourceCidrIp: string
    NicType: string
    Policy: string
    PortRange: string
    Priority: string
    SourceCidrIp: string
    SourcePortRange: string
}

export interface RunCommandRequestTag {
    Key: string
    Value: string
}

export interface RunCommandShrinkRequestTag {
    Key: string
    Value: string
}

export interface RunInstancesRequestCpuOptions {
    Core: number
    Numa: string
    ThreadsPerCore: number
}

export interface RunInstancesRequestHibernationOptions {
    Configured: boolean
}

export interface RunInstancesRequestPrivatePoolOptions {
    Id: string
    MatchCriteria: string
}

export interface RunInstancesRequestSchedulerOptions {
    DedicatedHostClusterId: string
}

export interface RunInstancesRequestSecurityOptions {
    ConfidentialComputingMode: string
    TrustedSystemMode: string
}

export interface RunInstancesRequestSystemDisk {
    AutoSnapshotPolicyId: string
    Category: string
    Description: string
    DiskName: string
    PerformanceLevel: string
    Size: string
    BurstingEnabled: boolean
    EncryptAlgorithm: string
    Encrypted: string
    KMSKeyId: string
    ProvisionedIops: number
    StorageClusterId: string
}

export interface RunInstancesRequestArn {
    AssumeRoleFor: number
    RoleType: string
    Rolearn: string
}

export interface RunInstancesRequestDataDisk {
    AutoSnapshotPolicyId: string
    BurstingEnabled: boolean
    Category: string
    DeleteWithInstance: boolean
    Description: string
    Device: string
    DiskName: string
    EncryptAlgorithm: string
    Encrypted: string
    KMSKeyId: string
    PerformanceLevel: string
    ProvisionedIops: number
    Size: number
    SnapshotId: string
    StorageClusterId: string
}

export interface RunInstancesRequestNetworkInterface {
    Description: string
    InstanceType: string
    Ipv6Address: string[]
    Ipv6AddressCount: number
    NetworkCardIndex: number
    NetworkInterfaceName: string
    NetworkInterfaceTrafficMode: string
    PrimaryIpAddress: string
    QueueNumber: number
    QueuePairNumber: number
    SecurityGroupId: string
    SecurityGroupIds: string[]
    VSwitchId: string
}

export interface RunInstancesRequestTag {
    Key: string
    Value: string
}

export interface RunInstancesResponseBodyInstanceIdSets {
    InstanceIdSet: string[]
}

export interface SendFileRequestTag {
    Key: string
    Value: string
}

export interface StartElasticityAssuranceRequestPrivatePoolOptions {
    Id: string
}

export interface StartImagePipelineExecutionRequestTemplateTag {
    Key: string
    Value: string
}

export interface StartInstancesResponseBodyInstanceResponsesInstanceResponse {
    Code: string
    CurrentStatus: string
    InstanceId: string
    Message: string
    PreviousStatus: string
}

export interface StartInstancesResponseBodyInstanceResponses {
    InstanceResponse: StartInstancesResponseBodyInstanceResponsesInstanceResponse[]
}

export interface StopInstancesResponseBodyInstanceResponsesInstanceResponse {
    Code: string
    CurrentStatus: string
    InstanceId: string
    Message: string
    PreviousStatus: string
}

export interface StopInstancesResponseBodyInstanceResponses {
    InstanceResponse: StopInstancesResponseBodyInstanceResponsesInstanceResponse[]
}

export interface TagResourcesRequestTag {
    Key: string
    Value: string
}
