import React, { useState } from 'react';
import { FiChevronDown, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '@utils/i18n';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        onClick={toggleDropdown}
      >
        <span className="mr-1">{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
        <FiChevronDown className="w-4 h-4 ml-1" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
          />
          <div className="absolute right-0 z-20 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-lg dark:bg-gray-800">
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    closeDropdown();
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                    language === lang.code
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher; 