import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import us from './en';
import ru from './ru';
import { welcomeLocalisation } from './welcomePage/index';
import { store } from '@src/store';

const languages = { us, ru };

i18n.use(initReactI18next).init({
  resources: languages,
  lng: 'us',
  fallbackLng: 'us',
});

i18n.changeLanguage(store.getState().appUI.language);
i18n.addResourceBundle('us', 'welcomeLocalisation', welcomeLocalisation.us);
i18n.addResourceBundle('ru', 'welcomeLocalisation', welcomeLocalisation.ru);

export { i18n, languages };
