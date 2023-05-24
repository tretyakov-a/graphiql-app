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
import { MediaQueryContext, maxWidthQuery } from '@src/shared/contexts/media-query';
import { useContext } from 'react';
import SideToolbar from '@src/pages/Graphiql/SideToolbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const [user] = useAuthState(auth);
  const { matches } = useContext(MediaQueryContext);
  const location = useLocation();

  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => setIsSticky(!e.isIntersecting), {
      threshold: [1],
    });

    if (headerRef.current) observer.observe(headerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const matchesMedia = matches![maxWidthQuery('sm')];

  const showSidebar = location.pathname.includes('graphiql') && matchesMedia;
  const isAuthorized = Boolean(user);
  const headerClasses = classNames([classes.header, isSticky && classes.headerSticky]);

  return (
    <header className={headerClasses} ref={headerRef}>
      <div className={classNames([generalClasses.container, classes.headerContainer])}>
        <div className={classes.headerRight}>
          {showSidebar && <SideToolbar />}
          <Logo />
        </div>
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
