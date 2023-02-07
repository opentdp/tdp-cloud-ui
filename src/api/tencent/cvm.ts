import { TencentClient } from "./base"
import { Cvm as QCvm } from "./typings"

export class CvmModel extends TencentClient {
    protected Service = "cvm"
    protected Version = "2017-03-12"

    public describeRegions(): Promise<QCvm.DescribeRegionsResponse> {
        return this.bus({ Action: "DescribeRegions" }, 600)
    }

    public describeInstances(region: string, query?: QCvm.DescribeInstancesRequest): Promise<QCvm.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.bus({ Action: "DescribeInstances", Region: region, Payload: query })
    }

    public modifyInstancesAttribute(region: string, query: QCvm.ModifyInstancesAttributeRequest): Promise<QCvm.ModifyInstancesAttributeResponse> {
        return this.bus({ Action: "ModifyInstancesAttribute", Region: region, Payload: query })
    }

    // 电源

    public stopInstances(region: string, query: QCvm.StopInstancesRequest): Promise<QCvm.StopInstancesResponse> {
        return this.bus({ Action: "StopInstances", Region: region, Payload: query })
    }

    public startInstances(region: string, query: QCvm.StartInstancesRequest): Promise<QCvm.StartInstancesResponse> {
        return this.bus({ Action: "StartInstances", Region: region, Payload: query })
    }

    public rebootInstances(region: string, query: QCvm.RebootInstancesRequest): Promise<QCvm.RebootInstancesResponse> {
        return this.bus({ Action: "RebootInstances", Region: region, Payload: query })
    }

    // VNC

    public describeInstanceVncUrl(region: string, query: QCvm.DescribeInstanceVncUrlRequest): Promise<QCvm.DescribeInstanceVncUrlResponse> {
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
