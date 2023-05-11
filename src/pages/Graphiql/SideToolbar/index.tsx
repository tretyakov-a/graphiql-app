import IconButton from '@src/components/IconButton';
import classes from './style.module.scss';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppUI } from '@src/store';

const SideToolbar = () => {
  const {
    visiblity,
    actions: { toggleVisibility },
  } = useAppUI();
  const dispatch = useAppDispatch();

  const toggleDocs = () => {
    dispatch(toggleVisibility('docs'));
  };

  return (
    <aside className={classes.sideToolbar}>
      <IconButton icon={faBook} onClick={toggleDocs} isActive={visiblity.docs} />
    </aside>
  );
};

export default SideToolbar;
