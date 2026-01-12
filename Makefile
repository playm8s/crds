SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec

all: build-crds

build-crds:
	cd types && npx pepr crd generate --output ../crds
