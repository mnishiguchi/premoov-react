import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import { fullPageTitle } from '../lib';

type Props = {
  id: string | number;
};

const ProjectPage: React.FC<Props> = ({ id }: Props) => {
  const pageTitle = `Project ${id}`;

  return (
    <Container>
      <Helmet>
        <title>{fullPageTitle(pageTitle)}</title>
      </Helmet>

      <Header as="h1">ProjectPage</Header>

      <span>ID: {id}</span>
    </Container>
  );
};

export default ProjectPage;
