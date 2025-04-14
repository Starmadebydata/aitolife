/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'], // Contentful 图片域名
  },
  // 国际化路由
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
};

module.exports = nextConfig; 