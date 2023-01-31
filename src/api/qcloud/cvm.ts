import * as Qcloud from "./typings"
import { QcloudClient } from "./base"

export class CvmModel extends QcloudClient {
    protected Service = "cvm"
    protected Version = "2017-03-12"

    public describeRegions(): Promise<Qcloud.Cvm.DescribeRegionsResponse> {
        return this.bus({ Action: "DescribeRegions" }, 600)
    }

    public describeInstances(region: string, query?: Qcloud.Cvm.DescribeInstancesRequest): Promise<Qcloud.Cvm.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.bus({ Action: "DescribeInstances", Region: region, Payload: query })
    }

    public modifyInstancesAttribute(region: string, query: Qcloud.Cvm.ModifyInstancesAttributeRequest): Promise<Qcloud.Cvm.ModifyInstancesAttributeResponse> {
        return this.bus({ Action: "ModifyInstancesAttribute", Region: region, Payload: query })
    }

    // 电源

    public stopInstances(region: string, query: Qcloud.Cvm.StopInstancesRequest): Promise<Qcloud.Cvm.StopInstancesResponse> {
        return this.bus({ Action: "StopInstances", Region: region, Payload: query })
    }

    public startInstances(region: string, query: Qcloud.Cvm.StartInstancesRequest): Promise<Qcloud.Cvm.StartInstancesResponse> {
        return this.bus({ Action: "StartInstances", Region: region, Payload: query })
    }

    public rebootInstances(region: string, query: Qcloud.Cvm.RebootInstancesRequest): Promise<Qcloud.Cvm.RebootInstancesResponse> {
        return this.bus({ Action: "RebootInstances", Region: region, Payload: query })
    }

    // VNC

    public describeInstanceVncUrl(region: string, query: Qcloud.Cvm.DescribeInstanceVncUrlRequest): Promise<Qcloud.Cvm.DescribeInstanceVncUrlResponse> {
        return this.bus({ Action: "DescribeInstanceVncUrl", Region: region, Payload: query })
    }
}

export const InstanceStateMap: Record<string, string> = {
    PENDING: "创建中",
    LAUNCH_FAILED: "创建失败",
    RUNNING: "运行中",
    STOPPED: "关机",
    STARTING: "开机中",
    STOPPING: "关机中",
    REBOOTING: "重启中",
    SHUTDOWN: "停止待销毁",
    TERMINATING: "销毁中",
    DELETING: "删除中",
    FREEZING: "冻结中",
}
