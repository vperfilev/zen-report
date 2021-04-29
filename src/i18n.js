import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      "file-load": "Load",
      "file-clear": "Clear"
    }
  },
  ru: {
    translation: {
      "file-load": "Загрузить",
      "file-clear": "Очистить"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({resources,
    fallbackLng: 'en',
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
    },
    lng: "en",
      keySeparator: false, 

    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;
