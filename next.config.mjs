/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'], // Contentful 图片域名
    unoptimized: true, // Cloudflare Pages 需要此设置
  },
  // 启用静态导出，以便在 Cloudflare Pages 上部署
  output: 'export',
  // 添加尾部斜杠，解决静态导出时的路由问题
  trailingSlash: true,
};

export default nextConfig; 