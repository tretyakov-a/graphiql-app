import classes from './style.module.scss';
import { useAppDispatch, useAppUI } from '@src/store';
import { useResizeableFlex } from '../hooks/use-resizable-flex';

const MIN_WIDTH = 200;

const DocsExplorerPanel = () => {
  const {
    visiblity,
    actions: { toggleVisibility },
  } = useAppUI();
  const dispatch = useAppDispatch();
  const { flex, dragBar } = useResizeableFlex('docs', {
    limits: {
      leftTop: {
        value: 200,
        onLimitMet: () => {
          dispatch(toggleVisibility('docs'));
        },
      },
    },
  });

  const docsExplorerClasses = [
    classes.docsExplorerPanel,
    !visiblity.docs ? classes.docsExplorerPanelCollapsed : '',
  ].join(' ');

  return (
    <div className={docsExplorerClasses} style={{ flex: flex, minWidth: `${MIN_WIDTH}px` }}>
      <section className={classes.docsExplorerContainer}>
        <h2>Docs</h2>
      </section>
      {dragBar}
    </div>
  );
};

export default DocsExplorerPanel;
