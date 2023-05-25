import classes from '../style.module.scss';
import React, { useContext } from 'react';
import { BurgerMenuContext } from '../BurgerMenu/burger-menu-context';
import IconButton from '@src/components/IconButton';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const BurgerButton = () => {
  const { toggleMenu } = useContext(BurgerMenuContext);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMenu();
  };

  return (
    <div className={classes.menuWrapper}>
      <IconButton icon={faBars} onClick={onClick} />
    </div>
  );
};

export default BurgerButton;
