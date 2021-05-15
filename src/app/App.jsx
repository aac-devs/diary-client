import { Provider } from 'react-redux';
import AppRouter from '../routers/app.routes';
import reduxStore from '../store/store';

const App = () => {
  return (
    <Provider store={reduxStore}>
      <AppRouter />
    </Provider>
  );
};

export default App;
