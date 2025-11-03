# XHubSell Netlify Deployment Guide

This guide provides step-by-step instructions for deploying the XHubSell full-stack application to production using Netlify (frontend) and various backend options.

## 🏗️ Architecture Overview

- **Frontend**: Next.js 14 App Router deployed on Netlify
- **Backend**: NestJS API (Render, Railway, Vercel Serverless, or Netlify Functions)
- **Database**: PostgreSQL (Render, Railway, or Supabase free tier)
- **Cache**: Redis (optional, depending on backend choice)

## 📋 Prerequisites

- GitHub repository with the XHubSell code
- Netlify account (free tier)
- Backend hosting account (Render/Railway/Vercel)
- Domain names (optional, for custom domains)

## 🚀 Deployment Steps

### 1. Frontend Deployment (Netlify)

#### 1.1 Connect Repository to Netlify

1. Sign in to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Select the XHubSell repository

#### 1.2 Configure Build Settings

Netlify will automatically use the `netlify.toml` configuration file with these settings:

```toml
[build]
  command = "cd apps/web && pnpm build"
  publish = "apps/web/.next"
  node_version = "18"
```

#### 1.3 Set Environment Variables

In Netlify site settings → Environment variables:

| Variable               | Value                                 | Description          |
| ---------------------- | ------------------------------------- | -------------------- |
| `NEXT_PUBLIC_API_URL`  | `https://your-backend-url.render.com` | Backend API URL      |
| `NEXT_PUBLIC_SITE_URL` | `https://xhubsell.netlify.app`        | Netlify frontend URL |

#### 1.4 Deploy

1. Click "Deploy site"
2. Wait for build to complete
3. Your frontend will be available at `https://xhubsell.netlify.app`

### 2. Backend Deployment Options

Choose one of these options for your backend:

## Option A: Render (Recommended - Free Tier)

#### 2A.1 Create Render Service

1. Sign in to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure settings:
   - **Name**: `xhubsell-api`
   - **Environment**: `Node`
   - **Build Command**: `cd apps/api && pnpm build`
   - **Start Command**: `cd apps/api && pnpm start:prod`
   - **Instance Type**: `Free`

#### 2A.2 Add Database

1. Click "New" → "PostgreSQL"
2. Choose free tier
3. Copy the `DATABASE_URL` from database settings

#### 2A.3 Configure Environment Variables

In your web service settings:

```bash
# Server Configuration
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://xhubsell.netlify.app

# Database (from Render PostgreSQL)
DATABASE_URL=postgresql://postgres:password@host:port/database

# JWT Secrets (generate secure random strings)
JWT_SECRET=your-super-secure-jwt-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key-min-32-chars

# Application Configuration
APP_URL=https://your-backend-url.onrender.com
CORS_ORIGIN=https://xhubsell.netlify.app
```

#### 2A.4 Run Database Migrations

1. Go to your service → "Shell"
2. Run: `cd apps/api && npx prisma migrate deploy`
3. Run: `cd apps/api && npx prisma db seed`

## Option B: Railway ($5 free credit/month)

#### 2B.1 Create Railway Project

1. Sign in to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your XHubSell repository

#### 2B.2 Configure Database

1. In your Railway project, click "New Service" → "Add PostgreSQL"
2. Copy the `DATABASE_URL` from database service settings

#### 2B.3 Configure Backend Service

1. Select your API service
2. Go to "Settings" → "Variables"
3. Add environment variables (same as Option A)

#### 2B.4 Configure Deployment Settings

- **Build Command**: `cd apps/api && pnpm build`
- **Start Command**: `cd apps/api && pnpm start:prod`
- **Health Check Path**: `/health`

## Option C: Vercel Serverless Functions

#### 2C.1 Deploy API to Vercel

1. Create a new Vercel project
2. Set root directory to `apps/api`
3. Configure build settings:
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

#### 2C.2 Configure Environment Variables

Same as previous options, but use Vercel's environment variables interface.

## Option D: Netlify Functions (Serverless)

#### 2D.1 Convert API to Netlify Functions

1. Create `netlify/functions` directory
2. Convert NestJS endpoints to Netlify function format
3. Update `netlify.toml` functions configuration

#### 2D.2 Add Database Service

Use external database (Supabase, PlanetScale, or Render PostgreSQL).

### 3. Database Setup (Common Steps)

#### 3.1 Choose Database Provider

- **Render PostgreSQL**: Free tier with auto-sleep
- **Railway PostgreSQL**: $5 free credit/month
- **Supabase**: Free tier with generous limits

#### 3.2 Run Migrations

After deploying your backend, run migrations:

```bash
# Via service shell (Render/Railway)
cd apps/api && npx prisma migrate deploy
cd apps/api && npx prisma db seed
```

### 4. Connect Frontend ↔ Backend

#### 4.1 Update Netlify Environment Variables

In Netlify dashboard:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_SITE_URL=https://xhubsell.netlify.app
```

#### 4.2 Update Backend CORS

In your backend environment variables:

```bash
CORS_ORIGIN=https://xhubsell.netlify.app
FRONTEND_URL=https://xhubsell.netlify.app
```

#### 4.3 Test Connectivity

1. Access your Netlify frontend
2. Check browser network tab for API calls
3. Verify API responses are successful

## 🔧 Environment Variables Checklist

### Frontend (Netlify)

- [ ] `NEXT_PUBLIC_API_URL` - Backend API URL
- [ ] `NEXT_PUBLIC_SITE_URL` - Netlify frontend URL

### Backend (Render/Railway/Vercel)

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `JWT_SECRET` - Secure random string (min 32 chars)
- [ ] `JWT_REFRESH_SECRET` - Secure random string (min 32 chars)
- [ ] `FRONTEND_URL` - Netlify frontend URL
- [ ] `CORS_ORIGIN` - Netlify frontend URL
- [ ] `NODE_ENV=production`

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem**: Frontend can't connect to backend
**Solution**:

- Check `CORS_ORIGIN` in backend environment variables
- Verify `NEXT_PUBLIC_API_URL` in Netlify environment variables
- Ensure backend is running and accessible

#### 2. Database Connection Errors

**Problem**: Backend can't connect to PostgreSQL
**Solution**:

- Verify `DATABASE_URL` is correctly copied
- Check database service is running
- Run migrations manually if needed

#### 3. Build Failures

**Problem**: Netlify builds fail
**Solution**:

- Check build logs for specific errors
- Ensure `pnpm-lock.yaml` is committed
- Verify Node.js version compatibility

#### 4. Backend Sleep Issues (Render Free Tier)

**Problem**: Backend takes time to wake up
**Solution**:

- This is expected on free tiers
- Consider upgrading to paid plan for production
- Implement retry logic in frontend

### Health Check Endpoints

Your deployed services should respond to:

- **Frontend**: `https://xhubsell.netlify.app` (should load the app)
- **Backend Health**: `https://your-backend-url.onrender.com/health`
- **Backend Ready**: `https://your-backend-url.onrender.com/health/ready`

## 🔄 Automatic Deployments

### Netlify

- Automatically deploys on push to `main` branch
- Preview deployments for pull requests
- Can be configured in Netlify dashboard

### Backend (Render/Railway/Vercel)

- Automatically deploys on push to `main` branch
- Can be configured in respective dashboards

## 📊 Monitoring

### Netlify

- Built-in analytics and performance monitoring
- Real-time logs
- Form handling
- Function logs

### Backend Options

- **Render**: Service logs, health checks, metrics
- **Railway**: Service logs, health checks, resource usage
- **Vercel**: Function logs, analytics

## 🔒 Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **HTTPS**: All platforms provide automatic SSL
3. **CORS**: Properly configure allowed origins
4. **JWT Secrets**: Use strong, randomly generated secrets
5. **Database**: Use secure connections provided by hosting

## 💡 Tips

- Use Render's free tier for development/testing
- Monitor resource usage to avoid sleep timeouts
- Consider upgrading to paid plans for production traffic
- Set up custom domains for professional appearance
- Configure error monitoring (Sentry, etc.)
- Use Netlify Forms for contact forms
- Implement proper error boundaries in React

## 📞 Support

- **Netlify Documentation**: https://docs.netlify.com/
- **Render Documentation**: https://render.com/docs
- **Railway Documentation**: https://docs.railway.app
- **Vercel Documentation**: https://vercel.com/docs
- **GitHub Issues**: Create issues for deployment problems

## 🎉 Success Criteria

Your deployment is successful when:

- [ ] Frontend loads at `https://xhubsell.netlify.app`
- [ ] Backend health checks pass at `/health` and `/health/ready`
- [ ] Users can register and login
- [ ] Database is properly seeded with initial data
- [ ] CORS is configured correctly
- [ ] Automatic deployments work from Git pushes
- [ ] Preview deployments work for pull requests

---

**🎈 Congratulations! Your XHubSell application is now live on Netlify!**
