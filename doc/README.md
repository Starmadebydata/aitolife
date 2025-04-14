# AIToLife.net - 日常生活AI应用指南

这个项目是 AIToLife.net 网站的源代码库，一个专注于展示 AI 如何简化和改善日常生活的平台。

## 项目概述

AIToLife.net 旨在为用户提供实用的 AI 应用指南，让他们了解如何在日常生活中有效利用 AI 技术。网站内容涵盖家庭生活、健康与健身、个人财务管理、烹饪、购物、娱乐等多个方面。

## 技术栈

- **框架**: [Next.js](https://nextjs.org/) - React 框架，主要用于静态生成
- **部署**: [Cloudflare Pages](https://pages.cloudflare.com/) - 用于网站托管（免费计划）
- **内容管理**: [Contentful](https://www.contentful.com/) - 无头 CMS，提供内容管理功能
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 用于响应式设计
- **多语言**: [next-i18next](https://github.com/i18next/next-i18next) - 提供多语言支持
- **评论系统**: [Giscus](https://giscus.app/) - 基于 GitHub Discussions 的评论系统
- **分析**: [Plausible Analytics](https://plausible.io/) 或 [Umami](https://umami.is/) - 替代性分析工具

## 功能特点

- 响应式设计，支持移动端和桌面端
- 多语言支持（初期支持中文、英文）
- 博客系统，包含分类和标签功能
- 用户评论和互动系统
- AI 工具目录和评测
- 订阅邮件列表
- 用户生成内容管理
- SEO 优化结构

## 开发环境设置

### 先决条件

- Node.js (v18 或更高)
- npm 或 yarn
- Cursor 编辑器
- Contentful 账户
- Cloudflare 账户

### 安装步骤

1. 克隆仓库:
   ```bash
   git clone https://github.com/Starmadebydata/aitolife.git
   cd aitolife
   ```

2. 安装依赖:
   ```bash
   npm install
   ```

3. 创建环境变量文件 `.env.local`:
   ```
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   CONTENTFUL_PREVIEW_TOKEN=your_preview_token
   CONTENTFUL_PREVIEW_SECRET=your_preview_secret
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. 启动开发服务器:
   ```bash
   npm run dev
   ```

5. 浏览器访问 `http://localhost:3000`

### Contentful 内容模型设置

请参考 `/docs/contentful-setup.md` 获取 Contentful 空间设置和内容模型配置的详细信息。

## 部署指南

### Cloudflare Pages 设置

1. 登录 Cloudflare 控制台
2. 创建新的 Pages 项目
3. 连接 GitHub 仓库
4. 配置构建设置:
   - 构建命令: `npm run build`
   - 构建输出目录: `.next`
5. 添加环境变量 (与 `.env.local` 中相同)
6. 部署!

详细步骤请参考 `/docs/deployment.md`

## 内容发布工作流程

1. 通过 Contentful 添加/编辑内容
2. 内容将自动同步到网站
3. 对于主要内容更新，可触发重新部署

## 项目结构

```
aitolife/
├── components/          # React 组件
│   ├── layout/          # 布局组件
│   ├── common/          # 通用组件
│   └── features/        # 功能组件
├── pages/               # 页面文件
│   ├── api/             # API 路由
│   ├── blog/            # 博客页面
│   └── tools/           # 工具目录页面
├── public/              # 静态资源
│   ├── locales/         # 翻译文件
│   └── images/          # 图片资源
├── styles/              # 全局样式
├── lib/                 # 通用库和工具函数
│   ├── contentful.js    # Contentful 客户端
│   └── analytics.js     # 分析工具
├── hooks/               # 自定义 React hooks
├── context/             # React context 提供者
├── docs/                # 详细文档
└── tests/               # 测试文件
```

## 贡献指南

1. 创建一个新分支 (`git checkout -b feature/amazing-feature`)
2. 提交更改 (`git commit -m 'Add some amazing feature'`)
3. 推送到分支 (`git push origin feature/amazing-feature`)
4. 创建一个 Pull Request

## Claude-Cursor 协作说明

本项目使用 Cursor 编辑器与 Claude 3.7 Sonnet 协作开发。使用步骤：

1. 在 Cursor 中打开项目
2. 利用 Claude 提供代码建议和生成功能
3. 遵循项目规范和约定
4. 使用注释 `// Claude: [描述]` 标记需要 Claude 特别关注的代码部分

## 许可证

本项目采用 MIT 许可证 - 详见 LICENSE 文件
