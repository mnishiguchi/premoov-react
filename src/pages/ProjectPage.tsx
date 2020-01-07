import React from 'react';
import { Container, Header } from 'semantic-ui-react';

type Props = {
  id: string | number;
};

const ProjectPage: React.FC<Props> = ({ id }: Props) => {
  return (
    <Container>
      <Header as="h1">ProjectPage</Header>
      <span>ID: {id}</span>
    </Container>
  );
};

export default ProjectPage;
