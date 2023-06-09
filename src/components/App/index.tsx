import { Provider } from 'react-redux';
import AppRouter from '../AppRouter';
import { store } from '@src/store';
import { MediaQueryContext, maxWidthQuery, useMediaQuery } from '@src/shared/contexts/media-query';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import { ScrollContextProvider } from '@src/shared/contexts/scroll';
import { MouseActionsContextProvider } from '@src/shared/contexts/mouse';

const App = () => {
  const { matches } = useMediaQuery([maxWidthQuery('xs'), maxWidthQuery('sm')]);

  return (
    <ErrorBoundary>
      <MediaQueryContext.Provider value={{ matches }}>
        <Provider store={store}>
          <MouseActionsContextProvider>
            <ScrollContextProvider>
              <AppRouter />
              <ToastContainer position="top-center" hideProgressBar />
            </ScrollContextProvider>
          </MouseActionsContextProvider>
        </Provider>
      </MediaQueryContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
