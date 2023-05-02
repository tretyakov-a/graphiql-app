import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import us from './en';
import ru from './ru';

const languages = { us, ru };

i18n.use(initReactI18next).init({
  resources: languages,
  lng: 'us',
  fallbackLng: 'us',
});

export { i18n, languages };
