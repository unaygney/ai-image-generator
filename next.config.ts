import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/components/loader.tsx',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`,
        port: '',
        pathname: '/storage/v1/render/image/public/**',
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
