import i18next from 'i18next';
import en from './languages/en.json';
import fr from './languages/fr.json';
import de from './languages/de.json';
import ru from './languages/ru.json';
import {initReactI18next} from 'react-i18next';

i18next
.use(initReactI18next)
.init({
    compatibilityJSON: 'v3',
    lng: 'fr',
    resources: {
        en:en,
        fr:fr,
        de:de,
        ru:ru
    },
    react: {
        useSuspense: false,
    }
})

export default i18next;
