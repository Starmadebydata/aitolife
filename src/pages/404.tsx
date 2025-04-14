import Link from 'next/link';
import Layout from '@components/layout/Layout';
import { useTranslation } from '@utils/i18n';

export default function Custom404() {
  const { t } = useTranslation('common');
  
  return (
    <Layout title="404 - 页面未找到">
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center">
        <h1 className="mb-6 text-6xl font-bold text-primary-600">404</h1>
        <h2 className="mb-8 text-2xl font-semibold">
          {t('common.page_not_found')}
        </h2>
        <p className="max-w-md mb-8 text-lg text-gray-600 dark:text-gray-400">
          {t('common.page_not_found_message')}
        </p>
        <Link href="/" className="px-6 py-3 btn btn-primary">
          {t('common.back_to_home')}
        </Link>
      </div>
    </Layout>
  );
} 