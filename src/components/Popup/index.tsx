import classes from './style.module.scss';
import Portal from '../Portal';
import React, { useRef, useState } from 'react';

interface PopupProps extends React.PropsWithChildren {
  Anchor: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLElement> & React.HTMLProps<HTMLElement> & { isActive?: boolean }
  >;
}

const Popup = (props: PopupProps) => {
  const [isVisible, setVisible] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);
  const { Anchor, children } = props;

  const tooglePopup = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isVisible) {
      const makeInvisible = () => {
        setVisible(false);
        document.removeEventListener('click', makeInvisible);
      };
      document.addEventListener('click', makeInvisible);
    }
    setVisible((prev) => !prev);
  };

  const rect = anchorRef.current?.getBoundingClientRect();
  const popupPosition = rect
    ? {
        right: `${document.body.clientWidth - rect.right}px`,
        top: `${rect.y + rect.height}px`,
      }
    : {};

  return (
    <>
      {<Anchor onClick={tooglePopup} ref={anchorRef} isActive={isVisible} />}
      {isVisible && (
        <Portal>
          <div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className={classes.popup}
            style={popupPosition}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Popup;
