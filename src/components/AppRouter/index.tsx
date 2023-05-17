import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Welcome from '@src/pages/Welcome';
import NotFound from '@src/pages/NotFound';
import Graphiql from '@src/pages/Graphiql';
import Layout from '@src/components/Layout';
import Login from '../../pages/Login/Login';
import Register from '@src/pages/Register/Register';
import Reset from '@src/pages/Reset/Reset';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route
            path="auth"
            element={
              <ProtectedRoute isAuthRoute={true} route="/graphiql">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute isAuthRoute={true} route="/graphiql">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="reset"
            element={
              <ProtectedRoute isAuthRoute={true} route="/graphiql">
                <Reset />
              </ProtectedRoute>
            }
          />
          <Route
            path="graphiql"
            element={
              <ProtectedRoute route="/">
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
