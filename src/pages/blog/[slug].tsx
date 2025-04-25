import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
import Layout from '@components/layout/Layout';
import { useTranslation } from '@utils/i18n';
import { getAllPosts, getPostBySlug } from '@lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { formatDate } from '@utils/helpers';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text content
  coverImage?: any;
  publishedDate: string; // Changed from date
  author?: any;
  category?: any;
}

interface PostDetailProps {
  post: {
    zh?: BlogPost;
    en?: BlogPost;
  };
}

// 配置富文本渲染器
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => <p className="mb-4">{children}</p>,
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => <h1 className="text-3xl font-bold mb-4 mt-6">{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => <h2 className="text-2xl font-bold mb-4 mt-6">{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => <h3 className="text-xl font-bold mb-4 mt-6">{children}</h3>,
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => <ul className="list-disc list-inside mb-4 pl-4">{children}</ul>,
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => <ol className="list-decimal list-inside mb-4 pl-4">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => <li className="mb-2">{children}</li>,
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
    [BLOCKS.HR]: () => <hr className="my-6 border-gray-300 dark:border-gray-600" />,
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, description, file } = node.data.target.fields;
      const imageUrl = file?.url;
      const imageAlt = title || description || '';
      if (imageUrl) {
        return <img src={imageUrl} alt={imageAlt} className="my-4 rounded-lg" />;
      }
      return null;
    },
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline dark:text-primary-400">{children}</a>,
  },
};


export default function PostDetail({ post }: PostDetailProps) {
  const router = useRouter();
  const { t, language } = useTranslation('common');

  if (router.isFallback) {
    return (
      <Layout>
        <div className="container py-16 text-center">{t('common.loading')}...</div>
      </Layout>
    );
  }

  const currentPost = post[language as 'zh' | 'en'] || post.zh || post.en;

  if (!currentPost) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('common.page_not_found')}</h1>
          <Link href="/blog" className="text-primary-600 hover:underline dark:text-primary-400">
            {t('common.back')} {t('nav.blog')}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="container max-w-3xl mx-auto">
          {/* 返回按钮 */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <FiArrowLeft className="mr-2" />
              {t('common.back')} {t('nav.blog')}
            </Link>
          </div>

          {/* 文章头部 */}
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{currentPost.title}</h1>
            <div className="flex items-center mb-6 text-sm text-gray-500 dark:text-gray-400">
              {currentPost.author && <span className="mr-4">By {currentPost.author.fields?.name || 'Unknown Author'}</span>}
              <FiCalendar className="mr-1" />
              <time dateTime={currentPost.publishedDate}>{formatDate(currentPost.publishedDate, language === 'zh' ? 'zh-CN' : 'en-US')}</time>
              {currentPost.category && (
                <span className="ml-4">
                  In{' '}
                  <Link href={`/blog/category/${currentPost.category.fields?.slug || '#'}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                    {currentPost.category.fields?.title || 'Uncategorized'}
                  </Link>
                </span>
              )}
            </div>

            {/* 封面图 */}
            {currentPost.coverImage && (
              <img
                src={currentPost.coverImage.fields.file.url}
                alt={currentPost.title}
                className="mb-8 rounded-lg"
              />
            )}

            {/* 文章内容 */}
            <div>
              {documentToReactComponents(currentPost.content, richTextOptions)}
            </div>
          </article>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await getAllPosts(false); // 获取所有文章以生成路径
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));

    return {
      paths,
      fallback: true, // 使用 ISR 或 fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error generating blog post paths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params?.slug) {
      return { notFound: true };
    }

    const slug = params.slug as string;
    const zhPost = await getPostBySlug(slug, false);
    const enPost = await getPostBySlug(slug, false); // 假设 getPostBySlug 能处理多语言或需要分别获取

    if (!zhPost && !enPost) {
      return { notFound: true };
    }

    return {
      props: {
        post: {
          zh: zhPost,
          en: enPost,
        },
      },
      revalidate: 3600, // 每小时重新生成一次
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${params?.slug}:`, error);
    return { notFound: true };
  }
};