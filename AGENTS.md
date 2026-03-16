# AGENTS.md

This document provides essential information for agentic coding assistants working with this repository.

## Build Commands

### Main Build Process

```bash
# Install dependencies
npm install

# Compile TypeScript to JavaScript
npx tsc

# Generate CRDs (from src directory)
cd src && npx pepr crd generate --output ../crds
```

### Package Publishing

```bash
# Publish to GitHub Packages
npm publish
```

## Linting Commands

### ESLint

```bash
# Lint all files
npx eslint .

# Lint specific file
npx eslint src/api/v1/gameserver_types.ts

# Auto-fix lint issues
npx eslint . --fix
```

### Prettier Formatting

```bash
# Check formatting
npx prettier --check .

# Format all files
npx prettier --write .

# Format specific file
npx prettier --write src/api/v1/gameserver_types.ts
```

## Test Commands

Note: This repository currently does not have unit tests configured. Testing is done through integration with Kubernetes clusters.

## Code Style Guidelines

### Language and Extensions

- Primary language: TypeScript
- File extensions: `.mts` for modules, `.ts` for types
- Strict TypeScript mode enabled (`strict: true` in tsconfig.json)
- ES Modules syntax (import/export) required

### Imports

1. Use ES6 import syntax exclusively
2. Import ordering (top to bottom):
   - Node.js built-in modules
   - External packages
   - Internal modules
3. Use explicit file extensions in imports when required
4. Group related imports with blank lines
5. Use destructuring imports when importing multiple items from a module

Example:

```typescript
import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { Games, StorageStrategies, StatusReasons } from './enums/index.mjs';
```

### Formatting

Follow the Prettier configuration:

- Single quotes for strings
- Semicolons required
- Trailing commas in ES5 contexts
- 2-space indentation
- No trailing whitespace

### Types

1. Use TypeScript interfaces for data structures
2. Use TypeScript classes for objects with methods
3. Explicitly type all function parameters and return values
4. Use `readonly` for properties that shouldn't change
5. Use `unknown` instead of `any` when type is truly unknown
6. Prefer union types over enums when possible for better compatibility

### Naming Conventions

1. Use PascalCase for classes, interfaces, and types
2. Use camelCase for variables, functions, and methods
3. Use UPPER_SNAKE_CASE for constants
4. Use descriptive names that clearly indicate purpose
5. Prefix boolean variables with `is`, `has`, `should`, etc.
6. Use singular names for enums (`Games` not `GameList`)

### Error Handling

1. Use proper TypeScript error typing
2. Handle promises with async/await or proper catch handling
3. Use the `@typescript-eslint/no-floating-promises` rule to prevent unhandled promises
4. Include meaningful error messages
5. Log errors appropriately for debugging

### Documentation

1. Use JSDoc-style comments for all exported functions, classes, and interfaces
2. Document all parameters and return values
3. Include example usage when helpful
4. Keep comments up-to-date with code changes

### Kubernetes-Specific Patterns

1. Follow CDK8s patterns for defining Kubernetes resources
2. Use proper GroupVersionKind definitions for each resource
3. Implement `IApiResource` interface for API resources
4. Use proper metadata structures from `@kubernetes/client-node`
5. Follow Kubernetes naming conventions for resources

### Enums

1. Use PascalCase for enum names
2. Use camelCase for enum values when they are strings
3. Export enums in index files for easy importing
4. Document the purpose of each enum and its values

### Classes and Interfaces

1. Define interfaces for data structures
2. Use classes when behavior (methods) is needed
3. Implement proper inheritance patterns when extending CDK8s/Constructs classes
4. Use proper access modifiers (`public`, `private`, `protected`)
5. Initialize class properties in constructor

### Resource Definitions

1. Follow Kubernetes Custom Resource Definition patterns
2. Include proper `spec` and `status` interfaces
3. Implement proper JSON serialization methods
4. Use consistent naming for GVK (GroupVersionKind) definitions
5. Include proper manifest generation methods

## Repository Structure

- `src/` - Source code files
- `src/api/` - API definitions
- `src/api/v1/` - Version 1 of the API
- `src/api/v1/enums/` - Enumerations used in the API
- `dist/` - Compiled output
- `crds/` - Generated Custom Resource Definitions
- `node_modules/` - Dependencies (not committed)

## Development Workflow

1. Make changes to files in `src/`
2. Run `npx tsc` to compile
3. Run linting with `npx eslint .`
4. Format code with `npx prettier --write .`
5. Generate CRDs with `cd src && npx pepr crd generate --output ../crds`
6. Commit changes to git
7. Tag with version number for release

## Dependency Management

- Runtime dependencies in `dependencies` section of package.json
- Development dependencies in `devDependencies` section of package.json
- Use `npm install --save` for runtime dependencies
- Use `npm install --save-dev` for development dependencies

## Node.js Version

This project requires Node.js version 24 or higher as specified in package.json.

## License

This project is licensed under CC-BY-SA-4.0 as specified in package.json.
