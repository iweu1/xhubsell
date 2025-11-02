#!/bin/bash

# Database deployment script for XHubSell
# This script runs Prisma migrations and seeds for production deployment

set -e

echo "🚀 Starting database deployment..."

# Navigate to API directory
cd apps/api

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set"
    exit 1
fi

echo "📊 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Running database seed..."
npx prisma db seed

echo "✅ Database deployment completed successfully!"

# Verify database connection
echo "🔍 Verifying database connection..."
npx prisma db pull --schema=./prisma/schema.prisma > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Database connection verified successfully!"
else
    echo "❌ WARNING: Database connection verification failed"
    exit 1
fi