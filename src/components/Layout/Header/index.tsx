import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@src/shared/api/firebase';
import LanguageSelector from '@src/components/LanguageSelector';
import IconButton from '@src/components/IconButton';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import { classNames } from '@src/shared/utils';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  const [user] = useAuthState(auth);

  const isAuthorized = Boolean(user);

  return (
    <header className={classes.header}>
      <div className={classNames([generalClasses.container, classes.headerContainer])}>
        <Logo />
        <div className={classes.headerRight}>
          <nav className={classes.headerMenuContainer}>
            <HeaderMenu />
          </nav>
          <div className={classes.toolbar}>
            {isAuthorized && (
              <div>
                <IconButton
                  onClick={logout}
                  tooltip={{ langKey: 'logout' }}
                  icon={faRightFromBracket}
                />
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
