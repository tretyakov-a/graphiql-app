import { useMemo, useState } from 'react';
import classes from './style.module.scss';
import { editors, EDITORS } from './editors';
import TabHeader from './TabHeader';
import Tab from './Tab';
import IconButton from '@src/components/IconButton';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const BottomEditorsTabs = () => {
  const [currentEditor, setCurrentEditor] = useState(EDITORS.VARIABLES);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => !prev);
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

  const tabsClasses = [classes.tabs, isCollapsed ? classes.tabsCollapsed : ''].join(' ');

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerWrapper}>{elements.headers}</div>
        <div className={classes.headerToolbar}>
          <IconButton
            icon={isCollapsed ? faChevronUp : faChevronDown}
            iconSize="sm"
            className={classes.collapseButton}
            onClick={toggleCollapsed}
          />
        </div>
      </div>

      <div className={tabsClasses}>{elements.tabs}</div>
    </>
  );
};

export default BottomEditorsTabs;
