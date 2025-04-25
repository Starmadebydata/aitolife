import { GetStaticProps } from 'next';
import Layout from '@components/layout/Layout';
import ContentCard from '@components/features/ContentCard';
import { getAllApplications } from '@lib/contentful';
import { useTranslation } from '@utils/i18n';

interface Application {
  title: string;
  slug: string;
  description: string;
  image?: any;
}

interface ApplicationsIndexProps {
  applications: {
    zh: Application[];
    en: Application[];
  };
}

export default function ApplicationsIndex({ applications }: ApplicationsIndexProps) {
  const { t, language } = useTranslation('common');
  const currentApplications = applications[language as 'zh' | 'en'] || applications.zh;

  return (
    <Layout>
      <div className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              {t('applications.title')} {/* 需要在 common.json 中添加 */}
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              {t('applications.subtitle')} {/* 需要在 common.json 中添加 */}
            </p>
          </div>

          {currentApplications.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentApplications.map((app) => (
                <ContentCard
                  key={app.slug}
                  title={app.title}
                  description={app.description}
                  slug={app.slug} // ContentCard 会自动添加 /applications/ 前缀
                  image={app.image?.fields?.file?.url}
                  type="application"
                  linkText={t('home.learn_more')}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-white rounded-lg shadow dark:bg-gray-700">
              <p className="text-gray-600 dark:text-gray-300">{t('applications.no_applications')}</p> {/* 需要在 common.json 中添加 */}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // 注意：需要确认 getAllApplications 是否能正确处理多语言
    // 如果不能，可能需要像其他页面一样分别获取 zh 和 en 的数据
    const zhApplications = await getAllApplications(false);
    const enApplications = await getAllApplications(false); // 假设能获取英文

    return {
      props: {
        applications: {
          zh: zhApplications,
          en: enApplications,
        },
      },
      revalidate: 3600, // 每小时重新生成一次
    };
  } catch (error) {
    console.error('Error fetching applications for index page:', error);
    // 返回空数组，避免页面构建失败
    return {
      props: {
        applications: { zh: [], en: [] },
      },
      revalidate: 60, // 出错时，1分钟后重试
    };
  }
};