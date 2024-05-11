# CodeBuild Playground

** THIS IS A PERSONAL REPOSITORY. THIS IS NOT ENDORSED BY AWS OR CODEBUILD.**

This repository uses CDK to create basic resources required by AWS CodeBuild, so you can quickly create a basic CodeBuild project and run a build.

## Prerequisites
* Python3 (for `/bin/config.py`)
* [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* CDK: `npm install -g aws-cdk`
* [Set a GitHub access token](https://docs.aws.amazon.com/codebuild/latest/userguide/access-tokens.html#access-tokens-github-prereqs), if needed.

## Setup infra

TODO

## Useful commands

* `npm run config`  generate a personalized `.config.json` file to configure the stack
* `npx ts-node <file>`, where the `<file>` can be,
  * `bin/connect_github.ts`  connect the CodeBuild to GitHub PAT (not project-specific)
  * `bin/start_build.ts`     start a CodeBuild build

## Useful TypeScript/CDK commands

The `cdk.json` file tells the CDK Toolkit how to execute your app.

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
