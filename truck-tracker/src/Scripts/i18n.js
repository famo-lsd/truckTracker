import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import xhrBackend from 'i18next-xhr-backend';

i18n
    .use(xhrBackend)
    .use(initReactI18next)
    .init({
        lng: 'pt',
        fallbackLng: 'pt',
        whitelist: ['pt', 'en', 'es', 'fr'],
        debug: false,
        react: {
            useSuspense: false
        },
        backend: {
            loadPath: './JSON/i18n/{{lng}}.json?timestamp=' + new Date().getTime(),
            crossDomain: true
        }
    });