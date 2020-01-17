// @ts-nocheck
import React from 'react';
import { Container } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import store from './redux/store';
import Routes from './routes';
import AppHeader from './components/AppHeader';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppHeader />

      <Container style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <Routes />
      </Container>

      <ToastContainer position="bottom-center" />
    </Provider>
  );
};

export default App;
