import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { formatDate, truncateText } from '@utils/helpers';
import { useTranslation } from '@utils/i18n';

interface ContentCardProps {
  title: string;
  description: string;
  slug: string;
  image?: string;
  date?: string;
  category?: string;
  categorySlug?: string;
  type: 'blog' | 'application';
  linkText?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  slug,
  image,
  date,
  category,
  categorySlug,
  type,
  linkText,
}) => {
  const { t, language } = useTranslation('common');
  const defaultLinkText = type === 'blog' ? t('blog.read_more') : t('applications.read_more');
  
  const href = `/${type === 'blog' ? 'blog' : 'applications'}/${slug}`;
  const categoryHref = categorySlug ? `/blog/category/${categorySlug}` : '#';
  
  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800">
      {/* 图片部分 */}
      {image && (
        <div className="relative h-48">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      
      {/* 内容部分 */}
      <div className="p-6">
        {/* 分类和日期 */}
        {(category || date) && (
          <div className="flex items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
            {category && (
              <Link href={categoryHref} className="hover:text-primary-600 dark:hover:text-primary-400">
                {category}
              </Link>
            )}
            {category && date && <span className="mx-2">•</span>}
            {date && (
              <div className="flex items-center">
                <FiCalendar className="mr-1" />
                <time dateTime={date}>{formatDate(date, language === 'zh' ? 'zh-CN' : 'en-US')}</time>
              </div>
            )}
          </div>
        )}
        
        {/* 标题 */}
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          <Link href={href} className="hover:text-primary-600 dark:hover:text-primary-400">
            {title}
          </Link>
        </h3>
        
        {/* 描述 */}
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {truncateText(description, 120)}
        </p>
        
        {/* 阅读更多链接 */}
        <Link
          href={href}
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {linkText || defaultLinkText}
          <FiArrowRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ContentCard; 