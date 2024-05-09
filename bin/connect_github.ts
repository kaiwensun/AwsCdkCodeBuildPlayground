import {
  AuthType,
  CodeBuildClient,
  ImportSourceCredentialsCommand,
  ServerType,
} from "@aws-sdk/client-codebuild";
import { loadLocalConfigs } from "../lib/utils";

export async function main() {
  const cb = new CodeBuildClient();
  const localConfigs = loadLocalConfigs();
  const pat = localConfigs.personal_access_token;
  const resp = await cb.send(
    new ImportSourceCredentialsCommand({
      serverType: ServerType.GITHUB,
      authType: AuthType.PERSONAL_ACCESS_TOKEN,
      token: pat,
    })
  );
  console.log(`Registered: ${resp.arn}`);
}

if (require.main === module) {
  main();
}
