/** @type {import('next').NextConfig} */
import { i18n } from './next-i18next.config.js';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@xhubsell/shared-types', '@xhubsell/shared-config'],
  i18n,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
