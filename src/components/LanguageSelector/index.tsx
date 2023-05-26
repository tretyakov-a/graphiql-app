import React, { forwardRef, useMemo } from 'react';
import classes from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { faCheck, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Popup from '@src/components/Popup';
import { languages } from '@src/shared/localization';
import IconButton from '@src/components/IconButton';
import { useAppDispatch, useAppUI } from '@src/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LanguageSelector = () => {
  const {
    language,
    actions: { setLanguage },
  } = useAppUI();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: React.FormEvent) => {
    const language = new FormData(e.currentTarget as HTMLFormElement).get('language');
    if (typeof language === 'string') {
      dispatch(setLanguage(language));
      i18n.changeLanguage(language);
    }
  };

  const languagesList = useMemo(() => {
    return Object.keys(languages).map((key) => (
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
    ));
  }, [language]);

  return (
    <div className={classes.toolbar}>
      <Popup
        anchor={forwardRef<HTMLElement>((props, ref) => (
          <IconButton
            icon={faGlobe}
            tooltip={{ langKey: 'language', notShowOnActive: true }}
            {...props}
            ref={ref as React.RefObject<HTMLButtonElement>}
          />
        ))}
      >
        <form onChange={handleLanguageChange}>{languagesList}</form>
      </Popup>
    </div>
  );
};

export default LanguageSelector;
