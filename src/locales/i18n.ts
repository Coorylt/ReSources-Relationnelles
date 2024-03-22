import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'fr',
  resources: {
    en: en,
    fr: fr,
  },
  react: {
    useSuspense: false,
  }
});

export default i18n;
