import React from 'react';
import {
  ButtonGroup,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import shortid from 'shortid';

import RoomFormDialog from '../components/RoomFormDialog';
import { Room } from '../types';

const RoomTable: React.FC<{
  rows: Room[];
  onItemUpdated: (room: Room) => void;
  onItemDeleted: (roomId: string) => void;
}> = ({ rows, onItemUpdated, onItemDeleted }) => {
  const [modalId, setModalId] = React.useState('');
  const openModal = setModalId;
  const closeModal = () => setModalId('');

  return (
    <TableContainer component={Paper}>
      <Table>
        {rows.length > 0 && (
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="right">
                <ButtonGroup variant="text">
                  <IconButton onClick={() => openModal(row.name)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      if (window.confirm(`Deleting ${row.name}. OK?`)) {
                        onItemDeleted(row.id);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>

                <div className="Premoov-modals">
                  <RoomFormDialog
                    key={shortid.generate()}
                    initialValues={row}
                    isOpen={modalId === row.name}
                    onClose={closeModal}
                    onSubmit={(updatedRoom: Room) => {
                      onItemUpdated(updatedRoom);
                      closeModal();
                    }}
                    title={`Edit ${row.name}`}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomTable;
