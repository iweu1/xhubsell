# XHubSell Deployment Checklist

## 🚀 Pre-Deployment Checklist

### ✅ Repository Setup
- [ ] All code committed to `main` branch
- [ ] `.env.example` files are up to date
- [ ] No hardcoded secrets in the codebase
- [ ] Build passes locally: `pnpm build`
- [ ] Tests pass locally: `pnpm test`
- [ ] Linting passes: `pnpm lint`
- [ ] Type checking passes: `pnpm type-check`

### ✅ Vercel Setup (Frontend)
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Project settings configured
- [ ] Environment variables set:
  - [ ] `NEXT_PUBLIC_API_URL` (Railway backend URL)
  - [ ] `NEXT_PUBLIC_SITE_URL` (Vercel frontend URL)
- [ ] Custom domain configured (optional)
- [ ] Preview deployments enabled for PRs

### ✅ Railway Setup (Backend)
- [ ] Railway account created
- [ ] GitHub repository connected to Railway
- [ ] PostgreSQL service added
- [ ] Redis service added (optional)
- [ ] Environment variables set:
  - [ ] `DATABASE_URL` (from Railway PostgreSQL)
  - [ ] `REDIS_URL` (from Railway Redis, if using)
  - [ ] `JWT_SECRET` (secure random string, 64+ chars)
  - [ ] `JWT_REFRESH_SECRET` (secure random string, 64+ chars)
  - [ ] `FRONTEND_URL` (Vercel frontend URL)
  - [ ] `CORS_ORIGIN` (Vercel frontend URL)
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3001`
  - [ ] Email configuration (if using)
- [ ] Build command: `cd apps/api && pnpm build`
- [ ] Start command: `cd apps/api && pnpm start:prod`
- [ ] Health check path: `/health`

### ✅ Database Setup
- [ ] PostgreSQL database provisioned
- [ ] `DATABASE_URL` copied to environment variables
- [ ] Database migrations run: `prisma migrate deploy`
- [ ] Database seeded: `prisma db seed`
- [ ] Connection tested successfully

## 🚀 Deployment Steps

### 1. Deploy Backend (Railway)
- [ ] Push to `main` branch or trigger manual deployment
- [ ] Monitor build logs
- [ ] Verify health check: `https://your-backend.railway.app/health`
- [ ] Verify ready check: `https://your-backend.railway.app/health/ready`
- [ ] Test API documentation: `https://your-backend.railway.app/api/docs`

### 2. Deploy Frontend (Vercel)
- [ ] Push to `main` branch or trigger manual deployment
- [ ] Monitor build logs
- [ ] Verify frontend loads: `https://your-app.vercel.app`
- [ ] Test API connectivity in browser dev tools
- [ ] Check for CORS errors

### 3. Post-Deployment Verification
- [ ] Frontend loads without errors
- [ ] API calls are successful
- [ ] User registration works
- [ ] User login works
- [ ] Database operations work
- [ ] CORS properly configured
- [ ] SSL/HTTPS working (automatic)

## 🔧 Testing Checklist

### Basic Functionality
- [ ] Homepage loads
- [ ] Navigation works
- [ ] User registration flow
- [ ] User login flow
- [ ] API endpoints respond
- [ ] Database operations work

### Health Checks
- [ ] Frontend: `https://your-app.vercel.app` ✓
- [ ] Backend Health: `https://your-backend.railway.app/health` ✓
- [ ] Backend Ready: `https://your-backend.railway.app/health/ready` ✓
- [ ] API Docs: `https://your-backend.railway.app/api/docs` ✓

### Error Handling
- [ ] 404 pages work
- [ ] Error pages display correctly
- [ ] Network errors handled gracefully
- [ ] Loading states work

## 📊 Monitoring Setup

### Vercel
- [ ] Analytics enabled
- [ ] Real-time logs working
- [ ] Error tracking configured
- [ ] Performance monitoring enabled

### Railway
- [ ] Service logs accessible
- [ ] Health checks passing
- [ ] Resource usage monitored
- [ ] Sleep settings configured

## 🔒 Security Checklist

- [ ] Environment variables are secret (not in Git)
- [ ] JWT secrets are strong (64+ characters)
- [ ] CORS origins are properly restricted
- [ ] HTTPS enabled (automatic)
- [ ] Security headers configured
- [ ] Database access is secure
- [ ] No sensitive data in client-side code

## 🚨 Rollback Plan

### If Backend Fails
1. Check Railway logs for errors
2. Verify environment variables
3. Check database connectivity
4. Rollback to previous deployment if needed

### If Frontend Fails
1. Check Vercel build logs
2. Verify environment variables
3. Check API connectivity
4. Rollback to previous deployment if needed

### If Database Fails
1. Check Railway database service
2. Verify `DATABASE_URL`
3. Run migrations manually if needed
4. Restore from backup if necessary

## 📞 Support Contacts

- **Vercel Support**: https://vercel.com/support
- **Railway Support**: https://railway.app/support
- **GitHub Issues**: Create issue in repository

## ✅ Success Criteria

Deployment is successful when:

- [ ] Frontend accessible at `https://xhubsell.vercel.app`
- [ ] Backend API responding at Railway URL
- [ ] Health checks passing for both services
- [ ] Users can register and login
- [ ] Database operations working
- [ ] CORS properly configured
- [ ] No console errors in browser
- [ ] API calls successful in network tab
- [ ] Automatic deployments working from Git

---

## 🎉 Deployment Complete!

Once all checkboxes are checked, your XHubSell application is successfully deployed to production! 🚀