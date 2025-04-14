import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { LANGUAGES, DEFAULT_LANGUAGE } from '@utils/i18n';
import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 初始化语言设置
  useEffect(() => {
    // 仅在客户端执行
    if (typeof window !== 'undefined') {
      // 检查是否已经设置了语言
      const savedLanguage = localStorage.getItem('aitolife_language');
      if (!savedLanguage) {
        // 如果没有设置语言，尝试使用浏览器首选语言
        const browserLanguage = navigator.language.split('-')[0];
        const initialLanguage = LANGUAGES.includes(browserLanguage) 
          ? browserLanguage 
          : DEFAULT_LANGUAGE;
        
        localStorage.setItem('aitolife_language', initialLanguage);
      }
    }
  }, []);

  // 页面切换时跟踪分析
  useEffect(() => {
    // 初始页面加载时跟踪
    const trackCurrentPageView = () => {
      // 分析跟踪代码（在MVP阶段可以省略）
      console.log('Page view tracked:', router.pathname);
    };

    trackCurrentPageView();

    // 路由变化时跟踪
    const handleRouteChange = () => {
      trackCurrentPageView();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.pathname]);

  return <Component {...pageProps} />;
}

export default MyApp;
