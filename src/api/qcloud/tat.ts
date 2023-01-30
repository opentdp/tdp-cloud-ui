import * as Qcloud from "./typings"
import { QcloudClient } from "./base"

export class TATModel extends QcloudClient {
    protected qService = "tat"
    protected qVersion = "2020-10-28"

    public runCommand(region: string, query: Qcloud.TAT.RunCommandRequest): Promise<Qcloud.TAT.RunCommandResponse> {
        return this.q({ Action: "RunCommand", Region: region, Payload: query })
    }

    public describeCommands(region: string, query: Qcloud.TAT.DescribeCommandsRequest): Promise<Qcloud.TAT.DescribeCommandsResponse> {
        return this.q({ Action: "DescribeCommands", Region: region, Payload: query })
    }

    public describeInvocations(region: string, query: Qcloud.TAT.DescribeInvocationsRequest): Promise<Qcloud.TAT.DescribeInvocationsResponse> {
        return this.q({ Action: "DescribeInvocations", Region: region, Payload: query })
    }

    public describeInvocationTasks(region: string, query: Qcloud.TAT.DescribeInvocationTasksRequest): Promise<Qcloud.TAT.DescribeInvocationTasksResponse> {
        return this.q({ Action: "DescribeInvocationTasks", Region: region, Payload: query })
    }
}
