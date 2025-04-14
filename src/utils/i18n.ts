import { useRouter } from 'next/router';

// 支持的语言
export const LANGUAGES = ['zh', 'en'];
export const DEFAULT_LANGUAGE = 'zh';

// 获取当前语言
export const getCurrentLanguage = (locale?: string): string => {
  if (locale && LANGUAGES.includes(locale)) {
    return locale;
  }
  return DEFAULT_LANGUAGE;
};

// 使用当前语言的钩子
export const useLanguage = (): {
  language: string;
  changeLanguage: (newLanguage: string) => void;
} => {
  const router = useRouter();
  const { locale } = router;
  
  const language = getCurrentLanguage(locale);
  
  // 切换语言
  const changeLanguage = (newLanguage: string) => {
    if (!LANGUAGES.includes(newLanguage)) return;
    
    router.push(router.pathname, router.asPath, { locale: newLanguage });
  };
  
  return { language, changeLanguage };
};

// 导入翻译文件
const importTranslation = (language: string, namespace: string) => {
  try {
    // 导入对应的翻译文件
    return require(`../../public/locales/${language}/${namespace}.json`);
  } catch (error) {
    console.error(`Failed to load translation file for ${language}/${namespace}`, error);
    return {};
  }
};

// 预加载所有翻译，避免服务器和客户端不匹配
const zhTranslations = {
  common: importTranslation('zh', 'common'),
};

const enTranslations = {
  common: importTranslation('en', 'common'),
};

const translations = {
  zh: zhTranslations,
  en: enTranslations,
};

// 翻译函数
export const useTranslation = (namespace: string = 'common') => {
  const { language } = useLanguage();
  
  // 获取对应的翻译数据
  const getTranslation = () => {
    return translations[language as 'zh' | 'en'][namespace] || {};
  };
  
  const currentTranslations = getTranslation();
  
  // 翻译函数
  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // 如果找不到翻译，返回原始键
      }
    }
    
    if (typeof value === 'string') {
      // 替换参数
      if (params) {
        return Object.entries(params).reduce(
          (str, [key, val]) => str.replace(new RegExp(`{{${key}}}`, 'g'), val),
          value
        );
      }
      return value;
    }
    
    return key;
  };
  
  return { t, language };
}; 