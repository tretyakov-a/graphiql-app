import { User } from 'firebase/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps extends React.PropsWithChildren {
  user: User | null | undefined;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { user, children } = props;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children as unknown as JSX.Element;
};
