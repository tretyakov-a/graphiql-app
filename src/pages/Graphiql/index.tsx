import { auth } from '@src/shared/api/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Graphiql = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [navigate, user]);

  return (
    <PageWrapper pageClassName={classes.graphiql}>
      <h2>Request editor, variables editor, etc.</h2>
    </PageWrapper>
  );
};

export default Graphiql;
