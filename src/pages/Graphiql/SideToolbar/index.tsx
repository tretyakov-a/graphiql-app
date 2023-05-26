import IconButton from '@src/components/IconButton';
import classes from './style.module.scss';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppUI } from '@src/store';
import { useContext } from 'react';
import { ScrollContext } from '@src/shared/contexts/scroll';

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
    </aside>
  );
};

export default SideToolbar;
