import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageSelector from '@src/components/LanguageSelector';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={classes.header}>
      <div className={[generalClasses.container, classes.headerContainer].join(' ')}>
        <h1>HeaderLogo</h1>
        <div className={classes.headerRight}>
          <nav className={classes.menuContainer}>
            <ul className={classes.menu}>
              <li>
                <NavLink to="/" className={classes.menuLink}>
                  {t('mainPage')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/graphiql" className={classes.menuLink}>
                  {t('graphiql')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/auth" className={classes.menuLink}>
                  {t('signIn')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/auth" className={classes.menuLink}>
                  {t('signUp')}
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={classes.toolbar}>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
