import React from 'react';
import { Typography } from '@material-ui/core';

import SEO from '../components/SEO';

const pageTitle = 'About';

const AboutPage: React.FC = () => (
  <>
    <SEO title={pageTitle} />

    <Typography variant="h4" gutterBottom>
      {pageTitle}
    </Typography>
    <Typography variant="body1">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit hic,
      officiis ab rem aliquid minus maiores doloremque consequuntur omnis,
      consequatur explicabo debitis veniam possimus culpa voluptates sint.
      Beatae, dolores perspiciatis?
    </Typography>
  </>
);

export default AboutPage;
