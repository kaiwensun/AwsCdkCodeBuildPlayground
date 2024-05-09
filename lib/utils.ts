import * as fs from "fs";

let config: {[key: string]: string} | undefined = undefined;
export function load_configs(): {[key: string]: string} {
  if (config === undefined) {
    config = JSON.parse(fs.readFileSync(".config.json", "utf-8"));
  }
  return config as {[key: string]: string};
}
