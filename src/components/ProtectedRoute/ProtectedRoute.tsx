import classes from './style.module.scss';
import { auth } from '@src/shared/api/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import Loader from '../Loader';
import PageWrapper from '../PageWrapper';

interface ProtectedRouteProps extends React.PropsWithChildren {
  isAuthRoute?: boolean;
  route: string;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { children, isAuthRoute = false, route } = props;
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <PageWrapper
        pageClassName={classes.authLoading}
        pageContainerClassName={classes.authLoadingContainer}
      >
        <h2>Authentication...</h2>
        <Loader />
      </PageWrapper>
    );

  const isAuthorised = Boolean(user);

  if ((isAuthRoute && isAuthorised) || (!isAuthRoute && !isAuthorised)) {
    return <Navigate to={route} replace />;
  }

  return children as unknown as JSX.Element;
};
