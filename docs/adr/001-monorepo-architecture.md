# ADR 001: Monorepo Architecture with Turborepo

## Status

Accepted

## Date

2024-01-01

## Context

We need to establish a scalable and maintainable architecture for XHubSell that includes:

- A Next.js 14 frontend application
- A NestJS backend API
- Shared code between frontend and backend
- Consistent tooling and development experience

## Decision

We will use a **monorepo architecture** powered by **Turborepo** and **pnpm workspaces**.

### Key Components

1. **Package Manager**: pnpm
   - Fast and efficient
   - Native workspace support
   - Strict dependency management

2. **Build System**: Turborepo
   - Intelligent caching and task orchestration
   - Parallel execution
   - Incremental builds

3. **Frontend**: Next.js 14 with App Router
   - Modern React features
   - Server and client components
   - Built-in optimization
   - TypeScript support

4. **Backend**: NestJS
   - Enterprise-grade architecture
   - Dependency injection
   - Decorator-based routing
   - TypeScript native

5. **Shared Packages**:
   - `@xhubsell/shared-types`: Common TypeScript types
   - `@xhubsell/shared-config`: Shared configuration

### Directory Structure

```
xhubsell/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── shared-types/
│   └── shared-config/
├── turbo.json        # Turborepo configuration
├── pnpm-workspace.yaml
└── package.json
```

## Consequences

### Positive

- **Code Sharing**: Easy to share types, utilities, and configurations
- **Atomic Changes**: Changes across frontend and backend in single commits
- **Consistent Tooling**: Single set of dev tools for entire codebase
- **Fast Builds**: Turborepo's caching significantly speeds up builds
- **Type Safety**: Shared types ensure API contracts are maintained
- **Developer Experience**: Single `pnpm install` and `pnpm dev` for entire stack

### Negative

- **Learning Curve**: Team needs to understand monorepo concepts
- **Initial Setup**: More complex initial configuration
- **CI/CD Complexity**: Need to handle multiple deployments from single repo

### Neutral

- **Repository Size**: Will grow larger than separate repos, but manageable with proper .gitignore
- **Dependency Management**: Requires discipline to avoid circular dependencies

## Alternatives Considered

### 1. Separate Repositories (Polyrepo)

- **Pros**: Independent versioning, simpler CI/CD per app
- **Cons**: Code duplication, harder to maintain consistency, complex cross-repo changes
- **Reason for Rejection**: Overhead of maintaining shared code across repos

### 2. Lerna

- **Pros**: Mature tool, good for publishing packages
- **Cons**: Slower than Turborepo, more configuration required
- **Reason for Rejection**: Turborepo offers better performance and simpler setup

### 3. Nx

- **Pros**: Feature-rich, excellent tooling
- **Cons**: Opinionated, steeper learning curve, heavier weight
- **Reason for Rejection**: Turborepo provides sufficient features with less complexity

## References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Monorepo Best Practices](https://monorepo.tools/)
