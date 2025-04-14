# Cloudflare 免费计划部署指南

本文档详细说明如何使用 Cloudflare 免费计划将 AIToLife.net 项目部署到 Cloudflare 平台，仅使用免费提供的 Cloudflare Pages 和有限的 Workers 功能。

## 1. 前期准备

### 1.1 Cloudflare 账户设置

1. 注册或登录 [Cloudflare 账户](https://dash.cloudflare.com/)
2. 使用免费计划，该计划包括:
   - Cloudflare Pages: 无限站点，每月构建 500 次
   - Workers: 每日 100,000 请求限制
   - 免费的 HTTPS 和 CDN 服务

### 1.2 域名配置

1. 购买并添加域名 `aitolife.net` 到 Cloudflare
2. 将域名服务器更改为 Cloudflare 提供的服务器
3. 确认域名已成功激活并由 Cloudflare 管理

### 1.3 开发环境配置

1. 安装 Wrangler CLI (Cloudflare Workers 命令行工具):
   ```bash
   npm install -g wrangler
   ```

2. 登录到 Wrangler:
   ```bash
   wrangler login
   ```

3. 确认 `wrangler.toml` 文件存在于项目根目录

## 2. Cloudflare Pages 设置

### 2.1 创建 Cloudflare Pages 项目

1. 在 Cloudflare 控制台导航至 Pages
2. 点击 "创建应用"
3. 选择 "连接到 Git"
4. 选择 GitHub 作为 Git 提供商并授权
5. 选择 `aitolife` 仓库
6. 配置构建设置:
   - 项目名称: `aitolife`
   - 生产分支: `main`
   - 构建命令: `npm run build`
   - 构建输出目录: `.next`
   - 根目录: `/` (默认)

### 2.2 环境变量配置

添加以下环境变量:

| 环境变量 | 生产值 | 预览值 |
|----------|--------|--------|
| NODE_VERSION | 18.17.0 | 18.17.0 |
| CONTENTFUL_SPACE_ID | your_space_id | your_space_id |
| CONTENTFUL_ACCESS_TOKEN | your_delivery_api_token | your_preview_api_token |
| CONTENTFUL_PREVIEW_TOKEN | your_preview_api_token | your_preview_api_token |
| CONTENTFUL_PREVIEW_SECRET | your_preview_secret | your_preview_secret |
| CONTENTFUL_ENVIRONMENT | master | master |
| NEXT_PUBLIC_SITE_URL | https://aitolife.net | https://preview.aitolife.net |

注意: 我们不使用 Clerk 认证服务，而是依赖静态内容生成和无状态设计，避免需要付费服务。

### 2.3 自定义构建输出

创建 `functions/_middleware.js` 文件以正确处理 Next.js 输出:

```javascript
export async function onRequest({ request, next, env }) {
  // 添加安全头部
  const response = await next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}
```

### 2.4 配置自定义域名

1. 在项目的 "自定义域" 部分点击 "设置自定义域"
2. 输入 `aitolife.net` 作为域名
3. Cloudflare 将自动配置 DNS 设置
4. 添加 `www.aitolife.net` 作为额外域名，并设置重定向到主域名

### 2.5 配置构建缓存

在项目根目录创建 `.cloudflare/cache` 文件:

```toml
# 缓存依赖项
[[build.cacheDirs]]
path = "node_modules/.cache"

[[build.cacheDirs]]
path = ".next/cache"
```

### 2.6 静态内容生成优化

为了充分利用 Cloudflare 免费计划，采用以下策略:

1. **增量构建**: 合理安排构建时间，避免超出免费计划的 500 次/月构建限制
2. **内容缓存**: 最大化利用 Cloudflare 的 CDN 缓存静态内容
3. **懒加载资源**: 使用懒加载技术减少初始页面加载资源
4. **图片优化**: 在上传到 Contentful 前优化图片大小和格式

## 3. 静态生成和有限的互动功能

由于我们使用 Cloudflare 免费计划，我们将采用主要依赖静态生成的方法，并最小化 Workers 的使用。

### 3.1 使用较少的 Workers 资源

在免费计划中，我们可以有限地使用 Workers（每日 100,000 请求），因此我们将:

1. 主要使用静态生成内容
2. 将站点设计为主要是无状态的
3. 仅在绝对必要时使用 Workers

配置最小化的 `wrangler.toml` 文件:

```toml
name = "aitolife"
main = "./worker/index.js"
compatibility_date = "2023-05-18"

# 开发环境配置
[env.development]
workers_dev = true

# 生产环境配置
[env.production]
workers_dev = false
route = "aitolife.net/*"
```

### 3.2 静态站点生成优化

由于我们不使用 Cloudflare 的 D1 数据库或 KV 存储（付费功能的高级用法），我们将:

1. 在构建时从 Contentful 获取所有内容
2. 生成完全静态的页面
3. 最大限度使用 Next.js 的静态生成能力

创建高效的静态生成配置 (`next.config.js`):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 使用静态导出
  images: {
    unoptimized: true, // Cloudflare Pages 需要此设置
    domains: ['images.ctfassets.net'] // Contentful 域名
  },
  // 国际化配置
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en'
  },
  // 在构建时生成所有页面
  async generateStaticParams() {
    // 从 Contentful 获取所有路径数据
    // 将在构建时生成所有页面
  }
};

module.exports = nextConfig;
```

### 3.3 最小化的互动功能

对于有限的互动功能，我们使用第三方服务或简单的 Workers:

#### 3.3.1 简单的邮件订阅 Worker

创建 `functions/api/subscribe.js` 用于邮件订阅功能:

```javascript
export async function onRequest({ request }) {
  try {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const data = await request.json();
    const email = data.email;
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 使用第三方服务处理邮件订阅
    // 这里我们只做简单验证，实际订阅可以使用免费的邮件服务如 Mailchimp 或 Buttondown
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

## 4. 替代付费服务的解决方案

由于我们使用 Cloudflare 免费计划，需要寻找替代付费功能的解决方案：

### 4.1 用户互动替代方案

1. **评论系统**: 使用第三方免费评论系统如 [Giscus](https://giscus.app/)（基于 GitHub Discussions）
   ```jsx
   // 在博客文章页面集成 Giscus
   <section className="comments-section">
     <script src="https://giscus.app/client.js"
        data-repo="yourusername/aitolife-comments"
        data-repo-id="R_kgDOXXXXXX"
        data-category="General"
        data-category-id="DIC_kwDOXXXXXX"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
     </script>
   </section>
   ```

2. **表单提交**: 使用 [Formspree](https://formspree.io/)（有免费层级）或 [Getform](https://getform.io/)

### 4.2 数据存储替代方案

1. **静态内容**: 从 Contentful 生成并存储为静态 HTML
2. **用户偏好**: 使用浏览器本地存储 (localStorage)
   ```javascript
   // 保存用户偏好
   const savePreference = (key, value) => {
     localStorage.setItem(`aitolife_${key}`, JSON.stringify(value));
   };
   
   // 获取用户偏好
   const getPreference = (key) => {
     const data = localStorage.getItem(`aitolife_${key}`);
     return data ? JSON.parse(data) : null;
   };
   ```

### 4.3 分析替代方案

使用 [Plausible Analytics](https://plausible.io/) 或 [Umami](https://umami.is/) 替代 Cloudflare Analytics（这些服务有自托管选项或免费层级）

## 5. 免费计划的扩展策略

在保持免费计划的同时最大化网站功能：

### 5.1 静态站点生成 (SSG) 最佳实践

1. 预构建所有可能的页面路径
2. 实现增量静态再生成（通过定期重新部署）
3. 使用客户端渲染 (CSR) 处理动态内容
4. 使用 [SWR](https://swr.vercel.app/) 或 [React Query](https://react-query.tanstack.com/) 进行数据请求

### 5.2 优化 Workers 使用

在免费计划的 100,000 请求/天限制内合理使用 Workers:

1. 实现前端缓存以减少 API 调用
2. 使用防抖和节流控制请求频率
3. 优先使用静态资源而非动态请求
4. 监控 Workers 使用情况，避免超出限额

### 5.3 内容分发优化

1. 使用适当的缓存头部最大化 CDN 利用率
2. 实现图片懒加载减少带宽使用
3. 优化字体加载（使用 `font-display: swap`）
4. 使用渐进式图片加载