import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationJA from './locales/ja/translation.json';
import translationDE from './locales/de/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  ja: {
    translation: translationJA,
  },
  de: {
    translation: translationDE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
