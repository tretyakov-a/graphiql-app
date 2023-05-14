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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route
            path="auth"
            element={
              <ProtectedRoute user={user} isNeedable={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute user={user} isNeedable={false}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="reset"
            element={
              <ProtectedRoute user={user} isNeedable={false}>
                <Reset />
              </ProtectedRoute>
            }
          />
          <Route
            path="graphiql"
            element={
              <ProtectedRoute user={user} isNeedable={true}>
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
