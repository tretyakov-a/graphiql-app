import { Provider } from 'react-redux';
import AppRouter from '../AppRouter';
import { store } from '@src/store';
import { MediaQueryContext, maxWidthQuery, useMediaQuery } from '@src/shared/contexts/media-query';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const App = () => {
  const { matches } = useMediaQuery([maxWidthQuery('xs'), maxWidthQuery('sm')]);

  return (
    <ErrorBoundary>
      <MediaQueryContext.Provider value={{ matches }}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </MediaQueryContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
