import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { auth, logout } from '@src/shared/api/firebase';
import LanguageSelector from '@src/components/LanguageSelector';
import Loader from '@src/components/Loader';
import IconButton from '@src/components/IconButton';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { LinkInfo, authorizedLinks, unauthorizedLinks } from './links';
import Logo from './Logo';
import { classNames } from '@src/shared/utils';

const Header = () => {
  const { t } = useTranslation();
  const [user, loading] = useAuthState(auth);

  const renderLinks = (links: LinkInfo[]) =>
    links.map(({ to, langKey }) => (
      <li key={to}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            classNames([classes.menuLink, isActive && classes.menuLinkActive])
          }
        >
          {t(langKey)}
        </NavLink>
      </li>
    ));

  const isAuthorized = Boolean(user);

  return (
    <header className={classes.header}>
      <div className={classNames([generalClasses.container, classes.headerContainer])}>
        <Logo />
        <div className={classes.headerRight}>
          <nav className={classes.menuContainer}>
            {loading ? (
              <Loader size={'sm'} />
            ) : (
              <ul className={classes.menu}>
                {isAuthorized ? renderLinks(authorizedLinks) : renderLinks(unauthorizedLinks)}
              </ul>
            )}
          </nav>
          <div className={classes.toolbar}>
            {isAuthorized && (
              <div>
                <IconButton onClick={logout} icon={faRightFromBracket} />
              </div>
            )}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
