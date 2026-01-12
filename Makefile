SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec

all: lint build

lint:
	npx eslint src/

build:
	npx tsc
	cd src && npx pepr crd generate --output ../crds
