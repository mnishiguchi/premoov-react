// @ts-nocheck

import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import { Link } from '@reach/router';
import { useStore } from 'react-redux';

const HomePage: React.FC = () => {
  const { projects } = useStore().getState();

  return (
    <Container>
      <h1>My Projects</h1>

      <Card.Group>
        {projects.map(project => (
          <Card key={project.id} as={Link} to={`/projects/${project.id}`}>
            <Card.Content>
              <Card.Header>{project.title}</Card.Header>
              <Card.Description>{project.description}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default HomePage;
