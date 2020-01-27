import React, { useState } from 'react';
import { navigate } from '@reach/router';
import { AppBar, Toolbar, Button, Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

// Defines common UI for the app header. Accepts extra menu buttons as children.
const AppHeader: React.FC<{
  renderMenuItems?: (props: { closeMenu: () => void }) => void;
}> = ({ renderMenuItems }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const closeMenu = () => setMenuAnchorEl(null);

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
          <Button color="inherit" onClick={e => setMenuAnchorEl(e.currentTarget)}>
            <MenuIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={menuAnchorEl}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={closeMenu}
          >
            {/* Insert page specific menu items if any. */}
            {renderMenuItems && renderMenuItems({ closeMenu })}

            {/* Static menu items */}
            <MenuItem
              onClick={() => {
                navigate('/settings');
                closeMenu();
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (window.confirm(`Deleting all data. OK?`)) {
                  window.localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
              Clear Data
            </MenuItem>
          </Menu>
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
