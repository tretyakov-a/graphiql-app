import IconButton from '@src/components/IconButton';
import classes from './style.module.scss';
import { faBook, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppUI } from '@src/store';
import { forwardRef, useContext } from 'react';
import { ScrollContext } from '@src/shared/contexts/scroll';
import Popup from '@src/components/Popup';
import EndpointEdit from '../EndpointEdit';

const SideToolbar = () => {
  const { setScroll } = useContext(ScrollContext);
  const {
    visiblity,
    actions: { toggleVisibility },
  } = useAppUI();
  const dispatch = useAppDispatch();

  const toggleDocs = () => {
    setScroll(visiblity.docs);
    dispatch(toggleVisibility('docs'));
  };

  const isActive = visiblity.docs;

  return (
    <aside className={classes.sideToolbar}>
      <IconButton
        icon={faBook}
        tooltip={{ langKey: isActive ? 'docsClose' : 'docsOpen' }}
        onClick={toggleDocs}
        isActive={isActive}
      />
      <Popup
        position="left"
        anchor={forwardRef<HTMLElement>((props, ref) => (
          <IconButton
            icon={faPenToSquare}
            tooltip={{ langKey: 'changeEndpoint', notShowOnActive: true }}
            {...props}
            ref={ref as React.RefObject<HTMLButtonElement>}
          />
        ))}
      >
        <EndpointEdit />
      </Popup>
    </aside>
  );
};

export default SideToolbar;
