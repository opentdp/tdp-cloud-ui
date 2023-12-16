import { TencentClient } from './base';
import { Tat as ITat } from './typings';

export class TatModel extends TencentClient {
    protected Service = 'tat';
    protected Version = '2020-10-28';

    public runCommand(region: string, query: ITat.RunCommandRequest): Promise<ITat.RunCommandResponse> {
        return this.bus({ Action: 'RunCommand', Region: region, Payload: query });
    }

    public describeCommands(region: string, query: ITat.DescribeCommandsRequest): Promise<ITat.DescribeCommandsResponse> {
        return this.bus({ Action: 'DescribeCommands', Region: region, Payload: query });
    }

    public describeInvocations(region: string, query: ITat.DescribeInvocationsRequest): Promise<ITat.DescribeInvocationsResponse> {
        return this.bus({ Action: 'DescribeInvocations', Region: region, Payload: query });
    }

    public describeInvocationTasks(region: string, query: ITat.DescribeInvocationTasksRequest): Promise<ITat.DescribeInvocationTasksResponse> {
        return this.bus({ Action: 'DescribeInvocationTasks', Region: region, Payload: query });
    }

    public describeAutomationAgentStatus(region: string, query: ITat.DescribeAutomationAgentStatusRequest): Promise<Required<ITat.DescribeAutomationAgentStatusResponse>> {
        return this.bus({ Action: 'DescribeAutomationAgentStatus', Region: region, Payload: query });

    }
}
