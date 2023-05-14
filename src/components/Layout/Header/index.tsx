import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { auth, logout } from '@src/shared/api/firebase';
import LanguageSelector from '@src/components/LanguageSelector';

const Header = () => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  return (
    <header className={classes.header}>
      <div className={[generalClasses.container, classes.headerContainer].join(' ')}>
        <h1>HeaderLogo</h1>
        <div className={classes.headerRight}>
          <nav className={classes.menuContainer}>
            <ul className={classes.menu}>
              {!user && (
                <li>
                  <NavLink to="/" className={classes.menuLink}>
                    {t('mainPage')}
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink to="/graphiql" className={classes.menuLink}>
                    {t('graphiql')}
                  </NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink to="/auth" className={classes.menuLink}>
                    {t('signIn')}
                  </NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink to="/register" className={classes.menuLink}>
                    {t('signUp')}
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <button onClick={logout} className={classes.menuLink}>
                    {t('logOut')}
                  </button>
                </li>
              )}
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
