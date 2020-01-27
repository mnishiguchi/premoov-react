import React from 'react';
import { Typography } from '@material-ui/core';

import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import AppHeader from '../components/AppHeader';

const pageTitle = 'About';

const AboutPage: React.FC = () => (
  <>
    <AppHeader />

    <PageContainer>
      <SEO title={pageTitle} />

      <Typography variant="h1" gutterBottom>
        {pageTitle}
      </Typography>

      <Typography variant="body1">
        Premoov is a calculator for the volume of household items. It is useful before moving. The
        data will be stored in your device so that you can calculate the volume little by little.
      </Typography>
    </PageContainer>
  </>
);

export default AboutPage;
