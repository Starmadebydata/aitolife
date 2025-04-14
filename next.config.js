/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'], // Contentful 图片域名
    unoptimized: true, // Cloudflare Pages 需要此设置
  },
  // 启用静态导出，以便在 Cloudflare Pages 上部署
  output: 'export',
  // 我们不能在静态导出模式下使用国际化路由，所以先注释掉
  // i18n: {
  //   locales: ['zh', 'en'],
  //   defaultLocale: 'zh',
  // },
  // 禁用 /404 路由的静态生成
  trailingSlash: true,
};

module.exports = nextConfig; 