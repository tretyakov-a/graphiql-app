import classes from './style.module.scss';
import { useAppDispatch, useAppUI } from '@src/store';
import { useResizeableFlex } from '../hooks/use-resizable-flex';
import { Suspense, lazy, useContext, useMemo, useRef } from 'react';
import { DragOptions } from '../hooks/use-resizable-flex/types';
import { maxWidthQuery, MediaQueryContext } from '@src/shared/contexts/media-query';
import { classNames } from '@src/shared/utils';
import useOpenCloseAnimation from '@src/shared/hooks/animation';
import Loader from '@src/components/Loader';
const DocsExplorer = lazy(() => import('./DocsExplorer'));

const MIN_WIDTH = 200;
const STORE_KEY = 'docs';

const DocsExplorerPanel = () => {
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

  const matchesMedia = matches![maxWidthQuery('sm')];

  useOpenCloseAnimation(elementRef, isVisible, {
    display: 'flex',
    isActive: matchesMedia,
  });

  const docsExplorerClasses = classNames([
    classes.docsExplorerPanel,
    isVisible && classes.docsExplorerPanelVisible,
  ]);

  return (
    <div
      className={docsExplorerClasses}
      style={{ flex: flex, minWidth: `${MIN_WIDTH}px` }}
      ref={elementRef}
    >
      <section className={classes.docsExplorerContainer}>
        {isVisible && (
          <Suspense fallback={<Loader />}>
            <DocsExplorer />
          </Suspense>
        )}
      </section>
      {dragBar}
    </div>
  );
};

export default DocsExplorerPanel;
