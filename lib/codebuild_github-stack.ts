import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_codebuild as codebuild } from 'aws-cdk-lib';
import { loadLocalConfigs } from './utils';

export class CodeBuildGitHubStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const projectName = 'CdkManagedProject';

    const config = loadLocalConfigs()
    const source: codebuild.Source = codebuild.Source.gitHub({
      owner: config['github_user'],
      repo: config['github_repo'],
    })

    const project = new codebuild.Project(this, 'CdkManagedProject', {
      projectName,
      environment: {
        buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_ARM_3
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: [
              'echo Hello world',
              'date',
              'yum install tree -y',
              'tree'
            ]
          }
        }
      }),
      source: source
    });

    new cdk.CfnOutput(this, "CBProjectName", {value: projectName});
  }
}
