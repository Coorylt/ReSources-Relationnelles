import i18next from 'i18next';
import en from './languages/en.json';
import fr from './languages/fr.json';
import {initReactI18next} from 'react-i18next';

i18next
.use(initReactI18next)
.init({
    compatibilityJSON: 'v3',
    lng: 'fr',
    resources: {
        en:en,
        fr:fr,
    },
    react: {
        useSuspense: false,
    }
})

export default i18next;
