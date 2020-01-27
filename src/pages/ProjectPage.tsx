import React, { useCallback } from 'react';
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  IconButton,
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
import { convertFt3ToM3, VOLUME_UNIT_FT3 } from '../lib';

const ProjectPage: React.FC<{
  id: string;
}> = ({ id }) => {
  // @ts-ignore
  const { project, rooms, roomItems } = useSelector(selectProjectById(id));
  // @ts-ignore
  const { volumeUnit, defaultVolumeLookup } = useSelector(state => state);

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
  const isVolumeUnitFt3 = volumeUnit === VOLUME_UNIT_FT3;

  // This is a workaround for assigning the first room id to the local state
  // when the first room is created in redux.
  currentRoomId || (rooms[0] && setCurrentRoomId(rooms[0].id));

  return (
    <>
      <AppHeader />

      <PageContainer>
        <SEO title={pageTitle} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1">
              {pageTitle}
              <IconButton color="primary">
                <EditIcon onClick={openEditProjectModal} />
              </IconButton>
            </Typography>

            <Typography variant="body2">
              <strong>Item Count</strong>: {sumRoomItemsCount(roomItems)}
            </Typography>
            <Typography variant="body2">
              <strong>Volume</strong>: {sumRoomItemsVolume(roomItems, volumeUnit)} ({volumeUnit})
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h4">Rooms</Typography>

              <div>
                {rooms.length > 0 && (
                  <Button component={Link} to={`/projects/${project!.id}/rooms`}>
                    Details
                  </Button>
                )}
                <Button
                  onClick={() => {
                    openAddRoomModal();
                  }}
                >
                  <AddIcon />
                  Add room
                </Button>
              </div>
            </div>

            {rooms.length === 0 && <Typography variant="body2">No room</Typography>}

            {rooms.length > 0 && (
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Room</TableCell>
                      <TableCell align="center">Item Count</TableCell>
                      <TableCell align="center">Volume ({volumeUnit})</TableCell>
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
                            {sumRoomItemsVolume(filteredRoomItems, volumeUnit)}
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">Items per Room</Typography>

                {rooms.length > 0 && (
                  <Button onClick={openAddRoomItemModal}>
                    <AddIcon /> Add item
                  </Button>
                )}
              </div>
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
                          defaultVolumeLookup={defaultVolumeLookup}
                          volumeUnit={volumeUnit}
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
            <Typography variant="h4">Description</Typography>

            <TextField
              multiline
              name="description"
              onChange={(e: any) => handleProjectDescriptionUpdated(e.target.value as string)}
              value={project!.description}
              rows="10"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <WarningIcon />
                <Typography variant="h4" style={{ marginLeft: '0.5rem' }}>
                  Danger Zone
                </Typography>
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

        <div className="Premoov-modals">
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
                handleRoomItemAdded({
                  ...roomItem,
                  // If ft3 is used in the form, convert it to m3 because m3 is used internally.
                  volume: isVolumeUnitFt3 ? convertFt3ToM3(roomItem.volume) : roomItem.volume,
                });
                resetForm();
              }}
              title={`Add Item to "${currentRoom!.name}"`}
              defaultRoomItemNames={defaultRoomItemNames}
              defaultVolumeLookup={defaultVolumeLookup}
              volumeUnit={volumeUnit}
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
