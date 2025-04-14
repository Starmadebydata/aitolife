import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
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

  return (
    <>
      {/* Consent Manager */}
      <Script
        id="consent-manager"
        strategy="beforeInteractive"
        type="text/javascript"
        data-cmp-ab="1"
        src="https://cdn.consentmanager.net/delivery/autoblocking/c3374ac35212f.js"
        data-cmp-host="c.delivery.consentmanager.net"
        data-cmp-cdn="cdn.consentmanager.net"
        data-cmp-codesrc="16"
      />
      
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-87F33BN32C"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-87F33BN32C');
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
