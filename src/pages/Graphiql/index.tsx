import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import Editor from './Editor';
import { useRef } from 'react';
import SideToolbar from './SideToolbar';
import EditorsLeftPanel from './EditorsLeftPanel';
import DocsExplorerPanel from './DocsExplorerPanel';
import { DragContext } from '@src/shared/contexts/drag';

const Graphiql = () => {
  const graphqlMainContainerRef = useRef<HTMLDivElement>(null);
  const editorsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <PageWrapper
      pageClassName={classes.graphiql}
      pageContainerClassName={classes.graphiqlContainer}
    >
      <SideToolbar />
      <div className={classes.graphiqlMain} ref={graphqlMainContainerRef}>
        <DragContext.Provider value={{ containerRef: graphqlMainContainerRef }}>
          <DocsExplorerPanel />
        </DragContext.Provider>
        <div className={classes.editorsPanel}>
          <div className={classes.editorsContainer} ref={editorsContainerRef}>
            <DragContext.Provider value={{ containerRef: editorsContainerRef }}>
              <EditorsLeftPanel />
            </DragContext.Provider>
            <div className={classes.responsePanel}>
              <section className={classes.response}>
                <Editor editable={false} basicSetup={{ lineNumbers: false }} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Graphiql;
