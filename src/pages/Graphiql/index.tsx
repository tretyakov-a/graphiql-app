import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import BottomEditorsTabs from './BottomEditorsTabs';
import QueryEditor from './QueryEditor';
import Editor from './Editor';
import IconButton from '@src/components/IconButton';
import { useState } from 'react';

const Graphiql = () => {
  const [isDocsVisible, setIsDocsVisible] = useState(false);

  const toggleDocs = () => {
    setIsDocsVisible((prev) => !prev);
  };

  const docsExporerClasses = [
    classes.docsExporer,
    isDocsVisible ? classes.docsExporerCollapsed : '',
  ].join(' ');

  return (
    <PageWrapper
      pageClassName={classes.graphiql}
      pageContainerClassName={classes.graphiqlContainer}
    >
      <aside className={[classes.sideToolbar, classes.verticalToolbar].join(' ')}>
        <IconButton icon={faBook} onClick={toggleDocs} isActive={!isDocsVisible} />
      </aside>
      <div className={classes.graphiqlMain}>
        <section className={docsExporerClasses}>
          <h2>Docs</h2>
        </section>
        <div className="dragBar dragBarVertical"></div>
        <div className={classes.editorsContainer}>
          <div className={classes.editors}>
            <QueryEditor />
            <BottomEditorsTabs />
          </div>
          <section className={classes.response}>
            <Editor editable={false} basicSetup={{ lineNumbers: false }} />
          </section>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Graphiql;
