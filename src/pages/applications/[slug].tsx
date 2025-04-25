import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiArrowLeft, FiTool } from 'react-icons/fi';
import Layout from '@components/layout/Layout';
import { useTranslation } from '@utils/i18n';
import { getAllApplications, getApplicationBySlug } from '@lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import ToolCard from '@components/features/ToolCard'; // 引入ToolCard来展示相关工具

interface Application {
  title: string;
  slug: string;
  description: string;
  content: any; // Rich text content for details
  image?: any;
  relatedTools?: any[]; // 引用字段，需要处理
  useCases?: any; // Rich text for use cases
  gettingStarted?: any; // Rich text for getting started guide
}

interface ApplicationDetailProps {
  application: {
    zh?: Application;
    en?: Application;
  };
}

// 配置富文本渲染器 (可以考虑提取为公共工具函数)
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
        // 注意：Contentful返回的URL可能需要加上 'https:' 前缀
        const fullImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
        return <img src={fullImageUrl} alt={imageAlt} className="my-4 rounded-lg" />;
      }
      return null;
    },
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline dark:text-primary-400">{children}</a>,
    // 可以根据需要添加更多节点的渲染规则
  },
};


export default function ApplicationDetail({ application }: ApplicationDetailProps) {
  const router = useRouter();
  const { t, language } = useTranslation('common');

  if (router.isFallback) {
    return (
      <Layout>
        <div className="container py-16 text-center">{t('common.loading')}...</div>
      </Layout>
    );
  }

  const currentApp = application[language as 'zh' | 'en'] || application.zh || application.en;

  if (!currentApp) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('common.page_not_found')}</h1>
          <Link href="/applications" className="text-primary-600 hover:underline dark:text-primary-400">
            {t('common.back')} {t('nav.applications')}
          </Link>
        </div>
      </Layout>
    );
  }

  // 处理关联工具数据
  const relatedToolsData = currentApp.relatedTools?.map(toolRef => toolRef.fields) || [];

  return (
    <Layout>
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="container max-w-4xl mx-auto">
           {/* 返回按钮 */}
           <div className="mb-8">
            <Link
              href="/applications"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <FiArrowLeft className="mr-2" />
              {t('common.back')} {t('nav.applications')}
            </Link>
          </div>

          {/* 应用领域头部 */}
          <div className="mb-8 text-center">
            {currentApp.image && (
              <img
                // 确保URL正确
                src={currentApp.image.fields.file.url.startsWith('//') ? `https:${currentApp.image.fields.file.url}` : currentApp.image.fields.file.url}
                alt={currentApp.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{currentApp.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">{currentApp.description}</p>
          </div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* 详细介绍 */}
              {currentApp.content && (
                <div className="p-6 mb-8 bg-gray-50 rounded-lg dark:bg-gray-800 prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('common.details')}</h2>
                  {documentToReactComponents(currentApp.content, richTextOptions)}
                </div>
              )}

               {/* 使用场景 */}
               {currentApp.useCases && (
                <div className="p-6 mb-8 bg-gray-50 rounded-lg dark:bg-gray-800 prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('applications.use_cases')}</h2>
                  {documentToReactComponents(currentApp.useCases, richTextOptions)}
                </div>
              )}
            </div>

            {/* 侧边栏 */}
            <div className="lg:col-span-1">
               {/* 入门指南 */}
               {currentApp.gettingStarted && (
                <div className="p-6 mb-8 bg-white rounded-lg shadow dark:bg-gray-700 prose dark:prose-invert max-w-none">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('applications.getting_started')}</h3>
                  {documentToReactComponents(currentApp.gettingStarted, richTextOptions)}
                </div>
              )}

              {/* 相关工具 */}
              {relatedToolsData.length > 0 && (
                <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-700">
                  <h3 className="flex items-center text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    <FiTool className="mr-2"/>
                    {t('applications.related_tools')}
                  </h3>
                  <div className="space-y-4">
                    {relatedToolsData.map((tool: any) => (
                      <ToolCard
                        key={tool.slug}
                        title={tool.title}
                        description={tool.description}
                        slug={tool.slug}
                        image={tool.image?.fields?.file?.url}
                        rating={tool.rating}
                        pricingType={tool.pricingType}
                        externalUrl={tool.externalUrl}
                        categories={tool.categories?.map((cat: any) => cat.fields?.title).filter(Boolean) || []}
                        // 可以添加一个紧凑模式的 prop 来调整卡片样式
                        // compact={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // 注意：需要确认 getAllApplications 是否能正确处理多语言
    const applications = await getAllApplications(false);
    const paths = applications.map((app) => ({
      params: { slug: app.slug },
    }));

    return {
      paths,
      fallback: true, // 或者 'blocking'
    };
  } catch (error) {
    console.error('Error generating application paths:', error);
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
    // 注意：需要确认 getApplicationBySlug 是否能正确处理多语言和关联字段(relatedTools)
    const zhApp = await getApplicationBySlug(slug, false);
    const enApp = await getApplicationBySlug(slug, false); // 假设能获取英文

    if (!zhApp && !enApp) {
      return { notFound: true };
    }

    return {
      props: {
        application: {
          zh: zhApp,
          en: enApp,
        },
      },
      revalidate: 3600, // 每小时重新生成一次
    };
  } catch (error) {
    console.error(`Error fetching application with slug ${params?.slug}:`, error);
    return { notFound: true };
  }
};