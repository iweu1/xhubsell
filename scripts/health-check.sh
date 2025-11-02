#!/bin/bash

# Health check script for XHubSell production deployment
# Tests all critical endpoints and functionality

set -e

# Configuration
FRONTEND_URL=${1:-"https://xhubsell.vercel.app"}
BACKEND_URL=${2:-"https://xhubsell-api.railway.app"}

echo "🏥 XHubSell Production Health Check"
echo "=================================="
echo "Frontend URL: $FRONTEND_URL"
echo "Backend URL: $BACKEND_URL"
echo ""

# Function to check URL
check_url() {
    local url=$1
    local name=$2
    local expected_status=${3:-200}
    
    echo -n "🔍 Checking $name... "
    
    if curl -f -s -o /dev/null -w "%{http_code}" "$url" | grep -q "$expected_status"; then
        echo "✅ OK ($expected_status)"
        return 0
    else
        echo "❌ FAILED"
        echo "   URL: $url"
        echo "   Expected: $expected_status"
        return 1
    fi
}

# Function to check API response
check_api_response() {
    local url=$1
    local name=$2
    
    echo -n "🔍 Checking $name API response... "
    
    response=$(curl -s "$url" 2>/dev/null)
    if [ $? -eq 0 ] && [ -n "$response" ]; then
        echo "✅ OK"
        return 0
    else
        echo "❌ FAILED"
        echo "   URL: $url"
        echo "   No response received"
        return 1
    fi
}

# Track failures
failures=0

echo "📊 Testing Frontend"
echo "-------------------"
check_url "$FRONTEND_URL" "Frontend Homepage" || ((failures++))
echo ""

echo "📊 Testing Backend Health Checks"
echo "--------------------------------"
check_url "$BACKEND_URL/health" "Backend Health" || ((failures++))
check_url "$BACKEND_URL/health/ready" "Backend Ready" || ((failures++))
echo ""

echo "📊 Testing API Documentation"
echo "-----------------------------"
check_url "$BACKEND_URL/api/docs" "API Documentation" || ((failures++))
echo ""

echo "📊 Testing API Endpoints"
echo "------------------------"
check_api_response "$BACKEND_URL/health" "Health API"
check_api_response "$BACKEND_URL/health/ready" "Ready API"
echo ""

echo "📊 Testing CORS"
echo "----------------"
echo -n "🔍 Testing CORS headers... "
cors_header=$(curl -s -I -H "Origin: $FRONTEND_URL" "$BACKEND_URL/health" 2>/dev/null | grep -i "access-control-allow-origin" || echo "")
if [[ "$cors_header" == *"$FRONTEND_URL"* ]] || [[ "$cors_header" == *"*"* ]]; then
    echo "✅ OK"
else
    echo "❌ FAILED"
    echo "   CORS header not properly configured"
    ((failures++))
fi
echo ""

echo "📊 Testing SSL/HTTPS"
echo "--------------------"
check_url "$FRONTEND_URL" "Frontend HTTPS" || ((failures++))
check_url "$BACKEND_URL/health" "Backend HTTPS" || ((failures++))
echo ""

# Summary
echo "📋 Health Check Summary"
echo "======================="
if [ $failures -eq 0 ]; then
    echo "🎉 All checks passed! Your XHubSell deployment is healthy."
    echo ""
    echo "🌐 Live Links:"
    echo "   Frontend: $FRONTEND_URL"
    echo "   Backend: $BACKEND_URL"
    echo "   API Docs: $BACKEND_URL/api/docs"
    echo ""
    echo "✅ Deployment Status: HEALTHY"
    exit 0
else
    echo "❌ $failures check(s) failed. Please review the issues above."
    echo ""
    echo "🔧 Troubleshooting:"
    echo "   1. Check Vercel and Railway deployment logs"
    echo "   2. Verify environment variables are correct"
    echo "   3. Ensure CORS is properly configured"
    echo "   4. Check database connectivity"
    echo ""
    echo "❌ Deployment Status: UNHEALTHY"
    exit 1
fi