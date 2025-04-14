import { GetStaticProps } from 'next';
import { useTranslation } from '@utils/i18n';
import Layout from '@components/layout/Layout';
import Hero from '@components/features/Hero';
import ContentCard from '@components/features/ContentCard';
import ToolCard from '@components/features/ToolCard';
import { FiArrowRight, FiBookOpen, FiTool, FiHome } from 'react-icons/fi';
import Link from 'next/link';

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

      {/* 应用领域部分 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
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
            {currentApplications.map((application) => (
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

          <div className="mt-12 text-center">
            <Link href="/applications" className="btn btn-primary">
              {t('home.view_all_applications')}
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 工具部分 */}
      <section className="py-16 bg-white dark:bg-gray-900">
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
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
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
                date={post.date}
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
    // 由于我们是创建MVP版本，这里使用模拟数据
    // 中文内容
    const zhPosts = [
      {
        title: 'AI如何改变我们的日常生活',
        slug: 'ai-changing-daily-life',
        excerpt: '探索人工智能如何逐渐渗透到我们的日常生活，从智能家居到个人助手，AI正在改变我们的生活方式。',
        coverImage: null,
        date: '2023-04-15',
        category: { fields: { title: '趋势', slug: 'trends' } },
      },
      {
        title: '5个必备的AI写作工具推荐',
        slug: 'top-5-ai-writing-tools',
        excerpt: '提高写作效率的5个顶级AI写作工具，无论是博客写作、内容创作还是学术论文，这些工具都能帮助你事半功倍。',
        coverImage: null,
        date: '2023-05-22',
        category: { fields: { title: '工具', slug: 'tools' } },
      },
      {
        title: 'AI助手如何帮助提高工作效率',
        slug: 'ai-assistants-productivity',
        excerpt: '了解如何利用AI助手自动化重复性任务，管理日程安排，以及简化工作流程，从而显著提高工作效率。',
        coverImage: null,
        date: '2023-06-10',
        category: { fields: { title: '生产力', slug: 'productivity' } },
      },
    ];

    const zhTools = [
      {
        title: 'ChatGPT',
        slug: 'chatgpt',
        description: '功能强大的AI聊天机器人，可用于对话、写作、编程和生成创意内容。',
        image: null,
        rating: 4.8,
        pricingType: 'freemium',
        externalUrl: 'https://chat.openai.com',
        categories: [{ fields: { title: '通用AI' } }, { fields: { title: '写作' } }],
      },
      {
        title: 'Midjourney',
        slug: 'midjourney',
        description: '先进的AI图像生成工具，能够创建令人惊叹的艺术作品和视觉内容。',
        image: null,
        rating: 4.7,
        pricingType: 'subscription',
        externalUrl: 'https://www.midjourney.com',
        categories: [{ fields: { title: '图像生成' } }, { fields: { title: '设计' } }],
      },
      {
        title: 'Notion AI',
        slug: 'notion-ai',
        description: '集成在Notion平台中的AI助手，可帮助写作、总结和组织信息。',
        image: null,
        rating: 4.5,
        pricingType: 'paid',
        externalUrl: 'https://www.notion.so',
        categories: [{ fields: { title: '写作' } }, { fields: { title: '生产力' } }],
      },
    ];

    const zhApplications = [
      {
        title: '家庭生活中的AI应用',
        slug: 'ai-in-home-life',
        description: '探索AI如何改善家庭生活，从智能家居设备到家庭管理助手，让家庭生活更轻松。',
        image: null,
      },
      {
        title: 'AI在健康与健身中的应用',
        slug: 'ai-in-health-fitness',
        description: '了解AI如何帮助监测健康状况、制定个性化锻炼计划和改善整体健康状况。',
        image: null,
      },
      {
        title: 'AI辅助个人财务管理',
        slug: 'ai-in-personal-finance',
        description: '探索AI工具如何帮助预算规划、投资决策和优化个人财务状况。',
        image: null,
      },
    ];

    // 英文内容
    const enPosts = [
      {
        title: 'How AI is Changing Our Daily Lives',
        slug: 'ai-changing-daily-life',
        excerpt: 'Explore how artificial intelligence is gradually permeating our daily lives, from smart homes to personal assistants, AI is changing how we live.',
        coverImage: null,
        date: '2023-04-15',
        category: { fields: { title: 'Trends', slug: 'trends' } },
      },
      {
        title: 'Top 5 AI Writing Tools You Need',
        slug: 'top-5-ai-writing-tools',
        excerpt: 'Discover the top 5 AI writing tools to boost your writing efficiency, whether for blog posts, content creation, or academic papers.',
        coverImage: null,
        date: '2023-05-22',
        category: { fields: { title: 'Tools', slug: 'tools' } },
      },
      {
        title: 'How AI Assistants Help Improve Productivity',
        slug: 'ai-assistants-productivity',
        excerpt: 'Learn how to use AI assistants to automate repetitive tasks, manage schedules, and streamline workflows to significantly increase productivity.',
        coverImage: null,
        date: '2023-06-10',
        category: { fields: { title: 'Productivity', slug: 'productivity' } },
      },
    ];

    const enTools = [
      {
        title: 'ChatGPT',
        slug: 'chatgpt',
        description: 'Powerful AI chatbot for conversations, writing, coding, and creative content generation.',
        image: null,
        rating: 4.8,
        pricingType: 'freemium',
        externalUrl: 'https://chat.openai.com',
        categories: [{ fields: { title: 'General AI' } }, { fields: { title: 'Writing' } }],
      },
      {
        title: 'Midjourney',
        slug: 'midjourney',
        description: 'Advanced AI image generation tool that creates stunning artwork and visual content.',
        image: null,
        rating: 4.7,
        pricingType: 'subscription',
        externalUrl: 'https://www.midjourney.com',
        categories: [{ fields: { title: 'Image Generation' } }, { fields: { title: 'Design' } }],
      },
      {
        title: 'Notion AI',
        slug: 'notion-ai',
        description: 'AI assistant integrated into the Notion platform to help with writing, summarizing, and organizing information.',
        image: null,
        rating: 4.5,
        pricingType: 'paid',
        externalUrl: 'https://www.notion.so',
        categories: [{ fields: { title: 'Writing' } }, { fields: { title: 'Productivity' } }],
      },
    ];

    const enApplications = [
      {
        title: 'AI in Home Life',
        slug: 'ai-in-home-life',
        description: 'Explore how AI improves home life, from smart home devices to home management assistants, making daily living easier.',
        image: null,
      },
      {
        title: 'AI in Health and Fitness',
        slug: 'ai-in-health-fitness',
        description: 'Learn how AI helps monitor health, create personalized fitness plans, and improve overall well-being.',
        image: null,
      },
      {
        title: 'AI-Assisted Personal Finance',
        slug: 'ai-in-personal-finance',
        description: 'Explore how AI tools help with budget planning, investment decisions, and optimizing personal finances.',
        image: null,
      },
    ];

    return {
      props: {
        posts: {
          zh: zhPosts,
          en: enPosts
        },
        tools: {
          zh: zhTools,
          en: enTools
        },
        applications: {
          zh: zhApplications,
          en: enApplications
        },
      },
      revalidate: 60 * 60, // 每小时重新生成
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        posts: { zh: [], en: [] },
        tools: { zh: [], en: [] },
        applications: { zh: [], en: [] },
      },
      revalidate: 60 * 60,
    };
  }
};
