import classes from './style.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { auth } from '@src/shared/api/firebase';
import Loader from '@src/components/Loader';
import { LinkInfo, authorizedLinks, unauthorizedLinks } from './links';
import { classNames } from '@src/shared/utils';

const HeaderMenu = () => {
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

  return loading ? (
    <Loader size={'sm'} />
  ) : (
    <ul className={classes.menu}>
      {isAuthorized ? renderLinks(authorizedLinks) : renderLinks(unauthorizedLinks)}
    </ul>
  );
};

export default HeaderMenu;
