import { Provider } from 'react-redux';
import AppRouter from '../AppRouter';
import { store } from '@src/store';
import { MediaQueryContext, maxWidthQuery, useMediaQuery } from '@src/shared/contexts/media-query';

const App = () => {
  const { matches } = useMediaQuery([maxWidthQuery('xs'), maxWidthQuery('sm')]);

  return (
    <MediaQueryContext.Provider value={{ matches }}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </MediaQueryContext.Provider>
  );
};

export default App;
