import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { auth, logout } from '@src/shared/api/firebase';
import LanguageSelector from '@src/components/LanguageSelector';
import logoutSVG from '@src/assets/logout.svg';
import Loader from '@src/components/Loader';

const Header = () => {
  const { t } = useTranslation();
  const [user, loading] = useAuthState(auth);

  const authorizedLinks = (
    <>
      <li>
        <NavLink to="/graphiql" className={classes.menuLink}>
          {t('graphiql')}
        </NavLink>
      </li>
      <li>
        <button onClick={logout} className={classes.menuLink}>
          <img src={logoutSVG} alt="logout" />
        </button>
      </li>
    </>
  );

  const unuathorizedLinks = (
    <>
      <li>
        <NavLink to="/" className={classes.menuLink}>
          {t('mainPage')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/auth" className={classes.menuLink}>
          {t('signIn')}
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" className={classes.menuLink}>
          {t('signUp')}
        </NavLink>
      </li>
    </>
  );

  const isAuthorized = Boolean(user);

  return (
    <header className={classes.header}>
      <div className={[generalClasses.container, classes.headerContainer].join(' ')}>
        <h1>HeaderLogo</h1>
        <div className={classes.headerRight}>
          <nav className={classes.menuContainer}>
            {loading ? (
              <Loader size={0.3} />
            ) : (
              <ul className={classes.menu}>{isAuthorized ? authorizedLinks : unuathorizedLinks}</ul>
            )}
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
