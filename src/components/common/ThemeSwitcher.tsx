import React, { useState, useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTranslation } from '@utils/i18n';

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { t } = useTranslation('common');

  // 在组件挂载时初始化主题
  useEffect(() => {
    // 检查localStorage中保存的主题偏好
    const savedTheme = localStorage.getItem('aitolife_theme');
    let currentTheme: 'light' | 'dark' = 'light';

    // 如果有保存的主题偏好，使用它
    if (savedTheme === 'dark' || savedTheme === 'light') {
      currentTheme = savedTheme;
    } 
    // 否则检查系统偏好
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme = 'dark';
    }

    setTheme(currentTheme);
    applyTheme(currentTheme);
  }, []);

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('aitolife_theme', newTheme);
  };

  // 应用主题到页面
  const applyTheme = (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 text-gray-600 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
      aria-label={theme === 'light' ? t('theme.switch_to_dark') : t('theme.switch_to_light')}
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeSwitcher; 