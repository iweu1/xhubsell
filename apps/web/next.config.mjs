/** @type {import('next').NextConfig} */
import { i18n } from './next-i18next.config.js';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@xhubsell/shared-types', '@xhubsell/shared-config'],
  i18n,
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
