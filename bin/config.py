#!/usr/bin/env python3

import os.path as path
import json

FILE_NAME=".config.json"
FIELDS = [
    "github_user",
    "github_repo"
]

file_path = path.join(path.dirname(path.abspath(path.dirname(__file__))), FILE_NAME)

if path.exists(file_path):
    with open(file_path, 'r') as f:
        old = json.load(f)
        print("Existing config:")
        print(json.dumps(old, indent=4))

print("Setting new config:")
config = {}
for field in FIELDS:
    config[field] = input(f"{field}: ")

with open (file_path, 'w') as f:
    json.dump(config, f, indent=4)
