# xhubsell

A modern full-stack monorepo application built with Next.js 14 and NestJS.

## 🚀 Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Latest React features

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **Express** - Web server

### Database & Cache

- **PostgreSQL** - Primary database
- **Redis** - Caching and queuing

### Monorepo Tools

- **Turborepo** - High-performance build system
- **pnpm** - Fast, disk space efficient package manager

### Code Quality

- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **commitlint** - Commit message linting

## 📁 Project Structure

```
xhubsell/
├── apps/
│   ├── web/                    # Next.js 14 frontend
│   │   ├── src/
│   │   │   └── app/           # App Router pages
│   │   ├── .env.example
│   │   └── package.json
│   └── api/                    # NestJS backend
│       ├── src/
│       │   ├── app.controller.ts
│       │   ├── app.service.ts
│       │   └── main.ts
│       ├── .env.example
│       └── package.json
├── packages/
│   ├── shared-types/          # Shared TypeScript types
│   └── shared-config/         # Shared configuration
├── docs/
│   └── adr/                   # Architecture Decision Records
├── docker-compose.dev.yml     # Local development services
├── turbo.json                 # Turborepo configuration
├── pnpm-workspace.yaml        # pnpm workspace configuration
└── package.json               # Root package.json
```

## 🛠️ Prerequisites

- **Node.js** >= 18.17.0
- **pnpm** >= 8.0.0
- **Docker** (for local database and Redis)

## 🏁 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

```bash
# Frontend
cp apps/web/.env.example apps/web/.env

# Backend
cp apps/api/.env.example apps/api/.env
```

Edit the `.env` files with your configuration.

### 3. Start Development Services

Start PostgreSQL and Redis using Docker Compose:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### 4. Start Development Servers

```bash
pnpm dev
```

This will start:

- 🌐 **Frontend**: http://localhost:3000
- 🔌 **API**: http://localhost:3001
- 🏥 **API Health Check**: http://localhost:3001/health

### Individual App Development

You can also run apps individually:

```bash
# Frontend only
cd apps/web
pnpm dev

# Backend only
cd apps/api
pnpm dev
```

## 📜 Available Scripts

### Root Level

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `pnpm dev`          | Start all apps in development mode   |
| `pnpm build`        | Build all apps for production        |
| `pnpm lint`         | Lint all apps                        |
| `pnpm format`       | Format code with Prettier            |
| `pnpm format:check` | Check code formatting                |
| `pnpm type-check`   | Type check all apps                  |
| `pnpm test`         | Run tests in all apps                |
| `pnpm clean`        | Clean build outputs and node_modules |
| `pnpm commit`       | Interactive commit with Commitizen   |

### App-Specific

**Web App** (`apps/web/`):

- `pnpm dev` - Start Next.js dev server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Lint the app
- `pnpm type-check` - Type check

**API** (`apps/api/`):

- `pnpm dev` - Start NestJS dev server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm start:debug` - Start with debugger
- `pnpm lint` - Lint the app
- `pnpm type-check` - Type check
- `pnpm test` - Run unit tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:cov` - Run tests with coverage

## 🗄️ Database

### Local Development

PostgreSQL is available via Docker Compose:

```bash
# Start
docker-compose -f docker-compose.dev.yml up -d postgres

# Stop
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f postgres
```

**Connection Details**:

- Host: `localhost`
- Port: `5432`
- Database: `xhubsell`
- User: `postgres`
- Password: `postgres`

## 🔄 Redis

Redis is available for caching and queuing:

```bash
# Start
docker-compose -f docker-compose.dev.yml up -d redis

# Access Redis CLI
docker exec -it xhubsell-redis redis-cli
```

**Connection Details**:

- Host: `localhost`
- Port: `6379`

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific app
cd apps/api
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov
```

## 🔍 Code Quality

### Linting

```bash
pnpm lint
```

### Formatting

```bash
# Check formatting
pnpm format:check

# Format all files
pnpm format
```

### Type Checking

```bash
pnpm type-check
```

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). Use the interactive commit tool:

```bash
pnpm commit
```

Or format manually:

```
<type>(<scope>): <subject>

Examples:
feat(api): add user authentication
fix(web): resolve navigation bug
docs: update README
```

## 📚 Documentation

- [Contributing Guide](./CONTRIBUTING.md)
- [Architecture Decision Records](./docs/adr/)
  - [ADR 001: Monorepo Architecture](./docs/adr/001-monorepo-architecture.md)
  - [ADR 002: Tech Stack Choices](./docs/adr/002-tech-stack-choices.md)

## 🔐 Environment Variables

### Frontend (`apps/web/.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

### Backend (`apps/api/.env`)

```env
PORT=3001
NODE_ENV=development

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=xhubsell
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

This will build all apps in the monorepo.

### Production Environment

Ensure all environment variables are properly set for production:

- Update `JWT_SECRET` with a secure value
- Configure production database credentials
- Set appropriate CORS origins
- Enable HTTPS

## 📝 License

This project is proprietary and confidential.

## 👥 Team

For questions or support, please contact the development team.

---

Built with ❤️ using Next.js, NestJS, and Turborepo
