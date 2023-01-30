import * as Qcloud from "./typings"
import { QcloudClient } from "./base"

export class TATModel extends QcloudClient {
    protected Service = "tat"
    protected Version = "2020-10-28"

    public runCommand(region: string, query: Qcloud.TAT.RunCommandRequest): Promise<Qcloud.TAT.RunCommandResponse> {
        return this.bus({ Action: "RunCommand", Region: region, Payload: query })
    }

    public describeCommands(region: string, query: Qcloud.TAT.DescribeCommandsRequest): Promise<Qcloud.TAT.DescribeCommandsResponse> {
        return this.bus({ Action: "DescribeCommands", Region: region, Payload: query })
    }

    public describeInvocations(region: string, query: Qcloud.TAT.DescribeInvocationsRequest): Promise<Qcloud.TAT.DescribeInvocationsResponse> {
        return this.bus({ Action: "DescribeInvocations", Region: region, Payload: query })
    }

    public describeInvocationTasks(region: string, query: Qcloud.TAT.DescribeInvocationTasksRequest): Promise<Qcloud.TAT.DescribeInvocationTasksResponse> {
        return this.bus({ Action: "DescribeInvocationTasks", Region: region, Payload: query })
    }
}
