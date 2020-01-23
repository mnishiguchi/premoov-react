import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';

import ProjectFormDialog from '../components/ProjectFormDialog';
import SEO from '../components/SEO';
import { Project } from '../types';
import PageContainer from '../components/PageContainer';
import AppHeader from '../components/AppHeader';
import useToggle from '../components/useToggle';
import { createProjectAction } from '../redux/actions';
import { createFilterRoomsByProjectId, createFilterRoomItemsByProjectId } from '../redux/selectors';
import { sumRoomItemsCount, sumRoomItemsVolume } from '../redux/selectors';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  // @ts-ignore
  const { projects, rooms, roomItems } = useSelector(state => state);

  const {
    open: openAddProjectModal,
    close: closeAddProjectModal,
    isOpen: isOpenAddProjectModal,
  } = useToggle(false);

  const filterRoomsByProjectId = createFilterRoomsByProjectId(rooms);
  const filterRoomItemsByProjectId = createFilterRoomItemsByProjectId(roomItems);

  return (
    <>
      <AppHeader>
        <MenuItem onClick={() => openAddProjectModal()}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          Add Project
        </MenuItem>
      </AppHeader>

      <PageContainer>
        <SEO />

        {projects.map((project: Project) => {
          const filteredRooms = filterRoomsByProjectId(project.id);
          const filteredRoomItems = filterRoomItemsByProjectId(project.id);
          return (
            <Card key={project.id} style={{ marginBottom: '1rem' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {project.name}
                </Typography>
                <Typography variant="body2">{project.description}</Typography>
                <Typography variant="body2">
                  <strong>Room Count</strong>: {filteredRooms.length}
                </Typography>
                <Typography variant="body2">
                  <strong>Item Count</strong>: {sumRoomItemsCount(filteredRoomItems)}
                </Typography>
                <Typography variant="body2">
                  <strong>Volume</strong>: {sumRoomItemsVolume(filteredRoomItems)}
                </Typography>
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
          );
        })}
      </PageContainer>

      <div className="pm-Modals">
        <ProjectFormDialog
          isOpen={isOpenAddProjectModal}
          onClose={closeAddProjectModal}
          onSubmit={(project: Project, { resetForm }: any) => {
            closeAddProjectModal();
            dispatch(createProjectAction(project));
            resetForm();
          }}
          title={`Add Project`}
        />
      </div>
    </>
  );
};

export default HomePage;
