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
