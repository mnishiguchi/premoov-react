import React, { useMemo, useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import faker from 'faker';
import shortid from 'shortid';

import ProjectFormDialog from '../components/ProjectFormDialog';
import SEO from '../components/SEO';
import { Project } from '../types';
import { gmapPlaceLink, gmapDirectionLink } from '../lib';
import PageContainer from '../components/PageContainer';
import AppHeader from '../components/AppHeader';
import useToggle from '../components/useToggle';
import OutboundLink from '../components/OutboundLink';
import { createProjectAction, createRoomAction } from '../redux/actions';
import {
  createFilterRoomsByProjectId,
  createFilterRoomItemsByProjectId,
  sumRoomItemsCount,
  sumRoomItemsVolume,
} from '../redux/selectors';

const generateFakeProject = () => ({
  id: shortid.generate(),
  name: faker.address.country(),
  description: faker.lorem.paragraphs(2),
});

const generateFakeRoom = (projectId?: string) => ({
  id: shortid.generate(),
  // TODO: Take one from room name suggestion
  name: faker.commerce.color(),
  description: faker.lorem.paragraphs(2),
  projectId: shortid.generate(),
});

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  // @ts-ignore
  const { projects, rooms, roomItems, volumeUnit } = useSelector(state => state);

  const {
    open: openAddProjectModal,
    close: closeAddProjectModal,
    isOpen: isOpenAddProjectModal,
  } = useToggle(false);

  const filterRoomsByProjectId = useMemo(() => createFilterRoomsByProjectId(rooms), [rooms]);
  const filterRoomItemsByProjectId = useMemo(() => createFilterRoomItemsByProjectId(roomItems), [
    roomItems,
  ]);

  const handleFakeProjectCreated = useCallback(() => {
    const fakeProject = generateFakeProject();
    dispatch(createProjectAction(fakeProject));
    dispatch(createRoomAction(generateFakeRoom(), fakeProject.id));
  }, [dispatch]);

  const handleFormSubmitted = useCallback(
    (project: Project, { resetForm }: any) => {
      closeAddProjectModal();
      dispatch(createProjectAction(project));
      resetForm();
    },
    [dispatch, closeAddProjectModal]
  );

  return (
    <>
      <AppHeader
        renderMenuItems={({ closeMenu }: { closeMenu: () => void }) => (
          // Material-UI: the Menu component doesn't accept a Fragment as a child.
          <div>
            <MenuItem
              onClick={() => {
                handleFakeProjectCreated();
                closeMenu();
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              Add Fake Project
            </MenuItem>
          </div>
        )}
      />

      <PageContainer>
        <SEO />

        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h1" gutterBottom>
              All Projects
            </Typography>

            <Button
              onClick={() => {
                openAddProjectModal();
              }}
            >
              <AddIcon />
              Add Project
            </Button>
          </div>
        </Grid>

        {projects.length < 1 && <Typography variant="body1">No project</Typography>}

        {projects.map((project: Project) => {
          const filteredRooms = filterRoomsByProjectId(project.id);
          const filteredRoomItems = filterRoomItemsByProjectId(project.id);
          return (
            <Card key={project.id} style={{ marginBottom: '1rem' }}>
              <CardContent>
                <Typography variant="h2" gutterBottom>
                  {project.name}
                </Typography>

                <Typography variant="body2">{project.description}</Typography>

                <Typography variant="body2">
                  <strong>Rooms</strong>:{' '}
                  {filteredRooms.length > 0
                    ? filteredRooms.map(room => room.name).join(', ')
                    : 'none'}
                </Typography>

                <Typography variant="body2">
                  <strong>Volume</strong>: {sumRoomItemsVolume(filteredRoomItems, volumeUnit)} (
                  {volumeUnit})
                </Typography>

                {project!.addressFrom && (
                  <Typography variant="body2">
                    <strong>From</strong>:
                    <OutboundLink href={gmapPlaceLink(project.addressFrom)}>{project.addressFrom}</OutboundLink>
                  </Typography>
                )}
                {project!.addressTo && (
                  <Typography variant="body2">
                    <strong>To</strong>:
                    <OutboundLink href={gmapPlaceLink(project.addressTo)}>{project.addressTo}</OutboundLink>
                  </Typography>
                )}

                {project!.addressFrom && project!.addressTo && (
                  <Typography variant="body2">
                    <OutboundLink href={gmapDirectionLink(project.addressFrom, project.addressTo)}>Directions</OutboundLink>
                  </Typography>
                )}
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

      <div className="Premoov-modals">
        <ProjectFormDialog
          isOpen={isOpenAddProjectModal}
          onClose={closeAddProjectModal}
          onSubmit={handleFormSubmitted}
          title={`Add Project`}
        />
      </div>
    </>
  );
};

export default HomePage;
