SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec

all: build

build:
	npx tsc
	cd src && npx pepr crd generate --output ../crds
