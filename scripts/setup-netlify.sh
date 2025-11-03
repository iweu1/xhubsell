#!/bin/bash

# XHubSell Netlify Deployment Setup Script
# This script helps prepare the project for Netlify deployment

set -e

echo "🚀 XHubSell Netlify Deployment Setup"
echo "===================================="

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed."
    echo "Please install it with: npm install -g netlify-cli"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed."
    echo "Please install it with: npm install -g pnpm"
    exit 1
fi

echo "✅ Required tools are installed"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build the project to verify everything works
echo "🔨 Building project..."
pnpm build

echo "✅ Build successful!"

# Check if netlify.toml exists
if [ ! -f "netlify.toml" ]; then
    echo "❌ netlify.toml not found!"
    exit 1
fi

echo "✅ netlify.toml found"

# Check if environment files exist
if [ ! -f "apps/web/.env.production" ]; then
    echo "❌ apps/web/.env.production not found!"
    echo "Please create it based on apps/web/.env.example"
    exit 1
fi

if [ ! -f "apps/api/.env.production" ]; then
    echo "❌ apps/api/.env.production not found!"
    echo "Please create it based on apps/api/.env.example"
    exit 1
fi

echo "✅ Environment files found"

echo ""
echo "🎯 Next Steps:"
echo "1. Deploy backend to Render/Railway/Vercel first"
echo "2. Update NEXT_PUBLIC_API_URL in Netlify environment variables"
echo "3. Run: netlify login"
echo "4. Run: netlify init"
echo "5. Run: netlify deploy --prod"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_NETLIFY.md"

echo ""
echo "✅ Setup complete! Your project is ready for Netlify deployment."