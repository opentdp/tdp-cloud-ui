export type * as Cam from 'tencentcloud-sdk-nodejs/tencentcloud/services/cam/v20190116/cam_models';
export type * as Cvm from 'tencentcloud-sdk-nodejs/tencentcloud/services/cvm/v20170312/cvm_models';
export type * as Dnspod from 'tencentcloud-sdk-nodejs/tencentcloud/services/dnspod/v20210323/dnspod_models';
export type * as Lighthouse from 'tencentcloud-sdk-nodejs/tencentcloud/services/lighthouse/v20200324/lighthouse_models';
export type * as Monitor from 'tencentcloud-sdk-nodejs/tencentcloud/services/monitor/v20180724/monitor_models';
export type * as Ssl from 'tencentcloud-sdk-nodejs/tencentcloud/services/ssl/v20191205/ssl_models';
export type * as Tat from 'tencentcloud-sdk-nodejs/tencentcloud/services/tat/v20201028/tat_models';

export interface CvmDescribeRegionsResponse {
    InstanceStatisticsSet: {
        ExpiredInstanceCount: number
        NewInstanceCount: number
        Region: string
        TotalCount: number
    }[]
}