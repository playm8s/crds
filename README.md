# PlayM8s Custom Resource Definitions (CRDs)

This package contains the Custom Resource Definitions (CRDs) for the PlayM8s gaming platform, a Kubernetes-native gaming infrastructure.

## Overview

PlayM8s is a Kubernetes-based platform for managing game servers at scale. This package defines the custom resources used by the platform:

1. **Gameserver** - Represents a deployed game server instance
2. **GameserverBase** - Defines the base configuration for a game server
3. **GameserverOverlay** - Provides overlay configurations that can be applied to a GameserverBase

## CRDs

### Gameserver

A Gameserver represents a deployed instance of a game server. It combines a GameserverBase with zero or more GameserverOverlays to create a complete game server configuration.

Key specifications:

- Game: The game type (e.g., csgo)
- GameserverBase: Reference to the base configuration
- GameserverOverlays: List of overlays to apply
- StorageClassName: Storage class for persistence
- StorageStrategy: Strategy for storage management

### GameserverBase

A GameserverBase defines the foundational configuration for a specific game type. Multiple Gameserver instances can be created from the same base.

Key specifications:

- Game: The game type (e.g., csgo)
- StorageClassName: Storage class for persistence
- StorageStrategy: Strategy for storage management

### GameserverOverlay

A GameserverOverlay provides additional configuration that can be layered on top of a GameserverBase to customize specific instances.

Key specifications:

- Game: The game type (e.g., csgo)
- StorageClassName: Storage class for persistence
- StorageStrategy: Strategy for storage management

## Installation

To install the CRDs in your Kubernetes cluster:

```bash
kubectl apply -f crds/
```

Or using the provided script:

```bash
./entrypoint.sh
```

## Usage

Once installed, you can create PlayM8s resources in your Kubernetes cluster:

```yaml
apiVersion: pm8s.io/v1
kind: Gameserver
metadata:
  name: my-game-server
spec:
  Game: csgo
  GameserverBase: csgo-base
  GameserverOverlays:
    - csgo-overlay-1
    - csgo-overlay-2
  StorageClassName: fast-ssd
  StorageStrategy: raw
```

## Development

### Prerequisites

- Node.js >= 24.0.0
- Kubernetes cluster for testing
- kubectl configured for your cluster

### Building

```bash
npm install
npm run build
```

### Generating CRDs

CRDs are generated from the TypeScript definitions using Pepr:

```bash
cd src && npx pepr crd generate --output ../crds
```

### Linting

```bash
npm run lint
```

### Publishing

```bash
npm publish
```

## License

This project is licensed under CC-BY-SA-4.0.
