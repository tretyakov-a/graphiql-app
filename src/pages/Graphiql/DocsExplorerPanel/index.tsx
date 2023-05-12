import classes from './style.module.scss';
import { useAppDispatch, useAppUI } from '@src/store';
import { useResizeableFlex } from '../hooks/use-resizable-flex';
import { useContext, useMemo, useRef } from 'react';
import { DragContext } from '../../../shared/contexts/drag';
import { DragOptions } from '../hooks/use-resizable-flex/types';
import { maxWidthQuery, MediaQueryContext } from '@src/shared/contexts/media-query';
import { classNames } from '@src/shared/utils';
import useOpenCloseAnimation from '@src/shared/hooks/animation';
import DocumentationExplorer from './documentationExplorer';

const MIN_WIDTH = 200;
const STORE_KEY = 'docs';

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
            dispatch(toggleVisibility(STORE_KEY));
          },
        },
      },
    }),
    [dispatch, toggleVisibility]
  );
  const { flex, dragBar } = useResizeableFlex(STORE_KEY, dragOptions);
  const { matches } = useContext(MediaQueryContext);
  const isVisible = visiblity.docs;
  const elementRef = useRef<HTMLDivElement>(null);
  const matchesSmBreakpoint = matches![maxWidthQuery('sm')];
  const containerRect = containerRef?.current?.getBoundingClientRect() || { y: 0, height: 0 };
  useOpenCloseAnimation(elementRef, isVisible, {
    display: 'flex',
    isActive: matchesSmBreakpoint,
  });

  const docsExplorerClasses = classNames([
    classes.docsExplorerPanel,
    isVisible && classes.docsExplorerPanelVisible,
  ]);

  const mediaMatchStyles = matchesSmBreakpoint
    ? {
        top: `${containerRect.y}px`,
        height: `${containerRect.height}px`,
      }
    : {};

  return (
    <div
      className={docsExplorerClasses}
      style={{ flex: flex, minWidth: `${MIN_WIDTH}px`, ...mediaMatchStyles }}
      ref={elementRef}
    >
      <section className={classes.docsExplorerContainer}>
        <h2>Docs</h2>
        <DocumentationExplorer />
      </section>
      {dragBar}
    </div>
  );
};

export default DocsExplorerPanel;
