import React from 'react';

// 支持的语言
export const LANGUAGES = ['zh', 'en'];
export const DEFAULT_LANGUAGE = 'zh';

// 语言类型
export type Language = 'zh' | 'en';

// 命名空间类型
export type Namespace = 'common';

// 翻译数据类型
export type TranslationData = Record<string, any>;

// 使用当前语言的钩子
export const useLanguage = (): {
  language: Language;
  changeLanguage: (newLanguage: string) => void;
} => {
  const [language, setLanguage] = React.useState<Language>(DEFAULT_LANGUAGE);
  
  // 在组件挂载时初始化语言
  React.useEffect(() => {
    // 尝试从 localStorage 获取语言设置
    const savedLanguage = localStorage.getItem('aitolife_language');
    if (savedLanguage && LANGUAGES.includes(savedLanguage)) {
      setLanguage(savedLanguage as Language);
    } else {
      // 如果没有保存的语言，使用浏览器语言或默认语言
      const browserLanguage = navigator.language.split('-')[0];
      const initialLanguage = LANGUAGES.includes(browserLanguage) 
        ? browserLanguage as Language 
        : DEFAULT_LANGUAGE;
      setLanguage(initialLanguage);
      localStorage.setItem('aitolife_language', initialLanguage);
    }
  }, []);
  
  // 切换语言
  const changeLanguage = (newLanguage: string) => {
    if (!LANGUAGES.includes(newLanguage)) return;
    
    setLanguage(newLanguage as Language);
    localStorage.setItem('aitolife_language', newLanguage);
    
    // 强制刷新组件以应用新的语言
    window.location.reload();
  };
  
  return { language, changeLanguage };
};

// 翻译函数
export const useTranslation = (namespace: Namespace = 'common') => {
  const { language } = useLanguage();
  const [translations, setTranslations] = React.useState<TranslationData>({});
  
  React.useEffect(() => {
    // 动态加载对应语言的翻译文件
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../../public/locales/${language}/${namespace}.json`);
        setTranslations(translationModule.default || {});
      } catch (error) {
        console.error(`Failed to load translation file for ${language}/${namespace}`, error);
        setTranslations({});
      }
    };
    
    loadTranslations();
  }, [language, namespace]);
  
  // 翻译函数
  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: any = translations;
    
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