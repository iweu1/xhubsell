# XHubSell Deployment Guide

This guide provides step-by-step instructions for deploying the XHubSell full-stack application to production using Vercel (frontend) and Railway (backend + database).

## 🏗️ Architecture Overview

- **Frontend**: Next.js 14 App Router deployed on Vercel
- **Backend**: NestJS API deployed on Railway  
- **Database**: PostgreSQL hosted on Railway
- **Cache**: Redis (optional) hosted on Railway

## 📋 Prerequisites

- GitHub repository with the XHubSell code
- Vercel account (free tier)
- Railway account ($5 free credit/month)
- Domain names (optional, for custom domains)

## 🚀 Deployment Steps

### 1. Frontend Deployment (Vercel)

#### 1.1 Connect Repository to Vercel

1. Sign in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect the Next.js framework

#### 1.2 Configure Build Settings

Vercel will use the `vercel.json` configuration file with these settings:

```json
{
  "buildCommand": "cd apps/web && pnpm build",
  "outputDirectory": "apps/web/.next",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

#### 1.3 Set Environment Variables

In Vercel project settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.railway.app` | Railway backend URL |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` | Vercel frontend URL |

#### 1.4 Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your frontend will be available at `https://xhubsell.vercel.app`

### 2. Backend Deployment (Railway)

#### 2.1 Create Railway Project

1. Sign in to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your XHubSell repository
4. Railway will detect the Node.js application

#### 2.2 Configure Database

1. In your Railway project, click "New Service" → "Add PostgreSQL"
2. Railway will provision a PostgreSQL database
3. Copy the `DATABASE_URL` from database service settings

#### 2.3 Add Redis (Optional)

1. Click "New Service" → "Add Redis"
2. Copy the `REDIS_URL` from Redis service settings

#### 2.4 Configure Backend Service

1. Select your API service
2. Go to "Settings" → "Variables"
3. Add these environment variables:

```bash
# Server Configuration
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://xhubsell.vercel.app

# Database (from Railway PostgreSQL service)
DATABASE_URL=postgresql://postgres:password@host:port/database

# Redis (optional, from Railway Redis service)
REDIS_URL=redis://user:password@host:port

# JWT Secrets (generate secure random strings)
JWT_SECRET=your-super-secure-jwt-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM=noreply@xhubsell.com

# Application Configuration
APP_URL=https://your-backend-url.railway.app
CORS_ORIGIN=https://xhubsell.vercel.app
```

#### 2.5 Configure Deployment Settings

In service settings:

- **Build Command**: `cd apps/api && pnpm build`
- **Start Command**: `cd apps/api && pnpm start:prod`
- **Health Check Path**: `/health`

#### 2.6 Run Database Migrations

Railway will automatically run migrations using the deployment script. You can also run them manually:

1. Go to your API service
2. Click "Console" 
3. Run: `cd apps/api && npx prisma migrate deploy`
4. Run: `cd apps/api && npx prisma db seed`

### 3. Connect Frontend and Backend

#### 3.1 Update CORS Settings

Ensure your backend CORS allows the Vercel domain:

```bash
CORS_ORIGIN=https://xhubsell.vercel.app
```

#### 3.2 Update Frontend API URL

In Vercel environment variables:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

#### 3.3 Test Connectivity

1. Access your Vercel frontend
2. Check browser network tab for API calls
3. Verify API responses are successful

## 🔧 Environment Variables Checklist

### Frontend (Vercel)
- [ ] `NEXT_PUBLIC_API_URL` - Railway backend URL
- [ ] `NEXT_PUBLIC_SITE_URL` - Vercel frontend URL

### Backend (Railway)
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `REDIS_URL` - Redis connection string (optional)
- [ ] `JWT_SECRET` - Secure random string (min 32 chars)
- [ ] `JWT_REFRESH_SECRET` - Secure random string (min 32 chars)
- [ ] `FRONTEND_URL` - Vercel frontend URL
- [ ] `CORS_ORIGIN` - Vercel frontend URL
- [ ] `MAIL_*` - Email configuration
- [ ] `NODE_ENV=production`

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Frontend can't connect to backend
**Solution**: 
- Check `CORS_ORIGIN` in Railway environment variables
- Verify `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Ensure backend is running and accessible

#### 2. Database Connection Errors
**Problem**: Backend can't connect to PostgreSQL
**Solution**:
- Verify `DATABASE_URL` is correctly copied from Railway
- Check database service is running
- Run migrations manually if needed

#### 3. Build Failures
**Problem**: Vercel/Railway builds fail
**Solution**:
- Check build logs for specific errors
- Ensure `pnpm-lock.yaml` is committed
- Verify all dependencies are properly installed

#### 4. Authentication Issues
**Problem**: JWT tokens not working
**Solution**:
- Regenerate JWT secrets with secure random strings
- Ensure secrets are at least 32 characters long
- Check token expiration settings

### Health Check Endpoints

Your deployed services should respond to:

- **Frontend**: `https://xhubsell.vercel.app` (should load the app)
- **Backend Health**: `https://your-backend-url.railway.app/health`
- **Backend Ready**: `https://your-backend-url.railway.app/health/ready`
- **API Docs**: `https://your-backend-url.railway.app/api/docs`

## 🔄 Automatic Deployments

### Vercel
- Automatically deploys on push to `main` branch
- Preview deployments for pull requests
- Can be configured in Vercel dashboard

### Railway
- Automatically deploys on push to `main` branch
- Can be configured in Railway dashboard
- Supports manual redeploy triggers

## 📊 Monitoring

### Vercel
- Built-in analytics and performance monitoring
- Real-time logs
- Error tracking

### Railway
- Service logs in dashboard
- Health checks
- Resource usage metrics

## 🔒 Security Considerations

1. **Environment Variables**: Never commit secrets to Git
2. **HTTPS**: Both platforms provide automatic SSL
3. **CORS**: Properly configure allowed origins
4. **JWT Secrets**: Use strong, randomly generated secrets
5. **Database**: Railway provides secure connections

## 💡 Tips

- Use Railway's free tier wisely ($5/month credit)
- Monitor resource usage to avoid sleep timeouts
- Consider upgrading to paid plans for production traffic
- Set up custom domains for professional appearance
- Configure error monitoring (Sentry, etc.)

## 📞 Support

- **Vercel Documentation**: https://vercel.com/docs
- **Railway Documentation**: https://docs.railway.app
- **GitHub Issues**: Create issues for deployment problems

## 🎉 Success Criteria

Your deployment is successful when:

- [ ] Frontend loads at `https://xhubsell.vercel.app`
- [ ] Backend health checks pass at `/health` and `/health/ready`
- [ ] API documentation is accessible at `/api/docs`
- [ ] Users can register and login
- [ ] Database is properly seeded with initial data
- [ ] CORS is configured correctly
- [ ] Automatic deployments work from Git pushes

---

**🎈 Congratulations! Your XHubSell application is now live!**