import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Welcome from '@src/pages/Welcome';
import NotFound from '@src/pages/NotFound';
import Graphiql from '@src/pages/Graphiql';
import Layout from '@src/components/Layout';
import Auth from '@src/pages/Auth';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="auth" element={<Auth />} />
          <Route path="graphiql" element={<Graphiql />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
