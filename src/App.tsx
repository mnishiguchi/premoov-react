// @ts-nocheck

import React from 'react';
import { Container } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import store from './redux/store';
import Routes from './routes';
import AppHeader from './components/AppHeader';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Helmet>
        {process.env.REACT_APP_NAME && (
          <title>{process.env.REACT_APP_NAME}</title>
        )}
      </Helmet>

      <AppHeader />

      <Container style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <Routes />
      </Container>

      <ToastContainer />
    </Provider>
  );
};

export default App;
