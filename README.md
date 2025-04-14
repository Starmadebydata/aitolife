# AIToLife - 日常生活 AI 应用指南

AIToLife 是一个帮助用户了解如何在日常生活中应用 AI 技术的平台，提供实用指南、工具推荐和相关知识分享。

## 💡 项目特性

- 🌏 中英文双语支持
- 🎨 现代化响应式设计
- 🚀 基于 Next.js 的快速加载体验
- 🌙 明暗模式切换

## 🛠️ 技术栈

- **前端框架**: [Next.js](https://nextjs.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **国际化**: 定制 i18n 系统
- **图标**: [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 快速开始

### 前提条件

- Node.js 14.x 或更高版本
- npm 或 yarn

### 安装

1. 克隆仓库

```bash
git clone https://github.com/yourusername/aitolife.git
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

## 📂 项目结构

```
aitolife/
├── public/            # 静态文件
│   └── locales/       # 国际化翻译文件
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

## 📝 开发日志

详见 [dev-log.md](./dev-log.md) 文件，记录了项目开发过程中的关键节点和问题解决方案。

## 📄 协议

本项目采用 [MIT 许可证](LICENSE)。 