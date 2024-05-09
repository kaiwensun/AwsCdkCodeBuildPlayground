import { CloudFormationClient, DescribeStacksCommand } from "@aws-sdk/client-cloudformation";
import * as fs from "fs";

let config: {[key: string]: string} | undefined = undefined;
export function loadLocalConfigs(): {[key: string]: string} {
  if (config === undefined) {
    config = JSON.parse(fs.readFileSync(".config.json", "utf-8"));
  }
  return config as {[key: string]: string};
}

export async function getCfnOutputs(stackName: string): Promise<Record<string, string>> {
    const cfn = new CloudFormationClient();
    const resp = await cfn.send(new DescribeStacksCommand({
        StackName: stackName
    }));
    const outputs = resp.Stacks![0].Outputs || [];
    const res: Record<string, string> = {};
    outputs.forEach(item => {
        res[item.OutputKey as string] = item.OutputValue as string;
    });
    return res;
}

