// @ts-nocheck
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { store, persistor } from './redux/store';
import Routes from './routes';

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
    h4: {
      fontSize: '1.25rem',
    },
  },
  overrides: {},
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>

        <ToastContainer position="bottom-center" />
      </PersistGate>
    </Provider>
  );
};

export default App;
