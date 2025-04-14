/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'], // Contentful 图片域名
    unoptimized: true, // Cloudflare Pages 需要此设置
  },
  // 在使用 @cloudflare/next-on-pages 时不需要设置 output: 'export'
  // 注释掉静态导出相关设置
  // i18n: {
  //   locales: ['zh', 'en'],
  //   defaultLocale: 'zh',
  // },
};

export default nextConfig; 