import { createClient } from 'contentful';

// 定义内容类型
interface BlogPostFields {
  title: string;
  slug: string;
  excerpt: string;
  content: any;
  coverImage?: any;
  publishedDate: string; // Changed from date
  author?: any;
  category?: any;
}

interface ToolFields {
  title: string;
  slug: string;
  description: string;
  content: any;
  image?: any;
  rating: number;
  pricingType: 'free' | 'freemium' | 'paid' | 'subscription';
  externalUrl?: string;
  categories?: any[];
}

interface ApplicationFields {
  title: string;
  slug: string;
  description: string;
  content: any;
  image?: any;
}

interface CategoryFields {
  title: string;
  slug: string;
  description?: string;
}

// 定义分类类型带有sys.id
interface CategoryWithId extends CategoryFields {
  sys: {
    id: string;
  };
}

// 创建 Contentful 客户端
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// 创建预览客户端（用于草稿内容）
const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: 'preview.contentful.com',
});

// 根据预览模式选择客户端
const getClient = (preview: boolean) => (preview ? previewClient : client);

// 获取所有博客文章
export async function getAllPosts(preview: boolean = false): Promise<BlogPostFields[]> {
  try {
    const entries = await getClient(preview).getEntries({
      content_type: 'pageBlogPost',
      order: ['-fields.publishedDate'], // Changed from date
      include: 2,
    });

    // 使用类型断言并确保字段存在
    return entries.items.map((item) => {
      const fields = item.fields as Record<string, any>;
      return {
        title: fields.title || '',
        slug: fields.slug || '',
        excerpt: fields.excerpt || '',
        content: fields.content || {},
        coverImage: fields.coverImage || null,
        publishedDate: fields.publishedDate || '', // Changed from date
        author: fields.author || null,
        category: fields.category || null,
      } as BlogPostFields;
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// 获取特定博客文章
export async function getPostBySlug(slug: string, preview: boolean = false): Promise<BlogPostFields | null> {
  try {
    const entries = await getClient(preview).getEntries({
      content_type: 'pageBlogPost',
      'fields.slug': slug,
      include: 2,
    });

    if (!entries.items.length) return null;
    
    const fields = entries.items[0].fields as Record<string, any>;
    return {
      title: fields.title || '',
      slug: fields.slug || '',
      excerpt: fields.excerpt || '',
      content: fields.content || {},
      coverImage: fields.coverImage || null,
      publishedDate: fields.publishedDate || '', // Changed from date
      author: fields.author || null,
      category: fields.category || null,
    } as BlogPostFields;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

// 获取所有工具
export async function getAllTools(preview: boolean = false): Promise<ToolFields[]> {
  try {
    const entries = await getClient(preview).getEntries({
      content_type: 'tool',
      order: ['-fields.rating'],
      include: 2,
    });

    // 使用类型断言并确保字段存在
    return entries.items.map((item) => {
      const fields = item.fields as Record<string, any>;
      return {
        title: fields.title || '',
        slug: fields.slug || '',
        description: fields.description || '',
        content: fields.content || {},
        image: fields.image || null,
        rating: fields.rating || 0,
        pricingType: fields.pricingType || 'free',
        externalUrl: fields.externalUrl || '',
        categories: fields.categories || [],
      } as ToolFields;
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
}

// 获取特定工具
export async function getToolBySlug(slug: string, preview: boolean = false): Promise<ToolFields | null> {
  try {
    const entries = await getClient(preview).getEntries({
      content_type: 'tool',
      'fields.slug': slug,
      include: 2,
    });

    if (!entries.items.length) return null;
    
    const fields = entries.items[0].fields as Record<string, any>;
    return {
      title: fields.title || '',
      slug: fields.slug || '',
      description: fields.description || '',
      content: fields.content || {},
      image: fields.image || null,
      rating: fields.rating || 0,
      pricingType: fields.pricingType || 'free',
      externalUrl: fields.externalUrl || '',
      categories: fields.categories || [],
    } as ToolFields;
  } catch (error) {
    console.error(`Error fetching tool with slug ${slug}:`, error);
    return null;
  }
}

// 获取所有应用领域
export async function getAllApplications(preview: boolean = false): Promise<ApplicationFields[]> {
  try {
    const entries = await getClient(preview).getEntries({
      content_type: 'application',
      order: ['fields.title'],
      include: 2,
    });

    // 使用类型断言并确保字段存在
    return entries.items.map((item) => {
      const fields = item.fields as Record<string, any>;
      return {
        title: fields.title || '',
        slug: fields.slug || '',
        description: fields.description || '',
        content: fields.content || {},
        image: fields.image || null,
      } as ApplicationFields;
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
}

// 获取特定应用领域
export async function getApplicationBySlug(slug: string, preview: boolean = false): Promise<ApplicationFields | null> {
  try {
    const entries = await getClient(preview).getEntries({
      content_type: 'application',
      'fields.slug': slug,
      include: 2,
    });

    if (!entries.items.length) return null;
    
    const fields = entries.items[0].fields as Record<string, any>;
    return {
      title: fields.title || '',
      slug: fields.slug || '',
      description: fields.description || '',
      content: fields.content || {},
      image: fields.image || null,
    } as ApplicationFields;
  } catch (error) {
    console.error(`Error fetching application with slug ${slug}:`, error);
    return null;
  }
}

// 获取所有分类
export async function getAllCategories(preview: boolean = false): Promise<CategoryWithId[]> {
  try {
    const entries = await getClient(preview).getEntries({
      content_type: 'category',
      order: ['fields.title'],
    });

    return entries.items.map((item) => {
      const fields = item.fields as Record<string, any>;
      return {
        title: fields.title || '',
        slug: fields.slug || '',
        description: fields.description || '',
        sys: { id: item.sys.id }
      } as CategoryWithId;
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// 获取特定分类
export async function getCategoryBySlug(slug: string, preview: boolean = false): Promise<CategoryWithId | null> {
  try {
    const entries = await getClient(preview).getEntries({
      content_type: 'category',
      'fields.slug': slug,
    });

    if (!entries.items.length) return null;

    const fields = entries.items[0].fields as Record<string, any>;
    return {
      title: fields.title || '',
      slug: fields.slug || '',
      description: fields.description || '',
      sys: { id: entries.items[0].sys.id }
    } as CategoryWithId;
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
}

// 获取分类下的所有文章
export async function getPostsByCategory(categorySlug: string, preview: boolean = false): Promise<BlogPostFields[]> {
  try {
    const category = await getCategoryBySlug(categorySlug, preview);

    if (!category || !category.sys) return [];

    const entries = await getClient(preview).getEntries({
      content_type: 'pageBlogPost',
      'fields.category.sys.id': category.sys.id,
      order: ['-fields.publishedDate'], // Changed from date
      include: 2,
    });

    return entries.items.map((item) => {
      const fields = item.fields as Record<string, any>;
      return {
        title: fields.title || '',
        slug: fields.slug || '',
        excerpt: fields.excerpt || '',
        content: fields.content || {},
        coverImage: fields.coverImage || null,
        publishedDate: fields.publishedDate || '', // Changed from date
        author: fields.author || null,
        category: fields.category || null,
      } as BlogPostFields;
    });
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}:`, error);
    return [];
  }
}

export default client; 