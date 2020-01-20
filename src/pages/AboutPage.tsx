import React from 'react';
import { Typography } from '@material-ui/core';

import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import AppHeader from '../components/AppHeader';

const pageTitle = 'About';

const AboutPage: React.FC = () => (
  <>
    <AppHeader></AppHeader>
    <PageContainer>
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
    </PageContainer>
  </>
);

export default AboutPage;
