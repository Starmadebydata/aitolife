# Contentful 内容模型设计

本文档定义了 AIToLife 网站使用的 Contentful 内容模型，包括各种内容类型及其字段结构。

## 内容类型

### 1. 工具 (Tool)

描述单个 AI 工具的详细信息，包括功能、评分、价格等。

| 字段名 | 字段 ID | 类型 | 描述 |
|--------|---------|------|------|
| 标题 | title | Short text | 工具名称 |
| 链接标识 | slug | Short text | URL 友好的唯一标识符 |
| 描述 | description | Short text | 简短描述，用于工具卡片和列表 |
| 内容 | content | Rich text | 详细介绍，支持富文本格式 |
| 图片 | image | Media | 工具图片或logo |
| 评分 | rating | Number (decimal) | 工具评分，1-5分 |
| 价格类型 | pricingType | Short text (enum) | 价格类型：免费(free)、免费增值(freemium)、付费(paid)、订阅制(subscription) |
| 外部链接 | externalUrl | Short text | 工具官方网站链接 |
| 分类 | categories | Reference, many | 关联到多个分类 |
| 优点 | pros | Short text, list | 工具的优点列表 |
| 缺点 | cons | Short text, list | 工具的缺点列表 |
| 替代工具 | alternatives | Short text, list | 替代工具列表 |
| 创建日期 | createdAt | Date | 工具创建日期，用于排序 |
| 更新日期 | updatedAt | Date | 最后更新日期 |
| 标签 | tags | Short text, list | 相关标签 |

### 2. 分类 (Category)

定义工具分类，如写作、图像生成、编程等。

| 字段名 | 字段 ID | 类型 | 描述 |
|--------|---------|------|------|
| 标题 | title | Short text | 分类名称 |
| 链接标识 | slug | Short text | URL 友好的唯一标识符 |
| 描述 | description | Short text | 分类描述 |
| 图标 | icon | Short text | 用于表示分类的图标名称（例如：FiPenTool 表示写作） |

### 3. 博客文章 (Blog Post)

网站的博客内容。

| 字段名 | 字段 ID | 类型 | 描述 |
|--------|---------|------|------|
| 标题 | title | Short text | 文章标题 |
| 链接标识 | slug | Short text | URL 友好的唯一标识符 |
| 摘要 | excerpt | Short text | 文章简短摘要 |
| 内容 | content | Rich text | 文章正文内容 |
| 封面图 | coverImage | Media | 文章封面图片 |
| 发布日期 | date | Date | 文章发布日期 |
| 作者 | author | Reference | 关联到作者 |
| 分类 | category | Reference | 关联到文章分类 |
| 标签 | tags | Short text, list | 文章标签 |

### 4. 作者 (Author)

博客文章的作者信息。

| 字段名 | 字段 ID | 类型 | 描述 |
|--------|---------|------|------|
| 姓名 | name | Short text | 作者姓名 |
| 头像 | picture | Media | 作者头像 |
| 简介 | bio | Short text | 作者简介 |

### 5. 应用领域 (Application)

描述 AI 在特定生活领域的应用方式。

| 字段名 | 字段 ID | 类型 | 描述 |
|--------|---------|------|------|
| 标题 | title | Short text | 应用领域名称 |
| 链接标识 | slug | Short text | URL 友好的唯一标识符 |
| 描述 | description | Short text | 简短描述 |
| 内容 | content | Rich text | 详细介绍 |
| 图片 | image | Media | 展示图片 |
| 相关工具 | relatedTools | Reference, many | 关联的工具列表 |
| 使用场景 | useCases | Rich text | 具体使用场景示例 |
| 入门指南 | gettingStarted | Rich text | 如何在该领域开始使用 AI 的指南 |

## 内容关系

- **工具** 与 **分类** 是多对多关系：一个工具可以属于多个分类，一个分类可以包含多个工具
- **博客文章** 与 **作者** 是多对一关系：一篇文章有一个作者，一个作者可以有多篇文章
- **博客文章** 与 **分类** 是多对一关系：一篇文章属于一个分类，一个分类可以包含多篇文章
- **应用领域** 与 **工具** 是多对多关系：一个应用领域可以关联多个工具，一个工具可以用于多个应用领域

## 本地化支持

所有内容类型都支持多语言，主要支持：
- 中文 (zh-CN)
- 英文 (en-US)

必须本地化的字段包括：
- 标题 (title)
- 描述 (description)
- 内容 (content)
- 摘要 (excerpt)
- 优点 (pros)
- 缺点 (cons)

不需要本地化的字段包括：
- 链接标识 (slug)
- 图片 (image)
- 评分 (rating)
- 日期相关字段

## 内容管理指南

1. **添加新工具**：创建新的工具条目时，务必填写所有必填字段，尤其是评分、价格类型和分类。
2. **内容更新**：定期检查和更新工具信息，特别是价格变化或新功能发布。
3. **多语言内容**：创建内容后，确保为所有支持的语言提供翻译。
4. **图片要求**：工具图片推荐尺寸为 600x400 像素，格式为 WebP 或 JPEG。
5. **内容质量**：确保所有描述和评价客观公正，突出工具的实际优缺点。 