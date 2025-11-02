#!/bin/bash

# Generate secure secrets for XHubSell production deployment
# This script generates cryptographically secure random strings for JWT secrets

set -e

echo "🔐 Generating secure secrets for XHubSell production..."

# Function to generate secure random string
generate_secret() {
    local length=${1:-64}
    openssl rand -base64 $length | tr -d "=+/" | cut -c1-$length
}

# Generate JWT secrets
JWT_SECRET=$(generate_secret 64)
JWT_REFRESH_SECRET=$(generate_secret 64)

echo ""
echo "🚀 Generated secrets for Railway environment variables:"
echo ""
echo "JWT_SECRET=${JWT_SECRET}"
echo "JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}"
echo ""
echo "📋 Copy these secrets to your Railway environment variables:"
echo "1. Go to your Railway project"
echo "2. Select the API service"
echo "3. Go to Settings → Variables"
echo "4. Add the two secrets above"
echo ""
echo "⚠️  IMPORTANT: Keep these secrets secure and never commit them to Git!"
echo ""
echo "✅ Secret generation completed!"