import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import { useContext, useRef } from 'react';
import SideToolbar from './SideToolbar';
import EditorsLeftPanel from './EditorsLeftPanel';
import DocsExplorerPanel from './DocsExplorerPanel';
import { DragContext } from '@src/shared/contexts/drag';
import { MediaQueryContext, maxWidthQuery } from '@src/shared/contexts/media-query';
import Portal from '@src/components/Portal';
import ResponsePanel from './ResponsePanel';
import { EditorsContextProvider } from '@src/shared/contexts/editors';
const Graphiql = () => {
  const graphqlMainContainerRef = useRef<HTMLDivElement>(null);
  const editorsContainerRef = useRef<HTMLDivElement>(null);
  const { matches } = useContext(MediaQueryContext);
  const matchesSmBreakpoint = matches![maxWidthQuery('sm')];

  return (
    <PageWrapper
      pageClassName={classes.graphiql}
      pageContainerClassName={classes.graphiqlContainer}
    >
      <EditorsContextProvider>
        <SideToolbar />
        <div className={classes.graphiqlMain} ref={graphqlMainContainerRef}>
          <DragContext.Provider value={{ containerRef: graphqlMainContainerRef }}>
            {matchesSmBreakpoint ? (
              <Portal>
                <DocsExplorerPanel />
              </Portal>
            ) : (
              <DocsExplorerPanel />
            )}
          </DragContext.Provider>
          <div className={classes.editorsPanel}>
            <div className={classes.editorsContainer} ref={editorsContainerRef}>
              <DragContext.Provider value={{ containerRef: editorsContainerRef }}>
                <EditorsLeftPanel />
              </DragContext.Provider>
              <ResponsePanel />
            </div>
          </div>
        </div>
      </EditorsContextProvider>
    </PageWrapper>
  );
};

export default Graphiql;
