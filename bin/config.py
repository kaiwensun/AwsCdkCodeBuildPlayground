#!/usr/bin/env python3

import os.path as path
import os
import json

from getpass import getpass



FILE_NAME=".config.json"
FIELDS = {
    "github_user": {
        "default": "kaiwensun"
    },
    "github_repo": {
        "default": "leetcode"
    },
    "personal_access_token": {
        "is_password": True,
    }
}

file_path = path.join(path.dirname(path.abspath(path.dirname(__file__))), FILE_NAME)
password_keys = [key for key in FIELDS.keys() if FIELDS.get(key, {}).get('is_password', False)]


if path.exists(file_path):
    with open(file_path, 'r') as f:
        old = json.load(f)
else:
    old = {}
    for field in FIELDS:
        if 'default' in FIELDS.get(field, {}):
            old[field] = FIELDS[field]['default']

redacted = dict(old)
for field in redacted:
    if FIELDS.get(field, {}).get('is_password'):
        redacted[field] = '<redacted>'

print("Existing config:")
print(json.dumps(redacted, indent=4))

print('Setting new config (input "DEL" to delete):')
config = dict(old)
for field in FIELDS:
    ask = f"{field}: "
    if field in redacted:
        ask = f"{field} [{redacted[field]}]:"
    getter = getpass if FIELDS.get(field, {}).get("is_password") else input
    val = getter(ask)
    if val == "DEL":
        if field in config:
            del config[field]
    elif val:
        config[field] = val

with open (file_path, 'w') as f:
    json.dump(config, f, indent=4)
os.chmod(file_path, 0o600)