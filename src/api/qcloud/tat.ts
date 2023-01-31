import * as Qcloud from "./typings"
import { QcloudClient } from "./base"

export class TatModel extends QcloudClient {
    protected Service = "tat"
    protected Version = "2020-10-28"

    public runCommand(region: string, query: Qcloud.Tat.RunCommandRequest): Promise<Qcloud.Tat.RunCommandResponse> {
        return this.bus({ Action: "RunCommand", Region: region, Payload: query })
    }

    public describeCommands(region: string, query: Qcloud.Tat.DescribeCommandsRequest): Promise<Qcloud.Tat.DescribeCommandsResponse> {
        return this.bus({ Action: "DescribeCommands", Region: region, Payload: query })
    }

    public describeInvocations(region: string, query: Qcloud.Tat.DescribeInvocationsRequest): Promise<Qcloud.Tat.DescribeInvocationsResponse> {
        return this.bus({ Action: "DescribeInvocations", Region: region, Payload: query })
    }

    public describeInvocationTasks(region: string, query: Qcloud.Tat.DescribeInvocationTasksRequest): Promise<Qcloud.Tat.DescribeInvocationTasksResponse> {
        return this.bus({ Action: "DescribeInvocationTasks", Region: region, Payload: query })
    }
}
