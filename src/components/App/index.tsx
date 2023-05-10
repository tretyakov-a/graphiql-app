import { Provider } from 'react-redux';
import AppRouter from '../AppRouter';
import { store } from '@src/store';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
