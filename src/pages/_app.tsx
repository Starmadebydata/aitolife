import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
