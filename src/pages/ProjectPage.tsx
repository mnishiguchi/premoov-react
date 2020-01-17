// @ts-nocheck

import React from 'react';
import {
  Tab,
  Tabs,
  Button,
  ButtonGroup,
  Container,
  Typography,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import { fullPageTitle } from '../lib';
import RoomItemTable from '../components/RoomItemTable';
import RoomFormDialog from '../components/RoomFormDialog';
import ItemFormDialog from '../components/ItemFormDialog';
import useToggle from '../components/useToggle';

const ProjectPage: React.FC<{
  id: string | number;
}> = ({ id }) => {
  const { project, rooms } = useSelector(state => ({
    project: state.projects.find(project => Number(project.id) === Number(id)),
    rooms: state.rooms.filter(room => Number(room.projectId) === Number(id)),
  }));
  const pageTitle = project.name;

  const [tabValue, setTabValue] = React.useState(0);
  const {
    open: openAddRoomModal,
    close: closeAddRoomModal,
    isOpen: isOpenAddRoomModal,
  } = useToggle(false);
  const {
    open: openAddItemModal,
    close: closeAddItemModal,
    isOpen: isOpenAddItemModal,
  } = useToggle(false);

  const changeTab = (event: React.ChangeEvent<{}>, newValue: number) =>
    setTabValue(newValue);

  return (
    <Container>
      <Helmet>
        <title>{fullPageTitle(pageTitle)}</title>
      </Helmet>

      <Typography variant="h4" gutterBottom>
        {pageTitle}
      </Typography>
      <Typography variant="body1">{project.description}</Typography>
      <br />

      <div>
        <Tabs
          value={tabValue}
          onChange={changeTab}
          variant="scrollable"
          scrollButtons="auto"
        >
          {rooms.map((room, index) => (
            <Tab label={room.name} key={room.name} />
          ))}
        </Tabs>
        {rooms.map((room, index) => (
          <div key={index}>
            {tabValue === index && <RoomItemTable rows={room.items} />}
          </div>
        ))}
      </div>
      <br />

      <ButtonGroup variant="text" color="primary">
        <Button onClick={openAddItemModal}>Add Item</Button>
        <ItemFormDialog
          isOpen={isOpenAddItemModal}
          onClose={closeAddItemModal}
          onSubmit={e => {
            console.log(e);
            closeAddRoomModal();
          }}
          title={`Add Item`}
        />

        <Button onClick={openAddRoomModal}>Add Room</Button>
        <RoomFormDialog
          isOpen={isOpenAddRoomModal}
          onClose={closeAddRoomModal}
          onSubmit={e => {
            console.log(e);
            closeAddRoomModal();
          }}
          title={`Add Room`}
        />
      </ButtonGroup>
    </Container>
  );
};

export default ProjectPage;
