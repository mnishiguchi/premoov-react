// @ts-nocheck

import React from 'react';
import { Container } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
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
      <ToastContainer />
    </Provider>
  );
};

export default App;
