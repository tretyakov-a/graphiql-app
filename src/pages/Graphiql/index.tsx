import btnClasses from '@src/styles/button.module.scss';
import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import BottomEditors from './BottomEditors';
import QueryEditor from './QueryEditor';

const Graphiql = () => {
  return (
    <PageWrapper
      pageClassName={classes.graphiql}
      pageContainerClassName={classes.graphiqlContainer}
    >
      <aside className={[classes.sideToolbar, classes.verticalToolbar].join(' ')}>
        <button className={[btnClasses.button, btnClasses.buttonIcon].join(' ')}>
          <FontAwesomeIcon icon={faBook} size="xl" />
        </button>
      </aside>
      <div className={classes.graphiqlMain}>
        <section className={classes.documentationExporer}>Docs</section>
        <div className="dragBar dragBarVertical"></div>
        <div className={classes.editorsContainer}>
          <div className={classes.editors}>
            <QueryEditor />
            <BottomEditors />
          </div>
          <section className={classes.response}>Response</section>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Graphiql;
