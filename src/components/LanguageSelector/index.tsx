import React, { forwardRef, useMemo } from 'react';
import classes from './style.module.scss';
import buttonClasses from '@src/styles/button.module.scss';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import Popup from '@src/components/Popup';
import { languages } from '@src/shared/localization';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: React.FormEvent) => {
    const language = new FormData(e.currentTarget as HTMLFormElement).get('language');
    if (typeof language === 'string') {
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
          defaultChecked={i18n.language === key}
        />
        <label htmlFor={`${key}-language`}>
          <span className={`fi fi-${key}`}></span>
          <span className={classes.radioTitle}>
            {languages[key as keyof typeof languages].name}
          </span>
        </label>
      </div>
    ));
  }, [i18n.language]);

  return (
    <div className={classes.toolbar}>
      <Popup
        Anchor={forwardRef<HTMLElement>((props, ref) => (
          <button
            className={[buttonClasses.button, buttonClasses.buttonIcon].join(' ')}
            {...props}
            ref={ref as React.RefObject<HTMLButtonElement>}
          >
            <FontAwesomeIcon icon={faGlobe} size="xl" />
          </button>
        ))}
      >
        <form onChange={handleLanguageChange}>{languagesList}</form>
      </Popup>
    </div>
  );
};

export default LanguageSelector;
