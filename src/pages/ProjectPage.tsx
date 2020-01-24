import React, { useCallback } from 'react';
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Fab,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import RoomIcon from '@material-ui/icons/Room';
import NoteIcon from '@material-ui/icons/Note';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WarningIcon from '@material-ui/icons/Warning';
import { Link, navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { toast } from 'react-toastify';

import ProjectFormDialog from '../components/ProjectFormDialog';
import RoomItemTable from '../components/RoomItemTable';
import RoomFormDialog from '../components/RoomFormDialog';
import RoomItemFormDialog from '../components/RoomItemFormDialog';
import useToggle from '../components/useToggle';
import {
  selectProjectById,
  selectDefaultRoomItemNames,
  sumRoomItemsCount,
  sumRoomItemsVolume,
} from '../redux/selectors';
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
  const defaultRoomItemNames = useSelector(selectDefaultRoomItemNames);
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

  const handleProjectUpdated = useCallback(
    (project: Project) => {
      dispatch(updateProjectAction(project));
      project.name && toast.success(`"${project.name}" was updated`);
    },
    [dispatch]
  );

  const handleProjectDeleted = useCallback(
    (projectId: string) => {
      dispatch(deleteProjectAction(projectId));
      toast.success(`A project was deleted`);
    },
    [dispatch]
  );

  // Note: I tried throttle and debounce, but this looks good without any of them.
  const handleProjectDescriptionUpdated = useCallback(
    (description: string) => {
      dispatch(updateProjectAction({ ...project, description } as Project));
    },
    [dispatch, project]
  );

  const handleRoomAdded = useCallback(
    (room: Room) => {
      dispatch(createRoomAction(room, project!.id));
      room.name && toast.success(`${room.name} was created`);
    },
    [dispatch, project]
  );

  const handleRoomItemAdded = useCallback(
    (roomItem: RoomItem) => {
      dispatch(createRoomItemAction(roomItem, currentRoomId, project!.id));
      roomItem.name && toast.success(`${roomItem.name} was created`);
    },
    [dispatch, currentRoomId, project]
  );

  const handleRoomItemUpdated = useCallback(
    (roomItem: RoomItem) => {
      dispatch(updateRoomItemAction(roomItem));
      roomItem.name && toast.success(`${roomItem.name} was updated`);
    },
    [dispatch]
  );

  const handleRoomItemDeleted = useCallback(
    (roomItemId: string) => {
      dispatch(deleteRoomItemAction(roomItemId));
      toast.success(`Item was deleted`);
    },
    [dispatch]
  );

  const handleRoomItemCountIncremented = useCallback(
    (roomItemId: string) => dispatch(incrementRoomItemCountAction(roomItemId)),
    [dispatch]
  );

  const handleRoomItemCountDecremented = useCallback(
    (roomItemId: string) => dispatch(decrementRoomItemCountAction(roomItemId)),
    [dispatch]
  );

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
          <MenuItem component={Link} to={`/projects/${project!.id}/rooms`}>
            <ListItemIcon>
              <RoomIcon />
            </ListItemIcon>
            Rooms
          </MenuItem>
        )}
        <MenuItem onClick={openAddRoomModal}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          Add room
        </MenuItem>
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

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <NoteIcon /> <Typography>Memo</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TextField
                  multiline
                  name="description"
                  label="Description"
                  onChange={(e: any) => handleProjectDescriptionUpdated(e.target.value as string)}
                  value={project!.description}
                  rows="10"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
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
                          defaultRoomItemNames={defaultRoomItemNames}
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
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <WarningIcon /> <Typography>Danger Zone</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Button
                  color="secondary"
                  onClick={() => {
                    if (window.confirm(`Deleting ${project!.name}. OK?`)) {
                      handleProjectDeleted(project!.id);
                    }
                  }}
                >
                  <DeleteIcon />
                  Delete this project
                </Button>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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
              defaultRoomItemNames={defaultRoomItemNames}
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
