import IconButton from '@src/components/IconButton';
import classes from './style.module.scss';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppUI } from '@src/store';

const SideToolbar = () => {
  const {
    isDocsVisible,
    actions: { toggleDocsVisibility },
  } = useAppUI();
  const dispatch = useAppDispatch();

  const toggleDocs = () => {
    dispatch(toggleDocsVisibility());
  };

  return (
    <aside className={[classes.sideToolbar, classes.verticalToolbar].join(' ')}>
      <IconButton icon={faBook} onClick={toggleDocs} isActive={isDocsVisible} />
    </aside>
  );
};

export default SideToolbar;
