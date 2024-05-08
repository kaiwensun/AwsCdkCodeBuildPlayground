import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_codebuild as codebuild } from 'aws-cdk-lib';
import { version } from 'os';

export class CodeBuildPlaygroundStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const source: codebuild.Source = codebuild.Source.gitHub({
      owner: 'kaiwensun',
      repo: 'leetcode'
    })

    const project = new codebuild.Project(this, 'CdkManagedProject', {
      projectName: 'CdkManagedProject',
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
  }
}
