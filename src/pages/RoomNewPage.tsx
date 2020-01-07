import React from 'react';
import { Container } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import { fullPageTitle } from '../lib';

const RoomNewPage: React.FC = () => {
  const pageTitle = 'RoomNewPage';

  return (
    <Container>
      <Helmet>
        <title>{fullPageTitle(pageTitle)}</title>
      </Helmet>

      <h1>{pageTitle}</h1>
    </Container>
  );
};

export default RoomNewPage;
