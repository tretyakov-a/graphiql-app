import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';

const Welcome = () => {
  return (
    <PageWrapper pageClassName={classes.welcome}>
      <h2>Welcome</h2>
    </PageWrapper>
  );
};

export default Welcome;
