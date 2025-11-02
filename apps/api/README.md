# XHubSell Backend Development

This is the backend API service for XHubSell built with NestJS.

## Quick Start

1. **Start development services:**
   ```bash
   # From project root
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Install dependencies:**
   ```bash
   cd apps/api
   pnpm install
   ```

3. **Initialize database:**
   ```bash
   pnpm prisma:generate
   pnpm prisma:push
   ```

4. **Start development server:**
   ```bash
   pnpm run dev
   ```

## Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build for production
- `pnpm run start:prod` - Start production server
- `pnpm run test` - Run unit tests
- `pnpm run test:e2e` - Run e2e tests
- `pnpm run lint` - Lint code
- `pnpm run type-check` - Check TypeScript types

## Database Commands

- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:push` - Push schema to database
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio
- `pnpm db:reset` - Reset database

## Health Endpoints

- `GET http://localhost:3001/health` - Health check
- `GET http://localhost:3001/health/ready` - Readiness probe

## Environment

Copy `.env.example` to `.env` and configure your environment variables.

## Documentation

See `../../docs/README_BACKEND.md` for detailed architecture documentation.