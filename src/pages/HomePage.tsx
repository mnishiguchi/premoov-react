import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Link } from '@reach/router';
import { useSelector } from 'react-redux';

import SEO from '../components/SEO';
import { Project } from '../types';

const HomePage: React.FC = () => {
  // @ts-ignore
  const projects = useSelector(state => state.projects);

  return (
    <>
      <SEO />

      <Typography variant="h4" gutterBottom>
        My Projects
      </Typography>

      {projects.map((project: Project) => (
        <Card key={project.id} style={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {project.name}
            </Typography>
            <Typography variant="body2">{project.description}</Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              to={`/projects/${project.id}`}
              variant="contained"
              color="primary"
            >
              Details
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default HomePage;
