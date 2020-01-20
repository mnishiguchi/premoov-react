// @ts-nocheck
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />

        <ToastContainer position="bottom-center" />
      </PersistGate>
    </Provider>
  );
};

export default App;
