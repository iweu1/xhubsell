# Netlify Functions for XHubSell API

This directory contains Netlify Functions for deploying the XHubSell backend as serverless functions.

## Structure

```
netlify/functions/
├── api/
│   ├── auth/
│   │   ├── login.js
│   │   ├── register.js
│   │   └── refresh.js
│   ├── users/
│   │   ├── profile.js
│   │   └── update.js
│   └── health.js
└── shared/
    ├── db.js
    ├── auth.js
    └── middleware.js
```

## Setup Instructions

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Install dependencies: `npm install`
3. Configure environment variables in Netlify dashboard
4. Deploy: `netlify deploy --prod`

## Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `NODE_ENV` - Set to 'production'

## Notes

- This is an alternative to deploying a full backend service
- Functions are serverless and scale automatically
- Each endpoint is a separate function
- Database connection is established per function call
