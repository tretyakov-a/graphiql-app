import { useMemo, useState } from 'react';
import classes from './style.module.scss';
import { editors, EDITORS } from './editors';
import TabHeader from './TabHeader';
import Tab from './Tab';
import IconButton from '@src/components/IconButton';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppUI } from '@src/store';
import { DragOptions } from '../hooks/use-resizable-flex/types';
import { useResizeableFlex } from '../hooks/use-resizable-flex';

const MIN_HEIGHT = 200;
const HEADER_HEIGHT = 57;
const STORE_KEY = 'bottomEditors';

const BottomEditorsTabs = () => {
  const [currentEditor, setCurrentEditor] = useState(EDITORS.VARIABLES);
  const {
    visiblity,
    actions: { toggleVisibility },
  } = useAppUI();
  const isVisible = visiblity.bottomEditors;
  const dispatch = useAppDispatch();
  const dragOptions = useMemo<DragOptions>(
    () => ({
      dragBar: {
        orientation: 'horizontal',
        placing: 'top',
      },
      limits: {
        rightBottom: {
          value: MIN_HEIGHT,
          onLimitMet: () => {
            dispatch(toggleVisibility(STORE_KEY));
          },
        },
      },
    }),
    [dispatch, toggleVisibility]
  );
  const { flex, dragBar } = useResizeableFlex(STORE_KEY, dragOptions);

  const toggleCollapsed = () => {
    dispatch(toggleVisibility(STORE_KEY));
  };

  const elements = useMemo(() => {
    const headers: JSX.Element[] = [];
    const tabs: JSX.Element[] = [];
    editors.forEach(({ headerTitle, component }, index) => {
      const isActive = currentEditor === index;
      headers.push(
        <TabHeader
          key={index}
          onClick={() => !isActive && setCurrentEditor(index)}
          title={headerTitle}
          isActive={isActive}
        />
      );
      tabs.push(<Tab key={index} component={component} isActive={isActive} />);
    });
    return { headers, tabs };
  }, [currentEditor]);

  return (
    <div
      className={classes.tabsContainer}
      style={{
        flex: isVisible ? flex : 0,
        minHeight: `${isVisible ? MIN_HEIGHT : HEADER_HEIGHT}px`,
      }}
    >
      {isVisible && dragBar}
      <div className={classes.header} style={{ height: `${HEADER_HEIGHT}px` }}>
        <div className={classes.headerWrapper}>
          <div className={classes.headers}>{elements.headers}</div>
        </div>
        <div className={classes.headerToolbar}>
          <IconButton
            icon={!isVisible ? faChevronUp : faChevronDown}
            tooltip={{ langKey: !isVisible ? 'showEditors' : 'hideEditors' }}
            iconSize="sm"
            className={classes.collapseButton}
            onClick={toggleCollapsed}
          />
        </div>
      </div>
      <div className={classes.tabs}>{elements.tabs}</div>
    </div>
  );
};

export default BottomEditorsTabs;
