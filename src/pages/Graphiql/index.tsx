import { auth } from '@src/shared/api/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ErrorBoundary from '@src/components/ErrorBoundary/ErrorBoundary';

const Graphiql = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [navigate, user]);

  return (
    <PageWrapper pageClassName={classes.graphiql}>
      <ErrorBoundary>
        <h2>Request editor, variables editor, etc.</h2>
      </ErrorBoundary>
    </PageWrapper>
  );
};

export default Graphiql;
