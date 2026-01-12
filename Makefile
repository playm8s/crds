SHELL = /usr/bin/env bash -o pipefail
.SHELLFLAGS = -ec

lint:
	npm run test

build:
	npx tsc
	cd src && npx pepr crd generate --output ../crds
