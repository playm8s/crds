#!/usr/bin/env bash

set -exu

# Apply CRDs
find /work -type f -name '*.yaml' -exec kubectl apply -f {} \;
