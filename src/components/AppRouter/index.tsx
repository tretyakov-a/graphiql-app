import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Welcome from '@src/pages/Welcome';
import NotFound from '@src/pages/NotFound';
import Graphiql from '@src/pages/Graphiql';
import Layout from '@src/components/Layout';
import Login from '../../pages/Login/Login';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="auth" element={<Login />} />
          <Route path="graphiql" element={<Graphiql />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
