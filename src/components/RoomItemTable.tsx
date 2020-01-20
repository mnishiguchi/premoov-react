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
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import shortid from 'shortid';

import RoomItemFormDialog from '../components/RoomItemFormDialog';
import { RoomItem } from '../types';

const RoomItemTable: React.FC<{
  rows: RoomItem[];
  onRoomItemCountIncremented: (roomItemId: string) => void;
  onRoomItemCountDecremented: (roomItemId: string) => void;
  onRoomItemUpdated: (roomItem: RoomItem) => void;
  onRoomItemDeleted: (roomItemId: string) => void;
}> = ({
  rows,
  onRoomItemCountIncremented,
  onRoomItemCountDecremented,
  onRoomItemUpdated,
  onRoomItemDeleted,
}) => {
  const [modalId, setModalId] = React.useState('');
  const openModal = setModalId;
  const closeModal = () => setModalId('');

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          {rows.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Volume</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.volume}</TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">{row.volume * row.count}</TableCell>
                <TableCell align="right">
                  <ButtonGroup variant="text">
                    <IconButton onClick={() => onRoomItemCountDecremented(row.id)}>
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={() => onRoomItemCountIncremented(row.id)}>
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => openModal(row.name)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        if (window.confirm(`Deleting ${row.name}. OK?`)) {
                          onRoomItemDeleted(row.id);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ButtonGroup>

                  <div className="pm-Modals">
                    <RoomItemFormDialog
                      key={shortid.generate()}
                      initialValues={row}
                      isOpen={modalId === row.name}
                      onClose={closeModal}
                      onSubmit={(roomItem: RoomItem, { resetForm }: any) => {
                        onRoomItemUpdated(roomItem);
                        closeModal();
                        resetForm();
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
    </>
  );
};

export default RoomItemTable;
