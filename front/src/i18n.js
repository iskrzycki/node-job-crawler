import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationPL from './locales/pl/translationPL.json';
import translationEN from './locales/en/translationEN.json';

const resources = {
    en: {
        translation: translationEN
    },
    pl: {
        translation: translationPL
    }
};

i18n
    .use(initReactI18next)      // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;