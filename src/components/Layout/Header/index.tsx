import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import Logo from './Logo';
import { classNames } from '@src/shared/utils';
import HeaderMenu from './HeaderMenu';
import { MediaQueryContext, maxWidthQuery } from '@src/shared/contexts/media-query';
import { useContext } from 'react';
import SideToolbar from '@src/pages/Graphiql/SideToolbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Portal from '@src/components/Portal';
import { BurgerMenuContextProvider } from './HeaderMenu/BurgerMenu/burger-menu-context';
import BurgerMenu from './HeaderMenu/BurgerMenu';
import BurgerButton from './HeaderMenu/BurgerButton';

const Header = () => {
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

  const matchesSmBreakpoint = matches![maxWidthQuery('sm')];
  const matchesXsBreakpoint = matches![maxWidthQuery('xs')];

  const isGraphqlPage = location.pathname.includes('graphiql');
  const showSidebar = isGraphqlPage && matchesSmBreakpoint;
  const headerClasses = classNames([classes.header, isSticky && classes.headerSticky]);

  const headerContainerClasses = classNames([
    generalClasses.container,
    classes.headerContainer,
    !isGraphqlPage && classes.headerContainerBounded,
  ]);

  return (
    <header className={headerClasses} ref={headerRef}>
      <div className={headerContainerClasses}>
        <div className={classes.headerLeft}>
          {showSidebar && <SideToolbar />}
          <Logo />
        </div>
        <div className={classes.headerRight}>
          {matchesXsBreakpoint ? (
            <BurgerMenuContextProvider>
              <BurgerButton />
              <Portal>
                <BurgerMenu />
              </Portal>
            </BurgerMenuContextProvider>
          ) : (
            <HeaderMenu />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
