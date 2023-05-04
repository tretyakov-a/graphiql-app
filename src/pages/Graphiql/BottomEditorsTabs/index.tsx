import { useMemo, useState } from 'react';
import classes from './style.module.scss';
import { editors, EDITORS } from './editors';
import TabHeader from './TabHeader';
import Tab from './Tab';

const BottomEditorsTabs = () => {
  const [currentEditor, setCurrentEditor] = useState(EDITORS.VARIABLES);

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
    <>
      <div className={classes.header}>
        <div className={classes.headerWrapper}>{elements.headers}</div>
        <div className={classes.headerToolbar}></div>
      </div>

      <div className={classes.tabs}>{elements.tabs}</div>
    </>
  );
};

export default BottomEditorsTabs;
