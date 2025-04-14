/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.ctfassets.net', // Contentful 图片域名
      'zyyohqjzmznepywbsbir.supabase.co', // Supabase 存储域名
    ],
    // 在 Vercel 上部署不需要 unoptimized 设置
    // unoptimized: true,
  },
  // 在 Vercel 上部署不需要静态导出
  // output: 'export',
  // 禁用 /404 路由的静态生成
  trailingSlash: true,
};

module.exports = nextConfig; 