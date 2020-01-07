// @ts-nocheck

import React from 'react';
import { Container, Card } from 'semantic-ui-react';
import { Link } from '@reach/router';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { fullPageTitle } from '../lib';

const HomePage: React.FC = () => {
  const pageTitle = 'My Projects';

  const projects = useSelector(state => state.projects);

  return (
    <Container>
      <Helmet>
        <title>{fullPageTitle(pageTitle)}</title>
      </Helmet>

      <h1>My Projects</h1>

      <Card.Group>
        {projects.map(project => (
          <Card key={project.id} as={Link} to={`/projects/${project.id}`}>
            <Card.Content>
              <Card.Header>{project.name}</Card.Header>
              <Card.Description>{project.description}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default HomePage;
