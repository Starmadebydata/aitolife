import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiArrowLeft, FiExternalLink, FiStar } from 'react-icons/fi';
import Layout from '@components/layout/Layout';
import { useTranslation } from '@utils/i18n';
import { getAllTools, getToolBySlug } from '@lib/contentful';

interface ToolContent {
  pros?: string[];
  cons?: string[];
  details: any; // 富文本内容
  alternatives?: string[];
}

interface Tool {
  title: string;
  slug: string;
  description: string;
  content: ToolContent;
  image?: string | null;
  rating: number;
  pricingType: 'free' | 'freemium' | 'paid' | 'subscription';
  externalUrl?: string;
  categories: string[];
}

interface ToolDetailProps {
  tool: {
    zh?: Tool;
    en?: Tool;
  };
}

export default function ToolDetail({ tool }: ToolDetailProps) {
  const router = useRouter();
  const { t, language } = useTranslation('common');
  
  // 如果页面正在生成，显示加载状态
  if (router.isFallback) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600 dark:text-gray-300">
              {t('common.loading')}...
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // 使用当前语言的工具数据，如果不存在则使用另一种语言的数据
  const currentTool = tool[language as 'zh' | 'en'] || tool.zh || tool.en;
  
  // 如果没有数据，显示未找到
  if (!currentTool) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="p-8 text-center bg-white rounded-lg shadow dark:bg-gray-800">
            <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {t('common.page_not_found')}
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              {t('common.page_not_found_message')}
            </p>
            <Link href="/tools" className="btn btn-primary">
              {t('common.back')}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // 渲染星级评分
  const renderRating = (rating: number) => {
    const stars = [];
    const maxStars = 5;
    
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`w-5 h-5 ${
            i <= rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      );
    }
    
    return (
      <div className="flex items-center">
        <span className="mr-2 text-lg font-medium">{rating.toFixed(1)}</span>
        <div className="flex">{stars}</div>
      </div>
    );
  };
  
  // 价格类型文本和颜色
  const pricingTypeInfo = {
    free: { text: t('tools.filter_free'), color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    freemium: { text: t('tools.filter_freemium'), color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    paid: { text: t('tools.filter_paid'), color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    subscription: { text: t('tools.filter_subscription'), color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  };
  
  return (
    <Layout>
      <div className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          {/* 返回按钮 */}
          <div className="mb-8">
            <Link
              href="/tools"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <FiArrowLeft className="mr-2" />
              {t('common.back')}
            </Link>
          </div>
          
          {/* 工具头部信息 */}
          <div className="p-8 mb-8 bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* 图像部分 */}
              <div className="md:col-span-1">
                {currentTool.image ? (
                  <img
                    src={currentTool.image}
                    alt={currentTool.title}
                    className="object-cover w-full h-auto rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg dark:bg-gray-800">
                    <span className="text-gray-400 dark:text-gray-500">
                      {t('common.no_image')}
                    </span>
                  </div>
                )}
              </div>
              
              {/* 信息部分 */}
              <div className="md:col-span-2">
                <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {currentTool.title}
                </h1>
                
                <p className="mb-4 text-xl text-gray-600 dark:text-gray-300">
                  {currentTool.description}
                </p>
                
                <div className="flex flex-wrap items-center mb-4 space-x-4">
                  {/* 评分 */}
                  <div className="flex items-center mr-4 mb-2">
                    {renderRating(currentTool.rating)}
                  </div>
                  
                  {/* 价格类型 */}
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-2 ${
                      pricingTypeInfo[currentTool.pricingType].color
                    }`}
                  >
                    {pricingTypeInfo[currentTool.pricingType].text}
                  </span>
                </div>
                
                {/* 分类标签 */}
                <div className="flex flex-wrap mb-6">
                  {currentTool.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 mb-2 mr-2 text-sm bg-gray-100 rounded-full text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                
                {/* 访问网站按钮 */}
                {currentTool.externalUrl && (
                  <a
                    href={currentTool.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600"
                  >
                    {t('tools.visit_website')}
                    <FiExternalLink className="ml-2" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* 工具详细内容 */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* 主要内容 */}
            <div className="md:col-span-2">
              <div className="p-8 bg-white rounded-lg shadow dark:bg-gray-700">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  {t('common.details')}
                </h2>
                
                {/* 此处应渲染富文本内容，这里使用简单的文本展示 */}
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300">
                    {/* 在实际应用中，这里应该是一个渲染富文本内容的组件 */}
                    {currentTool.content.details || '暂无详细介绍'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* 侧边信息 */}
            <div className="md:col-span-1">
              {/* 优点 */}
              {currentTool.content.pros && currentTool.content.pros.length > 0 && (
                <div className="p-6 mb-6 bg-white rounded-lg shadow dark:bg-gray-700">
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    {t('tools.pros')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {currentTool.content.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-2 text-green-500 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* 缺点 */}
              {currentTool.content.cons && currentTool.content.cons.length > 0 && (
                <div className="p-6 mb-6 bg-white rounded-lg shadow dark:bg-gray-700">
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    {t('tools.cons')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {currentTool.content.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-2 text-red-500 dark:text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* 替代工具 */}
              {currentTool.content.alternatives && currentTool.content.alternatives.length > 0 && (
                <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-700">
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    {t('tools.alternatives')}
                  </h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {currentTool.content.alternatives.map((alt, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          ></path>
                        </svg>
                        <span>{alt}</span>
                      </li>
                    ))}
                  </ul>
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
    // 从Contentful获取所有工具
    const tools = await getAllTools(false);
    
    // 生成路径
    const paths = tools.map((tool) => ({
      params: { slug: tool.slug },
    }));
    
    return {
      paths,
      fallback: true, // 使用增量静态生成
    };
  } catch (error) {
    console.error('Error generating tool paths:', error);
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
    
    // 从Contentful获取工具数据
    const zhTool = await getToolBySlug(slug, false);
    const enTool = await getToolBySlug(slug, false);
    
    // 如果找不到工具，返回404
    if (!zhTool && !enTool) {
      return { notFound: true };
    }
    
    return {
      props: {
        tool: {
          zh: zhTool,
          en: enTool,
        },
      },
      revalidate: 3600, // 每小时重新生成一次
    };
  } catch (error) {
    console.error(`Error fetching tool with slug ${params?.slug}:`, error);
    return { notFound: true };
  }
}; 