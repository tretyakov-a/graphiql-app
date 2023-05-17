import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { auth } from '@src/shared/api/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Welcome from '@src/pages/Welcome';
import NotFound from '@src/pages/NotFound';
import Graphiql from '@src/pages/Graphiql';
import Layout from '@src/components/Layout';
import Login from '../../pages/Login/Login';
import Register from '@src/pages/Register/Register';
import Reset from '@src/pages/Reset/Reset';

const AppRouter = () => {
  const [user] = useAuthState(auth);
  const isAuthrorized = Boolean(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route
            path="auth"
            element={
              <ProtectedRoute passCondition={!isAuthrorized} route="/graphiql">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute passCondition={!isAuthrorized} route="/graphiql">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="reset"
            element={
              <ProtectedRoute passCondition={!isAuthrorized} route="/graphiql">
                <Reset />
              </ProtectedRoute>
            }
          />
          <Route
            path="graphiql"
            element={
              <ProtectedRoute passCondition={isAuthrorized} route="/">
                <Graphiql />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
