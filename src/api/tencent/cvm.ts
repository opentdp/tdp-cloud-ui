import { TencentClient } from './base';
import { Cvm as ICvm, CvmDescribeRegionsResponse } from './typings';

export class CvmModel extends TencentClient {
    protected Service = 'cvm';
    protected Version = '2017-03-12';

    public describeInstanceStatistics(): Promise<CvmDescribeRegionsResponse> {
        return this.bus({ Action: 'DescribeInstanceStatistics', Region: 'ap-guangzhou' });
    }

    public describeRegions(): Promise<ICvm.DescribeRegionsResponse> {
        return this.bus({ Action: 'DescribeRegions' }, 600);
    }

    public describeInstances(region: string, query?: ICvm.DescribeInstancesRequest): Promise<ICvm.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query);
        return this.bus({ Action: 'DescribeInstances', Region: region, Payload: query });
    }

    public modifyInstancesAttribute(region: string, query: ICvm.ModifyInstancesAttributeRequest): Promise<ICvm.ModifyInstancesAttributeResponse> {
        return this.bus({ Action: 'ModifyInstancesAttribute', Region: region, Payload: query });
    }

    // 电源

    public stopInstances(region: string, query: ICvm.StopInstancesRequest): Promise<ICvm.StopInstancesResponse> {
        return this.bus({ Action: 'StopInstances', Region: region, Payload: query });
    }

    public startInstances(region: string, query: ICvm.StartInstancesRequest): Promise<ICvm.StartInstancesResponse> {
        return this.bus({ Action: 'StartInstances', Region: region, Payload: query });
    }

    public rebootInstances(region: string, query: ICvm.RebootInstancesRequest): Promise<ICvm.RebootInstancesResponse> {
        return this.bus({ Action: 'RebootInstances', Region: region, Payload: query });
    }

    // VNC

    public describeInstanceVncUrl(region: string, query: ICvm.DescribeInstanceVncUrlRequest): Promise<ICvm.DescribeInstanceVncUrlResponse> {
        return this.bus({ Action: 'DescribeInstanceVncUrl', Region: region, Payload: query });
    }
}

export const InstanceStateMap: Record<string, string> = {
    PENDING: '创建中',
    LAUNCH_FAILED: '创建失败',
    RUNNING: '运行中',
    STOPPED: '关机',
    STARTING: '开机中',
    STOPPING: '关机中',
    REBOOTING: '重启中',
    SHUTDOWN: '停止待销毁',
    TERMINATING: '销毁中',
    DELETING: '删除中',
    FREEZING: '冻结中',
};
