# xhubsell

A modern full-stack monorepo application built with Next.js 14 and NestJS with full internationalization support.

## 🚀 Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - Latest React features
- **next-i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **Express** - Web server
- **nestjs-i18n** - Internationalization for NestJS

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

### Internationalization

- **Supported Languages**: English (en), Russian (ru)
- **Frontend**: next-i18next with App Router support
- **Backend**: nestjs-i18n for API responses
- **Features**: Language detection, URL-based routing, cookie persistence

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

### Database Migrations

The project uses Prisma for database management and migrations.

```bash
# Navigate to API directory
cd apps/api

# Generate Prisma client
pnpm prisma:generate

# Create and apply migrations
pnpm prisma:migrate

# Reset database and reapply migrations
pnpm db:reset

# Seed database with sample data
pnpm db:seed

# Open Prisma Studio (database GUI)
pnpm prisma:studio
```

**Migration Workflow:**

1. After schema changes in `prisma/schema.prisma`:

   ```bash
   pnpm prisma:migrate --name descriptive-name
   ```

2. To reset database with fresh seed data:

   ```bash
   pnpm db:reset
   pnpm db:seed
   ```

3. To deploy migrations to production:
   ```bash
   prisma migrate deploy
   ```

**Schema Documentation:**

- See [docs/schema.md](./docs/schema.md) for complete ERD and model documentation
- Use `pnpm prisma:studio` to visually explore the database

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

## 🌍 Internationalization

This project supports bilingual experience with English (en) and Russian (ru) languages.

### Frontend i18n

- **Framework**: next-i18next with App Router support
- **Language Detection**: Accept-Language header, cookie persistence
- **URL Structure**: `/en/...` and `/ru/...` routes
- **Translation Files**: Located in `apps/web/public/locales/`

#### Usage Examples:

```tsx
// Using translations in components
import { useTranslation } from 'next-i18next';

function MyComponent() {
  const { t } = useTranslation('home');
  return <h1>{t('welcome')}</h1>;
}

// Language switcher
import { LanguageSwitcher } from '@/components/language-switcher';

// Date/currency formatting
import { useLocalizedFormat } from '@/hooks/use-localized-format';

function PriceDisplay({ price, date }) {
  const { formatCurrency, formatDate } = useLocalizedFormat();
  return (
    <div>
      <p>{formatCurrency(price, 'USD')}</p>
      <p>{formatDate(date)}</p>
    </div>
  );
}
```

#### Translation Management:

```bash
# Check for missing translations
cd apps/web
pnpm i18n check

# Add new translation key
pnpm i18n add common welcomeBack "Welcome Back"

# Find unused keys
pnpm i18n unused
```

### Backend i18n

- **Framework**: nestjs-i18n
- **Language Detection**: Accept-Language header, query params, custom headers
- **Translation Files**: Located in `apps/api/src/i18n/`
- **Features**: Validation messages, email templates, API responses

#### Usage Examples:

```typescript
// In controllers
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class MyController {
  constructor(@I18n() private readonly i18n: I18nContext) {}

  async getMessage() {
    return {
      message: await this.i18n.t('validation.required', {
        lang: 'en',
        args: { field: 'email' },
      }),
    };
  }
}

// Email service with i18n
import { EmailService } from '@/common/services/email.service';

@Injectable()
export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  async sendWelcomeEmail(userEmail: string, username: string, language: string) {
    await this.emailService.sendWelcomeEmail(userEmail, username, language);
  }
}
```

### Adding New Languages

1. Add language code to supported locales:
   - `apps/web/next-i18next.config.js`
   - `apps/web/src/middleware.ts`
   - `apps/api/src/app.module.ts`

2. Create translation directories:

   ```bash
   mkdir -p apps/web/public/locales/de
   mkdir -p apps/api/src/i18n/de
   ```

3. Copy and translate all JSON files
4. Update language switcher component

### Documentation

See [docs/i18n-guide.md](./docs/i18n-guide.md) for comprehensive internationalization documentation.

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

### 🌐 Live Demo

- **Frontend**: [https://xhubsell.vercel.app](https://xhubsell.vercel.app)
- **Backend API**: [https://xhubsell-api.railway.app](https://xhubsell-api.railway.app)
- **API Documentation**: [https://xhubsell-api.railway.app/api/docs](https://xhubsell-api.railway.app/api/docs)

### 📋 Quick Deploy

The application is configured for easy deployment to:

#### Frontend Options:

- **Netlify** (Recommended - Next.js) - See [DEPLOYMENT_NETLIFY.md](./DEPLOYMENT_NETLIFY.md)
- **Vercel** (Next.js) - See [DEPLOYMENT.md](./DEPLOYMENT.md)

#### Backend Options:

- **Render** (Recommended - Free tier)
- **Railway** (Backend + Database - NestJS + PostgreSQL)
- **Vercel Serverless Functions**
- **Netlify Functions** (Serverless)

📖 **Deployment guides**:

- [Netlify Deployment](./DEPLOYMENT_NETLIFY.md) - Recommended setup
- [Vercel + Railway Deployment](./DEPLOYMENT.md) - Alternative setup

### 🏗️ Architecture

#### Recommended (Netlify + Render):

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Netlify       │    │   Render        │    │   Render        │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   Next.js       │    │   NestJS        │    │   PostgreSQL    │
│   xhubsell.netlify.app │   xhubsell-api  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

#### Alternative (Vercel + Railway):

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway       │    │   Railway       │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   Next.js       │    │   NestJS        │    │   PostgreSQL    │
│   xhubsell.app  │    │   xhubsell-api  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🛠️ Build for Production

```bash
# Build all apps
pnpm build

# Build specific app
cd apps/web && pnpm build    # Frontend
cd apps/api && pnpm build    # Backend
```

### ⚙️ Production Environment Variables

#### Frontend (Netlify)

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_SITE_URL=https://xhubsell.netlify.app
NODE_ENV=production
```

#### Frontend (Vercel - Alternative)

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NODE_ENV=production
```

#### Backend (Render/Railway)

```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://xhubsell.netlify.app
DATABASE_URL=postgresql://...  # From database provider
JWT_SECRET=your-secure-secret
JWT_REFRESH_SECRET=your-secure-refresh-secret
CORS_ORIGIN=https://xhubsell.netlify.app
```

### 🔧 Health Checks

Production endpoints for monitoring:

#### Netlify + Render Setup:

- **Frontend**: `https://xhubsell.netlify.app` (should load)
- **Backend Health**: `https://your-backend-url.onrender.com/health`
- **Backend Ready**: `https://your-backend-url.onrender.com/health/ready`

#### Vercel + Railway Setup:

- **Frontend**: `https://xhubsell.vercel.app` (should load)
- **Backend Health**: `https://your-backend-url.railway.app/health`
- **Backend Ready**: `https://your-backend-url.railway.app/health/ready`
- **API Docs**: `https://your-backend-url.railway.app/api/docs`

### 🔄 CI/CD

- **Automatic deployments** on push to `main` branch (Netlify/Render/Railway/Vercel)
- **Preview deployments** for pull requests (Netlify/Vercel)
- **Database migrations** run automatically (Render/Railway)

### 📊 Monitoring

#### Netlify Setup:

- **Netlify**: Built-in analytics, real-time logs, function logs
- **Render**: Service logs, health checks, resource metrics

#### Vercel + Railway Setup:

- **Vercel**: Built-in analytics, real-time logs, error tracking
- **Railway**: Service logs, health checks, resource metrics

### 🚨 Free Tier Limits

#### Netlify (Free):

- Unlimited deployments
- 100GB bandwidth/month
- Serverless functions
- 300 minutes build time/month

#### Render (Free):

- Unlimited static sites
- Web services with auto-sleep (15 mins)
- PostgreSQL database
- 750 hours/month

#### Vercel (Free):

- Unlimited deployments
- 100GB bandwidth/month
- Serverless functions

#### Railway ($5/month credit):

- PostgreSQL database
- Auto-sleep after inactivity
- Limited resources

For production traffic, consider upgrading to paid plans.

## 📝 License

This project is proprietary and confidential.

## 👥 Team

For questions or support, please contact the development team.

---

Built with ❤️ using Next.js, NestJS, and Turborepo
