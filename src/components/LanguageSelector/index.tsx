import React, { useContext } from 'react';
import classes from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { languages } from '@src/shared/localization';
import { useAppDispatch, useAppUI } from '@src/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PopupContext } from '../Popup/popup-context';

const LanguageSelector = () => {
  const {
    language,
    actions: { setLanguage },
  } = useAppUI();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const { togglePopup } = useContext(PopupContext);

  const handleLanguageChange = (e: React.FormEvent) => {
    const language = new FormData(e.currentTarget as HTMLFormElement).get('language');
    if (typeof language === 'string') {
      dispatch(setLanguage(language));
      i18n.changeLanguage(language);
      togglePopup();
    }
  };

  return (
    <form onChange={handleLanguageChange}>
      {Object.keys(languages).map((key) => (
        <div className={classes.radio} key={key}>
          <input
            type="radio"
            name="language"
            id={`${key}-language`}
            value={key}
            defaultChecked={language === key}
          />
          <label htmlFor={`${key}-language`}>
            <span className={classes.check}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={`fi fi-${key}`}></span>
            <span className={classes.radioTitle}>
              {languages[key as keyof typeof languages].name}
            </span>
          </label>
        </div>
      ))}
    </form>
  );
};

export default LanguageSelector;
