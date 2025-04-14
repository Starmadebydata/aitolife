import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* 添加网站图标 */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#0284c7" />
        <meta name="theme-color" content="#0284c7" />

        {/* 预连接到Contentful图片域 */}
        <link rel="preconnect" href="https://images.ctfassets.net" />

        {/* 添加字体 */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* 初始语言检测脚本 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // 支持的语言
                const LANGUAGES = ['zh', 'en'];
                const DEFAULT_LANGUAGE = 'zh';
                
                // 获取已保存的语言偏好
                const savedLanguage = localStorage.getItem('aitolife_language');
                
                // 如果已有语言设置，使用它
                if (savedLanguage && LANGUAGES.includes(savedLanguage)) {
                  document.documentElement.lang = savedLanguage;
                } 
                // 否则尝试使用浏览器语言
                else {
                  const browserLanguage = navigator.language.split('-')[0];
                  const initialLanguage = LANGUAGES.includes(browserLanguage) 
                    ? browserLanguage 
                    : DEFAULT_LANGUAGE;
                  
                  document.documentElement.lang = initialLanguage;
                  localStorage.setItem('aitolife_language', initialLanguage);
                }
              } catch (e) {
                console.error('Language initialization error:', e);
              }
            })();
          `
        }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
