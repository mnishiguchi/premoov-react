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
import { RoomItem, VolumeUnit } from '../types';
import { displayVolumeValue, convertFt3ToM3, VOLUME_UNIT_FT3 } from '../lib';

const RoomItemTable: React.FC<{
  rows: RoomItem[];
  defaultRoomItemNames: string[];
  defaultVolumeLookup: any;
  volumeUnit: VolumeUnit;
  onRoomItemCountIncremented: (roomItemId: string) => void;
  onRoomItemCountDecremented: (roomItemId: string) => void;
  onRoomItemUpdated: (roomItem: RoomItem) => void;
  onRoomItemDeleted: (roomItemId: string) => void;
}> = ({
  rows,
  defaultRoomItemNames,
  defaultVolumeLookup,
  volumeUnit,
  onRoomItemCountIncremented,
  onRoomItemCountDecremented,
  onRoomItemUpdated,
  onRoomItemDeleted,
}) => {
  const [modalId, setModalId] = React.useState('');
  const openModal = setModalId;
  const closeModal = () => setModalId('');

  const isVolumeUnitFt3 = volumeUnit === VOLUME_UNIT_FT3;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          {rows.length > 0 ? (
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">{volumeUnit} Each</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">{volumeUnit} Total</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
          ) : (
            <TableHead>
              <TableRow>
                <TableCell align="left">No items</TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{displayVolumeValue(row.volume, volumeUnit)}</TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">
                  {displayVolumeValue(row.volume * row.count, volumeUnit)}
                </TableCell>
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

                  <div className="Premoov-modals">
                    <RoomItemFormDialog
                      key={shortid.generate()}
                      initialValues={row}
                      isOpen={modalId === row.name}
                      onClose={closeModal}
                      onSubmit={(roomItem: RoomItem, { resetForm }: any) => {
                        onRoomItemUpdated({
                          ...roomItem,
                          // If ft3 is used in the form, convert it to m3 because m3 is used internally.
                          volume: isVolumeUnitFt3
                            ? convertFt3ToM3(roomItem.volume)
                            : roomItem.volume,
                        });
                        closeModal();
                        resetForm();
                      }}
                      title={`Edit ${row.name}`}
                      defaultRoomItemNames={defaultRoomItemNames}
                      defaultVolumeLookup={defaultVolumeLookup}
                      volumeUnit={volumeUnit}
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
