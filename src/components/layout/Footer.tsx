import React, { useState } from 'react';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';
import { useTranslation } from '@utils/i18n';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;
    
    setSubscribeStatus('loading');
    
    try {
      // 在MVP版本中，我们只是模拟订阅功能
      // 在实际生产环境中，这里将调用订阅API
      setTimeout(() => {
        setSubscribeStatus('success');
        setEmail('');
        
        // 5秒后重置状态
        setTimeout(() => {
          setSubscribeStatus('idle');
        }, 5000);
      }, 1000);
    } catch (error) {
      console.error('订阅错误:', error);
      setSubscribeStatus('error');
      
      // 5秒后重置状态
      setTimeout(() => {
        setSubscribeStatus('idle');
      }, 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* 网站信息 */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                AIToLife.net
              </span>
            </Link>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Starmadebydata/aitolife"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                <FiGithub className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com/aitolifenet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                <FiTwitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="mailto:contact@aitolife.net"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                <FiMail className="w-5 h-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* 关于部分 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              {t('footer.about')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  {t('footer.about_us')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 资源部分 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  {t('footer.tools')}
                </Link>
              </li>
              <li>
                <Link
                  href="/applications"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  {t('footer.applications')}
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  {t('footer.guides')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 订阅部分 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase dark:text-white">
              {t('footer.newsletter')}
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {t('footer.newsletter_desc')}
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                  placeholder={t('footer.email_placeholder')}
                  required
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className="px-4 py-2 font-medium text-white bg-primary-600 rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
                >
                  {subscribeStatus === 'loading' ? '...' : t('footer.subscribe')}
                </button>
              </div>
              {subscribeStatus === 'success' && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                  订阅成功！感谢您的关注。
                </p>
              )}
              {subscribeStatus === 'error' && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  订阅失败，请稍后再试。
                </p>
              )}
            </form>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {currentYear} AIToLife.net. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 