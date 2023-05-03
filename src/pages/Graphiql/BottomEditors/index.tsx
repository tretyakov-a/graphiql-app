import { useState } from 'react';
import classes from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { editors, EDITORS } from './editors';

const BottomEditors = () => {
  const [currentEditor, setCurrentEditor] = useState(EDITORS.VARIABLES);
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.bottomEditorsHeader}>
        {editors.map(({ translationKey }, index) => (
          <div
            onClick={() => currentEditor !== index && setCurrentEditor(index)}
            key={index}
            className={[
              classes.editorTabHeader,
              currentEditor === index && classes.editorTabHeaderActive,
            ].join(' ')}
          >
            {t(translationKey)}
          </div>
        ))}
      </div>
      <div className={classes.bottomEditors}>
        {editors.map(({ component }, index) => (
          <section
            key={index}
            className={classes.editorTab}
            style={{ display: currentEditor === index ? 'block' : 'none' }}
          >
            {component}
          </section>
        ))}
      </div>
    </>
  );
};

export default BottomEditors;
