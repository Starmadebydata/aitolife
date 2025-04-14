import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu, FiX } from 'react-icons/fi';
import LanguageSwitcher from '@components/common/LanguageSwitcher';
import ThemeSwitcher from '@components/common/ThemeSwitcher';
import { useTranslation } from '@utils/i18n';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.applications'), href: '/applications' },
    { name: t('nav.tools'), href: '/tools' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.about'), href: '/about' },
  ];

  return (
    <header className="bg-white shadow-sm dark:bg-gray-800">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                AIToLife.net
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  router.pathname === item.href
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme and Language Switchers */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ThemeSwitcher />
            <button
              type="button"
              className="p-2 ml-3 text-gray-500 rounded-md dark:text-gray-400"
              onClick={toggleMenu}
            >
              <span className="sr-only">{isMenuOpen ? t('nav.close') : t('nav.open')}</span>
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    router.pathname === item.href
                      ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 