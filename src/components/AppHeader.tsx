import React from 'react';
import { navigate } from '@reach/router';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const AppHeader: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate('/')}>
          {process.env.REACT_APP_NAME || 'Home'}
        </Button>
        <Button color="inherit" onClick={() => navigate('/about')}>
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
