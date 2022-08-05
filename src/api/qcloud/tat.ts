import { QCloudClient } from "../basic/qcloud"

import { TAT } from "./typings"

export class TATModel extends QCloudClient {
    protected qService = "lighthouse"
    protected qVersion = "2020-03-24"

    public runCommand(region: string, query: TAT.RunCommandRequest): Promise<TAT.RunCommandResponse> {
        return this.q({
            action: "RunCommand",
            region, query,
        })
    }

    public describeInvocations(region: string, query: TAT.DescribeInvocationsRequest): Promise<TAT.DescribeInvocationsResponse> {
        return this.q({
            action: "DescribeInvocations",
            region, query,
        })
    }

    public describeInvocationTasks(region: string, query: TAT.DescribeInvocationTasksRequest): Promise<TAT.DescribeInvocationTasksResponse> {
        return this.q({
            action: "DescribeInvocationTasks",
            region, query,
        })
    }

    public describeCommands(region: string, query: TAT.DescribeCommandsRequest): Promise<TAT.DescribeCommandsResponse> {
        return this.q({
            action: "DescribeCommands",
            region, query,
        })
    }
}
