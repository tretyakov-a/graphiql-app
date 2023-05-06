import { useMemo, useState } from 'react';
import classes from './style.module.scss';
import { editors, EDITORS } from './editors';
import TabHeader from './TabHeader';
import Tab from './Tab';
import IconButton from '@src/components/IconButton';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { classNames } from '@src/shared/utils';
import { useAppDispatch, useAppUI } from '@src/store';

const BottomEditorsTabs = () => {
  const [currentEditor, setCurrentEditor] = useState(EDITORS.VARIABLES);
  const {
    visiblity,
    actions: { toggleVisibility },
  } = useAppUI();
  const dispatch = useAppDispatch();

  const toggleCollapsed = () => {
    dispatch(toggleVisibility('bottomEditors'));
  };
  const isVisible = visiblity.bottomEditors;

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

  const tabsContainerClasses = classNames([
    classes.tabsContainer,
    !isVisible && classes.tabsContainerCollapsed,
  ]);

  return (
    <div className={tabsContainerClasses}>
      <div className={classes.header}>
        <div className={classes.headerWrapper}>{elements.headers}</div>
        <div className={classes.headerToolbar}>
          <IconButton
            icon={!isVisible ? faChevronUp : faChevronDown}
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
