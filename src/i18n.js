import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ConfigProvider } from 'antd';
import trTR from 'antd/locale/tr_TR';
import enUS from 'antd/locale/en_US';

import tr from './locales/tr.json';
import en from './locales/en.json';

const resources = {
  tr: {
    translation: tr,
    antd: trTR
  },
  en: {
    translation: en,
    antd: enUS
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;