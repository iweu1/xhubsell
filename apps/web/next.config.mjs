/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ['@xhubsell/shared-types', '@xhubsell/shared-config'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Make sure API URL is not localhost during build
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  // Disable static optimization for pages that need API
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
