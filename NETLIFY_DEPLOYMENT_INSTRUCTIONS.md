# Netlify Deployment Instructions

## Overview
This project is a Next.js 14 application using App Router with SSR (Server-Side Rendering) support.

## Changes Made

### 1. ✅ Updated netlify.toml
- Fixed redirect handler to use `/.netlify/functions/___netlify-handler`
- Added `force = true` to the redirect rule
- Added `[functions]` section with proper configuration:
  - `directory = "apps/web/.netlify/functions-internal"`
  - `node_bundler = "esbuild"`

### 2. ✅ Verified next.config.mjs
- Confirmed NO `output: 'export'` (SSR mode enabled)
- Has `images: { unoptimized: true }` for Netlify
- Has API rewrites configured for proxy functionality

### 3. ✅ Created .npmrc
- Added `shamefully-hoist=true` for proper dependency resolution

### 4. ✅ Updated .gitignore
- Added `.netlify` directory to gitignore

## Netlify Dashboard Settings

### Build & Deploy Settings
These settings should already be configured via `netlify.toml`, but verify in the dashboard:

**Build settings:**
- **Base directory:** (leave empty or set to root)
- **Build command:** `pnpm install && cd apps/api && npx prisma generate && cd ../.. && pnpm build`
- **Publish directory:** `apps/web/.next`

**Environment variables:**
- `NODE_VERSION`: `20`
- `PNPM_VERSION`: `10`
- `NPM_FLAGS`: `--legacy-peer-deps`

### Additional Environment Variables
Add these in the Netlify Dashboard under **Site settings > Environment variables**:

Required:
- `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g., `https://your-api-domain.com`)

Optional (if using database):
- `DATABASE_URL`: Your database connection string
- Any other API keys or secrets your app needs

### Deploy Settings
1. Go to **Site settings > Build & deploy**
2. Ensure **Deploy contexts** are configured:
   - **Production branch:** `main` (or your default branch)
   - **Branch deploys:** Enable for feature branches if needed
3. **Build hooks:** Can be set up for automated deployments

## Verification Steps

After deploying:

1. ✅ Check that the site loads without 404 errors
2. ✅ Verify API routes work (check `/api/public/categories`)
3. ✅ Test navigation between pages
4. ✅ Check browser console for errors
5. ✅ Verify images load properly

## Troubleshooting

### If you still see 404 errors:

1. **Check Deploy Logs:**
   - Go to **Deploys** tab in Netlify Dashboard
   - Click on the latest deploy
   - Review build logs for errors

2. **Verify Functions:**
   - Go to **Functions** tab
   - You should see `___netlify-handler` function
   - Check function logs for errors

3. **Clear Cache:**
   - In Netlify Dashboard: **Deploys > Trigger deploy > Clear cache and deploy site**

4. **Check Redirects:**
   - Go to **Site settings > Build & deploy > Post processing > Snippet injection**
   - Verify redirects are being applied

### Common Issues:

**Build fails:**
- Ensure all environment variables are set
- Check that pnpm version matches (10.x)
- Verify Node version is 20

**API calls fail:**
- Verify `NEXT_PUBLIC_API_URL` environment variable is set correctly
- Check CORS settings on your backend API
- Ensure backend API is accessible from Netlify

**Images don't load:**
- Already configured with `unoptimized: true`
- Check image paths are correct

## Support

If issues persist:
1. Check Netlify build logs for specific errors
2. Review Next.js SSR requirements for Netlify
3. Verify all environment variables are set correctly
4. Test locally with `pnpm build && pnpm start` to ensure SSR works

## Resources

- [Netlify Next.js SSR Documentation](https://docs.netlify.com/frameworks/next-js/overview/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
