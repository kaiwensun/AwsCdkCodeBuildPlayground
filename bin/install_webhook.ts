import {
  BatchGetProjectsCommand,
  CodeBuildClient,
  CreateWebhookCommand,
  UpdateWebhookCommand,
  WebhookFilterType,
} from "@aws-sdk/client-codebuild";
import { getCfnOutputs } from "../lib/utils";

const stackName = "CodeBuildGitHubStack";

// Install webhook out of CDK, because WORKFLOW_JOB_QUEUED is not available in CDK yet.
// CDK issue and PR: https://github.com/aws/aws-cdk/issues/30062
// CDK doc: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_codebuild.GitHubSourceProps.html
export async function main() {
  const cb = new CodeBuildClient();
  const cfnOutput = await getCfnOutputs(stackName);
  const projectName = cfnOutput.CBProjectName;
  const project = (
    await cb.send(new BatchGetProjectsCommand({ names: [projectName] }))
  ).projects![0];
  let SetWebhookCommand = project.webhook
    ? UpdateWebhookCommand
    : CreateWebhookCommand;
  if (project.webhook) {
    console.log(`Updating webhook: ${JSON.stringify(project.webhook)}`);
  }
  const resp = await cb.send(
    new SetWebhookCommand({
      projectName,
      filterGroups: [
        [
          {
            type: WebhookFilterType.EVENT,
            // Pattern is a comma separated string.
            // If include both PUSH and WORKFLOW_JOB_QUEUED, then a push may start two build tasks,
            // one by the PUSH in the pattern, another by the source github repo workflow's `on: push` and CB's WORKFLOW_JOB_QUEUED
            pattern: "WORKFLOW_JOB_QUEUED",
          },
        ],
      ],
    })
  );
  console.log(JSON.stringify(resp.webhook));
}

if (require.main === module) {
  main();
}
