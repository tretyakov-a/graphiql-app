import classes from '../style.module.scss';
import { classNames } from '@src/shared/utils';
import React, { useContext, useRef } from 'react';
import { MediaQueryContext, maxWidthQuery } from '@src/shared/contexts/media-query';
import { BurgerMenuContext } from './burger-menu-context';
import useOpenCloseAnimation from '@src/shared/hooks/animation';
import HeaderMenu from '..';

const BurgerMenu = () => {
  const { matches } = useContext(MediaQueryContext);
  const { isMenuOpened, toggleMenu } = useContext(BurgerMenuContext);

  const matchesXsBreakpoint = matches![maxWidthQuery('xs')];

  const overlayElementRef = useRef<HTMLDivElement>(null);
  useOpenCloseAnimation(overlayElementRef, isMenuOpened, {
    display: 'flex',
    isActive: matchesXsBreakpoint,
    animationName: 'fade',
  });

  const burgerMenuClasses = classNames([
    classes.burgerMenu,
    isMenuOpened && classes.burgerMenuShow,
  ]);

  return (
    <div className={burgerMenuClasses} ref={overlayElementRef}>
      <div className={classes.burgerMenuOverlay} onClick={toggleMenu}></div>
      <HeaderMenu />
    </div>
  );
};

export default BurgerMenu;
