import React from 'react';
import { Container } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { fullPageTitle } from '../lib';

const RoomPage: React.FC = () => {
  const pageTitle = 'RoomPage';

  return (
    <Container>
      <Helmet>
        <title>{fullPageTitle(pageTitle)}</title>
      </Helmet>

      <h1>{pageTitle}</h1>
    </Container>
  );
};

export default RoomPage;
