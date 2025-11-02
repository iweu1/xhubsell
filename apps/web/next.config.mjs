/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@xhubsell/shared-types', '@xhubsell/shared-config'],
};

export default nextConfig;
