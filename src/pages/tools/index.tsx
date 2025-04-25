import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from '@utils/i18n';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';
import Layout from '@components/layout/Layout';
import ToolCard from '@components/features/ToolCard';
import { getAllTools, getAllCategories } from '@lib/contentful';

// 价格类型
type PricingType = 'all' | 'free' | 'freemium' | 'paid' | 'subscription';

// 排序方式
type SortType = 'rating' | 'newest' | 'name';

// 筛选状态
interface FilterState {
  search: string;
  category: string;
  pricing: PricingType;
  sort: SortType;
}

// 工具属性
interface Tool {
  title: string;
  slug: string;
  description: string;
  image?: string | null;
  rating: number;
  pricingType: 'free' | 'freemium' | 'paid' | 'subscription';
  externalUrl?: string;
  categories: string[];
  createdAt?: string; // 添加创建日期用于排序
}

// 分类
interface Category {
  id: string;
  title: string;
  slug: string;
}

// 页面属性
interface ToolsPageProps {
  tools: {
    zh: Tool[];
    en: Tool[];
  };
  categories: {
    zh: Category[];
    en: Category[];
  };
}

export default function ToolsPage({ tools, categories }: ToolsPageProps) {
  const { t, language } = useTranslation('common');
  
  // 根据当前语言选择对应的内容
  const currentTools = tools[language as 'zh' | 'en'] || tools.zh;
  const currentCategories = categories[language as 'zh' | 'en'] || categories.zh;
  
  // 筛选状态
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    pricing: 'all',
    sort: 'rating',
  });
  
  // 是否显示筛选面板（移动端）
  const [showFilters, setShowFilters] = useState(false);
  
  // 筛选后的工具列表
  const [filteredTools, setFilteredTools] = useState<Tool[]>(currentTools);
  
  // 当筛选条件或语言变化时，更新工具列表
  useEffect(() => {
    let result = [...currentTools];
    
    // 搜索筛选
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        tool => 
          tool.title.toLowerCase().includes(searchLower) || 
          tool.description.toLowerCase().includes(searchLower)
      );
    }
    
    // 分类筛选
    if (filters.category !== 'all') {
      result = result.filter(tool => 
        tool.categories.some(cat => cat.toLowerCase() === filters.category.toLowerCase())
      );
    }
    
    // 价格筛选
    if (filters.pricing !== 'all') {
      result = result.filter(tool => tool.pricingType === filters.pricing);
    }
    
    // 排序
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    setFilteredTools(result);
  }, [filters, currentTools, language]);
  
  // 改变筛选条件
  const handleFilterChange = (name: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // 重置筛选条件
  const resetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      pricing: 'all',
      sort: 'rating',
    });
  };
  
  return (
    <Layout>
      <div className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          {/* 标题部分 */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              {t('tools.title')}
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              {t('tools.subtitle')}
            </p>
          </div>
          
          {/* 筛选器切换按钮（移动端） */}
          <div className="flex justify-end mb-4 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 text-sm font-medium bg-white rounded-md shadow-sm text-primary-600 dark:bg-gray-700 dark:text-primary-400"
            >
              <FiFilter className="mr-2" />
              {showFilters ? t('common.hide_filters') : t('common.show_filters')}
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            {/* 筛选面板 */}
            <div 
              className={`w-full lg:w-1/4 mb-6 lg:mb-0 lg:pr-6 ${
                showFilters ? 'block' : 'hidden md:block'
              }`}
            >
              <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {t('common.filters')}
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary-600 dark:text-primary-400"
                  >
                    {t('common.reset')}
                  </button>
                </div>
                
                {/* 搜索框 */}
                <div className="mb-6">
                  <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('common.search')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="search"
                      value={filters.search}
                      onChange={e => handleFilterChange('search', e.target.value)}
                      placeholder={t('common.search_placeholder')}
                      className="w-full py-2 pl-10 pr-3 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    {filters.search && (
                      <button
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => handleFilterChange('search', '')}
                      >
                        <FiX className="text-gray-400 hover:text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* 分类筛选 */}
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('tools.categories')}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="category-all"
                        name="category"
                        value="all"
                        checked={filters.category === 'all'}
                        onChange={e => handleFilterChange('category', e.target.value)}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="category-all"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {t('tools.filter_all')}
                      </label>
                    </div>
                    
                    {currentCategories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category.slug}`}
                          name="category"
                          value={category.title}
                          checked={filters.category === category.title}
                          onChange={e => handleFilterChange('category', e.target.value)}
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`category-${category.slug}`}
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {category.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 价格筛选 */}
                <div className="mb-6">
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('tools.pricing')}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="pricing-all"
                        name="pricing"
                        value="all"
                        checked={filters.pricing === 'all'}
                        onChange={e => handleFilterChange('pricing', e.target.value)}
                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="pricing-all"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {t('tools.filter_all')}
                      </label>
                    </div>
                    
                    {(['free', 'freemium', 'paid', 'subscription'] as PricingType[]).map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          type="radio"
                          id={`pricing-${type}`}
                          name="pricing"
                          value={type}
                          checked={filters.pricing === type}
                          onChange={e => handleFilterChange('pricing', e.target.value as PricingType)}
                          className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`pricing-${type}`}
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {t(`tools.filter_${type}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 排序 */}
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('tools.sort_by')}
                  </h4>
                  <select
                    value={filters.sort}
                    onChange={e => handleFilterChange('sort', e.target.value)}
                    className="w-full p-2 border rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="rating">{t('tools.sort_rating')}</option>
                    <option value="newest">{t('tools.sort_newest')}</option>
                    <option value="name">{t('tools.sort_name')}</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* 工具列表 */}
            <div className="w-full lg:w-3/4">
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTools.map(tool => (
                    <ToolCard
                      key={tool.slug}
                      title={tool.title}
                      description={tool.description}
                      slug={tool.slug}
                      image={tool.image}
                      rating={tool.rating}
                      pricingType={tool.pricingType}
                      externalUrl={tool.externalUrl}
                      categories={tool.categories}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center bg-white rounded-lg shadow dark:bg-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">{t('tools.no_tools')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // 从Contentful获取工具和分类
    const zhTools = await getAllTools(false);
    const enTools = await getAllTools(false);
    const categories = await getAllCategories(false);
    
    // 将分类转换为前端需要的格式
    const zhCategories = categories.map(cat => ({
      id: cat.sys.id,
      title: cat.title,
      slug: cat.slug,
    }));
    
    const enCategories = categories.map(cat => ({
      id: cat.sys.id,
      title: cat.title,
      slug: cat.slug,
    }));

    return {
      props: {
        tools: {
          zh: zhTools,
          en: enTools,
        },
        categories: {
          zh: zhCategories,
          en: enCategories,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching tools data:', error);
    return {
      props: {
        tools: { zh: [], en: [] },
        categories: { zh: [], en: [] },
      },
    };
  }
}; 