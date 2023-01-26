import { QcloudClient } from "@/api/basic/qcloud"

import * as Qcloud from './typings'

export class TATModel extends QcloudClient {
    protected qService = "tat"
    protected qVersion = "2020-10-28"

    public runCommand(region: string, query: Qcloud.TAT.RunCommandRequest): Promise<Qcloud.TAT.RunCommandResponse> {
        return this.q({ action: "RunCommand", region, query })
    }

    public describeInvocations(region: string, query: Qcloud.TAT.DescribeInvocationsRequest): Promise<Qcloud.TAT.DescribeInvocationsResponse> {
        return this.q({ action: "DescribeInvocations", region, query })
    }

    public describeInvocationTasks(region: string, query: Qcloud.TAT.DescribeInvocationTasksRequest): Promise<Qcloud.TAT.DescribeInvocationTasksResponse> {
        return this.q({ action: "DescribeInvocationTasks", region, query })
    }

    public describeCommands(region: string, query: Qcloud.TAT.DescribeCommandsRequest): Promise<Qcloud.TAT.DescribeCommandsResponse> {
        return this.q({ action: "DescribeCommands", region, query })
    }
}
