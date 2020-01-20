import React from 'react';
import {
  Button,
  Fab,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { toast } from 'react-toastify';

import ProjectFormDialog from '../components/ProjectFormDialog';
import RoomItemTable from '../components/RoomItemTable';
import RoomFormDialog from '../components/RoomFormDialog';
import RoomItemFormDialog from '../components/RoomItemFormDialog';
import useToggle from '../components/useToggle';
import { selectProjectById, sumRoomItemsCount, sumRoomItemsVolume } from '../redux/selectors';
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

  // TODO: Optimize using useCallback
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
      <AppHeader>
        {rooms.length > 0 && (
          <Button color="inherit" component={Link} to={`/projects/${project!.id}/rooms`}>
            Rooms
          </Button>
        )}
        <Button color="inherit" onClick={openAddRoomModal}>
          <AddIcon />
          Add room
        </Button>
      </AppHeader>

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

          <Grid item xs={12}>
            {rooms.length > 0 && (
              <Fab
                color="primary"
                onClick={openAddRoomItemModal}
                style={{ float: 'right' }}
                title="Add item to selected room"
              >
                <AddIcon />
              </Fab>
            )}
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Total Item Count</TableCell>
                    <TableCell align="center">Total Volume</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{sumRoomItemsCount(roomItems)}</TableCell>
                    <TableCell align="center">{sumRoomItemsVolume(roomItems)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            {rooms.length > 0 && (
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Room</TableCell>
                      <TableCell align="center">Item Count</TableCell>
                      <TableCell align="center">Volume</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms.map(room => {
                      const filteredRoomItems = roomItems.filter(
                        (roomItem: RoomItem) => roomItem.roomId === room.id
                      );
                      return (
                        <TableRow key={room.name}>
                          <TableCell align="left" component="th" scope="room">
                            {room.name}
                          </TableCell>
                          <TableCell align="center">
                            {sumRoomItemsCount(filteredRoomItems)}
                          </TableCell>
                          <TableCell align="center">
                            {sumRoomItemsVolume(filteredRoomItems)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
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
                color="inherit"
                onClick={() => {
                  if (window.confirm(`Deleting ${project!.name}. OK?`)) {
                    handleProjectDeleted(project!.id);
                  }
                }}
              >
                <DeleteIcon />
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
