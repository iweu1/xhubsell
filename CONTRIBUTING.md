# Contributing to XHubSell

Thank you for your interest in contributing to XHubSell! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- pnpm >= 8.0.0
- Docker (for local database and Redis)

### Initial Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd xhubsell
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   # For the web app
   cp apps/web/.env.example apps/web/.env

   # For the API
   cp apps/api/.env.example apps/api/.env
   ```

4. Start the development services (Postgres and Redis):

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

5. Start the development servers:

   ```bash
   pnpm dev
   ```

   This will start:
   - Web app (Next.js) at http://localhost:3000
   - API (NestJS) at http://localhost:3001

## Development Workflow

### Workspace Structure

This is a monorepo managed with Turborepo and pnpm workspaces:

```
xhubsell/
├── apps/
│   ├── web/          # Next.js 14 frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── shared-types/ # Shared TypeScript types
│   └── shared-config/ # Shared configuration
└── ...
```

### Available Scripts

From the root directory:

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all apps
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check formatting
- `pnpm type-check` - Type check all apps
- `pnpm test` - Run tests in all apps
- `pnpm clean` - Clean all build outputs and node_modules

From individual app directories:

- `cd apps/web && pnpm dev` - Start only the web app
- `cd apps/api && pnpm dev` - Start only the API

## Code Style

### General Guidelines

- Use TypeScript for all new code
- Follow the existing code structure and patterns
- Write meaningful variable and function names
- Keep functions small and focused
- Add comments only when necessary to explain complex logic

### Formatting and Linting

This project uses:

- **Prettier** for code formatting
- **ESLint** for linting
- **EditorConfig** for consistent editor settings

Code style is enforced automatically via:

- Pre-commit hooks (Husky + lint-staged)
- CI/CD pipeline

Before committing, ensure your code is formatted:

```bash
pnpm format
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation only changes
- `style` - Changes that don't affect code meaning (formatting, etc.)
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `build` - Changes to build system or dependencies
- `ci` - Changes to CI configuration
- `chore` - Other changes that don't modify src or test files
- `revert` - Reverts a previous commit

### Examples

```bash
feat(api): add user authentication endpoint
fix(web): resolve navigation issue on mobile
docs: update contributing guidelines
```

### Using Commitizen (Recommended)

For interactive commit message creation:

```bash
pnpm commit
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for a specific app
cd apps/api && pnpm test

# Run tests in watch mode
cd apps/api && pnpm test:watch

# Run tests with coverage
cd apps/api && pnpm test:cov
```

### Writing Tests

- Write unit tests for business logic
- Write integration tests for API endpoints
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern

## Pull Request Process

1. Create a new branch from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes and commit following the commit guidelines

3. Ensure all checks pass:

   ```bash
   pnpm lint
   pnpm type-check
   pnpm test
   pnpm build
   ```

4. Push your branch and create a pull request

5. Fill out the pull request template with:
   - Description of changes
   - Related issue numbers
   - Screenshots (if applicable)
   - Checklist completion

6. Wait for code review and address feedback

7. Once approved, your PR will be merged

## Questions?

If you have questions or need help, please:

- Open an issue on GitHub
- Reach out to the maintainers

Thank you for contributing! 🎉
