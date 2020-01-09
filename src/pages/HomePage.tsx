// @ts-nocheck

import React from 'react';
import {
  Button,
  Container,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
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

      <Typography variant="h4" gutterBottom>
        My Projects
      </Typography>

      <div>
        {projects.map(project => (
          <Card key={project.id}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {project.name}
              </Typography>
              <Typography variant="body2">{project.description}</Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to={`/projects/${project.id}`}>
                Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
