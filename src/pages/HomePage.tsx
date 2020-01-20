import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';

import ProjectFormDialog from '../components/ProjectFormDialog';
import SEO from '../components/SEO';
import { Project } from '../types';
import PageContainer from '../components/PageContainer';
import AppHeader from '../components/AppHeader';
import useToggle from '../components/useToggle';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  // @ts-ignore
  const projects = useSelector(state => state.projects);

  const {
    open: openAddProjectModal,
    close: closeAddProjectModal,
    isOpen: isOpenAddProjectModal,
  } = useToggle(false);

  const handleProjectAdded = ({ name, description }: Project) =>
    dispatch({
      type: 'CREATE_PROJECT',
      payload: {
        project: {
          name,
          description,
          id: shortid.generate(),
        } as Project,
      },
    });

  return (
    <>
      <AppHeader>
        <Button onClick={() => openAddProjectModal()} color="inherit">
          <AddIcon />
          Add Project
        </Button>
      </AppHeader>

      <PageContainer>
        <SEO />

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
      </PageContainer>

      <div className="pm-Modals">
        <ProjectFormDialog
          isOpen={isOpenAddProjectModal}
          onClose={closeAddProjectModal}
          onSubmit={(project: Project, { resetForm }: any) => {
            closeAddProjectModal();
            handleProjectAdded(project);
            resetForm();
          }}
          title={`Add Project`}
        />
      </div>
    </>
  );
};

export default HomePage;
