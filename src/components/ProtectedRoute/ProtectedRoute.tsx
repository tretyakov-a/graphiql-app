import { User } from 'firebase/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps extends React.PropsWithChildren {
  user: User | null | undefined;
  isNeedable: boolean;
  route: string;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { user, children, isNeedable, route } = props;

  if (!user && isNeedable) {
    return <Navigate to={route} replace />;
  } else if (user && !isNeedable) {
    return <Navigate to={route} replace />;
  }

  return children as unknown as JSX.Element;
};
