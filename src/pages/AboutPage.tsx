import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

import { fullPageTitle } from '../lib';

const AboutPage: React.FC = () => {
  const pageTitle = 'About';

  return (
    <Container>
      <Helmet>
        <title>{fullPageTitle(pageTitle)}</title>
      </Helmet>

      <Typography variant="h4" gutterBottom>
        {pageTitle}
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit hic,
        officiis ab rem aliquid minus maiores doloremque consequuntur omnis,
        consequatur explicabo debitis veniam possimus culpa voluptates sint.
        Beatae, dolores perspiciatis?
      </Typography>
    </Container>
  );
};

export default AboutPage;
