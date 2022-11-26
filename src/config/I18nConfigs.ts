import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './i18n/en.json';
import translationZh from './i18n/zh.json';

const resources = {
  en: {
    translation: translationEn,
  },
  zh: {
    translation: translationZh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'zh',
    // keySeparator: false, // we do not use keys in form messages.welcome
    // header.slogan
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
