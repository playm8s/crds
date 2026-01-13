SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec

all: lint build

lint:
	npx eslint src/

build: lint
	npx tsc
	cd src && npx pepr crd generate --output ../crds

apply-crds: build
	find ./crds -type f -name '*.yaml' -exec kubectl apply -f {} \;
