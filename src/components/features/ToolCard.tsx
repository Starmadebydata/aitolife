import React from 'react';
import Link from 'next/link';
import { FiExternalLink, FiStar } from 'react-icons/fi';
import { truncateText } from '@utils/helpers';
import { useTranslation } from '@utils/i18n';

interface ToolCardProps {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  rating: number;
  pricingType: 'free' | 'freemium' | 'paid' | 'subscription';
  externalUrl?: string;
  categories?: string[];
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  slug,
  image,
  rating,
  pricingType,
  externalUrl,
  categories = [],
}) => {
  const { t } = useTranslation('common');

  // 价格类型文本和颜色
  const pricingTypeInfo = {
    free: { text: t('tools.filter_free'), color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    freemium: { text: t('tools.filter_freemium'), color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    paid: { text: t('tools.filter_paid'), color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    subscription: { text: t('tools.filter_subscription'), color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  };

  // 生成星级评分
  const renderRating = () => {
    const stars = [];
    const maxStars = 5;
    
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`w-4 h-4 ${
            i <= rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      );
    }
    
    return (
      <div className="flex items-center">
        <span className="mr-1 font-medium">{rating.toFixed(1)}</span>
        <div className="flex">{stars}</div>
      </div>
    );
  };

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
        {/* 标题和评分 */}
        <div className="flex flex-wrap items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            <Link href={`/tools/${slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">
              {title}
            </Link>
          </h3>
          {renderRating()}
        </div>
        
        {/* 价格类型 */}
        <div className="mb-2">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${pricingTypeInfo[pricingType].color}`}>
            {pricingTypeInfo[pricingType].text}
          </span>
        </div>
        
        {/* 分类标签 */}
        {categories.length > 0 && (
          <div className="flex flex-wrap mb-3 -mx-1">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 m-1 text-xs bg-gray-100 rounded-full text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        
        {/* 描述 */}
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {truncateText(description, 100)}
        </p>
        
        {/* 链接部分 */}
        <div className="flex items-center space-x-3">
          <Link
            href={`/tools/${slug}`}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {t('home.learn_more')}
          </Link>
          
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              {t('tools.visit_website')}
              <FiExternalLink className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCard; 