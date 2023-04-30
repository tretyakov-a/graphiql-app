import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';

const Auth = () => {
  return (
    <PageWrapper pageClassName={classes.auth}>
      <h2>Authentication</h2>
    </PageWrapper>
  );
};

export default Auth;
