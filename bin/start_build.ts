import { CodeBuildClient, StartBuildCommand } from "@aws-sdk/client-codebuild";
import { getCfnOutputs } from "../lib/utils";

const stackName = "CodeBuildGitHubStack";

export async function main() {
  const cb = new CodeBuildClient();
  const cfnOutput = await getCfnOutputs(stackName);

  const resp = await cb.send(
    new StartBuildCommand({
      projectName: cfnOutput.CBProjectName,
    })
  );

  console.log(resp.build);
  console.log(`Build ${resp.build?.buildNumber} started: ${resp.build?.id}`);
}

if (require.main === module) {
  main();
}
