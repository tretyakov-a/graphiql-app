import classes from './style.module.scss';
import { useAppDispatch, useAppUI } from '@src/store';
import { useResizeableFlex } from '../hooks/use-resizable-flex';
import { useContext, useMemo } from 'react';
import Portal from '@src/components/Portal';
import { DragContext } from '../../../shared/contexts/drag';
import { DragOptions } from '../hooks/use-resizable-flex/types';
import { maxWidthQuery, MediaQueryContext } from '@src/shared/contexts/media-query';

const MIN_WIDTH = 200;

const DocsExplorerPanel = () => {
  const { containerRef } = useContext(DragContext);
  const {
    visiblity,
    actions: { toggleVisibility },
  } = useAppUI();
  const dispatch = useAppDispatch();
  const dragOptions = useMemo<DragOptions>(
    () => ({
      limits: {
        leftTop: {
          value: MIN_WIDTH,
          onLimitMet: () => {
            dispatch(toggleVisibility('docs'));
          },
        },
      },
    }),
    [dispatch, toggleVisibility]
  );
  const { flex, dragBar } = useResizeableFlex('docs', dragOptions);
  const { matches } = useContext(MediaQueryContext);

  const docsExplorerClasses = [
    classes.docsExplorerPanel,
    visiblity.docs ? classes.docsExplorerPanelVisible : '',
  ].join(' ');

  const matchesSmBreakpoint = matches![maxWidthQuery('sm')];
  const containerRect = containerRef?.current?.getBoundingClientRect() || { y: 0, height: 0 };
  const mediaMatchStyles = matchesSmBreakpoint
    ? {
        top: `${containerRect.y}px`,
        height: `${containerRect.height}px`,
      }
    : {};

  const docsExplorerEl = (
    <div
      className={docsExplorerClasses}
      style={{ flex: flex, minWidth: `${MIN_WIDTH}px`, ...mediaMatchStyles }}
    >
      <section className={classes.docsExplorerContainer}>
        <h2>Docs</h2>
      </section>
      {dragBar}
    </div>
  );

  return <>{matchesSmBreakpoint ? <Portal>{docsExplorerEl}</Portal> : docsExplorerEl}</>;
};

export default DocsExplorerPanel;
