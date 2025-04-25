import { GetStaticProps } from 'next';
import Layout from '@components/layout/Layout';
import ContentCard from '@components/features/ContentCard';
import { getAllPosts } from '@lib/contentful';
import { useTranslation } from '@utils/i18n';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: any;
  publishedDate: string; // Changed from date
  category?: any;
}

interface BlogIndexProps {
  posts: {
    zh: BlogPost[];
    en: BlogPost[];
  };
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  const { t, language } = useTranslation('common');
  const currentPosts = posts[language as 'zh' | 'en'] || posts.zh;

  return (
    <Layout>
      <div className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              {t('blog.title')} {/* 需要在 common.json 中添加 blog.title */}
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              {t('blog.subtitle')} {/* 需要在 common.json 中添加 blog.subtitle */}
            </p>
          </div>

          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((post) => (
                <ContentCard
                  key={post.slug}
                  title={post.title}
                  description={post.excerpt}
                  slug={post.slug} // ContentCard 会自动添加 /blog/ 前缀
                  image={post.coverImage?.fields?.file?.url}
                  date={post.publishedDate} // Changed from post.date
                  category={post.category?.fields?.title}
                  categorySlug={post.category?.fields?.slug} // 假设分类链接需要slug
                  type="blog"
                  linkText={t('home.read_more')}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-white rounded-lg shadow dark:bg-gray-700">
              <p className="text-gray-600 dark:text-gray-300">{t('blog.no_posts')}</p> {/* 需要在 common.json 中添加 blog.no_posts */}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const zhPosts = await getAllPosts(false);
    const enPosts = await getAllPosts(false); // 假设 getAllPosts 能处理多语言或需要分别获取

    return {
      props: {
        posts: {
          zh: zhPosts,
          en: enPosts,
        },
      },
      revalidate: 3600, // 每小时重新生成一次
    };
  } catch (error) {
    console.error('Error fetching blog posts for index page:', error);
    return {
      props: {
        posts: { zh: [], en: [] },
      },
      revalidate: 60,
    };
  }
};