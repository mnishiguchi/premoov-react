import React from 'react';
import { Link } from '@reach/router';
import { Menu } from 'semantic-ui-react';

// https://react.semantic-ui.com/collections/menu
const AppHeader: React.FC = () => {
  return (
    <Menu>
      <Menu.Item
        as={Link}
        to="/"
        content={process.env.REACT_APP_NAME || 'Home'}
      />
      <Menu.Item as={Link} to="/about" content="About" />
    </Menu>
  );
};

export default AppHeader;
