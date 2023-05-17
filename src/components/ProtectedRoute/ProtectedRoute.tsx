import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps extends React.PropsWithChildren {
  passCondition: boolean;
  route: string;
}
export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { passCondition, children, route } = props;

  if (!passCondition) {
    return <Navigate to={route} replace />;
  }

  return <>{children}</>;
};
