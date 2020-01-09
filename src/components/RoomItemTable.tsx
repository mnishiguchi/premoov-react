// @ts-nocheck

import React from 'react';
import {
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

import ItemFormDialog from '../components/ItemFormDialog';

const RoomItemTable: React.FC = ({ rows }) => {
  const [modalId, setModalId] = React.useState('');
  const openModal = setModalId;
  const closeModal = () => setModalId('');

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Volume</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">{row.volume}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.volume * row.count}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <RemoveIcon />
                </IconButton>

                <IconButton>
                  <AddIcon />
                </IconButton>

                <IconButton onClick={() => openModal(row.name)}>
                  <EditIcon />
                </IconButton>
                <ItemFormDialog
                  initialValues={row}
                  isOpen={modalId === row.name}
                  onClose={closeModal}
                  onSubmit={e => {
                    console.log(e);
                    closeModal();
                  }}
                  title={`Edit Item`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomItemTable;
