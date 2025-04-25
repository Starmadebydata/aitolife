import { GetStaticProps } from 'next';
import { useTranslation } from '@utils/i18n';
import Layout from '@components/layout/Layout';
import Hero from '@components/features/Hero';
import ContentCard from '@components/features/ContentCard';
import ToolCard from '@components/features/ToolCard';
import { FiArrowRight, FiBookOpen, FiTool, FiHome } from 'react-icons/fi';
import Link from 'next/link';
import { getAllPosts, getAllTools, getAllApplications } from '@lib/contentful';

interface HomePageProps {
  posts: {
    zh: any[];
    en: any[];
  };
  tools: {
    zh: any[];
    en: any[];
  };
  applications: {
    zh: any[];
    en: any[];
  };
}

export default function Home({ posts, tools, applications }: HomePageProps) {
  const { t, language } = useTranslation('common');

  // 根据当前语言选择对应的内容
  const currentPosts = posts[language as 'zh' | 'en'] || posts.zh;
  const currentTools = tools[language as 'zh' | 'en'] || tools.zh;
  const currentApplications = applications[language as 'zh' | 'en'] || applications.zh;

  return (
    <Layout>
      {/* Hero 部分 */}
      <Hero />

      {/* 应用领域部分 (提升位置) */}
      <section className="py-16 bg-primary-50 dark:bg-primary-900/20"> {/* 尝试不同的背景色 */}
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {t('home.applications_title')}
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              {t('home.applications_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* 限制只显示最新的3个应用领域 */}
            {currentApplications.slice(0, 3).map((application) => (
              <ContentCard
                key={application.slug}
                title={application.title}
                description={application.description}
                slug={application.slug}
                image={application.image?.fields?.file?.url}
                type="application"
                linkText={t('home.learn_more')}
              />
            ))}
          </div>

          {/* 如果应用领域多于3个，显示查看全部按钮 */}
          {currentApplications.length > 3 && (
            <div className="mt-12 text-center">
              <Link href="/applications" className="btn btn-primary">
                {t('home.view_all_applications')}
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 工具部分 */}
      <section className="py-16 bg-white dark:bg-gray-900"> {/* 恢复默认背景 */}
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {t('home.tools_title')}
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              {t('home.tools_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                title={tool.title}
                description={tool.description}
                slug={tool.slug}
                image={tool.image?.fields?.file?.url}
                rating={tool.rating}
                pricingType={tool.pricingType}
                externalUrl={tool.externalUrl}
                categories={tool.categories?.map((cat: any) => cat.fields.title) || []}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/tools" className="btn btn-primary">
              {t('home.view_all_tools')}
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 博客部分 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800"> {/* 恢复默认背景 */}
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {t('home.blog_title')}
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              {t('home.blog_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <ContentCard
                key={post.slug}
                title={post.title}
                description={post.excerpt}
                slug={post.slug}
                image={post.coverImage?.fields?.file?.url}
                date={post.publishedDate} // Changed from post.date
                category={post.category?.fields?.title}
                categorySlug={post.category?.fields?.slug}
                type="blog"
                linkText={t('home.read_more')}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/blog" className="btn btn-primary">
              {t('home.view_all_posts')}
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 特色部分 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {t('home.features_title')}
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              {t('home.features_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* 特色1 */}
            <div className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-primary-600 rounded-full dark:bg-primary-500">
                <FiBookOpen className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {t('home.feature1_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.feature1_description')}
              </p>
            </div>

            {/* 特色2 */}
            <div className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-primary-600 rounded-full dark:bg-primary-500">
                <FiTool className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {t('home.feature2_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.feature2_description')}
              </p>
            </div>

            {/* 特色3 */}
            <div className="p-6 text-center bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-primary-600 rounded-full dark:bg-primary-500">
                <FiHome className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {t('home.feature3_title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('home.feature3_description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 部分 */}
      <section className="py-16 text-white bg-primary-600 dark:bg-primary-800">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              {t('home.cta_title')}
            </h2>
            <p className="mb-8 text-xl text-primary-100">
              {t('home.cta_description')}
            </p>
            <Link href="/applications" className="px-8 py-3 text-lg btn btn-secondary">
              {t('home.cta_button')}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // 从Contentful获取数据
    const posts = {
      zh: await getAllPosts(false),
      en: await getAllPosts(false)
    };
    
    const tools = {
      zh: await getAllTools(false),
      en: await getAllTools(false)
    };
    
    const applications = {
      zh: await getAllApplications(false),
      en: await getAllApplications(false)
    };

    return {
      props: {
        posts,
        tools,
        applications,
      },
      // 如果使用Vercel，可以启用ISR
      revalidate: 3600, // 每小时重新生成一次
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        posts: { zh: [], en: [] },
        tools: { zh: [], en: [] },
        applications: { zh: [], en: [] },
      },
    };
  }
};
