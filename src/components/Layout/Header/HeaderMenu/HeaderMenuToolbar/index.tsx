import { forwardRef, useContext } from 'react';
import classes from '../style.module.scss';
import Popup from '@src/components/Popup';
import IconButton from '@src/components/IconButton';
import { faGlobe, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from '@src/components/LanguageSelector';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@src/shared/api/firebase';
import { BurgerMenuContext } from '../BurgerMenu/burger-menu-context';
import { MediaQueryContext, maxWidthQuery } from '@src/shared/contexts/media-query';

const HeaderMenuToolbar = () => {
  const [user] = useAuthState(auth);
  const isAuthorized = Boolean(user);
  const { toggleMenu } = useContext(BurgerMenuContext);
  const { matches } = useContext(MediaQueryContext);
  const matchesXsBreakpoint = matches![maxWidthQuery('xs')];

  const handleLogout = () => {
    toggleMenu();
    logout();
  };

  return (
    <div className={classes.menuToolbar}>
      <Popup
        anchor={forwardRef<HTMLElement>((props, ref) => (
          <IconButton
            icon={faGlobe}
            tooltip={{ langKey: 'language', notShowOnActive: true }}
            {...props}
            ref={ref as React.RefObject<HTMLButtonElement>}
          />
        ))}
      >
        <LanguageSelector />
      </Popup>

      {isAuthorized && (
        <div>
          <IconButton
            onClick={handleLogout}
            tooltip={{ langKey: 'logout' }}
            icon={faRightFromBracket}
          />
        </div>
      )}

      {matchesXsBreakpoint && <IconButton icon={faXmark} onClick={toggleMenu} />}
    </div>
  );
};

export default HeaderMenuToolbar;
