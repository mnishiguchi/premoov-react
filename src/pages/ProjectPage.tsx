import React from 'react';
import {
  Button,
  Fab,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Link, navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { toast } from 'react-toastify';

import ProjectFormDialog from '../components/ProjectFormDialog';
import RoomItemTable from '../components/RoomItemTable';
import RoomFormDialog from '../components/RoomFormDialog';
import RoomItemFormDialog from '../components/RoomItemFormDialog';
import useToggle from '../components/useToggle';
import { selectProjectById } from '../redux/selectors';
import { Project, Room, RoomItem } from '../types';
import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import AppHeader from '../components/AppHeader';
import {
  updateProjectAction,
  deleteProjectAction,
  createRoomAction,
  createRoomItemAction,
  updateRoomItemAction,
  deleteRoomItemAction,
  incrementRoomItemCountAction,
  decrementRoomItemCountAction,
} from '../redux/actions';

const ProjectPage: React.FC<{
  id: string;
}> = ({ id }) => {
  // @ts-ignore
  const { project, rooms, roomItems } = useSelector(selectProjectById(id));
  const dispatch = useDispatch();

  const [currentRoomId, setCurrentRoomId] = React.useState(rooms[0] && rooms[0].id);

  const {
    open: openEditProjectModal,
    close: closeEditProjectModal,
    isOpen: isOpenEditProjectModal,
  } = useToggle(false);

  const {
    open: openAddRoomModal,
    close: closeAddRoomModal,
    isOpen: isOpenAddRoomModal,
  } = useToggle(false);

  const {
    open: openAddRoomItemModal,
    close: closeAddRoomItemModal,
    isOpen: isOpenAddRoomItemModal,
  } = useToggle(false);

  const changeTab = (event: any, newValue: string) => setCurrentRoomId(newValue);

  const handleProjectUpdated = (project: Project) => {
    dispatch(updateProjectAction(project));
    toast.success(`"${project.name}" was created`);
  };

  const handleProjectDeleted = (projectId: string) => {
    const projectName = project!.name;
    dispatch(deleteProjectAction(projectId));
    toast.success(`"${projectName}" was deleted`);
  };

  const handleRoomAdded = (room: Room) => {
    dispatch(createRoomAction(room, project!.id));
    toast.success(`${room.name} was created`);
  };

  const handleRoomItemAdded = (roomItem: RoomItem) => {
    dispatch(createRoomItemAction(roomItem, currentRoomId, project!.id));
    toast.success(`${roomItem.name} was created`);
  };

  const handleRoomItemUpdated = (roomItem: RoomItem) => {
    dispatch(updateRoomItemAction(roomItem));
    toast.success(`${roomItem.name} was created`);
  };

  const handleRoomItemDeleted = (roomItemId: string) => {
    dispatch(deleteRoomItemAction(roomItemId));
    toast.success(`Item was deleted`);
  };

  const handleRoomItemCountIncremented = (roomItemId: string) =>
    dispatch(incrementRoomItemCountAction(roomItemId));

  const handleRoomItemCountDecremented = (roomItemId: string) =>
    dispatch(decrementRoomItemCountAction(roomItemId));

  const shouldRedirect = !project;
  if (shouldRedirect) {
    navigate(`/`);
    return <div />;
  }

  const pageTitle = project!.name;
  const currentRoom = rooms.find(r => r.id === currentRoomId);

  return (
    <>
      <AppHeader></AppHeader>

      <PageContainer>
        <SEO title={pageTitle} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {pageTitle}
              <IconButton color="primary">
                <EditIcon onClick={openEditProjectModal} />
              </IconButton>
            </Typography>
            <Typography variant="body1">{project!.description}</Typography>
          </Grid>

          <Grid item xs={8}>
            <Toolbar>
              {rooms.length > 0 && (
                <Button component={Link} to={`/projects/${project!.id}/rooms`}>
                  Rooms
                </Button>
              )}
              <Button onClick={openAddRoomModal}>Add room</Button>
            </Toolbar>
          </Grid>

          <Grid item xs={4}>
            {rooms.length > 0 && (
              <Fab color="primary" onClick={openAddRoomItemModal} style={{ float: 'right' }}>
                <AddIcon />
              </Fab>
            )}
          </Grid>

          {rooms.length > 0 && (
            <Grid item xs={12}>
              <Paper square>
                <Tabs
                  value={currentRoomId}
                  onChange={changeTab}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {rooms.map((room: Room, index: number) => (
                    <Tab
                      label={room.name}
                      key={room.name}
                      title={room.description}
                      value={room.id}
                    />
                  ))}
                </Tabs>
                {rooms.map(({ id }: Room, index: number) => {
                  const filteredRoomItems = roomItems.filter(
                    (roomItem: RoomItem) => roomItem.roomId === id
                  );
                  return (
                    <div key={index}>
                      {currentRoomId === id && (
                        <RoomItemTable
                          rows={filteredRoomItems}
                          onRoomItemCountIncremented={handleRoomItemCountIncremented}
                          onRoomItemCountDecremented={handleRoomItemCountDecremented}
                          onRoomItemUpdated={handleRoomItemUpdated}
                          onRoomItemDeleted={handleRoomItemDeleted}
                        />
                      )}
                    </div>
                  );
                })}
              </Paper>
            </Grid>
          )}

          <Grid item xs={12}>
            <Alert severity="warning">
              <AlertTitle>Danger Zone</AlertTitle>
              <Button
                onClick={() => {
                  if (window.confirm(`Deleting ${project!.name}. OK?`)) {
                    handleProjectDeleted(project!.id);
                  }
                }}
              >
                Delete {project!.name}
              </Button>
            </Alert>
          </Grid>
        </Grid>

        <div className="pm-Modals">
          {project && (
            <ProjectFormDialog
              key={shortid.generate()}
              isOpen={isOpenEditProjectModal}
              onClose={closeEditProjectModal}
              onSubmit={(project: Project, { resetForm }: any) => {
                closeEditProjectModal();
                handleProjectUpdated(project);
                resetForm();
              }}
              title={`Edit "${project!.name}"`}
              initialValues={project}
            />
          )}

          {currentRoom && (
            <RoomItemFormDialog
              key={shortid.generate()}
              isOpen={isOpenAddRoomItemModal}
              onClose={closeAddRoomItemModal}
              onSubmit={(roomItem: RoomItem, { resetForm }: any) => {
                closeAddRoomItemModal();
                handleRoomItemAdded(roomItem);
                resetForm();
              }}
              title={`Add Item to "${currentRoom!.name}"`}
            />
          )}

          {project && (
            <RoomFormDialog
              key={shortid.generate()}
              isOpen={isOpenAddRoomModal}
              onClose={closeAddRoomModal}
              onSubmit={(room: Room, { resetForm }: any) => {
                closeAddRoomModal();
                handleRoomAdded(room);
                resetForm();
              }}
              title={`Add Room to "${project!.name}"`}
            />
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default ProjectPage;
