# XHubSell Backend Architecture

## Overview

The XHubSell backend is built using NestJS, a progressive Node.js framework for building efficient, scalable and enterprise-grade server-side applications. This document outlines the architecture, modules, and setup instructions for the backend service.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Validation**: class-validator & class-transformer
- **Security**: Helmet, CORS, Rate Limiting
- **Architecture**: Modular, Layered Architecture

## Project Structure

```
apps/api/src/
├── common/                 # Shared utilities and configurations
│   ├── filters/           # Exception filters
│   ├── interceptors/      # Response interceptors
│   └── pipes/            # Validation pipes
├── health/                # Health check module
│   ├── dto/              # Data transfer objects
│   ├── health.controller.ts
│   ├── health.module.ts
│   └── health.service.ts
├── prisma/                # Database module
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── redis/                 # Redis module
│   ├── redis.module.ts
│   └── redis.service.ts
├── app.controller.ts      # Root controller
├── app.module.ts          # Root module
├── app.service.ts         # Root service
└── main.ts               # Application entry point
```

## Core Modules

### 1. PrismaModule (Global)
Handles database connectivity and operations using Prisma ORM.

**Features:**
- Database connection management
- Connection pooling
- Graceful shutdown handling
- Health check functionality

**Service:** `PrismaService`
- Extends `PrismaClient`
- Implements `OnModuleInit` and `OnModuleDestroy`
- Provides `healthCheck()` method for monitoring

### 2. RedisModule (Global)
Manages Redis connections for caching and rate limiting.

**Features:**
- Connection management with retry logic
- Health check functionality
- Common Redis operations (get, set, incr, etc.)

**Service:** `RedisService`
- Implements `OnModuleInit` and `OnModuleDestroy`
- Provides typed methods for Redis operations
- Built-in connection error handling

### 3. HealthModule
Provides health check endpoints for monitoring application status.

**Endpoints:**
- `GET /health` - Basic health check
- `GET /health/ready` - Readiness probe

**Response includes:**
- Application status
- Database connectivity
- Redis connectivity
- Uptime and version info
- Response time metrics

### 4. Common Components

#### Global Exception Filter
- Catches all exceptions globally
- Formats error responses consistently
- Logs errors appropriately
- Provides detailed error information in development

#### Response Interceptor
- Standardizes API response format
- Adds metadata (timestamp, path) to all responses
- Wraps data in consistent structure

#### Validation Pipe
- Global validation using class-validator
- Automatic transformation using class-transformer
- Whitelisting to prevent extra fields
- Detailed validation error messages

## Configuration

### Environment Variables

```bash
# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=xhubsell
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/xhubsell"

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Rate Limiting Configuration
RATE_LIMIT_TTL=60        # Time window in seconds
RATE_LIMIT_LIMIT=10      # Max requests per window

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

## Security Features

### 1. Helmet
- Sets security-related HTTP headers
- Protects against common web vulnerabilities
- Configured with sensible defaults

### 2. CORS
- Configured for specific frontend origins
- Supports credentials
- Restricts allowed methods and headers

### 3. Rate Limiting
- Configurable request limits
- Uses Redis for distributed rate limiting
- Configurable time windows and limits

### 4. Input Validation
- Global validation pipe
- Automatic DTO validation
- Type transformation and sanitization

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Redis
- pnpm (package manager)

### Installation

1. **Install dependencies:**
   ```bash
   cd apps/api
   pnpm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development services:**
   ```bash
   # From project root
   docker-compose -f docker-compose.dev.yml up -d
   ```

4. **Initialize Prisma:**
   ```bash
   cd apps/api
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server:**
   ```bash
   pnpm run dev
   ```

### Development Commands

```bash
# Development server with hot reload
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start:prod

# Run tests
pnpm run test

# Run tests with coverage
pnpm run test:cov

# Lint code
pnpm run lint

# Type checking
pnpm run type-check
```

## API Response Format

All API responses follow a consistent format:

```typescript
{
  data: T,              // Response data
  meta: {
    timestamp: string,   // ISO timestamp
    path: string        // Request path
  }
}
```

Error responses:
```typescript
{
  statusCode: number,
  timestamp: string,
  path: string,
  method: string,
  message: string,
  error: string
}
```

## Health Endpoints

### Health Check
```
GET /health
```

Returns application health status including database and Redis connectivity.

### Ready Check
```
GET /health/ready
```

Returns application readiness status. Useful for Kubernetes readiness probes.

## Monitoring and Logging

### Logging
- Structured logging with NestJS logger
- Configurable log levels
- Error logging with stack traces
- Request/response logging for debugging

### Health Monitoring
- Database connectivity checks
- Redis connectivity checks
- Response time monitoring
- Application uptime tracking

## Development Best Practices

### 1. Module Structure
- Keep modules focused and single-purpose
- Use dependency injection properly
- Export only what's necessary

### 2. Error Handling
- Use proper HTTP status codes
- Provide meaningful error messages
- Log errors appropriately
- Handle edge cases gracefully

### 3. Validation
- Validate all input data
- Use DTOs for type safety
- Implement custom validators when needed
- Sanitize user input

### 4. Security
- Never expose sensitive data
- Use environment variables for configuration
- Implement proper authentication/authorization
- Keep dependencies updated

## Production Deployment

### Environment Setup
1. Set production environment variables
2. Configure proper database connection pooling
3. Set up Redis clustering if needed
4. Configure proper logging levels

### Database
1. Run database migrations
2. Set up read replicas if needed
3. Configure connection pooling
4. Set up monitoring

### Monitoring
1. Set up application monitoring
2. Configure health check endpoints
3. Set up alerting for errors
4. Monitor performance metrics

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check DATABASE_URL format
   - Verify database is running
   - Check network connectivity

2. **Redis Connection Issues**
   - Verify Redis is running
   - Check Redis host and port
   - Verify network connectivity

3. **Rate Limiting Issues**
   - Check Redis connectivity
   - Verify rate limit configuration
   - Check time window settings

4. **Validation Errors**
   - Check DTO definitions
   - Verify input data format
   - Check validation rules

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and stack traces.

## Next Steps

1. Add authentication module
2. Implement user management
3. Add business logic modules
4. Set up API documentation
5. Add comprehensive testing
6. Set up CI/CD pipeline