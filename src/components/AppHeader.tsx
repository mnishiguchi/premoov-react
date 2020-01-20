import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

// Defines common UI for the app header. Accepts extra menu buttons as children.
const AppHeader: React.FC = ({ children }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          <Button color="inherit" onClick={() => navigate('/')}>
            {process.env.REACT_APP_NAME || 'Home'}
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')}>
            About
          </Button>
        </span>
        <span>
          {children}
          <Button color="inherit" onClick={e => setMenuAnchorEl(e.currentTarget)}>
            <SettingsIcon />
          </Button>
        </span>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={() => {
            setMenuAnchorEl(null);
          }}
        >
          <MenuItem
            onClick={() => {
              console.log(`TODO: Implement settings`);
              setMenuAnchorEl(null);
            }}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.localStorage.clear();
              setMenuAnchorEl(null);
            }}
          >
            Clear Local Storage
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
