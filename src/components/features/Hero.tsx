import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@utils/i18n';
import { FiArrowRight } from 'react-icons/fi';

const Hero: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {t('hero.title')}{' '}
            <span className="text-primary-600 dark:text-primary-500">
              {t('hero.highlight')}
            </span>
          </h1>
          <p className="mb-8 text-lg text-gray-600 md:text-xl lg:text-2xl dark:text-gray-300">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href="/applications" className="btn btn-primary">
              {t('hero.cta')}
              <FiArrowRight className="ml-2" />
            </Link>
            <Link href="/tools" className="btn btn-secondary">
              {t('hero.secondary_cta')}
            </Link>
          </div>
        </div>
      </div>
      
      {/* 波浪形底部装饰 */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-12 text-gray-100 dark:text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="currentColor"
            opacity="0.1"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero; 