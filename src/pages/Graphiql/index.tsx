import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';

const Graphiql = () => {
  return (
    <PageWrapper pageClassName={classes.graphiql}>
      <h2>Request editor, variables editor, etc.</h2>
    </PageWrapper>
  );
};

export default Graphiql;
