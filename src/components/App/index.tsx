import { Provider } from 'react-redux';
import AppRouter from '../AppRouter';
import { store } from '@src/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
