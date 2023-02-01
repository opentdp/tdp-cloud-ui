import { QcloudClient } from "./base"
import { Tat as QTat } from "./typings"

export class TatModel extends QcloudClient {
    protected Service = "tat"
    protected Version = "2020-10-28"

    public runCommand(region: string, query: QTat.RunCommandRequest): Promise<QTat.RunCommandResponse> {
        return this.bus({ Action: "RunCommand", Region: region, Payload: query })
    }

    public describeCommands(region: string, query: QTat.DescribeCommandsRequest): Promise<QTat.DescribeCommandsResponse> {
        return this.bus({ Action: "DescribeCommands", Region: region, Payload: query })
    }

    public describeInvocations(region: string, query: QTat.DescribeInvocationsRequest): Promise<QTat.DescribeInvocationsResponse> {
        return this.bus({ Action: "DescribeInvocations", Region: region, Payload: query })
    }

    public describeInvocationTasks(region: string, query: QTat.DescribeInvocationTasksRequest): Promise<QTat.DescribeInvocationTasksResponse> {
        return this.bus({ Action: "DescribeInvocationTasks", Region: region, Payload: query })
    }
}
