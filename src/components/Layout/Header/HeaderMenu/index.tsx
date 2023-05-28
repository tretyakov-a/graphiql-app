import classes from './style.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { auth } from '@src/shared/api/firebase';
import Loader from '@src/components/Loader';
import { LinkInfo, authorizedLinks, unauthorizedLinks } from './links';
import { classNames } from '@src/shared/utils';
import { useContext, useRef } from 'react';
import { MediaQueryContext, maxWidthQuery } from '@src/shared/contexts/media-query';
import { BurgerMenuContext } from './BurgerMenu/burger-menu-context';
import useOpenCloseAnimation from '@src/shared/hooks/animation';
import HeaderMenuToolbar from './HeaderMenuToolbar';

const HeaderMenu = () => {
  const { t } = useTranslation();
  const [user, loading] = useAuthState(auth);
  const { matches } = useContext(MediaQueryContext);
  const { isMenuOpened, toggleMenu } = useContext(BurgerMenuContext);
  const matchesXsBreakpoint = matches![maxWidthQuery('xs')];
  const menuElementRef = useRef<HTMLDivElement>(null);
  useOpenCloseAnimation(menuElementRef, isMenuOpened, {
    display: 'flex',
    isActive: matchesXsBreakpoint,
    animationName: 'slideY',
  });

  const handleLinkClick = () => {
    if (matchesXsBreakpoint) toggleMenu();
  };

  const renderLinks = (links: LinkInfo[]) =>
    links.map(({ to, langKey, icon }) => (
      <li key={to}>
        <NavLink
          to={to}
          onClick={handleLinkClick}
          className={({ isActive }) =>
            classNames([classes.menuLink, isActive && classes.menuLinkActive])
          }
        >
          <span className={classes.menuLinkIcon}>{icon}</span>
          <span>{t(langKey)}</span>
        </NavLink>
      </li>
    ));

  const isAuthorized = Boolean(user);

  return (
    <div className={classes.menuWrapper} ref={menuElementRef}>
      <nav className={classes.menuContainer}>
        {loading ? (
          <Loader size={'sm'} />
        ) : (
          <ul className={classes.menu}>
            {isAuthorized ? renderLinks(authorizedLinks) : renderLinks(unauthorizedLinks)}
          </ul>
        )}
      </nav>
      <HeaderMenuToolbar />
    </div>
  );
};

export default HeaderMenu;
