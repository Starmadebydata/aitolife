# AIToLife - 日常生活 AI 应用指南

AIToLife 是一个帮助用户了解如何在日常生活中应用 AI 技术的平台，提供实用指南、工具推荐和相关知识分享。

🔗 **网站地址**: [AIToLife.net](https://aitolife.net)

## 💡 项目特性

- 🌏 中英文双语支持
- 🎨 现代化响应式设计
- 🚀 基于 Next.js 的快速加载体验
- 🌙 明暗模式切换
- 📱 移动端友好的界面
- 🖥️ 静态网站生成，支持 CDN 部署
- 🔄 基于 Contentful CMS 的内容管理

## 🛠️ 技术栈

- **前端框架**: [Next.js](https://nextjs.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **国际化**: 客户端 i18n 实现 (localStorage)
- **CMS**: [Contentful](https://www.contentful.com/)
- **部署**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **图标**: [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 快速开始

### 前提条件

- Node.js 16.x 或更高版本
- npm 或 yarn

### 安装

1. 克隆仓库

```bash
git clone https://github.com/Starmadebydata/aitolife.git
cd aitolife
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 创建环境变量

复制 `.env.local.example` 文件为 `.env.local` 并填入你的配置信息。

```bash
cp .env.local.example .env.local
```

4. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 📦 构建与部署

### 静态导出

本项目配置为静态导出模式，以便于在 Cloudflare Pages 或其他静态托管服务上部署：

```bash
npm run build
# 或
yarn build
```

构建输出位于 `out` 目录中。

### Cloudflare Pages 部署说明

1. 在 Cloudflare Pages 中创建新项目
2. 连接到 GitHub 仓库
3. 构建设置:
   - 构建命令: `npm run build`
   - 输出目录: `out`
   - Node.js 版本: 16 或更高

## 🌐 国际化实现

项目最初使用 Next.js 的内置国际化路由，但由于静态导出模式的限制，我们改为使用基于客户端的语言切换实现：

- 使用 `localStorage` 存储用户语言偏好
- 支持浏览器语言自动检测
- 动态加载对应语言的翻译文件

## 📂 项目结构

```
aitolife/
├── public/            # 静态文件
│   ├── locales/       # 国际化翻译文件
│   ├── _redirects     # Netlify/Cloudflare 重定向规则
│   └── _headers       # Netlify/Cloudflare 头信息
├── src/               # 源代码
│   ├── components/    # React 组件
│   ├── pages/         # 页面组件
│   ├── styles/        # 全局样式
│   ├── utils/         # 工具函数
│   └── lib/           # 库函数
├── .env.local.example # 环境变量示例
├── next.config.js     # Next.js 配置
└── tailwind.config.js # Tailwind CSS 配置
```

## 🔮 未来计划

- [ ] 内容创作系统优化
- [ ] 用户反馈收集功能
- [ ] 性能优化和加载速度提升
- [ ] SEO 优化与分析
- [ ] 更多 AI 工具和应用场景介绍

## 📝 开发日志

详见 [dev-log.md](./dev-log.md) 文件，记录了项目开发过程中的关键节点和问题解决方案。

## 📄 协议

本项目采用 [MIT 许可证](LICENSE)。 