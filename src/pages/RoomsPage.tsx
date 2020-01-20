import React from 'react';
import { Fab, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { Link } from '@reach/router';
import { toast } from 'react-toastify';

import SEO from '../components/SEO';
import { selectProjectById } from '../redux/selectors';
import RoomTable from '../components/RoomTable';
import RoomFormDialog from '../components/RoomFormDialog';
import useToggle from '../components/useToggle';
import { Room } from '../types';
import PageContainer from '../components/PageContainer';

const RoomsPage: React.FC<{
  projectId: string;
}> = ({ projectId }) => {
  const { project, rooms } = useSelector(selectProjectById(projectId));
  const dispatch = useDispatch();

  const {
    open: openAddRoomModal,
    close: closeAddRoomModal,
    isOpen: isOpenAddRoomModal,
  } = useToggle(false);

  const handleRoomAdded = ({ name, description }: Room) => {
    const newRoomId = shortid.generate();
    dispatch({
      type: 'CREATE_ROOM',
      payload: {
        room: {
          name,
          description,
          id: newRoomId,
          projectId: project!.id,
        } as Room,
      },
    });
    toast.success(`${name} was created`);
  };

  const handleRoomUpdated = (room: Room) => {
    dispatch({
      type: 'UPDATE_ROOM',
      payload: {
        room,
      },
    });
    toast.success(`${room.name} was updated`);
  };

  const handleRoomDeleted = (roomId: string) => {
    dispatch({
      type: 'DELETE_ROOM',
      payload: {
        roomId,
      },
    });
    toast.success(`Room was deleted`);
  };

  return (
    <PageContainer>
      <SEO title={`Rooms | ${project!.name}`} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Rooms of{' '}
            <Link to={`/projects/${project!.id}`}>{project!.name}</Link>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {rooms.length > 0 && (
            <Fab
              color="primary"
              style={{ float: 'right' }}
              onClick={openAddRoomModal}
            >
              <AddIcon />
            </Fab>
          )}
        </Grid>

        <Grid item xs={12}>
          <RoomTable
            rows={rooms}
            onItemUpdated={handleRoomUpdated}
            onItemDeleted={handleRoomDeleted}
          />
        </Grid>
      </Grid>

      <div className="pm-Modals">
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
  );
};

export default RoomsPage;
