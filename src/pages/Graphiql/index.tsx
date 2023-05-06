import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import Editor from './Editor';
import { useRef } from 'react';
import SideToolbar from './SideToolbar';
import { DragContextProvider } from '@src/pages/Graphiql/drag-context';
import EditorsLeftPanel from './EditorsLeftPanel';
import DocsExplorerPanel from './DocsExplorerPanel';

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
        <DragContextProvider containerRef={graphqlMainContainerRef}>
          <DocsExplorerPanel />
        </DragContextProvider>
        <div className={classes.editorsPanel}>
          <div className={classes.editorsContainer} ref={editorsContainerRef}>
            <DragContextProvider containerRef={editorsContainerRef}>
              <EditorsLeftPanel />
            </DragContextProvider>
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
