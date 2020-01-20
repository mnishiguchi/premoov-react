import React from 'react';
import { Container } from '@material-ui/core';

const PageContainer: React.FC = ({ children }) => (
  <Container style={{ marginTop: '3rem', marginBottom: '3rem' }}>{children}</Container>
);

export default PageContainer;
